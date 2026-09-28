import React from "react"
import { ShieldCheck, Edit2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BodyProfileCard() {
  return (
    <Card className="bg-[#1e1e1e] border-white/5 relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-serif text-[#f5f0e8]">Fashion Fit Profile</CardTitle>
        <button className="text-[#a0a0a0] hover:text-[#f5f0e8] transition-colors p-1">
          <Edit2 className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            <ShieldCheck className="w-3 h-3 mr-1" />
            92% Confidence
          </Badge>
          <span className="text-xs text-[#a0a0a0]">Last scanned: 2 days ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-1">Body Shape</p>
              <h4 className="text-lg font-medium text-[#f5f0e8]">Inverted Triangle</h4>
              <p className="text-sm text-[#a0a0a0] mt-1">Broader shoulders with narrower waist and hips.</p>
            </div>
            <div>
              <p className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-1">Visual Build</p>
              <h4 className="text-lg font-medium text-[#f5f0e8]">Athletic</h4>
            </div>
            <div>
              <p className="text-xs text-[#a0a0a0] uppercase tracking-wider mb-2">Proportions</p>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-[#252525]">Long Torso</Badge>
                <Badge variant="secondary" className="bg-[#252525]">Average Legs</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
            <div>
              <h5 className="text-sm font-medium text-emerald-400 mb-2">Best Silhouettes</h5>
              <ul className="text-sm text-[#a0a0a0] space-y-1">
                <li>• V-Neck Tops</li>
                <li>• Straight Leg Trousers</li>
                <li>• A-Line Coats</li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium text-orange-400 mb-2">To Avoid</h5>
              <ul className="text-sm text-[#a0a0a0] space-y-1">
                <li>• Shoulder Pads</li>
                <li>• Boat Necklines</li>
                <li>• Skinny Jeans</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
