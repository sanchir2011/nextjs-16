'use client'

import {
  Card as CardMain,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/**
 * A reusable Card component.
 *
 * @param {Object} props - The props for the Card component.
 * @param {string} props.title - The title of the card.
 * @param {string} props.description - The description of the card.
 * @param {ReactNode} props.children - The content of the card.
 * @param {string} props.className - Additional CSS class for the card.
 * @returns {JSX.Element} The rendered Card component.
 */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  headerClassName?: string
  isTitleGilroy?: boolean
  contentClassName?: string
}

export default function Card({ title, description, children, className, headerClassName, isTitleGilroy = false, contentClassName, ...props }: CardProps) {
  return (
    <CardMain className={`w-full ${className}`} {...props}>
      { (title || description) && (
        <CardHeader className={`${headerClassName || ''}`}>
          { title && <CardTitle className={`${isTitleGilroy ? 'font-gilroy' : ''}`}>{title}</CardTitle> }
          { description && <CardDescription>{description}</CardDescription> }
        </CardHeader>
      ) }
      <CardContent className={`${(!title && !description) ? 'pt-6' : 'pt-0'} ${contentClassName || ''}`}>
        { children }
      </CardContent>
    </CardMain>
  )
}