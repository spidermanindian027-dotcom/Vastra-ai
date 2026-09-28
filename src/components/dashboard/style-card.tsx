import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function StyleCard() {
  return (
    <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border-white/10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b5cf6]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-serif text-xl text-[#f5f0e8]">Your Style Profile</h3>
            <p className="text-sm text-[#a0a0a0] mt-1">Refined Minimalist</p>
          </div>
          <Badge className="bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]/30">Level 4</Badge>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-[#a0a0a0] mb-1">
              <span>Profile Completeness</span>
              <span>85%</span>
            </div>
            <div className="w-full h-1.5 bg-[#252525] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] w-[85%]" />
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap pt-2">
            <span className="text-xs px-2 py-1 rounded bg-[#252525] text-[#a0a0a0]">Deep Winter</span>
            <span className="text-xs px-2 py-1 rounded bg-[#252525] text-[#a0a0a0]">Athletic Build</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
