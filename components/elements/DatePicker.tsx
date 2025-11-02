'use client'

import * as React from "react"
import { format } from "date-fns"
import { mn } from 'date-fns/locale'
import { Calendar as CalendarIcon } from "lucide-react"
 
import { classNames } from "@/lib/util"
import { Button } from "@/components/elements/Button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "../ui/label"

/**
 * Renders a date picker component.
 *
 * @param {Object} props - The component props.
 * @param {Date} props.date - The selected date.
 * @param {Function} props.setDate - The function to set the selected date.
 * @param {string} [props.placeholder='Огноо сонгоно уу'] - The placeholder text for the date picker.
 * @param {boolean} [props.isRange=false] - Indicates if the date picker is for selecting a range of dates.
 * @param {string} [props.className] - Additional CSS class names for the component.
 * @returns {JSX.Element} The rendered date picker component.
 */

interface DatePickerProps {
  date: Date | { from: Date; to: Date } | null
  setDate: (_date: any) => void
  placeholder?: string
  isRange?: boolean
  label?: string
  required?: boolean
  className?: string
  [key: string]: any
}

export default function DatePicker({ date, setDate, placeholder = 'Огноо сонгоно уу', isRange = false, className, label, required = false, ...props }: DatePickerProps){
  return (
    <div className={`flex flex-col gap-1.5 ${props.container || ''}`}>
      { label && (<Label className="mb-1">{label}{required && (<span className="text-gradient -ml-1">*</span>)}</Label>) }
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={classNames( "w-[280px] justify-start! text-left! font-normal", !date && "text-muted-foreground", className )} icon={CalendarIcon} {...props} >
            { (isRange && date && 'from' in date && 'to' in date) ? (
              date.from ? (
                date.to ? (
                  <>
                    {format(date.from, "yyyy.MM.dd", { locale: mn })} -{" "}
                    {format(date.to, "yyyy.MM.dd", { locale: mn })}
                  </>
                ) : (
                  format(date.from, "yyyy.MM.dd", { locale: mn })
                )
              ) : (
                <span>{placeholder}</span>
              )
            ) : (
              (date && date instanceof Date) ? format(date, "yyyy оны M-р сарын d", { locale: mn }) : <span>{placeholder}</span>
            ) }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" sideOffset={4} avoidCollisions={true}>
          { (isRange && date && 'from' in date && 'to' in date) ? (
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          ) : (
            <Calendar
              mode="single"
              selected={date as Date}
              onSelect={setDate}
              initialFocus
            />
          ) }
        </PopoverContent>
      </Popover>
    </div>
  )
}