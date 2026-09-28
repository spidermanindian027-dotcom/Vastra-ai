"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, AlertTriangle, BarChart, Map } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
    { name: 'Locations', href: '/admin/locations', icon: Map },
    { name: 'Errors', href: '/admin/errors', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8] flex">
      <aside className="w-64 fixed h-full border-r border-white/10 bg-[#0d0d0d] p-6">
        <div className="font-bold tracking-widest text-xl mb-12 text-[#8b5cf6]">VESTRA ADMIN</div>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} 
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#8b5cf6]/20 text-[#8b5cf6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 ml-64 p-6 min-h-screen bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
