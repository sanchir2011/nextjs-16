'use client'

import {
  Tooltip as TooltipMain,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
  
interface TooltipProps {
  children: React.ReactNode
  content: any
  [key: string]: any
}

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipMain>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          {content}
        </TooltipContent>
      </TooltipMain>
    </TooltipProvider>
  )
}