'use client'

import { Slider as SliderMain } from "@/components/ui/slider"

/**
 * Renders a slider component.
 *
 * @param {Object} props - The component props.
 * @param {number} props.value - The initial value of the slider.
 * @param {number} [props.max=100] - The maximum value of the slider.
 * @param {number} [props.step=1] - The step value for the slider.
 * @returns {JSX.Element} The rendered slider component.
 */

interface SliderProps {
  value: any
  onChange: (_event: any) => void
  max?: number
  step?: number
  [key: string]: any
}

export default function Slider({ value, onChange, max = 100, step = 1, ...props }: SliderProps) {
  return <SliderMain value={[value]} onChange={onChange} max={max} step={step} {...props} />
}