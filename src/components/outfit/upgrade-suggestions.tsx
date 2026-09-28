import React from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Upgrade {
  id: string
  title: string
  description: string
  expectedImprovement: number
  imageUrl?: string
}

export function UpgradeSuggestions({ upgrades }: { upgrades: Upgrade[] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-[#8b5cf6]" />
        <h3 className="text-lg font-serif font-semibold text-[#f5f0e8]">Elevate This Look</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upgrades.map((upgrade, index) => (
          <Card key={upgrade.id} className="bg-[#1e1e1e] border-white/5 overflow-hidden flex flex-col relative group hover:border-[#8b5cf6]/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {upgrade.imageUrl && (
              <div className="w-full h-40 bg-[#1a1a1a] overflow-hidden">
                <img src={upgrade.imageUrl} alt={upgrade.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500" />
              </div>
            )}
            
            <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-[#252525] text-[#a0a0a0] border-transparent font-mono text-xs">
                  0{index + 1}
                </Badge>
                <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10 text-xs">
                  +{upgrade.expectedImprovement} points
                </Badge>
              </div>
              
              <h4 className="font-medium text-[#f5f0e8] mb-2">{upgrade.title}</h4>
              <p className="text-sm text-[#a0a0a0] flex-1 leading-relaxed">{upgrade.description}</p>
              
              <button className="mt-4 flex items-center text-xs font-medium text-[#8b5cf6] hover:text-white transition-colors">
                Apply in Virtual Try-On <ArrowRight className="ml-1 h-3 w-3" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
