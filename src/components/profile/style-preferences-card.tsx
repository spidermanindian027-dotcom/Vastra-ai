import React from "react"
import { Edit2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function StylePreferencesCard() {
  return (
    <Card className="bg-[#1e1e1e] border-white/5 relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-serif text-[#f5f0e8]">Style Preferences</CardTitle>
        <button className="text-[#a0a0a0] hover:text-[#f5f0e8] transition-colors p-1">
          <Edit2 className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-3">Preferred Aesthetics</p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#8b5cf6] hover:bg-[#8b5cf6] text-white border-transparent">Minimalist</Badge>
            <Badge className="bg-[#8b5cf6] hover:bg-[#8b5cf6] text-white border-transparent">Smart Casual</Badge>
            <Badge variant="secondary" className="bg-[#252525]">Streetwear</Badge>
            <Badge variant="secondary" className="bg-[#252525]">Classic</Badge>
          </div>
        </div>

        <div>
          <p className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-3">Preferred Fit</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-white/20 text-[#f5f0e8]">Tailored Top</Badge>
            <Badge variant="outline" className="border-white/20 text-[#f5f0e8]">Relaxed Bottoms</Badge>
          </div>
        </div>
        
        <div>
          <p className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-3">Favourite Brands</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-[#f5f0e8] bg-[#1a1a1a] px-3 py-1 rounded-md border border-white/5">Acne Studios</span>
            <span className="text-sm text-[#f5f0e8] bg-[#1a1a1a] px-3 py-1 rounded-md border border-white/5">A.P.C.</span>
            <span className="text-sm text-[#f5f0e8] bg-[#1a1a1a] px-3 py-1 rounded-md border border-white/5">COS</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
