"use client";

import { useEffect, useState } from "react";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/analytics').then(res => res.json()).then(res => {
      if(res.success) setData(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-3xl font-light mb-8">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl aspect-video flex flex-col items-center justify-center text-zinc-500">
          Chart: Users Over Time
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl aspect-video flex flex-col items-center justify-center text-zinc-500">
          Chart: Scans Per Day
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl aspect-video flex flex-col items-center justify-center text-zinc-500">
          Chart: Popular Styles
        </div>
      </div>
    </div>
  );
}
