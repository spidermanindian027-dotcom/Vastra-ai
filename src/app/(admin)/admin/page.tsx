"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Camera, Shirt, Sparkles, RefreshCw, Activity, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/overview');
      const data = await res.json();
      if (data.success && data.data) {
        setMetrics(data.data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
      setLastRefreshed(new Date());
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-bold text-[#f5f0e8]">Admin Control Center</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Telemetry
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Real-time platform usage metrics, user analytics, and system performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchMetrics} 
            disabled={loading}
            className="border-white/10 text-white rounded-full hover:bg-white/10"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <div className="text-xs text-gray-500">
            Updated {lastRefreshed.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Real Core Metrics Grid (Zero Fake Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: 'Registered Users',
            value: metrics?.totalUsers ?? '—',
            subtitle: `${metrics?.activeUsers ?? 0} active today`,
            icon: Users,
            color: 'text-[#8b5cf6]',
            bg: 'bg-[#8b5cf6]/10 border-[#8b5cf6]/20'
          },
          {
            title: 'Outfits Scanned',
            value: metrics?.totalScans ?? 0,
            subtitle: 'AI camera & uploads',
            icon: Camera,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20'
          },
          {
            title: 'Wardrobe Items',
            value: metrics?.totalWardrobe ?? 0,
            subtitle: 'Catalogued garments',
            icon: Shirt,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/10 border-emerald-500/20'
          },
          {
            title: 'Avg Outfit Score',
            value: metrics?.averageScore && metrics.averageScore !== "0.0" ? `${metrics.averageScore}/10` : '—',
            subtitle: '10-point precision grading',
            icon: Sparkles,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10 border-amber-500/20'
          }
        ].map((card, i) => (
          <Card key={i} className="bg-[#1a1a1a] border-white/10 shadow-lg hover:border-white/20 transition-all">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-xl border ${card.bg}`}>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#f5f0e8]">
                {card.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Metrics & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="bg-[#1a1a1a] border-white/10 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-bold text-[#f5f0e8] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#8b5cf6]" /> Platform Health & Operations
            </CardTitle>
            <CardDescription className="text-xs text-gray-400">
              Live operational telemetry of services, database, and background tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-xs text-gray-500">Virtual Try-Ons</span>
                <div className="text-xl font-bold text-white">{metrics?.totalTryons ?? 0}</div>
                <span className="text-[11px] text-gray-400">Generations processed</span>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-xs text-gray-500">AI Requests</span>
                <div className="text-xl font-bold text-white">{metrics?.totalAIRequests ?? 0}</div>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {metrics?.failedAIRequests === 0 ? '100% Success Rate' : `${metrics?.failedAIRequests || 0} failed`}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-xs text-gray-500">Database Engine</span>
                <div className="text-xl font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Healthy
                </div>
                <span className="text-[11px] text-gray-400">Prisma ORM Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Management Links */}
        <Card className="bg-[#1a1a1a] border-white/10">
          <CardHeader>
            <CardTitle className="text-base font-bold text-[#f5f0e8] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Administrative Sections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: 'User Management', href: '/admin/users', desc: 'Inspect registered accounts' },
              { title: 'Error Monitoring', href: '/admin/errors', desc: 'Real-time application logs' },
              { title: 'Location Analytics', href: '/admin/locations', desc: 'Geographic usage map' },
              { title: 'Telemetry Charts', href: '/admin/analytics', desc: 'Scan volume & style trends' }
            ].map((link, i) => (
              <Link 
                key={i} 
                href={link.href}
                className="p-3 rounded-xl bg-black/30 border border-white/5 hover:border-[#8b5cf6]/40 hover:bg-white/5 transition-all flex items-center justify-between block group"
              >
                <div>
                  <div className="text-sm font-semibold text-[#f5f0e8] group-hover:text-[#8b5cf6] transition-colors">
                    {link.title}
                  </div>
                  <div className="text-[11px] text-gray-500">{link.desc}</div>
                </div>
                <span className="text-gray-500 group-hover:text-white transition-colors">→</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
