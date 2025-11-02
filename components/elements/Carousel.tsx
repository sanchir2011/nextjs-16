'use client'

import {
  Carousel as CarouselMain,
  CarouselContent,
  CarouselItem as CarouselItemMain,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

/**
 * Renders a carousel component.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content to be rendered inside the carousel.
 * @param {string} [props.className] - The additional CSS class name for the carousel.
 * @param {boolean} [props.autoPlay=false] - Determines if the carousel should automatically play.
 * @param {number} [props.delay=3000] - The delay in milliseconds between each slide transition.
 * @param {string} [props.orientation='horizontal'] - The orientation of the carousel ('horizontal' or 'vertical').
 * @returns {JSX.Element} The rendered carousel component.
 */

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  autoPlay?: boolean
  delay?: number
  orientation?: 'horizontal' | 'vertical'
}

export function Carousel({ children, className, autoPlay = false, delay = 3000 , orientation = 'horizontal', ...props }: CarouselProps) {
  // const [api, setApi] = useState<any>(undefined)
  // const [current, setCurrent] = useState(0)
  // const [count, setCount] = useState(0)

  // useEffect(() => {
  //   if (!api) return
    
  //   setCount(api.scrollSnapList().length)
  //   setCurrent(api.selectedScrollSnap() + 1)
     
  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1)
  //   })
  // }, [api])

  return (
    <CarouselMain orientation={orientation} className={`w-full max-w-xs ${className}`} plugins={ autoPlay ? [ Autoplay({ delay: delay }) ] : undefined } {...props}>
      <CarouselContent>
        { children }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselMain>
  )
}

export const CarouselItem = CarouselItemMain