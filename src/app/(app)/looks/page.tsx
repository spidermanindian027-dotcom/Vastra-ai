"use client";
import { Card, CardContent } from '@/components/ui/card';

export default function LooksPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Saved Looks</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i} className="bg-[#1a1a1a] border-white/5 overflow-hidden">
            <div className="aspect-[3/4] bg-gray-800 relative">
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-[#8b5cf6]">
                {90 - i}
              </div>
            </div>
            <CardContent className="p-4 text-white">
              <h3 className="font-medium text-sm">Minimalist Casual</h3>
              <p className="text-xs text-gray-400 mt-1">Oct {10 - i}, 2023</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
