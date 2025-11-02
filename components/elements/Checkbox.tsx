"use client"
 
import { Checkbox as CheckboxMain } from "@/components/ui/checkbox"

interface CheckboxProps {
  title?: string
  description?: string
  checked?: boolean
  onChange?: (_checked: boolean) => void
  disabled?: boolean
  container?: string
  id?: string
}

export default function Checkbox({ title = 'Сонгох', description, checked = false, onChange, disabled = false, container, id = '' }: CheckboxProps) {
  return (
    <div className={`items-top flex space-x-2 ${container}`}>
      <CheckboxMain id={id || undefined} checked={checked} onCheckedChange={onChange} disabled={disabled} />
      <div className="grid gap-1.5 leading-none mt-[1px]">
        <label htmlFor={id || undefined} className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${id ? 'cursor-pointer' : ''}`} >
          {title}
        </label>
        { description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        ) }
      </div>
    </div>
  )
}