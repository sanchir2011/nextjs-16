'use client'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

/**
 * Renders a radio button group with selectable options.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.items - The array of radio button items.
 * @param {string} props.value - The currently selected value.
 * @param {function} props.onChange - The callback function triggered when the value changes.
 * @param {any} props.props - Additional props to be spread on the RadioGroup component.
 * @returns {JSX.Element} The rendered Radio component.
 */

interface RadioProps {
  items?: Array<{ value: string; label: string }>
  value?: string
  onChange?: (_value: string) => void
  [key: string]: any
}

export default function Radio({ items = defaultItems, value, onChange, ...props }: RadioProps) {
  return (
    <RadioGroup defaultValue={value} onValueChange={onChange} {...props}>
      {items.map((item, index) => (
        <div className="flex items-center space-x-2" key={index} >
          <RadioGroupItem value={item.value} id={`${item.value}-${index}`}/>
          <Label htmlFor={`${item.value}-${index}`}>{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}

const defaultItems = [
  { value: "default", label: "Default" },
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
]