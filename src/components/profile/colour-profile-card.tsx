import React from "react"
import { Palette, Edit2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ColourProfileCard() {
  return (
    <Card className="bg-[#1e1e1e] border-white/5 relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-serif text-[#f5f0e8]">Colour Profile</CardTitle>
        <button className="text-[#a0a0a0] hover:text-[#f5f0e8] transition-colors p-1">
          <Edit2 className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-1">Season & Undertone</p>
            <h4 className="text-lg font-medium text-[#f5f0e8]">Deep Winter • Cool</h4>
          </div>
          <Palette className="h-8 w-8 text-[#8b5cf6] opacity-50" />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-[#f5f0e8] mb-3">Your Best Colours</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { name: "Navy", hex: "#000080" },
                { name: "Emerald", hex: "#50C878" },
                { name: "Burgundy", hex: "#800020" },
                { name: "Charcoal", hex: "#36454F" },
                { name: "Icy Blue", hex: "#A5F2F3" }
              ].map(color => (
                <div key={color.name} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full shadow-lg border border-white/10" style={{ backgroundColor: color.hex }} />
                  <span className="text-[10px] text-[#a0a0a0]">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-orange-400 mb-3">Colours to Avoid</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { name: "Mustard", hex: "#FFDB58" },
                { name: "Warm Brown", hex: "#964B00" },
                { name: "Peach", hex: "#FFE5B4" }
              ].map(color => (
                <div key={color.name} className="flex flex-col items-center gap-1.5 opacity-60">
                  <div className="w-8 h-8 rounded-full shadow-lg border border-white/10 relative overflow-hidden" style={{ backgroundColor: color.hex }}>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[1px] bg-red-500/50 rotate-45" />
                     </div>
                  </div>
                  <span className="text-[10px] text-[#a0a0a0]">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
