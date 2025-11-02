import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/util"

const customBadgeVariants = cva(
  "inline-flex items-center justify-center font-gilroy font-semibold",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground",
        green: "bg-success-foreground text-success",
        red: "bg-danger-foreground text-danger",
        amber: "bg-warning-foreground text-warning",
        purple: "bg-purple-foreground text-purple",
        blue: "bg-blue-foreground text-blue",
        rose: "bg-rose-foreground text-rose",
      },
      size: {
        default: "text-sm px-3 py-1 rounded-sm",
        sm: "text-xs px-2.5 py-0.5 rounded-sm",
        lg: "text-base px-4 py-1.5 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function CustomBadge({
  children,
  className,
  variant,
  size,
  icon,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof customBadgeVariants> & { icon?: any }) {
  let Icon = icon || null
  return (
    <div data-slot="badge" className={cn(customBadgeVariants({ variant, size }), className)} {...props} >
      {Icon && <Icon className="mr-1.5" size={20} />}
      {children}
    </div>
  )
}

export { CustomBadge, customBadgeVariants }
