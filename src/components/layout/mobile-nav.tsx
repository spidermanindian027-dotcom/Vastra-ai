"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Camera, Shirt, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()
  
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/wardrobe", label: "Wardrobe", icon: Shirt },
    { href: "/scan", label: "Scan", icon: Camera, highlight: true },
    { href: "/looks", label: "Looks", icon: Sparkles },
    { href: "/profile", label: "Profile", icon: User },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#1e1e1e]/80 backdrop-blur-lg pb-safe">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          if (item.highlight) {
            return (
              <Link key={item.href} href={item.href} className="relative -top-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                  <item.icon className="h-6 w-6" />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-16 gap-1 transition-colors",
                isActive ? "text-[#8b5cf6]" : "text-[#a0a0a0] hover:text-[#f5f0e8]"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
