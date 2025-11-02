'use client'

import { cva } from "class-variance-authority"

interface AlertProps {
  variant?: 'red' | 'green' | 'yellow' | 'blue'
  size?: 'default' | 'xs' | 'sm' | 'lg'
  className?: string
  [key: string]: any
}

export default function AlertBox({ variant = 'red', size = 'default', className, children }: AlertProps) {
  return (
    <div className={`${alertVariants({ variant, size })} ${className || ''}`}>
      { children }
    </div>
  )
}

const alertVariants = cva(
  "border font-medium",
  {
    variants: {
      variant: {
        red: "bg-danger/10 border-danger/20 text-danger",
        green: "bg-success/10 border-success/20 text-success",
        yellow: "bg-warning/10 border-warning/20 text-warning",
        blue: "bg-blue/10 border-blue/20 text-blue",
      },
      size: {
        default: "rounded-xl px-4 py-3 text-sm",
        xs: "rounded-sm px-2 py-1 text-xs",
        sm: "rounded-lg px-3 py-2 text-sm",
        lg: "rounded-2xl px-5 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "red",
      size: "default",
    },
  }
)