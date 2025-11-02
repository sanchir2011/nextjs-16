"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { classNames } from "@/lib/util"
import { Button } from "@/components/elements/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "../ui/label"

/**
 * A custom combobox component.
 *
 * @param {Object} props - The component props.
 * @param {string} props.value - The current value of the combobox.
 * @param {function} props.setValue - The function to set the value of the combobox.
 * @param {Array} [props.items=defaultItems] - The list of items to display in the combobox.
 * @param {string} [props.buttonPlaceholder='Сонгоно уу...'] - The placeholder text for the button.
 * @param {string} [props.searchPlaceholder='Энд хайна уу...'] - The placeholder text for the search input.
 * @param {string} [props.notFoundText='Хайлт олдсонгүй'] - The text to display when no items are found.
 * @param {string} [props.buttonVariant='outline'] - The variant of the button.
 * @param {string} [props.className] - Additional CSS class name for the component.
 * @returns {JSX.Element} The rendered combobox component.
 */

interface ComboboxProps {
  value: string
  setValue: (_value: string) => void
  items?: Array<{ value: string; label: string }>
  label?: string
  container?: string
  required?: boolean
  placeholder?: string
  searchPlaceholder?: string
  notFoundText?: string
  buttonVariant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
  className?: string
}

export default function Combobox({ value, setValue, label, required = false, container, items = defaultItems, placeholder = 'Сонгоно уу...', searchPlaceholder = 'Энд хайна уу...', notFoundText = 'Хайлт олдсонгүй', buttonVariant = 'outline', className }: ComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`flex flex-col w-full gap-1.5 ${container}`}>
      { label && (<Label className="mb-1">{label}{required && (<span className="text-gradient -ml-1">*</span>)}</Label>) }
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant={buttonVariant} role="combobox" aria-expanded={open} className={`w-[200px] !justify-between ${className}`} >
            <span className="truncate flex-1 text-left">{value ? items.find((framework) => framework.value === value)?.label : placeholder}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`w-[200px] p-0 ${className}`}>
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{notFoundText}</CommandEmpty>
              <CommandGroup>
                {items.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.label}
                    onSelect={(currentValue) => {
                      let realValue = items.find((framework) => framework.label === currentValue)?.value
                      setValue(realValue === value ? "" : realValue || "")
                      setOpen(false)
                    }}
                  >
                    <Check className={classNames("mr-2 h-4 w-4", value === framework.value ? "opacity-100" : "opacity-0")} />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

const defaultItems = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
]
