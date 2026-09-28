import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#8b5cf6] text-white hover:bg-[#7c3aed]",
        secondary:
          "border-transparent bg-[#252525] text-[#f5f0e8] hover:bg-[#333333]",
        destructive:
          "border-transparent bg-red-900/50 text-red-200 hover:bg-red-900/70",
        outline: "text-[#f5f0e8] border-white/20",
        success: "border-transparent bg-emerald-900/50 text-emerald-200 hover:bg-emerald-900/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
