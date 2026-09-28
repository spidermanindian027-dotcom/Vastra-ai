"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Shirt, MessageSquare, User, LayoutGrid } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Scan', href: '/scan', icon: Camera },
    { name: 'Wardrobe', href: '/wardrobe', icon: Shirt },
    { name: 'Looks', href: '/looks', icon: LayoutGrid },
    { name: 'Stylist', href: '/stylist', icon: MessageSquare },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f0e8] flex flex-col md:flex-row">
      <aside className="hidden md:flex w-64 flex-col fixed h-full border-r border-white/10 bg-[#0d0d0d] p-6 z-40">
        <div className="font-bold tracking-widest text-xl mb-12">VESTRA AI</div>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href} 
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-[#8b5cf6]/10 text-[#8b5cf6]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 md:ml-64 pb-24 md:pb-0 min-h-screen">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 w-full bg-[#1a1a1a]/90 backdrop-blur-md border-t border-white/10 flex justify-around p-4 z-50">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.name} href={item.href} className={`flex flex-col items-center gap-1 ${isActive ? 'text-[#8b5cf6]' : 'text-gray-500'}`}>
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
