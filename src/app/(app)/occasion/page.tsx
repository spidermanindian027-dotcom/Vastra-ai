"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OccasionPage() {
  const [occasion, setOccasion] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const getStyle = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/location/style', {
        method: 'POST',
        body: JSON.stringify({ occasion, location: 'Current' })
      });
      const data = await res.json();
      if(data.success) setRecommendation(data.data);
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 lg:p-12 max-w-5xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">Occasion Styling</h1>
        <p className="text-zinc-400 text-sm uppercase tracking-widest">Where are you going?</p>
      </header>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl mb-12">
        <input 
          type="text" 
          className="w-full bg-transparent border-b border-zinc-700 pb-4 text-2xl outline-none focus:border-zinc-300 transition-colors placeholder:text-zinc-700 mb-8"
          placeholder="e.g. Summer evening wedding..."
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        />

        <div className="flex flex-wrap gap-3 mb-8">
          {['Office Meeting', 'Casual Date', 'College', 'Night Out'].map(chip => (
            <button 
              key={chip}
              onClick={() => setOccasion(chip)} 
              className="px-4 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-500 rounded-full text-sm transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        <Button onClick={getStyle} disabled={!occasion || loading} className="w-full lg:w-auto bg-zinc-100 text-zinc-950 hover:bg-zinc-300 px-8 py-6 text-lg tracking-wide rounded-xl">
          {loading ? 'Analyzing Wardrobe...' : 'Get Recommendations'}
        </Button>
      </div>

      {recommendation && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-2xl font-light">Your Look</h2>
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
            <p className="text-lg text-zinc-300 leading-relaxed mb-8">
              {recommendation.explanation || "A refined, elevated approach tailored to your event."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Dummy items */}
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] bg-zinc-950 border border-zinc-800 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
