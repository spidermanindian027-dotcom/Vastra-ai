"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, BarChart3, AlertCircle, MapPin, ClipboardList, Settings } from "lucide-react"

import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },
    { label: "Users", icon: Users, href: "/admin/users" },
    { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { label: "Errors", icon: AlertCircle, href: "/admin/errors" },
    { label: "Locations", icon: MapPin, href: "/admin/locations" },
    { label: "Audit Log", icon: ClipboardList, href: "/admin/audit" },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-[#0d0d0d]">
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="font-serif text-xl font-bold tracking-wider text-[#f5f0e8]">VESTRA</span>
          <span className="text-xl font-bold text-[#8b5cf6]">ADMIN</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === route.href
                  ? "bg-[#8b5cf6]/10 text-[#8b5cf6]"
                  : "text-[#a0a0a0] hover:bg-white/5 hover:text-[#f5f0e8]"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#a0a0a0] transition-colors hover:bg-white/5 hover:text-[#f5f0e8]"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </div>
  )
}
