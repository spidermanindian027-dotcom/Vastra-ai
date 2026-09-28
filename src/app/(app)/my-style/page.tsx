"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function MyStylePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => {
      if (data.success) setProfile(data.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-light tracking-tight mb-2">My Style Profile</h1>
        <p className="text-zinc-400 tracking-wide text-sm uppercase">Curated by Vestra AI</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group">
            <div className="aspect-square bg-zinc-950 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
              {profile?.profile?.primaryPhotoUrl ? (
                <img src={profile.profile.primaryPhotoUrl} className="object-cover w-full h-full" alt="Profile" />
              ) : (
                <span className="text-zinc-600 text-sm tracking-widest uppercase">No Photo</span>
              )}
            </div>
            <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
              Update Photo
            </Button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium tracking-wide">Body Profile</h2>
              <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">High Confidence</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-500 text-sm mb-1 uppercase tracking-wider">Shape</p>
                <p className="text-lg">{profile?.bodyProfile?.shape || 'Not analyzed'}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm mb-1 uppercase tracking-wider">Fit Preference</p>
                <p className="text-lg">Tailored</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
            <h2 className="text-xl font-medium tracking-wide mb-6">Colour Profile</h2>
            <div className="mb-6">
              <p className="text-zinc-500 text-sm mb-1 uppercase tracking-wider">Season</p>
              <p className="text-lg">{profile?.colourProfile?.season || 'Deep Winter'}</p>
            </div>
            <div className="flex gap-4">
              {['#0f172a', '#b91c1c', '#047857'].map((hex, i) => (
                <div key={i} className="h-12 w-12 rounded-full shadow-inner" style={{ backgroundColor: hex }}></div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium tracking-wide">Style Preferences</h2>
              <Button variant="ghost" className="text-zinc-400 hover:text-white">Edit</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Minimalist', 'Monochrome', 'Techwear'].map((style, i) => (
                <span key={i} className="px-3 py-1 bg-zinc-950 border border-zinc-800 rounded-full text-sm text-zinc-300">
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
