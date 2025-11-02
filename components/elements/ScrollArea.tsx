'use client'

import { ScrollArea as ScrollAreaMain } from "@/components/ui/scroll-area"

/**
 * Renders a scrollable area component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the scroll area.
 * @param {ReactNode} props.children - The content to be rendered inside the scroll area.
 * @returns {ReactNode} The rendered scroll area component.
 */

interface ScrollAreaProps {
  className?: string
  children: React.ReactNode
  [key: string]: any
}

export default function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (<ScrollAreaMain className={className} {...props}>{children}</ScrollAreaMain>)
}