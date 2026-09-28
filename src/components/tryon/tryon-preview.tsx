"use client"

import React, { useState, useEffect } from "react"
import { Download, RefreshCw, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TryonPreviewProps {
  originalImage: string
  garmentImage?: string
  status?: "pending" | "processing" | "completed" | "failed"
}

export function TryonPreview({ originalImage, garmentImage, status = "completed" }: TryonPreviewProps) {
  const [currentStatus, setCurrentStatus] = useState(status)
  const [resultImage, setResultImage] = useState<string | null>(null)

  // Simulate process if pending
  useEffect(() => {
    if (currentStatus === "processing") {
      const timer = setTimeout(() => {
        setCurrentStatus("completed")
        setResultImage(originalImage) // In reality, this would be the newly generated image
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [currentStatus])

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Main Comparison Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        
        {/* Original */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[#a0a0a0] px-1 uppercase tracking-wider">Original Model</h3>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/10 relative">
            <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
            {garmentImage && (
              <div className="absolute bottom-4 right-4 h-24 w-20 rounded-lg border-2 border-white/20 overflow-hidden shadow-2xl bg-black">
                <img src={garmentImage} alt="Garment" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                  <span className="text-[10px] font-medium text-white">Item</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[#8b5cf6] px-1 uppercase tracking-wider flex items-center gap-2">
            AI Try-On Result
            {currentStatus === "completed" && <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
          </h3>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#1a1a1a] border border-[#8b5cf6]/30 relative shadow-[0_0_30px_rgba(139,92,246,0.1)] group">
            
            {currentStatus === "completed" ? (
              <>
                <img src={resultImage || originalImage} alt="Result" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                  <Button variant="secondary" className="rounded-full bg-white text-black hover:bg-gray-200">
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </div>
              </>
            ) : currentStatus === "processing" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1e1e]">
                <div className="relative h-16 w-16 mb-6">
                  <div className="absolute inset-0 rounded-full border-t-2 border-[#8b5cf6] animate-spin" />
                  <div className="absolute inset-2 rounded-full border-r-2 border-emerald-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  <Wand2 className="absolute inset-0 m-auto h-6 w-6 text-[#f5f0e8] animate-pulse" />
                </div>
                <h4 className="text-lg font-serif text-[#f5f0e8]">Styling in progress...</h4>
                <p className="text-sm text-[#a0a0a0] mt-2">Perfecting the fit and lighting</p>
                
                <div className="w-48 h-1 bg-[#252525] rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] animate-[shimmer_2s_infinite]" style={{ width: '60%' }} />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
                <Button onClick={() => setCurrentStatus("processing")} className="bg-[#8b5cf6] hover:bg-[#7c3aed]">
                  <Wand2 className="mr-2 h-4 w-4" /> Generate Try-On
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
