"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Upload } from 'lucide-react';

export default function TryOnPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Virtual Try-On</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-[#1a1a1a] border-white/10 text-white min-h-[500px] flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-sm aspect-[3/4] border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-[#8b5cf6]/50 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-400">Select item from wardrobe or upload</p>
          </div>
          <Button className="w-full max-w-sm mt-6 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white">
            <Sparkles className="w-4 h-4 mr-2" /> Generate Try-On
          </Button>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-white/10 text-white min-h-[500px] flex items-center justify-center p-6">
          <p className="text-gray-500">Your generated result will appear here</p>
        </Card>
      </div>
    </div>
  );
}
