'use client'

import {
  Sheet as SheetMain,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./Button"

/**
 * Renders a sheet component with a trigger button and content.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the sheet.
 * @param {React.ReactNode} props.customComponent - The custom component to be rendered as the trigger button. If not provided, a default button will be used.
 * @param {string} [props.buttonText='Нээх'] - The text to be displayed on the trigger button.
 * @param {string} [props.buttonVariant='default'] - The variant of the trigger button.
 * @param {string} [props.side='right'] - The side of the sheet where it should appear.
 * @param {string} props.className - The additional CSS class name for the sheet content.
 * @param {string} [props.title='Гарчиг'] - The title of the sheet.
 * @param {string} props.description - The description of the sheet.
 * @param {any} props.props - Additional props to be spread onto the sheet content.
 * @returns {React.ReactNode} The rendered sheet component.
 */

interface SheetProps {
  children?: React.ReactNode
  customComponent?: React.ReactNode
  buttonText?: string
  buttonVariant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
  title?: string
  description?: string
  [key: string]: any
}

export default function Sheet({ children, customComponent, buttonText = 'Нээх', buttonVariant = 'default', side = 'right', className, title = 'Гарчиг', description, ...props }: SheetProps){
  return (
    <SheetMain>
      <SheetTrigger>
        { customComponent ? customComponent : <Button variant={buttonVariant}>{buttonText}</Button> }
      </SheetTrigger>
      <SheetContent side={side} className={className} {...props}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div>
          {children}
        </div>
      </SheetContent>
    </SheetMain>
  )
}