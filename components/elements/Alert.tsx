'use client'

import { Terminal } from "lucide-react"

import {
  Alert as AlertMain,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertProps {
  title: string
  description: string
  icon?: React.ReactNode
  variant?: 'default' | 'destructive'
  [key: string]: any
}

export default function Alert({ title, description, icon, variant = 'default', ...props }: AlertProps) {
  const AlertIcon = icon ? icon : Terminal as any

  return (
    <AlertMain variant={variant} {...props}>
      <AlertIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </AlertMain>
  )
}
