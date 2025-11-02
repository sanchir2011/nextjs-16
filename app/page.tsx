import { Badge } from '@/components/elements/Badge'
import { Github, Globe } from 'lucide-react'

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-6 text-foreground">
      <Badge>New version</Badge>
      <h1 className="text-2xl md:text-4xl font-semibold px-4 text-center">Next.JS 16 Starter Kit</h1>
      <div className="flex gap-1">
        <span>by</span>
        <a href='https://sanchir.dev' className="underline">Sanchir Enkhbold</a>
      </div>
      <div className="bg-foreground text-background px-4 py-3 rounded-xl">
        Start editing <code className="font-medium">app/page.tsx</code> and save.
      </div>
      <div className='grid grid-cols-2 gap-8'>
        <a href='https://sanchir.dev' className='flex gap-2 font-medium items-center' target='_blank'>
          <Globe size={20} className="text-foreground" /> 
          <span>Portfolio</span>
        </a>
        <a href='https://github.com/sanchir2011/nextjs-16' className='flex gap-2 font-medium items-center' target='_blank'>
          <Github size={20} className="text-foreground" /> 
          <span>Github</span>
        </a>
      </div>
    </div>
  )
}