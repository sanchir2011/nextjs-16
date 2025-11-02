'use client'

import { Input as InputMain } from "@/components/ui/input"
import { Button } from "./Button"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput, } from "@/components/ui/input-group"

/**
 * Input component for user input.
 *
 * @param {Object} props - The input component props.
 * @param {string} [props.type='text'] - The type of input field.
 * @param {string} [props.description='This is your public display name.'] - The description of the input field.
 * @param {string} [props.placeholder='Энд бичнэ үү...'] - The placeholder text for the input field.
 * @param {string} props.label - The label for the input field.
 * @param {ReactNode} props.leftIcon - The icon to display on the left side of the input field.
 * @param {ReactNode} props.rightIcon - The icon to display on the right side of the input field.
 * @param {function} props.leftAction - The action to perform when the left icon is clicked.
 * @param {function} props.rightAction - The action to perform when the right icon is clicked.
 * @param {boolean} [props.hasButton=false] - Indicates whether the input field has a button.
 * @param {string} [props.buttonText='Хадгалах'] - The text to display on the button.
 * @param {string} [props.buttonVariant='default'] - The variant of the button.
 * @param {function} props.buttonAction - The action to perform when the button is clicked.
 * @param {ReactNode} props.buttonIcon - The icon to display on the button.
 * @param {boolean} [props.isButtonLoading=false] - Indicates whether the button is in a loading state.
 * @param {string} [props.buttonLoadingText=' '] - The text to display when the button is in a loading state.
 * @param {Object} props - The remaining props for the input field.
 * @returns {ReactNode} The rendered input component.
 */

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  description?: string;
  placeholder?: string;
  label?: string;
  leftIcon?: any;
  rightIcon?: any;
  leftAction?: () => void;
  rightAction?: () => void;
  container?: string;
  inputSize?: 'default' | 'xs' | 'sm' | 'lg' | 'icon';
  hasButton?: boolean;
  buttonText?: string;
  buttonVariant?: 'default' | 'outline' | 'ghost' | 'link' | 'destructive';
  buttonAction?: () => void;
  buttonIcon?: any;
  isButtonLoading?: boolean;
  buttonLoadingText?: string;
  required?: boolean;
  errorText?: string;
  className?: string;
  addon?: React.ReactNode;
}

export default function Input({ type = 'text', value, onChange, container, description, inputSize = 'default', placeholder = 'Энд бичнэ үү...', label, leftIcon, rightIcon, leftAction, rightAction, hasButton = false, buttonText = 'Хадгалах', buttonVariant = 'default', buttonAction, buttonIcon, isButtonLoading = false, buttonLoadingText = ' ', required = false, errorText, className = '', addon, ...props }: InputProps) {
  return (
    <div className={`grid w-full items-center gap-1.5 ${container}`}>
      { label && (<Label className="mb-1">{label}{required && (<span className="text-gradient -ml-1">*</span>)}</Label>) }
      { addon ? (
        <InputGroup>
          <InputGroupAddon className="text-muted-foreground pl-3">
            {addon}
          </InputGroupAddon>
          <InputMain value={value} onChange={onChange} inputSize={inputSize} leftIcon={leftIcon} rightIcon={rightIcon} leftAction={leftAction} rightAction={rightAction} type={type} placeholder={placeholder} required={required} onWheel={type == 'number' ? (e) => {e.currentTarget.blur()} : () => {}} data-slot="input-group-control" className={`flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent placeholder:text-muted-foreground -ml-1 -mt-0.5 ${className || ''}`} {...props} />
        </InputGroup>
      ) : hasButton ? (
        <div className="flex w-full items-center space-x-2">
          <InputMain value={value} onChange={onChange} inputSize={inputSize} leftIcon={leftIcon} rightIcon={rightIcon} leftAction={leftAction} rightAction={rightAction} type={type} placeholder={placeholder} required={required} onWheel={type == 'number' ? (e) => {e.currentTarget.blur()} : () => {}} {...props} />
          <Button variant={buttonVariant} onClick={buttonAction} isLoading={isButtonLoading} loadingMessage={buttonLoadingText} icon={buttonIcon} size={(!buttonText && buttonIcon) ? 'icon' : 'default'} >{buttonText}</Button>
        </div>
      ) : (
        <InputMain value={value} onChange={onChange} inputSize={inputSize} leftIcon={leftIcon} rightIcon={rightIcon} leftAction={leftAction} rightAction={rightAction} type={type} placeholder={placeholder} required={required} onWheel={type == 'number' ? (e) => {e.currentTarget.blur()} : () => {}}  className={`${className} ${errorText ? '!border-destructive' : ''}`} {...props} />
      ) }
      { errorText ? (
        <p className="text-xs font-medium text-destructive">{errorText}</p>
      ) : description && (<p className="text-xs opacity-50 font-medium">{description}</p>)}
    </div>
  )
}