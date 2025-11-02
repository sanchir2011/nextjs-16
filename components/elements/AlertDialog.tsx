'use client'

import {
  AlertDialog as AlertDialogMain,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./Button"

const titleDefault = 'Энэ үйлдлийг хийхдээ итгэлтэй байна уу?'
const descriptionDefault = 'Та энэ үйлдлийг хийснээр дахин сэргээх боломжгүйгээр устгах болно. Та итгэлтэй байна уу?'

/**
 * Renders an alert dialog component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the alert dialog trigger.
 * @param {string} [props.title=titleDefault] - The title of the alert dialog.
 * @param {string} [props.description=descriptionDefault] - The description of the alert dialog.
 * @param {string} [props.confirmText='Устгах'] - The text for the confirm button.
 * @param {string} [props.cancelText='Цуцлах'] - The text for the cancel button.
 * @param {Function} props.action - The action to be performed when the confirm button is clicked.
 * @param {string} [props.variant='destructive'] - The variant of the confirm button.
 * @returns {ReactNode} The rendered alert dialog component.
 */

interface AlertDialogProps {
  children: React.ReactNode
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  action: () => void
  variant?: 'destructive' | 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
}

export default function AlertDialog({ children, title = titleDefault, description = descriptionDefault, confirmText = 'Батлах', cancelText = 'Цуцлах', action, variant = 'default' }: AlertDialogProps) {
  return (
    <AlertDialogMain>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-gilroy!">{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"secondary"}>{cancelText}</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={action} variant={variant}>{confirmText}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogMain>
  )
}