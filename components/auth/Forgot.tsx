'use client'

import { useState, useEffect, useRef } from 'react'
import { isValidEmail } from '@/lib/util'
import { forgotCheckCode, forgotPassword, resendForgot } from '@/lib/request'
import { toast } from 'sonner'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import moment from 'moment'

import { REGEXP_ONLY_DIGITS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

import Input from '../elements/Input'
import { Button } from '../elements/Button'
import { Loader2, MoveLeft, RotateCcw } from 'lucide-react'

export default function Forgot() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [screenLoading, setScreenLoading] = useState(true)
  const [resendLoading, setResendLoading] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const inputRef = useRef(null)

  useEffect(() => {
    if(localStorage.getItem('resetAccountDetail')) {
      const resetAccountDetail = JSON.parse(localStorage.getItem('resetAccountDetail') as string)
      if(resetAccountDetail && resetAccountDetail.email && resetAccountDetail.expiresAt) {
        if(moment().isBefore(resetAccountDetail.expiresAt)) {
          setEmail(resetAccountDetail.email)
          setStep(2)
          setCode('')
        }
        else {
          localStorage.removeItem('resetAccountDetail')
          setStep(1)
        }
      }
    }
    setScreenLoading(false)
  }, [])

  useEffect(() => {
    if(code && code.length === 6) handleCheckCode()
  }, [code])

  const handleCodeChange = (value: any) => setCode(value)

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
    setStep(2)
    setCode('')
    localStorage.setItem('resetAccountDetail', JSON.stringify({ email, expiresAt: moment().add(10, 'minutes').toISOString() }))
  }

  const handleCheckCode = async () => {
    if(!email) return toast.error('Имэйл хаяг оруулна уу')
    if(!code) return toast.error('Нууц үг сэргээх код оруулна уу')
    setLoading(true)
    const { data: verification, status, error } = await forgotCheckCode({ email, code })
    setLoading(false)
    if(error) return toast.error(error)
    if(status !== 200) return toast.error('Нууц үг сэргээхэд алдаа гарлаа')
    toast.success('Код амжилттай баталгаажлаа')
    router.push(`/reset?email=${verification.email}&id=${verification.id}${callbackUrl ? `&callbackUrl=${callbackUrl}` : ''}`)
    setCode('')
    setEmail('')
    localStorage.removeItem('resetAccountDetail')
  }

  const handleResend = async () => {
    if(!email) return toast.error('Имэйл хаяг олдсонгүй')
    setResendLoading(true)
    const { status, error } = await resendForgot(email)
    setResendLoading(false)
    if(error) return toast.error(error)
    if(status !== 200) return toast.error('Имэйл дахин илгээхэд алдаа гарлаа')
    toast.success('Имэйл дахин илгээгдлээ ✉️')
  }

  const handleBack = () => {
    setStep(1)
    setCode('')
    setEmail('')
    localStorage.removeItem('resetAccountDetail')
  }

  const routeToLogin = () => {
    if(callbackUrl) router.push(`/login?callbackUrl=${callbackUrl}`)
    else router.push('/login')
  }

  if(screenLoading) return <Loader2 className="w-8 h-8 animate-spin text-primary" />
  
  return (
    <div className="w-full p-6 sm:w-[380px] sm:p-0 mx-auto">
      <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-semibold leading-9 text-foreground mt-4 font-gilroy">
          Нууц үг сэргээх
        </h2>
      </div>

      { step == 1 && (
        <div className="mt-6">
          <div className="space-y-4">
            <Input label='Имэйл хаяг' type='email' placeholder='Таны имэйл хаяг' onChange={handleEmailChange} onKeyDown={handleKeyDown} description="Бүртгэлтэй имэйл хаягаа оруулна уу." required autoFocus container="col-span-full" />

            <div className='pt-2'>
              <Button onClick={handleReset} isLoading={loading} className='w-full'>
                Код илгээх
              </Button>
              <div className="mt-4 text-center text-sm leading-6 text-muted-foreground">
                Нууц үгээ сансан уу?{' '}
                <div onClick={routeToLogin} className="inline-block font-semibold text-foreground ml-1 cursor-pointer">
                  Нэвтрэх
                </div>
              </div>
            </div>
          </div>
        </div>
      ) }

      <AnimatePresence>
        { step == 2 && (
          <div className='mt-2 space-y-4 grid'>
            <motion.p className='text-sm font-medium text-muted-foreground text-center'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Таны {email} имэйл хаяг руу илгээгдсэн 6 оронтой кодыг оруулна уу.
            </motion.p>

            <motion.div className='flex justify-center'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* @ts-ignore */}
              <InputOTP ref={inputRef} value={code} onChange={handleCodeChange} autoFocus={true} maxLength={6} pattern={REGEXP_ONLY_DIGITS} autoComplete="false">
                {/* @ts-ignore */}
                <InputOTPGroup>
                  {/* @ts-ignore */}
                  <InputOTPSlot index={0} showChar={true} />
                  {/* @ts-ignore */}
                  <InputOTPSlot index={1} showChar={true} />
                  {/* @ts-ignore */}
                  <InputOTPSlot index={2} showChar={true} />
                  {/* @ts-ignore */}
                  <InputOTPSlot index={3} showChar={true} />
                  {/* @ts-ignore */}
                  <InputOTPSlot index={4} showChar={true} />
                  {/* @ts-ignore */}
                  <InputOTPSlot index={5} showChar={true} />
                </InputOTPGroup>
              </InputOTP>
            </motion.div>

            <motion.div className='col-span-full mask-b-to-sidebar-border-2 flex flex-col gap-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button type="button" onClick={handleCheckCode} isLoading={loading} className="w-full" loadingMessage="Баталгаажуулж байна...">
                Баталгаажуулах
              </Button>
              <div className='flex justify-between items-center gap-2'>
                <Button type="button" onClick={handleBack} icon={MoveLeft} variant="ghost" className="w-full">
                  Буцах
                </Button>
                <Button type="button" onClick={handleResend} icon={RotateCcw} isLoading={resendLoading} variant="ghost" className="w-full" loadingMessage="Илгээж байна...">
                  Дахин илгээх
                </Button>
              </div>
            </motion.div>
          </div>
        ) }
      </AnimatePresence>
    </div>
  )
}