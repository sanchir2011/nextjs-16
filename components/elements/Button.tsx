'use client'

import * as React from "react"
import { Loader2, Check } from "lucide-react"
import { classNames } from "@/utils/util"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import Link from "next/link"

/**
 * Button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {string} props.className - Additional CSS class for the button.
 * @param {boolean} props.asChild - Flag indicating if the button is used as a child component.
 * @param {string} props.variant - The variant of the button (default, primary, secondary, etc.).
 * @param {string} props.width - The width of the button (full, fit, auto, etc.).
 * @param {string} props.size - The size of the button (default, small, large, etc.).
 * @param {string} props.tag - The HTML tag to be used for the button (button, a, link, div).
 * @param {React.Component} props.icon - The icon component to be displayed in the button.
 * @param {string} props.href - The URL for the button if it is an anchor tag.
 * @param {function} props.onClick - The click event handler for the button.
 * @param {string} props.iconPosition - The position of the icon in the button (left, right).
 * @param {boolean} props.isLoading - Flag indicating if the button is in loading state.
 * @param {boolean} props.isSuccess - Flag indicating if the button is in success state.
 * @param {boolean} props.isActive - Flag indicating if the button is active.
 * @param {string} props.loadingMessage - The loading message to be displayed in the button.
 * @param {string} props.successMessage - The success message to be displayed in the button.
 * @param {Object} props... - Additional props to be spread onto the button element.
 * @param {React.Ref} ref - The ref object for the button element.
 * @returns {React.ReactNode} The rendered button component.
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
  asChild?: boolean
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
  width?: 'full' | 'fit' | 'auto' | ''
  size?: 'default' | 'xs' | 'sm' | 'lg' | 'icon'
  tag?: 'button' | 'a' | 'link' | 'div'
  icon?: any
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  isSuccess?: boolean
  isActive?: boolean
  loadingMessage?: string
  successMessage?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, asChild, variant='default', width='', size='default', tag="button", icon, href='#', onClick, iconPosition = 'left', isLoading = false, isSuccess = false, isActive = true, loadingMessage = 'Уншиж байна...', successMessage = 'Амжилттай', ...props }: ButtonProps, ref) => {
  const IconComponent = icon
  const btnWidth = width == 'full' ? 'w-full!' : width == 'fit' ? 'w-fit!' : width == 'auto' ? 'w-auto!' : ''

  if(isActive === false) {
    return (
      <button ref={ref} disabled className={`${classNames(buttonVariants({ variant, size }))} ring-0! cursor-not-allowed ${btnWidth} ${className || ''}`} {...props}>
        {(IconComponent && iconPosition == 'left') && <IconComponent className="h-5 w-5"/>}
        {children}
        {(IconComponent &&  iconPosition == 'right') && <IconComponent className="h-5 w-5"/>}
      </button>
    ) 
  }
  if(isSuccess === true) {
    return (
      <button ref={ref} disabled className={`${classNames(buttonVariants({ variant, size }))} ${btnWidth} ${className || ''}`} {...props}>
        <Check className="h-5 w-5"/>
        {successMessage}
      </button>
    ) 
  }
  if(isLoading === true) {
    return (
      <button ref={ref} disabled className={`${classNames(buttonVariants({ variant, size }))} cursor-wait ${btnWidth} ${className || ''}`} {...props}>
        <Loader2 className="h-5 w-5 animate-spin"/>
        { children ? loadingMessage ? loadingMessage : 'Уншиж байна... ' : '' }
      </button>
    ) 
  }
  if(asChild){
    <Slot ref={ref} onClick={onClick} className={`${classNames(buttonVariants({ variant, size }))} ${btnWidth} ${className || ''}`} {...props}>
      {(IconComponent && iconPosition == 'left') && <IconComponent className="h-5 w-5"/>}
      {children}
      {(IconComponent &&  iconPosition == 'right') && <IconComponent className="h-5 w-5"/>}
    </Slot>
  }
  if(tag == "button") {
    return (
      <button ref={ref} onClick={onClick} className={`${classNames(buttonVariants({ variant, size }))} ${btnWidth} ${className || ''}`} {...props}>
        {(IconComponent && iconPosition == 'left') && <IconComponent className="h-5 w-5"/>}
        {children}
        {(IconComponent &&  iconPosition == 'right') && <IconComponent className="h-5 w-5"/>}
      </button>
    ) 
  }
  if(tag == "a") {
    return (
      // @ts-ignore
      <a ref={ref} href={href} className={`${classNames(buttonVariants({ variant, size }))} ${btnWidth} ${className || ''}`} {...props}>
        {(IconComponent && iconPosition == 'left') && <IconComponent className="h-5 w-5"/>}
        {children}
        {(IconComponent &&  iconPosition == 'right') && <IconComponent className="h-5 w-5"/>}
      </a>
    ) 
  }
  if(tag == "link") {
    return (
      // @ts-ignore
      <Link ref={ref} href={href} className={`${classNames(buttonVariants({ variant, size }))} ${btnWidth} ${className || ''}`} {...props}>
        {(IconComponent && iconPosition == 'left') && <IconComponent className="h-5 w-5"/>}
        {children}
        {(IconComponent &&  iconPosition == 'right') && <IconComponent className="h-5 w-5"/>}
      </Link>
    ) 
  }
  if(tag == "div") {
    return (
      // @ts-ignore
      <div ref={ref} className={`${classNames(buttonVariants({ variant, size }))} cursor-pointer ${btnWidth} ${className || ''}`} {...props}>
        {(IconComponent && iconPosition == 'left') && <IconComponent className="h-5 w-5"/>}
        {children}
        {(IconComponent &&  iconPosition == 'right') && <IconComponent className="h-5 w-5"/>}
      </div>
    ) 
  }
})

Button.displayName = "Button"

export const buttonVariants = cva(
  "inline-flex items-center cursor-pointer text-sm justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient !text-white hover:!bg-gradient-hover",
        destructive:
          "bg-destructive text-zinc-50 hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-6 rounded-sm px-2 text-xs!",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)