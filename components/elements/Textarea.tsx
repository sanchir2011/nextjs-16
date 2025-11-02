'use client'

import { Label } from "@/components/ui/label"
import { Textarea as TextareaMain } from "@/components/ui/textarea"

/**
 * Renders a textarea component with optional label, description, and other props.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The value of the textarea.
 * @param {function} props.onChange - The event handler for textarea value changes.
 * @param {string} [props.placeholder='Энд бичнэ үү...'] - The placeholder text for the textarea.
 * @param {boolean} [props.disabled=false] - Specifies whether the textarea is disabled.
 * @param {string} [props.label] - The label text for the textarea.
 * @param {string} [props.description] - The description text for the textarea.
 * @returns {JSX.Element} The rendered textarea component.
 */

interface TextareaProps {
  value: string
  onChange: (_event: any) => void
  required?: boolean
  placeholder?: string
  disabled?: boolean
  label?: string
  description?: string
  [key: string]: any
}

export default function Textarea({ value, onChange, required = false, placeholder = 'Энд бичнэ үү...', disabled = false, label, description, ...props }: TextareaProps) {
  return (
    <div className={`grid w-full gap-2 ${props.container || ''}`}>
      { label && (<Label>{label}{required && (<span className="text-gradient -ml-1">*</span>)}</Label>) }
      <TextareaMain value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} {...props} />
      { description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) }
    </div>
  )
}