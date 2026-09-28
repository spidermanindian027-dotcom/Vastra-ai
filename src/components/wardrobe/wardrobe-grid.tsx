"use client"

import React, { useState } from "react"
import { Search, Filter, Heart, Plus, Trash2, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface WardrobeItem {
  id: string
  imageUrl: string
  name: string
  category: string
  isFavorite: boolean
}

export function WardrobeGrid() {
  const [activeCategory, setActiveCategory] = useState("All")
  
  const categories = ["All", "Tops", "Bottoms", "Footwear", "Outerwear", "Accessories"]
  
  // Dummy data
  const items: WardrobeItem[] = [
    { id: "1", imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80", name: "Classic Silk Blouse", category: "Tops", isFavorite: true },
    { id: "2", imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80", name: "High-Waist Trousers", category: "Bottoms", isFavorite: false },
    { id: "3", imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80", name: "Leather Loafers", category: "Footwear", isFavorite: true },
    { id: "4", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80", name: "Wool Overcoat", category: "Outerwear", isFavorite: false },
  ]

  const filteredItems = activeCategory === "All" 
    ? items 
    : items.filter(item => item.category === activeCategory)

  return (
    <div className="space-y-6 w-full">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#a0a0a0]" />
          <Input placeholder="Search your wardrobe..." className="pl-9 bg-[#1a1a1a]" />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="rounded-full shrink-0"
            >
              {cat}
            </Button>
          ))}
          <Button variant="outline" size="icon" className="shrink-0 rounded-full">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {/* Add New Card */}
        <div className="aspect-[3/4] rounded-xl border-2 border-dashed border-white/20 bg-[#1a1a1a]/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#252525] transition-colors group">
          <div className="h-12 w-12 rounded-full bg-[#252525] flex items-center justify-center group-hover:bg-[#8b5cf6] transition-colors">
            <Plus className="h-6 w-6 text-[#f5f0e8]" />
          </div>
          <span className="text-sm font-medium text-[#a0a0a0] group-hover:text-white">Add Item</span>
        </div>

        {/* Item Cards */}
        {filteredItems.map(item => (
          <div key={item.id} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#1e1e1e] border border-white/5 cursor-pointer">
            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button className="h-8 w-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-[#8b5cf6] transition-colors">
                  <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="h-8 w-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-red-500 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Badge variant="secondary" className="mb-2 bg-white/20 hover:bg-white/30 backdrop-blur text-xs">
                  {item.category}
                </Badge>
                <h4 className="text-[#f5f0e8] font-medium text-sm line-clamp-1">{item.name}</h4>
              </div>
            </div>
            
            {/* Always visible category badge if not hovering */}
            <div className="absolute bottom-3 left-3 group-hover:hidden">
              <Badge variant="secondary" className="bg-black/60 backdrop-blur text-[10px]">
                {item.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
