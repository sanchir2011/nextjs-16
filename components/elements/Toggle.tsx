'use client'
 
import { Toggle as ToggleMain } from "@/components/ui/toggle"

/**
 * Renders a toggle component.
 *
 * @param {Object} props - The props for the toggle component.
 * @param {string} [props.variant='default'] - The variant of the toggle.
 * @param {string} [props.size='default'] - The size of the toggle.
 * @param {boolean} [props.disabled=false] - Specifies if the toggle is disabled.
 * @param {ReactNode} props.children - The content of the toggle.
 * @returns {ReactElement} The rendered toggle component.
 */

interface ToggleProps {
  pressed?: boolean
  onPressedChange?: (_pressed: boolean) => void
  variant?: 'default' | 'outline' | null
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  children?: React.ReactNode
  [key: string]: any
}

export default function Toggle({ pressed = false, onPressedChange, variant = 'default', size = 'default', disabled = false, children, ...props }: ToggleProps) {
  return (
    <ToggleMain pressed={pressed} onPressedChange={onPressedChange} variant={variant} size={size} aria-label='Toggle' disabled={disabled} {...props}>
      {children}
    </ToggleMain>
  )
}