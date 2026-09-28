import React from "react"
import { CheckCircle, AlertTriangle, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnalysisSection {
  title: string
  points: string[]
  type: "positive" | "negative" | "suggestion"
}

export function AnalysisCard({ sections }: { sections: AnalysisSection[] }) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "positive":
        return {
          icon: <CheckCircle className="h-5 w-5 text-emerald-400" />,
          titleColor: "text-emerald-400",
          bgColor: "bg-emerald-950/20",
          borderColor: "border-emerald-900/30"
        }
      case "negative":
        return {
          icon: <AlertTriangle className="h-5 w-5 text-orange-400" />,
          titleColor: "text-orange-400",
          bgColor: "bg-orange-950/20",
          borderColor: "border-orange-900/30"
        }
      case "suggestion":
        return {
          icon: <ArrowUpRight className="h-5 w-5 text-[#8b5cf6]" />,
          titleColor: "text-[#8b5cf6]",
          bgColor: "bg-[#8b5cf6]/10",
          borderColor: "border-[#8b5cf6]/20"
        }
      default:
        return {
          icon: null,
          titleColor: "text-[#f5f0e8]",
          bgColor: "bg-[#252525]",
          borderColor: "border-white/5"
        }
    }
  }

  return (
    <div className="space-y-4">
      {sections.map((section, idx) => {
        const styles = getTypeStyles(section.type)
        
        return (
          <Card key={idx} className={cn("border bg-transparent shadow-none", styles.borderColor)}>
            <CardHeader className={cn("flex flex-row items-center gap-3 p-4 pb-2 rounded-t-lg", styles.bgColor)}>
              {styles.icon}
              <CardTitle className={cn("text-lg font-serif m-0 leading-none", styles.titleColor)}>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-4 bg-[#1e1e1e]/40 rounded-b-lg">
              <ul className="space-y-3">
                {section.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-sm text-[#e0e0e0]">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#555] shrink-0" />
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
