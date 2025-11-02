'use client'

import { forwardRef } from "react"
import { Switch as SwitchMain } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

/**
 * Renders a switch component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.checked - The current checked state of the switch.
 * @param {function} props.onChange - The callback function to handle switch state changes.
 * @returns {JSX.Element} The rendered switch component.
 */

interface SwitchProps {
  checked: boolean
  onChange: (_checked: boolean) => void
  [key: string]: any
}

export function Switch({ checked, onChange, ...props }: SwitchProps) {
  return (<SwitchMain checked={checked} onCheckedChange={onChange} {...props} />)
}

/**
 * Renders a switch label component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.checked - The checked state of the switch.
 * @param {function} props.onChange - The function to handle the switch change event.
 * @param {string} props.title - The title of the switch label.
 * @returns {JSX.Element} The rendered switch label component.
 */

interface SwitchLabelProps {
  checked: boolean
  onChange: (_checked: boolean) => void
  title: string
  [key: string]: any
}

export function SwitchLabel({ checked, onChange, title, ...props }: SwitchLabelProps) {
  return (
    <div className="flex items-center space-x-3">
      <SwitchMain checked={checked} onCheckedChange={onChange} {...props} />
      <Label>{title}</Label>
    </div>
  )
}


/**
 * Renders a switch card component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.checked - The checked state of the switch.
 * @param {function} props.onChange - The callback function to handle switch state changes.
 * @param {string} props.title - The title of the switch card.
 * @param {string} props.description - The description of the switch card.
 * @param {string} props.className - Additional CSS class names for the switch card.
 * @param {Object} props... - Additional props to be spread onto the root element.
 * @returns {JSX.Element} The rendered switch card component.
 */

interface SwitchCardProps {
  checked: boolean
  onChange: (_checked: boolean) => void
  title: string
  description: string
  className?: string
  [key: string]: any
}

// @ts-ignore
export const SwitchCard = ({ checked, onChange, title, description, className, ...props }: SwitchCardProps) => (
  // @ts-ignore
  <div className={`flex justify-between items-center gap-4 bg-background border border-input px-4 py-3 rounded-lg ${className}`}>
    <div className="flex flex-col">
      <h4 className="font-gilroy font-medium leading-4.5">{title}</h4>
      <p className="text-xs text-muted-foreground font-medium leading-4 mt-0.5">{description}</p>
    </div>
    <SwitchMain checked={checked} onCheckedChange={onChange} {...props} />
  </div>
)