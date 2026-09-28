import React from "react"
import { Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function StyleInsight() {
  return (
    <Card className="bg-[#1e1e1e] border-white/5 overflow-hidden">
      <CardContent className="p-0 flex">
        <div className="w-2 bg-[#8b5cf6]" />
        <div className="p-5 flex gap-4">
          <div className="mt-0.5">
            <div className="p-2 bg-[#8b5cf6]/20 rounded-full text-[#8b5cf6]">
              <Lightbulb className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-[#f5f0e8] mb-1">Today's Insight</h4>
            <p className="text-sm text-[#a0a0a0] leading-relaxed">
              It's 22°C and sunny today. Based on your wardrobe, your navy linen blazer paired with the white crisp t-shirt will offer the perfect balance of comfort and smart-casual style.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
