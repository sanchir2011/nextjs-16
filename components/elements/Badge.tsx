'use client'

import { Badge as BadgeMain } from "@/components/ui/badge"

interface BadgeProps {
  children: React.ReactNode
  isIcon?: boolean
  variant?: 'default' | 'outline' | 'secondary'
}
 
export function Badge({ children, isIcon = false, variant = 'default' }: BadgeProps) {
  return <BadgeMain variant={variant} isIcon={isIcon}>{children}</BadgeMain>
}