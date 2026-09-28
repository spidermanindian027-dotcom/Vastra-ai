"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

export function LocationMap() {
  // A simple SVG map visualization for demo purposes
  // In a real app, this would integrate with Google Maps or Mapbox
  
  return (
    <Card className="bg-[#1a1a1a] border-white/10 overflow-hidden">
      <CardContent className="p-0 relative h-[400px]">
        {/* Placeholder Map Background */}
        <div className="absolute inset-0 bg-[#0d0d0d] opacity-50" style={{
          backgroundImage: `radial-gradient(circle at center, #252525 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
        
        {/* Mock Data Points */}
        <div className="absolute inset-0">
          <div className="absolute top-[30%] left-[20%] group cursor-pointer">
             <div className="h-4 w-4 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
             <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1e1e1e] p-3 rounded-lg border border-white/10 shadow-xl z-10">
               <h4 className="text-sm font-semibold text-[#f5f0e8] flex items-center gap-1"><MapPin className="h-3 w-3" /> Los Angeles</h4>
               <p className="text-xs text-[#a0a0a0] mt-1">Users: 1,240</p>
               <p className="text-xs text-[#a0a0a0]">Scans: 4,500</p>
             </div>
          </div>
          
          <div className="absolute top-[20%] left-[80%] group cursor-pointer">
             <div className="h-5 w-5 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
             <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1e1e1e] p-3 rounded-lg border border-white/10 shadow-xl z-10">
               <h4 className="text-sm font-semibold text-[#f5f0e8] flex items-center gap-1"><MapPin className="h-3 w-3" /> London</h4>
               <p className="text-xs text-[#a0a0a0] mt-1">Users: 5,100</p>
               <p className="text-xs text-[#a0a0a0]">Scans: 22,000</p>
             </div>
          </div>
          
          <div className="absolute top-[40%] left-[60%] group cursor-pointer">
             <div className="h-4 w-4 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
             <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#1e1e1e] p-3 rounded-lg border border-white/10 shadow-xl z-10">
               <h4 className="text-sm font-semibold text-[#f5f0e8] flex items-center gap-1"><MapPin className="h-3 w-3" /> Paris</h4>
               <p className="text-xs text-[#a0a0a0] mt-1">Users: 3,200</p>
               <p className="text-xs text-[#a0a0a0]">Scans: 12,000</p>
             </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-[#1e1e1e]/80 backdrop-blur p-3 rounded-lg border border-white/10">
          <h4 className="text-xs font-semibold text-[#f5f0e8] mb-2">Usage Density</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span className="text-xs text-[#a0a0a0]">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-xs text-[#a0a0a0]">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-[#a0a0a0]">Low</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
