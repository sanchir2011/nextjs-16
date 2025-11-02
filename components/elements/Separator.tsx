'use client'

import { Separator as SeparatorMain } from "@/components/ui/separator"

/**
 * Renders a separator component.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - The class name for the separator.
 * @param {string} [props.orientation='horizontal'] - The orientation of the separator. Can be 'horizontal' or 'vertical'.
 * @returns {JSX.Element} The rendered separator component.
 */

interface SeparatorProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  [key: string]: any
}

export default function Separator({ className, orientation = 'horizontal', ...props }: SeparatorProps) {
  return (<SeparatorMain orientation={orientation} className={className} {...props} />)
}