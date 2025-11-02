'use client'

import { CalendarDays } from "lucide-react"
import { Button } from "@/components/elements/Button"
import {
  HoverCard as HoverCardMain,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

/**
 * Renders a hover card component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the hover card.
 * @param {string} [props.buttonContent='@datacom'] - The content of the button inside the hover card.
 * @param {string} [props.className] - Additional CSS class names for the hover card.
 * @returns {React.ReactNode} The rendered hover card component.
 */

interface HoverCardProps {
  children?: React.ReactNode
  buttonContent?: string
  className?: string
  [key: string]: any
}

export default function HoverCard({ children, buttonContent = '@datacom', className, ...props }: HoverCardProps) {
  return (
    <HoverCardMain {...props}>
      <HoverCardTrigger asChild>
        <Button variant="link">{buttonContent}</Button>
      </HoverCardTrigger>
      <HoverCardContent className={`w-80 ${className}`}>
        { children ? children : (
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@sanchir</h4>
              <p className="text-sm">
                Sanchir Enkhbold
              </p>
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Joined December 2020
                </span>
              </div>
            </div>
          </div>
        ) }
      </HoverCardContent>
    </HoverCardMain>
  )
}
