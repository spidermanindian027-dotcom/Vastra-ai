"use client"

import React from "react"
import { Heart, MoreVertical, Edit2, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface WardrobeItemProps {
  item: {
    id: string
    imageUrl: string
    name: string
    category: string
    color: string
    isFavorite: boolean
  }
  onClick?: () => void
}

export function WardrobeItemCard({ item, onClick }: WardrobeItemProps) {
  return (
    <div 
      className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/5 cursor-pointer shadow-lg"
      onClick={onClick}
    >
      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      
      {/* Top Actions */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button 
          className="h-8 w-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-[#8b5cf6] transition-colors"
          onClick={(e) => { e.stopPropagation(); /* toggle favorite */ }}
        >
          <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-current text-red-500' : ''}`} />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-[#252525] transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit Details
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-400" onClick={(e) => e.stopPropagation()}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
      
      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 backdrop-blur text-[10px] text-white">
            {item.category}
          </Badge>
          <Badge variant="outline" className="border-white/20 text-[10px] text-white/80">
            {item.color}
          </Badge>
        </div>
        <h4 className="text-[#f5f0e8] font-medium text-sm line-clamp-1">{item.name}</h4>
      </div>
    </div>
  )
}
