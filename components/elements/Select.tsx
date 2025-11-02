'use client'

import {
  Select as SelectMain,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

/**
 * Renders a select component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The selected value.
 * @param {function} props.onChange - The function to handle value change.
 * @param {Array} [props.items=defaultItems] - The array of select items.
 * @param {string} [props.placeholder='Сонгоно уу'] - The placeholder text.
 * @param {string} [props.className] - The additional CSS class name.
 * @returns {JSX.Element} The select component.
 */

interface SelectProps {
  value?: string
  onChange?: (_value: string) => void
  items?: Array<{ value: string; label: string; desc?: string, disabled?: boolean }>
  placeholder?: string
  label?: string
  className?: string
  container?: string
  required?: boolean
  [key: string]: any
}

export default function Select({ value, onChange, label, items = defaultItems, placeholder = 'Сонгоно уу', className, container, required = false }: SelectProps){
  return (
    <div className={`flex flex-col w-full gap-1.5 ${container}`}>
      { label && (<Label className="mb-1">{label}{required && (<span className="text-gradient -ml-1">*</span>)}</Label>) }
      <SelectMain defaultValue={value || undefined} onValueChange={onChange}>
        <SelectTrigger className={`w-full ${className}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item, index) => (
              <SelectItem key={index} value={item.value} disabled={item.disabled ? true : false}>{item.label} {item.desc && (<span className="text-muted-foreground">{item.desc}</span>)}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectMain>
    </div>
  )
}

const defaultItems = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' }
]