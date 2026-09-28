import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function RecentLooks() {
  const looks = [
    { id: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", score: 9.2 },
    { id: 2, image: "https://images.unsplash.com/photo-1434389678369-182cb14f1773?w=500&q=80", score: 8.5 },
    { id: 3, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80", score: 8.8 },
  ]

  return (
    <Card className="bg-[#1e1e1e] border-white/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-serif text-[#f5f0e8]">Recent Looks</CardTitle>
        <Link href="/looks" className="text-sm text-[#8b5cf6] hover:text-white flex items-center transition-colors">
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {looks.map((look) => (
            <div key={look.id} className="relative shrink-0 w-32 aspect-[3/4] rounded-lg overflow-hidden group cursor-pointer border border-white/10">
              <img src={look.image} alt={`Look ${look.id}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                <div className="px-2 py-1 bg-black/50 backdrop-blur rounded text-xs font-semibold text-emerald-400 border border-white/10">
                  {look.score}
                </div>
              </div>
            </div>
          ))}
          
          <div className="shrink-0 w-32 aspect-[3/4] rounded-lg border-2 border-dashed border-white/10 bg-[#1a1a1a] flex flex-col items-center justify-center cursor-pointer hover:bg-[#252525] transition-colors">
            <span className="text-[#a0a0a0] text-sm font-medium">+ New</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
