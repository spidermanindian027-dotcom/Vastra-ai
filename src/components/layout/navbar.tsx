"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const pathname = usePathname()
  const links = [
    { href: "/", label: "Home" },
    { href: "/scan", label: "Scan" },
    { href: "/wardrobe", label: "Wardrobe" },
    { href: "/my-style", label: "My Style" },
    { href: "/looks", label: "Looks" },
    { href: "/ai-stylist", label: "AI Stylist" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0d0d0d]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="flex items-center gap-2 mr-8">
          <Link href="/" className="flex items-center gap-1">
            <span className="font-serif text-xl font-bold tracking-wider text-[#f5f0e8]">VESTRA</span>
            <span className="text-xl font-bold text-[#8b5cf6]">AI</span>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#8b5cf6]",
                pathname === link.href ? "text-[#8b5cf6]" : "text-[#a0a0a0]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center ml-auto">
          <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-8 w-8 border border-white/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-[#252525] text-[#f5f0e8]">U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </nav>
  )
}
