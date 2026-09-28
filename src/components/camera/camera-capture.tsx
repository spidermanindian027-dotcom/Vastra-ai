"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Camera, RefreshCw, X, User, Scan, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CameraCapture({ 
  onCapture, 
  onCancel 
}: { 
  onCapture: (file: File) => void; 
  onCancel?: () => void; 
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [preview, setPreview] = useState<string | null>(null);
  
  // Modes & Timer States (User-selectable from top bar)
  const [framingMode, setFramingMode] = useState<"full" | "half">("full");
  const [timerDuration, setTimerDuration] = useState<number>(3); // 3s, 5s, 10s
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState<boolean>(false);

  // Alignment status: RED (false) = improper/too close, GREEN (true) = properly aligned
  const [isProperlyAligned, setIsProperlyAligned] = useState<boolean>(false);
  const [alignmentMessage, setAlignmentMessage] = useState<string>("Step back so your body fits inside the outline");

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 1920 }
        }
      });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setError("");
    } catch {
      setError("Camera permission denied or camera not available on this device.");
    }
  }, [facingMode, stream]);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) stream.getTracks().forEach(track => track.stop());
    };
  }, [facingMode]);

  // Load MediaPipe Pose dynamically for skeletal tracking
  const [poseDetectorLoaded, setPoseDetectorLoaded] = useState<boolean>(false);
  const poseRef = useRef<any>(null);

  useEffect(() => {
    // Attempt loading MediaPipe Pose in background
    if (typeof window === "undefined") return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js";
    script.async = true;
    script.onload = () => {
      try {
        if ((window as any).Pose) {
          const pose = new (window as any).Pose({
            locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`
          });
          pose.setOptions({
            modelComplexity: 0,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
          });
          poseRef.current = pose;
          setPoseDetectorLoaded(true);
        }
      } catch (e) {
        console.warn("MediaPipe Pose initialization fallback to CV vision:", e);
      }
    };
    script.onerror = () => {
      console.warn("MediaPipe CDN unreachable, using Advanced CV Geometry Engine");
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Real-time Computer Vision Frame Analysis (Dual Engine: MediaPipe Skeletal + Anatomical CV)
  useEffect(() => {
    if (preview || error || !stream) return;

    let animationFrameId: number;
    let consecutiveAlignedFrames = 0;
    const requiredStableFrames = 25; // ~0.8-1.0s of continuous perfect alignment required
    let lastAnalysisTime = 0;

    const analyzeFrame = async (timestamp: number) => {
      // Run analysis every ~60-80ms for high performance without dropping frames
      if (timestamp - lastAnalysisTime > 70) {
        lastAnalysisTime = timestamp;

        const video = videoRef.current;
        const canvas = hiddenCanvasRef.current;

        if (video && canvas && video.readyState >= 2 && video.videoWidth > 0) {
          let detectedProperly = false;
          let message = "";

          // --- ENGINE 1: MediaPipe Pose Landmark Detection if available ---
          if (poseRef.current && poseDetectorLoaded) {
            try {
              let poseResult: any = null;
              poseRef.current.onResults((res: any) => {
                poseResult = res;
              });
              await poseRef.current.send({ image: video });

              if (poseResult && poseResult.poseLandmarks) {
                const lm = poseResult.poseLandmarks;
                const nose = lm[0];
                const leftShoulder = lm[11];
                const rightShoulder = lm[12];
                const leftHip = lm[23];
                const rightHip = lm[24];
                const leftKnee = lm[25];
                const rightKnee = lm[26];
                const leftAnkle = lm[27];
                const rightAnkle = lm[28];

                if (framingMode === "half") {
                  // Half Body Rules:
                  // 1. Shoulders must be visible
                  // 2. Hips/Waist MUST be visible in frame (y <= 0.95)
                  // 3. Nose must not be too close (shoulder width not overflowing > 85% width)
                  const shouldersVisible = leftShoulder.visibility > 0.55 && rightShoulder.visibility > 0.55;
                  const hipsVisible = leftHip.visibility > 0.50 && rightHip.visibility > 0.50;
                  const hipsInFrame = leftHip.y < 0.95 && rightHip.y < 0.95;
                  const shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x);

                  if (!shouldersVisible) {
                    detectedProperly = false;
                    message = "Shoulders not detected! Step back 3-4 ft";
                  } else if (shoulderWidth > 0.80) {
                    detectedProperly = false;
                    message = "Too close! Step back so your shoulders fit inside the outline";
                  } else if (!hipsVisible || !hipsInFrame) {
                    detectedProperly = false;
                    message = "Waist not visible! Step back 3-4 ft until waist & hips are inside";
                  } else if (nose.y < 0.05) {
                    detectedProperly = false;
                    message = "Head cut off at top! Lower camera or step back slightly";
                  } else {
                    detectedProperly = true;
                    message = "✓ Half body aligned properly! Hold still";
                  }
                } else {
                  // Full Body Rules:
                  // 1. Nose, Shoulders, Hips, Knees, and Ankles MUST be visible
                  // 2. Ankles must be inside frame (y <= 0.95)
                  const headVisible = nose.visibility > 0.6;
                  const kneesVisible = leftKnee.visibility > 0.5 && rightKnee.visibility > 0.5;
                  const anklesVisible = leftAnkle.visibility > 0.5 && rightAnkle.visibility > 0.5;
                  const anklesInFrame = leftAnkle.y < 0.96 && rightAnkle.y < 0.96;

                  if (!headVisible) {
                    detectedProperly = false;
                    message = "Face not visible! Look directly into camera";
                  } else if (!kneesVisible) {
                    detectedProperly = false;
                    message = "Knees not visible! Step back 6-8 ft for Full Body";
                  } else if (!anklesVisible || !anklesInFrame) {
                    detectedProperly = false;
                    message = "Feet not visible! Step back 6-8 ft until full body (head to shoes) fits";
                  } else {
                    detectedProperly = true;
                    message = "✓ Full body aligned properly! Hold still";
                  }
                }

                // If MediaPipe evaluated, apply result and continue
                if (detectedProperly) {
                  consecutiveAlignedFrames++;
                  if (consecutiveAlignedFrames >= requiredStableFrames) {
                    setIsProperlyAligned(true);
                    setAlignmentMessage(message);
                  }
                } else {
                  consecutiveAlignedFrames = 0;
                  setIsProperlyAligned(false);
                  setAlignmentMessage(message);
                }

                animationFrameId = requestAnimationFrame(analyzeFrame);
                return;
              }
            } catch (err) {
              // Fallback to Engine 2
            }
          }

          // --- ENGINE 2: Advanced Computer Vision Geometry & Anatomical Proportions ---
          // Downsample frame to 80x100 for fast, zero-latency pixel scanning
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (ctx) {
            const w = 80;
            const h = 100;
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(video, 0, 0, w, h);
            const imgData = ctx.getImageData(0, 0, w, h);
            const data = imgData.data;

            // Step 1: Detect human skin clusters (YCbCr universal skin color space)
            let minSkinY = h;
            let maxSkinY = 0;
            let minSkinX = w;
            let maxSkinX = 0;
            let skinPixelsCount = 0;

            // Track skin pixels row by row
            const skinRows = new Array(h).fill(0);

            for (let y = 0; y < h; y++) {
              for (let x = 0; x < w; x++) {
                const idx = (y * w + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];

                // YCbCr skin detection
                const yVal = 0.299 * r + 0.587 * g + 0.114 * b;
                const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
                const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

                // Skin pixel condition (works across all skin tones: light to dark)
                const isSkin = cb >= 77 && cb <= 127 && cr >= 133 && cr <= 173 && yVal >= 35 && yVal <= 245;

                if (isSkin) {
                  skinRows[y]++;
                  skinPixelsCount++;
                  if (y < minSkinY) minSkinY = y;
                  if (y > maxSkinY) maxSkinY = y;
                  if (x < minSkinX) minSkinX = x;
                  if (x > maxSkinX) maxSkinX = x;
                }
              }
            }

            // Calculate face/head height as percentage of total frame height
            const totalPixels = w * h;
            const skinCoverage = skinPixelsCount / totalPixels;

            // Find main face cluster boundaries (rows with >= 4 skin pixels)
            let faceStartY = -1;
            let faceEndY = -1;
            for (let y = 0; y < h; y++) {
              if (skinRows[y] >= 4) {
                if (faceStartY === -1) faceStartY = y;
                faceEndY = y;
              }
            }

            const faceHeightRatio = (faceStartY !== -1 && faceEndY !== -1) 
              ? (faceEndY - faceStartY) / h 
              : 0;
            
            const faceWidthRatio = (maxSkinX > minSkinX)
              ? (maxSkinX - minSkinX) / w
              : 0;

            // Step 2: Detect Torso & Lower Body Activity below the face
            // Scan rows below faceEndY down to bottom for clothing/body activity
            let lowerBodyActivity = 0;
            const lowerStartY = Math.max(faceEndY, Math.floor(h * 0.40));
            const checkEndRow = framingMode === "full" ? Math.floor(h * 0.95) : Math.floor(h * 0.85);

            for (let y = lowerStartY; y < checkEndRow; y++) {
              for (let x = Math.floor(w * 0.2); x < Math.floor(w * 0.8); x++) {
                const idx = (y * w + x) * 4;
                const r = data[idx];
                const g = data[idx + 1];
                const b = data[idx + 2];
                const luma = 0.299 * r + 0.587 * g + 0.114 * b;
                if (luma > 20 && luma < 240) {
                  lowerBodyActivity++;
                }
              }
            }
            const expectedLowerPixels = (checkEndRow - lowerStartY) * (w * 0.6);
            const lowerBodyRatio = expectedLowerPixels > 0 ? lowerBodyActivity / expectedLowerPixels : 0;

            // Step 3: Evaluate against Selected Framing Option
            if (skinPixelsCount < 30 || faceStartY === -1) {
              // No person detected
              detectedProperly = false;
              message = "No person detected. Please step in front of the camera";
            } else if (framingMode === "half") {
              // --- HALF BODY CRITERIA ---
              // In Half Body: Face height MUST be between 13% and 27% of frame height.
              // In close-up selfie (like user's photo), face is > 45%!
              if (faceHeightRatio > 0.28 || faceWidthRatio > 0.48) {
                detectedProperly = false;
                message = "Too close! Step back 3-4 ft so your waist and shoulders fit inside outline";
              } else if (faceHeightRatio < 0.11) {
                detectedProperly = false;
                message = "Too far for Half Body! Step a little closer to the guide";
              } else if (faceStartY < 3) {
                detectedProperly = false;
                message = "Head is cut off at the top! Tilt camera down or step back slightly";
              } else if (lowerBodyRatio < 0.45) {
                detectedProperly = false;
                message = "Waist not detected! Step back until your waist is visible inside the outline";
              } else {
                detectedProperly = true;
                message = "✓ Half body aligned properly! Hold still";
              }
            } else {
              // --- FULL BODY CRITERIA ---
              // In Full Body: Face height MUST be small (5% to 14% of frame height).
              // Legs and feet must extend to bottom 90% of frame.
              if (faceHeightRatio > 0.14 || faceWidthRatio > 0.26) {
                detectedProperly = false;
                message = "Too close! Step back 6-8 ft so your full body (head to feet) fits inside outline";
              } else if (faceHeightRatio < 0.04) {
                detectedProperly = false;
                message = "Too far! Step a little closer so you fit the silhouette";
              } else if (faceStartY < 2) {
                detectedProperly = false;
                message = "Head is too close to top! Tilt camera down or step back";
              } else if (lowerBodyRatio < 0.40) {
                detectedProperly = false;
                message = "Legs/feet not visible! Step back 6-8 ft until shoes touch the bottom baseline";
              } else {
                detectedProperly = true;
                message = "✓ Full body aligned properly! Hold still";
              }
            }

            // Apply Consecutive Stability Lock:
            // Must be continuously aligned for ~0.8s to turn GREEN and prevent false triggers
            if (detectedProperly) {
              consecutiveAlignedFrames++;
              if (consecutiveAlignedFrames >= requiredStableFrames) {
                setIsProperlyAligned(true);
                setAlignmentMessage(message);
              }
            } else {
              consecutiveAlignedFrames = 0;
              setIsProperlyAligned(false);
              setAlignmentMessage(message);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(analyzeFrame);
    };

    animationFrameId = requestAnimationFrame(analyzeFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [preview, error, stream, framingMode, poseDetectorLoaded]);

  // Execute Capture logic
  const executeCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 720;
      canvas.height = video.videoHeight || 1280;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setFlash(true);
        setTimeout(() => setFlash(false), 200);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        setPreview(dataUrl);
        setCountdown(null);
      }
    }
  };

  // When outline becomes GREEN (Properly Aligned), auto-start user's selected timer!
  useEffect(() => {
    if (!isProperlyAligned || preview || countdown !== null) return;

    let current = timerDuration;
    setCountdown(current);

    const interval = setInterval(() => {
      current -= 1;
      if (current > 0) {
        setCountdown(current);
      } else {
        clearInterval(interval);
        setCountdown(null);
        executeCapture();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isProperlyAligned, preview, timerDuration]);

  // If user moves and breaks alignment during countdown, cancel countdown immediately and turn RED again
  useEffect(() => {
    if (!isProperlyAligned && countdown !== null) {
      setCountdown(null);
    }
  }, [isProperlyAligned]);

  const handleRetake = () => {
    setPreview(null);
    setIsProperlyAligned(false);
    setCountdown(null);
  };

  const handleAccept = () => {
    if (preview) {
      fetch(preview)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `scan-${Date.now()}.jpg`, { type: "image/jpeg" });
          onCapture(file);
        });
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => (prev === "user" ? "environment" : "user"));
  };

  // Color variables: Red when improper, Green when proper
  const lineColor = isProperlyAligned ? "#10b981" : "#ef4444";
  const glowShadow = isProperlyAligned 
    ? "drop-shadow(0 0 8px rgba(16,185,129,0.8))" 
    : "drop-shadow(0 0 8px rgba(239,68,68,0.8))";

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      {/* Top Floating Controls: Preserved Full/Half Body Mode (Left) & Timer Selector (Right) */}
      {!preview && (
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between gap-2">
          {/* Half / Full Body Switch */}
          <div className="flex bg-black/75 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-lg">
            <button
              onClick={() => { setFramingMode("full"); setIsProperlyAligned(false); setCountdown(null); }}
              className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all flex items-center gap-1 ${
                framingMode === "full" ? "bg-[#8b5cf6] text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              <User className="w-3 h-3" /> Full Body
            </button>
            <button
              onClick={() => { setFramingMode("half"); setIsProperlyAligned(false); setCountdown(null); }}
              className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all flex items-center gap-1 ${
                framingMode === "half" ? "bg-[#8b5cf6] text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              <Scan className="w-3 h-3" /> Half Body
            </button>
          </div>

          {/* User Timer Selector (3s / 5s / 10s) - PRESERVED */}
          <div className="flex bg-black/75 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-lg">
            {[3, 5, 10].map((sec) => (
              <button
                key={sec}
                onClick={() => { setTimerDuration(sec); setCountdown(null); }}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all ${
                  timerDuration === sec ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-white"
                }`}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Camera Viewport */}
      {!preview ? (
        <div className="relative w-full aspect-[3/4] bg-black overflow-hidden">
          {/* Flash Effect on Snap */}
          {flash && <div className="absolute inset-0 z-40 bg-white animate-out fade-out duration-200" />}

          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-[#f5f0e8] space-y-3">
              <Camera className="w-10 h-10 text-gray-500" />
              <p className="text-sm text-gray-400 max-w-xs">{error}</p>
              <Button onClick={startCamera} variant="outline" className="border-white/20 text-white rounded-full text-xs">
                Retry Camera
              </Button>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}

          {/* Dynamic Status Banner (RED when not aligned, GREEN when aligned) */}
          {!error && (
            <div className="absolute top-16 left-3 right-3 z-20 flex justify-center">
              <div className={`px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-xl flex items-center gap-2 transition-all duration-300 ${
                isProperlyAligned 
                  ? "bg-emerald-950/85 border-emerald-500/60 text-emerald-200" 
                  : "bg-red-950/85 border-red-500/60 text-red-200 animate-pulse"
              }`}>
                {isProperlyAligned ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                )}
                <span>{alignmentMessage}</span>
              </div>
            </div>
          )}

          {/* Live Dynamic Color Silhouette Guide: RED when improper, GREEN when proper */}
          {!error && (
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
              {framingMode === "full" ? (
                /* FULL BODY OUTLINE */
                <svg 
                  className="w-full h-full p-4 transition-all duration-300" 
                  style={{ filter: glowShadow }}
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  {/* Head */}
                  <ellipse cx="50" cy="16" rx="9" ry="11" stroke={lineColor} strokeWidth="2" strokeDasharray="3,3" fill="none" />
                  {/* Torso & Shoulders */}
                  <path d="M 26 30 C 34 24, 42 25, 50 25 C 58 25, 66 24, 74 30 L 70 56 L 30 56 Z" stroke={lineColor} strokeWidth="2" strokeDasharray="3,3" fill="none" />
                  {/* Legs */}
                  <path d="M 32 56 L 28 92 M 68 56 L 72 92" stroke={lineColor} strokeWidth="2" strokeDasharray="3,3" fill="none" />
                  {/* Floor Level Baseline */}
                  <line x1="15" y1="94" x2="85" y2="94" stroke={lineColor} strokeWidth="1.5" strokeDasharray="2,2" />
                  <text x="50" y="98" fill={lineColor} fontSize="3" fontWeight="bold" textAnchor="middle">FEET LEVEL</text>
                </svg>
              ) : (
                /* HALF BODY OUTLINE */
                <svg 
                  className="w-full h-full p-6 transition-all duration-300" 
                  style={{ filter: glowShadow }}
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  {/* Head */}
                  <ellipse cx="50" cy="24" rx="14" ry="16" stroke={lineColor} strokeWidth="2" strokeDasharray="3,3" fill="none" />
                  {/* Shoulders & Chest */}
                  <path d="M 14 46 C 26 38, 38 40, 50 40 C 62 40, 74 38, 86 46 L 80 88 L 20 88 Z" stroke={lineColor} strokeWidth="2" strokeDasharray="3,3" fill="none" />
                  {/* Waistline Baseline */}
                  <line x1="20" y1="88" x2="80" y2="88" stroke={lineColor} strokeWidth="1.5" strokeDasharray="2,2" />
                  <text x="50" y="93" fill={lineColor} fontSize="3" fontWeight="bold" textAnchor="middle">WAISTLINE</text>
                </svg>
              )}

              {/* Viewport Corner Brackets matching RED/GREEN */}
              <div className="absolute inset-6 pointer-events-none">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 transition-colors duration-300" style={{ borderColor: lineColor }} />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 transition-colors duration-300" style={{ borderColor: lineColor }} />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 transition-colors duration-300" style={{ borderColor: lineColor }} />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 transition-colors duration-300" style={{ borderColor: lineColor }} />
              </div>
            </div>
          )}

          {/* Big Countdown Overlay When Alignment is GREEN */}
          {countdown !== null && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="w-28 h-28 rounded-full border-4 border-emerald-400 bg-black/80 flex items-center justify-center text-6xl font-bold text-emerald-300 shadow-[0_0_50px_rgba(16,185,129,0.8)] animate-pulse">
                {countdown}
              </div>
              <p className="text-emerald-200 text-xs font-semibold mt-4 tracking-widest uppercase bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-500/40">
                Perfect! Hold still • Snapping in {countdown}s
              </p>
            </div>
          )}

          {/* Clean Bottom Controls Bar (Start 5s button is removed) */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between px-8">
            {/* Flip Camera */}
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-black/70 border-white/20 text-white hover:bg-black/90 w-11 h-11 shadow-lg" 
              onClick={toggleCamera}
              title="Flip Camera"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>

            {/* Manual Shutter Button (Center) */}
            <button
              onClick={executeCapture}
              disabled={!!error}
              title="Take Photo Now"
              className="h-16 w-16 p-1 rounded-full border-4 border-white bg-white/20 flex items-center justify-center backdrop-blur-sm transition-transform active:scale-90 hover:scale-105 shadow-2xl disabled:opacity-50"
            >
              <div className="h-12 w-12 rounded-full bg-white transition-all shadow-inner" />
            </button>

            {/* Cancel Button (Right) */}
            {onCancel ? (
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full bg-black/70 border-white/20 text-white hover:bg-black/90 w-11 h-11 shadow-lg" 
                onClick={onCancel}
                title="Close Camera"
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <div className="w-11 h-11" />
            )}
          </div>
        </div>
      ) : (
        /* Captured Photo Confirmation View */
        <div className="relative w-full aspect-[3/4] bg-black">
          <img src={preview} alt="Captured Outfit" className="w-full h-full object-cover" />
          
          <div className="absolute top-4 left-4 right-4 z-20 flex justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 backdrop-blur-md flex items-center gap-1 shadow-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Photo Captured
            </span>
          </div>

          <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-4 px-6">
            <Button 
              variant="outline" 
              className="flex-1 rounded-full bg-black/70 border-white/20 text-white backdrop-blur hover:bg-black/90 py-5 font-medium" 
              onClick={handleRetake}
            >
              Retake Photo
            </Button>
            <Button 
              className="flex-1 rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-xl shadow-purple-900/40 py-5 font-semibold" 
              onClick={handleAccept}
            >
              Analyze Look
            </Button>
          </div>
        </div>
      )}

      {/* Hidden processing canvases */}
      <canvas ref={canvasRef} className="hidden" />
      <canvas ref={hiddenCanvasRef} className="hidden" />
    </div>
  );
}
