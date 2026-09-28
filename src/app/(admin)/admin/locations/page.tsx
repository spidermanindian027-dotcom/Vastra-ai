"use client";

import { useEffect, useState } from "react";

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/locations').then(res => res.json()).then(res => {
      if(res.success) setLocations(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 flex flex-col">
      <h1 className="text-3xl font-light mb-8">Location Aggregation</h1>
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center min-h-[60vh] text-zinc-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-500 via-zinc-900 to-zinc-950"></div>
        <div className="z-10 text-center">
          <p className="mb-2">Interactive Map Visualization</p>
          <p className="text-sm font-mono">{locations.length} Location Data Points</p>
        </div>
      </div>
    </div>
  );
}
