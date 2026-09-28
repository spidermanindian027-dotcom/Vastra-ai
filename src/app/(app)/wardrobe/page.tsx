"use client";

import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, Heart, Trash2, Tag, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AddItemDialog } from '@/components/wardrobe/add-item-dialog';

const DEMO_ITEMS = [
  {
    id: 'w1',
    name: 'Oversized Ecru Heavyweight Tee',
    category: 't_shirt',
    dominantColour: 'Off-White',
    style: 'Street Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    isFavourite: true
  },
  {
    id: 'w2',
    name: 'Tailored Wide-Leg Charcoal Trousers',
    category: 'trousers',
    dominantColour: 'Charcoal Grey',
    style: 'Luxury Tailoring',
    imageUrl: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=600&q=80',
    isFavourite: true
  },
  {
    id: 'w3',
    name: 'Structured Midnight Navy Overshirt',
    category: 'shirt',
    dominantColour: 'Navy Blue',
    style: 'Smart Casual',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
    isFavourite: false
  },
  {
    id: 'w4',
    name: 'Minimal White Calfskin Sneakers',
    category: 'shoes',
    dominantColour: 'White',
    style: 'Minimal',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    isFavourite: true
  },
  {
    id: 'w5',
    name: 'Brushed Silver Link Chronograph',
    category: 'watch',
    dominantColour: 'Silver',
    style: 'Contemporary',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
    isFavourite: false
  },
  {
    id: 'w6',
    name: 'Matte Black Acetate Sunglasses',
    category: 'sunglasses',
    dominantColour: 'Black',
    style: 'Streetwear',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    isFavourite: false
  },
  {
    id: 'w7',
    name: 'Heavyweight Boxy Charcoal Hoodie',
    category: 'hoodie',
    dominantColour: 'Charcoal',
    style: 'Streetwear',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    isFavourite: false
  },
  {
    id: 'w8',
    name: 'Straight Selvedge Dark Indigo Jeans',
    category: 'jeans',
    dominantColour: 'Indigo',
    style: 'Classic',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80',
    isFavourite: true
  }
];

export default function WardrobePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories'];

  const fetchItems = async () => {
    try {
      const res = await fetch('/api/wardrobe');
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setItems(data.data);
      } else {
        setItems(DEMO_ITEMS);
      }
    } catch {
      setItems(DEMO_ITEMS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleToggleFavourite = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setItems(prev => prev.map(item => item.id === id ? { ...item, isFavourite: !item.isFavourite } : item));
    try {
      await fetch(`/api/wardrobe/${id}/favourite`, { method: 'PUT' });
    } catch {
      // Optimistic update retained
    }
  };

  const handleDeleteItem = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Delete this item from your wardrobe?')) {
      setItems(prev => prev.filter(item => item.id !== id));
      try {
        await fetch(`/api/wardrobe/${id}`, { method: 'DELETE' });
      } catch {
        // Optimistic update retained
      }
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = !search || 
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.dominantColour?.toLowerCase().includes(search.toLowerCase()) ||
        item.style?.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (activeTab === 'All') return true;
      if (activeTab === 'Tops') return ['shirt', 't_shirt', 'top', 'hoodie', 'sweater'].includes(item.category);
      if (activeTab === 'Bottoms') return ['pants', 'jeans', 'trousers', 'shorts'].includes(item.category);
      if (activeTab === 'Outerwear') return ['jacket', 'overshirt'].includes(item.category);
      if (activeTab === 'Shoes') return ['shoes', 'boots'].includes(item.category);
      if (activeTab === 'Accessories') return ['watch', 'sunglasses', 'cap', 'bag', 'jewellery', 'other_accessory'].includes(item.category);
      return true;
    });
  }, [items, activeTab, search]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 min-h-[85vh]">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#f5f0e8]">Digital Wardrobe</h1>
          <p className="text-sm text-gray-400">
            {items.length} garments catalogued and ready for AI styling.
          </p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-full px-6 shadow-lg shadow-purple-900/30"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Garment
        </Button>
      </div>

      {/* Search & Categories */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search garments, colours, aesthetics..." 
            className="w-full bg-[#1a1a1a] border-white/10 pl-10 focus-visible:ring-[#8b5cf6] text-white"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 rounded-full whitespace-nowrap text-xs font-medium transition-all ${
              activeTab === cat 
                ? 'bg-white text-black font-semibold shadow-md' 
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Wardrobe Items Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 pt-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="aspect-[3/4] bg-[#1a1a1a] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <p className="text-gray-400 text-sm">No garments found in this category.</p>
          <Button onClick={() => setDialogOpen(true)} variant="outline" className="border-white/10 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Your First Item
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-2">
          {filteredItems.map(item => (
            <Link 
              key={item.id} 
              href={`/wardrobe/${item.id}`}
              className="group flex flex-col bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#8b5cf6]/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative aspect-[3/4] w-full bg-[#0d0d0d] overflow-hidden">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">No Image</div>
                )}
                
                {/* Action icons */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={(e) => handleToggleFavourite(e, item.id)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-rose-400 transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${item.isFavourite ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => handleDeleteItem(e, item.id)}
                    className="p-2 rounded-full bg-black/60 backdrop-blur-md text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {item.style && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-gray-300 border border-white/10">
                    {item.style}
                  </div>
                )}
              </div>

              <div className="p-4 space-y-1">
                <h4 className="font-medium text-sm text-[#f5f0e8] truncate group-hover:text-[#8b5cf6] transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="capitalize">{item.category?.replace('_', ' ')}</span>
                  <span>•</span>
                  <span>{item.dominantColour}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Add Item Dialog */}
      <AddItemDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onItemAdded={(newItem) => {
          setItems(prev => [newItem, ...prev]);
        }}
      />
    </div>
  );
}
