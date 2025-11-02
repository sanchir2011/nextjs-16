import * as React from "react"

import { cn } from "@/lib/util"

interface InputMainProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  leftIcon?: any
  rightIcon?: any
  leftAction?: () => void
  rightAction?: () => void
  type?: string
  inputSize?: 'default' | 'xs' | 'sm' | 'lg' | 'icon';
}

const Input = React.forwardRef(({ className, leftIcon, rightIcon, leftAction, rightAction, type, inputSize = 'default', ...props }: InputMainProps, ref) => {
  const IconLeftComponent = leftIcon
  const IconRightComponent = rightIcon

  if(leftIcon || rightIcon) {
    return (
      <div className={cn( "relative", className, )} >
        { leftIcon && (
          <div className={`text-muted-foreground absolute left-[1px] top-[1px] ${inputSize == 'sm' ? 'p-1.5' : inputSize == 'lg' ? 'p-3' : 'p-2.5'} ${leftAction ? 'cursor-pointer' : ''}`} onClick={leftAction}>
            <IconLeftComponent className="h-[18px] w-[18px]" />
          </div>
        ) }
        {/* @ts-ignore */}
        <input {...props} type={type} ref={ref} className={`flex ${inputSize == 'sm' ? 'h-8' : inputSize == 'lg' ? 'h-12' : 'h-10'} ${leftIcon ? inputSize == 'sm' ? 'pl-[30px]' : inputSize == 'lg' ? 'pl-[42px]' : 'pl-9' : ''} ${rightIcon ? inputSize == 'sm' ? 'pr-[30px]' : inputSize == 'lg' ? 'pr-[42px]' : 'pr-9' : ''} w-full z-0 rounded-md border border-input bg-background ${inputSize == 'sm' ? 'px-2 py-1' : inputSize == 'lg' ? 'px-4 py-3' : 'px-3 py-2'} sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50`} />
        { rightIcon && (
          <div className={`text-muted-foreground absolute right-[1px] top-[1px] ${inputSize == 'sm' ? 'p-1.5' : inputSize == 'lg' ? 'p-3' : 'p-2.5'} ${rightAction ? 'cursor-pointer' : ''}`} onClick={rightAction}>
            <IconRightComponent className="h-[18px] w-[18px]" />
          </div>
        ) }
      </div>
    )
  }

  {/* @ts-ignore */}
  return ( ( <input type={type} className={cn( `flex ${inputSize == 'sm' ? 'h-8' : inputSize == 'lg' ? 'h-12' : 'h-10'} w-full focus:ring-2 rounded-md border border-input bg-background ${inputSize == 'sm' ? 'px-2 py-1' : inputSize == 'lg' ? 'px-4 py-3' : 'px-3 py-2'} sm:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50`, className )} ref={ref} {...props} /> ) )
})
Input.displayName = "Input"

export { Input }
