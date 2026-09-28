import React from "react"
import { Camera, Shirt, Sparkles, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export function QuickActions() {
  const actions = [
    {
      title: "Scan Outfit",
      icon: Camera,
      href: "/scan",
      color: "text-[#8b5cf6]",
      bg: "bg-[#8b5cf6]/10"
    },
    {
      title: "Ask Stylist",
      icon: MessageSquare,
      href: "/ai-stylist",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10"
    },
    {
      title: "Add Item",
      icon: Shirt,
      href: "/wardrobe?action=add",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      title: "Get Inspired",
      icon: Sparkles,
      href: "/looks",
      color: "text-amber-400",
      bg: "bg-amber-400/10"
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className="bg-[#1e1e1e]/60 hover:bg-[#252525] border-white/5 transition-all hover:scale-[1.02] cursor-pointer shadow-lg backdrop-blur-sm h-full">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3 h-full">
              <div className={`p-3 rounded-full ${action.bg}`}>
                <action.icon className={`h-6 w-6 ${action.color}`} />
              </div>
              <span className="text-sm font-medium text-[#f5f0e8]">{action.title}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
