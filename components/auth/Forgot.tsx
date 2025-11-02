'use client'

import { useState } from 'react'
import { isValidEmail } from '@/lib/util'
import { forgotPassword } from '@/lib/request'
import { toast } from 'sonner'
import Link from 'next/link'

import Input from '../elements/Input'
import { Button } from '../elements/Button'

export default function Forgot() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleEmailChange = (event: any) => setEmail(event.target.value)

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') handleReset(event)
  }

  const handleReset = async (e: any) => {
    e.preventDefault()
    if(!email) return toast.error('Имэйл хаягаа оруулна уу')
    if(!isValidEmail(email)) return toast.error('Имэйл хаяг буруу байна')

    setLoading(true)
    const res = await forgotPassword(email)
    setLoading(false)
    if(!res) return toast.error('Сервертэй холбогдоход алдаа гарлаа')
    if(res.error) return toast.error(res.error)
    toast.success('Имэйл хаяг руу код илгээлээ')
    setSuccess(true)
  }
  
  return (
    <div className="w-full p-6 sm:w-[380px] sm:p-0 mx-auto">
      <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-foreground mt-4">
          Нууц үг сэргээх
        </h2>
      </div>

      <div className="mt-6">
        <div className="space-y-4">
          <Input label='Имэйл хаяг' type='email' placeholder='Таны имэйл хаяг' onChange={handleEmailChange} onKeyDown={handleKeyDown} description="Бүртгэлтэй имэйл хаягаа оруулна уу." required autoFocus container="col-span-full" />

          <div className='pt-2'>
            <Button onClick={handleReset} isLoading={loading} isSuccess={success} className='w-full'>
              Код илгээх
            </Button>
            { success ? (
              <div className='relative'>
                <div className='absolute -bottom-16 w-full text-center'>
                  <p className='text-xs text-foreground leading-6'>Имэйл хаягаа шалгана уу. Хэрвээ код ирээгүй бол СПАМ хэсэгээ давхар шалгана уу.</p>
                </div>
              </div>
            ) : (
              <p className="mt-4  text-center text-sm leading-6 text-muted-foreground">
                Нууц үгээ сансан уу?{' '}
                <Link href="/login" className="font-semibold text-foreground ml-1">
                  Нэвтрэх
                </Link>
              </p>
            ) }
          </div>
        </div>
      </div>
    </div>
  )
}