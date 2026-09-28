"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shirt, Scissors, Palette, Layers, CheckCircle2 } from "lucide-react";

const GARMENTS = [
  {
    name: "Tailored Blazer",
    type: "Formal & Luxury",
    color: "#8b5cf6",
    path: "M 20 20 L 35 15 L 50 25 L 65 15 L 80 20 L 76 85 L 50 82 L 24 85 Z M 35 15 L 50 50 L 65 15 M 50 50 L 50 82"
  },
  {
    name: "Urban Hoodie",
    type: "Streetwear & Casual",
    color: "#6366f1",
    path: "M 24 22 C 34 16, 42 16, 50 18 C 58 16, 66 16, 76 22 L 82 82 L 18 82 Z M 38 18 C 42 10, 58 10, 62 18 M 35 55 L 65 55 L 65 72 L 35 72 Z"
  },
  {
    name: "Designer Shirt",
    type: "Smart Casual",
    color: "#ec4899",
    path: "M 25 18 L 38 14 L 50 20 L 62 14 L 75 18 L 72 82 L 28 82 Z M 38 14 L 50 32 L 62 14 M 50 32 L 50 82 M 48 42 L 52 42 M 48 54 L 52 54 M 48 66 L 52 66"
  },
  {
    name: "Minimalist Jacket",
    type: "Contemporary Outerwear",
    color: "#10b981",
    path: "M 18 20 L 34 14 L 50 22 L 66 14 L 82 20 L 78 86 L 22 86 Z M 50 22 L 50 86 M 30 40 L 42 40 M 58 40 L 70 40"
  },
  {
    name: "Classic Overcoat",
    type: "Editorial Luxury",
    color: "#f59e0b",
    path: "M 22 16 L 36 12 L 50 20 L 64 12 L 78 16 L 74 92 L 26 92 Z M 36 12 L 50 45 L 64 12 M 50 45 L 50 92 M 32 30 L 46 45 M 68 30 L 54 45"
  }
];

const SCAN_STEPS = [
  { text: "Mapping Silhouette & Body Fit Proportions", icon: Layers },
  { text: "Detecting Fabric Texture & Pattern Harmony", icon: Scissors },
  { text: "Calculating Color Undertone Compatibility", icon: Palette },
  { text: "Synthesizing VASTRA Styling & Upgrade Matrix", icon: Sparkles }
];

export function VastraMorphLoader() {
  const [garmentIndex, setGarmentIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Cycle garments every 1.4s
    const garmentInterval = setInterval(() => {
      setGarmentIndex((prev) => (prev + 1) % GARMENTS.length);
    }, 1400);

    // Step cycle
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % SCAN_STEPS.length);
    }, 2200);

    // Progress ramp
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) return 94;
        return prev + Math.floor(Math.random() * 8 + 3);
      });
    }, 300);

    return () => {
      clearInterval(garmentInterval);
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const activeGarment = GARMENTS[garmentIndex];
  const activeStep = SCAN_STEPS[stepIndex];
  const StepIcon = activeStep.icon;

  return (
    <div className="flex flex-col items-center justify-center min-h-[480px] p-6 max-w-lg mx-auto text-center">
      {/* Studio Header Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-[#8b5cf6] text-xs font-semibold uppercase tracking-wider mb-8 animate-pulse">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Vastra AI Fashion Studio • Metamorphosis</span>
      </div>

      {/* Main Clothes-Morphing Chamber */}
      <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
        {/* Glowing Background Rings */}
        <div 
          className="absolute inset-0 rounded-full blur-2xl opacity-25 transition-colors duration-700" 
          style={{ backgroundColor: activeGarment.color }}
        />
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-4 rounded-full border border-white/5 border-dashed animate-spin" style={{ animationDuration: "20s" }} />

        {/* Laser Scanner Beam (Sweeping vertically across the clothes) */}
        <motion.div
          animate={{ y: [-90, 90, -90] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-6 right-6 h-[2px] z-30 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${activeGarment.color}, #ffffff, ${activeGarment.color}, transparent)`,
            boxShadow: `0 0 16px ${activeGarment.color}, 0 0 32px ${activeGarment.color}`
          }}
        />

        {/* Animated Clothes Silhouette Metamorphosis */}
        <AnimatePresence mode="wait">
          <motion.div
            key={garmentIndex}
            initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotateY: 15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative z-10 w-44 h-44 flex flex-col items-center justify-center"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]"
            >
              {/* Outer Glow Path */}
              <path
                d={activeGarment.path}
                fill="none"
                stroke={activeGarment.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500"
              />
              {/* Garment Mesh Lines */}
              <line x1="30" y1="30" x2="70" y2="30" stroke={activeGarment.color} strokeWidth="0.75" strokeDasharray="2,2" opacity="0.6" />
              <line x1="28" y1="50" x2="72" y2="50" stroke={activeGarment.color} strokeWidth="0.75" strokeDasharray="2,2" opacity="0.6" />
              <line x1="26" y1="70" x2="74" y2="70" stroke={activeGarment.color} strokeWidth="0.75" strokeDasharray="2,2" opacity="0.6" />
            </svg>
          </motion.div>
        </AnimatePresence>

        {/* Floating Garment Tag */}
        <div className="absolute -bottom-3 z-20">
          <div className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#1e1e1e] border border-white/20 text-[#f5f0e8] shadow-lg flex items-center gap-1.5">
            <Shirt className="w-3 h-3 text-[#8b5cf6]" />
            <span>{activeGarment.name}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400 text-[10px]">{activeGarment.type}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Telemetry & Progress */}
      <div className="w-full max-w-md space-y-4">
        {/* Dynamic Analysis Step */}
        <div className="flex items-center justify-center gap-2 text-sm text-[#f5f0e8] font-medium h-6">
          <StepIcon className="w-4 h-4 text-[#8b5cf6] animate-pulse" />
          <motion.span
            key={stepIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {activeStep.text}
          </motion.span>
        </div>

        {/* High-Tech Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-[#1e1e1e] h-2 rounded-full overflow-hidden border border-white/10 p-0.5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#6366f1] to-emerald-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-gray-500 font-mono">
            <span>CALIBRATING VASTRA FIT</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
