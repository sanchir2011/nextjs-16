'use client'

import { Fragment } from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

/**
 * Renders a Command component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} [props.items=defaultItems] - The items to be displayed in the command list.
 * @param {string} [props.searchPlaceholder='Энд хайна уу...'] - The placeholder text for the search input.
 * @param {string} [props.notFoundText='Хайлт олдсонгүй.'] - The text to be displayed when no items are found.
 * @param {string} [props.className] - Additional CSS class names for the component.
 * @returns {JSX.Element} The rendered Command component.
 */

interface CommandProps {
  open: boolean
  setOpen: () => void
  items?: Array<{ title: string; subItems: Array<{ name: string; icon: any; action: () => void; disabled?: boolean; isDanger?: boolean; shortcut?: string }> }>
  searchPlaceholder?: string
  notFoundText?: string
  className?: string
}

export default function Command({ open, setOpen, items = defaultItems, searchPlaceholder='Энд хайна уу...', notFoundText = 'Хайлт олдсонгүй.', className }: CommandProps) {
  return (
    // @ts-ignore
    <CommandDialog open={open} onOpenChange={setOpen} className={`rounded-lg border shadow-md md:min-w-[450px] ${className}`}>
      <CommandInput placeholder={searchPlaceholder} autoFocus />
      <CommandList>
        <CommandEmpty>{notFoundText}</CommandEmpty>
        {items.map((group, index) => (
          <Fragment key={index}>
            <CommandGroup key={group.title} heading={group.title}>
              {group.subItems.map((item, subIndex) => (
                <CommandItem
                  key={subIndex}
                  disabled={item.disabled}
                  onSelect={item.action}
                  className={`${item.isDanger ? 'text-danger!' : ''}`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.name}</span>
                  {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                </CommandItem>
              ))}
            </CommandGroup>  
            {index < items.length - 1 && <CommandSeparator />}
          </Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  )
}

const defaultItems = [
  { 
    title: 'Suggestions',
    subItems: [
      { name: "Calendar", icon: Calendar, action: () => alert('Hi!') },
      { name: "Search Emoji", icon: Smile, action: () => alert('Hi!') },
      { name: "Calculator", icon: Calculator, action: () => alert('Hi!'), disabled: true },
    ],
  },
  {
    title: 'Settings',
    subItems: [
      { name: "Profile", icon: User, action: () => alert('Hi!'), shortcut: "⌘P" },
      { name: "Billing", icon: CreditCard, action: () => alert('Hi!'), shortcut: "⌘B" },
      { name: "Settings", icon: Settings, action: () => alert('Hi!'), shortcut: "⌘S" },
    ]
  }
]