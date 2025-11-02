'use client'

import { Progress as ProgressMain } from "@/components/ui/progress"

/**
 * Renders a progress component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The class name for the component.
 * @param {number} props.value - The value of the progress (default is 50).
 * @returns {JSX.Element} The rendered progress component.
 */

interface ProgressProps {
  className?: string
  value?: number
  indicator?: string
}

export default function Progress({ className, indicator, value = 50 }: ProgressProps) {
  return (<ProgressMain value={value} className={`w-full ${className}`} indicator={indicator} />)
}