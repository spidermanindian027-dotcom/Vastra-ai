"use client"

import React, { useEffect, useState } from "react"
import { CheckCircle2, ShieldCheck, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ScoreDisplayProps {
  score: number
  style: string
  confidence: number
  breakdown: {
    color: number
    fit: number
    coordination: number
    occasion: number
    accessories: number
    style: number
  }
}

export function ScoreDisplay({ score, style, confidence, breakdown }: ScoreDisplayProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 300)
    return () => clearTimeout(timer)
  }, [score])

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (animatedScore / 10) * circumference

  return (
    <Card className="overflow-hidden border-white/5 bg-[#1a1a1a]">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Main Score Circular Progress */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-[#252525]"
              />
              <circle
                cx="80"
                cy="80"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-[#8b5cf6] transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-serif font-bold text-[#f5f0e8]">{animatedScore.toFixed(1)}</span>
              <span className="text-xs text-[#a0a0a0]">/ 10</span>
            </div>
          </div>

          <div className="w-full space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-serif font-semibold text-[#f5f0e8] mb-1">Style Analysis</h3>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-[#8b5cf6] border-[#8b5cf6]/30 bg-[#8b5cf6]/10">
                    <Star className="w-3 h-3 mr-1" />
                    {style}
                  </Badge>
                  <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    {confidence}% Confidence
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(breakdown).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#a0a0a0] capitalize">{key}</span>
                    <span className="text-[#f5f0e8] font-medium">{val.toFixed(1)}</span>
                  </div>
                  <Progress value={val * 10} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
