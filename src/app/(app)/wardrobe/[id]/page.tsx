"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function WardrobeItemPage() {
  const params = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/wardrobe/${params.id}`)
      .then(res => res.json())
      .then(data => { if (data.success) setItem(data.data); });
  }, [params.id]);

  const handleDelete = async () => {
    if(confirm('Delete this item?')) {
      await fetch(`/api/wardrobe/${params.id}`, { method: 'DELETE' });
      router.push('/wardrobe');
    }
  };

  if (!item) return <div className="min-h-screen bg-zinc-950 text-white p-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 lg:p-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 relative">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt="Item" className="w-full h-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-zinc-700">No Image</div>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-light mb-2">{item.category}</h1>
            <p className="text-zinc-500 uppercase tracking-widest text-sm">Wardrobe Item</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h3 className="text-sm font-medium tracking-wide mb-4">Metadata</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div><span className="text-zinc-500">Color:</span> {item.color}</div>
              <div><span className="text-zinc-500">Pattern:</span> {item.pattern}</div>
              <div><span className="text-zinc-500">Added:</span> {new Date(item.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h3 className="text-sm font-medium tracking-wide mb-4">AI Combinations</h3>
            <p className="text-zinc-400 text-sm">Pairs well with neutral tones and tailored fits.</p>
          </div>

          <div className="flex gap-4 pt-8">
            <Button variant="outline" className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800">Edit Details</Button>
            <Button variant="destructive" onClick={handleDelete} className="flex-1 bg-red-900/50 hover:bg-red-900 text-red-200">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
