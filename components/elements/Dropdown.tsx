'use client'

import * as React from 'react'
import {
  Cloud,
  CreditCard,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  User,
  UserPlus,
} from "lucide-react"
  
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
  
/**
 * Renders a dropdown component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the dropdown trigger.
 * @param {string} [props.title='Гарчиг'] - The title of the dropdown.
 * @param {Array} [props.items=itemsDefault] - The array of dropdown items.
 * @returns {ReactNode} The rendered dropdown component.
 */

interface DropdownItem {
  children?: React.ReactNode
  title: string
  items: Array<Array<{
    name?: string
    icon?: any
    shortcut?: string
    action?: () => void
    disabled?: boolean
    sub?: Array<{
      name?: string
      icon?: any
      action?: () => void
      disabled?: boolean
      seperate?: boolean
    }>
  }>>
}

export default function Dropdown({ children, title = 'Гарчиг', items = itemsDefault }: DropdownItem) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((group, i) => (
          <React.Fragment key={i}>
            <DropdownMenuGroup>
              {group.map((item, j) => (
                item.sub ? (
                  <DropdownMenuSub key={j}>
                    <DropdownMenuSubTrigger>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {item.sub.map((subItem, k) => (
                          subItem.seperate ? (
                            <DropdownMenuSeparator key={k} />
                          ) : (
                            <DropdownMenuItem key={k} disabled={subItem.disabled} className={`${subItem.disabled ? '' : 'cursor-pointer!'}`} onClick={subItem.action}>
                              {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />}
                              <span>{subItem.name}</span>
                            </DropdownMenuItem>
                          )
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem key={j} className={`${item.disabled ? '' : 'cursor-pointer!'}`} disabled={item.disabled} onClick={item.action}>
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    <span>{item.name}</span>
                    {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
                  </DropdownMenuItem>
                )
              ))}
            </DropdownMenuGroup>
            { i < items.length - 1 && <DropdownMenuSeparator /> }
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const itemsDefault = [
  [
    { name: 'Profile', icon: User, shortcut: '⌘P', action: () => alert('Profile') },
    { name: 'Billing', icon: CreditCard, shortcut: '⌘B' }
  ],
  [
    { name: 'Invite users', icon: UserPlus, sub: [
      { name: 'Email', icon: Mail },
      { name: 'Message', icon: MessageSquare, action: () => alert('Message') },
      { seperate: true },
      { name: 'More...', icon: PlusCircle },
    ] },
    { name: 'New Team', icon: Plus, shortcut: '⌘+T' },
    { name: 'API', icon: Cloud, disabled: true },
  ],
  [
    { name: 'Log out', icon: LogOut, shortcut: '⇧⌘Q' },
  ]
]