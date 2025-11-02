'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "./Button"

/**
 * Modal component that displays a dialog or a drawer based on the screen size.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines whether the modal is open or not.
 * @param {function} props.setOpen - Callback function to handle open state changes.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.description - The description of the modal.
 * @param {boolean} [props.isLoading=false] - Determines whether the modal is in loading state or not.
 * @param {string} [props.loadingMessage='Уншиж байна...'] - The loading message to display when isLoading is true.
 * @param {boolean} [props.showCancel=true] - Determines whether to show the cancel button or not.
 * @param {boolean} [props.showSave=true] - Determines whether to show the save button or not.
 * @param {function} props.cancelAction - Callback function to handle cancel button click.
 * @param {function} props.saveAction - Callback function to handle save button click.
 * @param {string} [props.cancelText='Цуцлах'] - The text to display on the cancel button.
 * @param {string} [props.saveText='Хадгалах'] - The text to display on the save button.
 * @param {ReactNode} [props.saveIcon] - The icon to display on the save button.
 * @param {boolean} [props.isSaveActive=true] - Determines whether the save button is active or not.
 * @param {boolean} [props.showFooter=true] - Determines whether to show the footer or not.
 * @param {string} [props.className] - Additional CSS class name for the modal.
 * @param {string} [props.bodyClassName] - Additional CSS class name for the modal body.
 * @param {ReactNode} props.children - The content of the modal.
 * @returns {ReactNode} The rendered modal component.
 */

interface ModalProps {
  open: boolean
  setOpen: (_open: boolean) => void
  title: string
  description: string
  isLoading?: boolean
  loadingMessage?: string
  showCancel?: boolean
  showSave?: boolean
  cancelAction?: () => void
  saveAction?: () => void
  cancelText?: string
  saveText?: string
  saveIcon?: any
  cancelIcon?: any
  isSaveActive?: boolean
  showFooter?: boolean
  className?: string
  bodyClassName?: string
  children?: React.ReactNode
}

export default function Modal({ open, setOpen, title, description, isLoading = false, loadingMessage = 'Уншиж байна...', showCancel = true, showSave = true, cancelAction, saveAction, cancelText = 'Цуцлах', saveText = 'Хадгалах', saveIcon, cancelIcon, isSaveActive = true, showFooter = true, className, bodyClassName, children }: ModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if(isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`sm:max-w-[600px] ${className}`}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className={`mt-4 mb-2 max-h-[60vh] overflow-y-auto scrollbar ${bodyClassName}`}>
            {children}
          </div>
          { showFooter && (
            <DialogFooter className={'gap-y-2'}>
              { showCancel && (
                <Button onClick={cancelAction ? cancelAction : () => setOpen(false)} variant='secondary' size="sm" isActive={!isLoading} icon={cancelIcon}>
                  {cancelText}
                </Button>
              ) }
              { showSave && (
                <Button onClick={saveAction ? saveAction : undefined} variant='default' size="sm" isLoading={isLoading} loadingMessage={loadingMessage} isActive={isSaveActive} icon={saveIcon}>
                  {saveText}
                </Button>
              ) }
            </DialogFooter>
          ) }
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} repositionInputs={false}>
      <DrawerContent className="safe-area">
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl">{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className={`mt-4 mb-2 max-h-[60vh] overflow-y-auto scrollbar px-4 ${bodyClassName}`}>
          {children}
        </div>
        { showFooter && (
          <DrawerFooter className={`grid gap-x-2 px-4 pb-8 ${showCancel && showSave ? 'grid-cols-2' : 'grid-cols-1'} gap-y-2`}>
            { showCancel && (
              <Button onClick={cancelAction ? cancelAction : () => setOpen(false)} variant='outline' isActive={!isLoading}>
                {cancelText}
              </Button>
            ) }
            { showSave && (
              <Button onClick={saveAction ? saveAction : undefined} variant='default' isLoading={isLoading} loadingMessage={loadingMessage} isActive={isSaveActive} icon={saveIcon}>
                {saveText}
              </Button>
            ) }
          </DrawerFooter>
        ) }
      </DrawerContent>
    </Drawer>
  )
}