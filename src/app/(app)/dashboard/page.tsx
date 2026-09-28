"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Shirt, MessageSquare, Sparkles, TrendingUp, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [looks, setLooks] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ total: 0, highestScore: null, averageScore: null });
  const [loading, setLoading] = useState(true);

  const greeting = new Date().getHours() < 12 
    ? 'Good morning' 
    : new Date().getHours() < 18 
      ? 'Good afternoon' 
      : 'Good evening';

  useEffect(() => {
    async function loadData() {
      try {
        const [userRes, looksRes] = await Promise.all([
          fetch('/api/auth/me').then(r => r.json()).catch(() => null),
          fetch('/api/looks').then(r => r.json()).catch(() => null)
        ]);

        if (userRes?.success && userRes.data) {
          setUser(userRes.data);
        }

        if (looksRes?.success && Array.isArray(looksRes.data?.looks) && looksRes.data.looks.length > 0) {
          setLooks(looksRes.data.looks.slice(0, 3));
          if (looksRes.data.stats) {
            setStats(looksRes.data.stats);
          } else {
            const scores = looksRes.data.looks.map((l: any) => l.score || 0);
            const highest = Math.max(...scores);
            const avg = scores.reduce((a: number, b: number) => a + b, 0) / scores.length;
            setStats({
              total: looksRes.data.looks.length,
              highestScore: highest.toFixed(1),
              averageScore: avg.toFixed(1)
            });
          }
        } else {
          // Real clean empty state: No dummy data
          setLooks([]);
          setStats({ total: 0, highestScore: null, averageScore: null });
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const displayName = user?.name ? user.name.split(' ')[0] : 'Member';

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 min-h-[85vh]">
      {/* Welcome Banner */}
      <header className="space-y-1">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-serif font-bold text-[#f5f0e8]"
        >
          {greeting}, {displayName}.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-sm flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4 text-[#8b5cf6]" />
          Your personal aesthetic profile is calibrated and active.
        </motion.p>
      </header>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            title: 'Scan Outfit', 
            icon: Camera, 
            href: '/scan', 
            bg: 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/30', 
            desc: '10-point AI evaluation' 
          },
          { 
            title: 'Add Garment', 
            icon: Shirt, 
            href: '/wardrobe', 
            bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', 
            desc: 'Build digital closet' 
          },
          { 
            title: 'Ask Stylist', 
            icon: MessageSquare, 
            href: '/stylist', 
            bg: 'bg-blue-500/10 text-blue-400 border-blue-500/20', 
            desc: 'Wardrobe-aware chat' 
          },
          { 
            title: 'Virtual Try-On', 
            icon: Sparkles, 
            href: '/try-on', 
            bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20', 
            desc: 'AI fitting preview' 
          }
        ].map((action, i) => (
          <Link key={i} href={action.href}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:border-white/20 transition-all shadow-md group h-full"
            >
              <div className={`p-3.5 rounded-2xl border ${action.bg} group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="font-semibold text-sm md:text-base text-[#f5f0e8] block">{action.title}</span>
                <span className="text-[11px] text-gray-500 block mt-0.5">{action.desc}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Main Grid: Recent Looks & Style Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Looks */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-[#f5f0e8]">Recent Scanned Looks</h2>
            <Link href="/looks" className="text-xs text-[#8b5cf6] hover:underline flex items-center gap-1">
              View Lookbook <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {looks.length === 0 ? (
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6]">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#f5f0e8]">No outfits scanned yet</h3>
                <p className="text-sm text-gray-400 max-w-sm mt-1">
                  Capture or upload an outfit with our AI Studio to see your styling breakdown and scores.
                </p>
              </div>
              <Link href="/scan">
                <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-full px-6">
                  Scan Your First Look
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {looks.map((look, i) => (
                <Link 
                  key={i} 
                  href="/looks"
                  className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#8b5cf6]/50 transition-all flex flex-col"
                >
                  <div className="aspect-[3/4] w-full bg-[#0d0d0d] overflow-hidden relative">
                    {look.imageUrl ? (
                      <img 
                        src={look.imageUrl} 
                        alt="Look" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">No Image</div>
                    )}
                    {/* Score badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#8b5cf6]/30 text-white font-bold text-xs flex items-center gap-1 shadow-lg">
                      <Star className="w-3 h-3 text-[#8b5cf6] fill-[#8b5cf6]" />
                      {Number(look.score || 0).toFixed(1)}
                    </div>
                  </div>
                  <div className="p-3.5 space-y-0.5">
                    <div className="text-sm font-medium text-[#f5f0e8] truncate">{look.styleLabel || 'Curated Look'}</div>
                    <div className="text-xs text-gray-400">{look.occasion || 'Everyday'}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Style Summary Card */}
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-[#f5f0e8]">Style Blueprint</h2>
          <Card className="bg-[#1a1a1a] border-white/10 text-white shadow-xl">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-gray-400">Primary Aesthetic</span>
                <div className="text-lg font-bold text-[#f5f0e8]">
                  {user?.stylePreferences?.preferredStyles?.[0] || 'Calibrating...'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Average Score</span>
                  <div className="text-3xl font-bold text-[#8b5cf6] mt-0.5">
                    {stats.averageScore ? stats.averageScore : '—'}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Highest Score</span>
                  <div className="text-3xl font-bold text-emerald-400 mt-0.5">
                    {stats.highestScore ? stats.highestScore : '—'}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider block">Recommended Palette</span>
                <div className="flex gap-2">
                  {['#1e293b', '#334155', '#f8fafc', '#f59e0b'].map((hex, i) => (
                    <div 
                      key={i} 
                      className="w-6 h-6 rounded-full border border-white/20 shadow-sm" 
                      style={{ backgroundColor: hex }} 
                    />
                  ))}
                </div>
              </div>

              <Link href="/my-style" className="block pt-2">
                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 rounded-full text-xs">
                  Fine-Tune Style Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
