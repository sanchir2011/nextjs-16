'use client'

import { useEffect, useState, useRef } from 'react'
import { resendVerify, verifyEmail } from '@/lib/request'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { REGEXP_ONLY_DIGITS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

import { Button } from '../elements/Button'
import { RotateCcw } from 'lucide-react'
import { toast } from 'sonner'
import { User } from '@/lib/types'

export default function Email({ user } : { user: User }){
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [code, setCode] = useState('')

  const router = useRouter()
  const inputRef = useRef(null)

  useEffect(() => {
    if(code && code.length === 6) handleVerify()
  }, [code])

  const handleCodeChange = (value: any) => setCode(value)

  const handleVerify = async () => {
    if(!user || !user.email) return toast.error('Имэйл хаяг олдсонгүй')
    if(!code) return toast.error('Имэйл баталгаажуулах код оруулна уу')
    setLoading(true)
    const { status, error } = await verifyEmail({ email: user.email, code })
    setLoading(false)
    if(error) return toast.error(error)
    if(status !== 200) return toast.error('Имэйл баталгаажуулахад алдаа гарлаа')
    toast.success('Имэйл амжилттай баталгаажлаа 🥳')
    router.refresh()
  }

  const handleResend = async () => {
    if(!user || !user.email) return toast.error('Имэйл хаяг олдсонгүй')
    setResendLoading(true)
    const { status, error } = await resendVerify(user.email)
    setResendLoading(false)
    if(error) return toast.error(error)
    if(status !== 200) return toast.error('Имэйл дахин илгээхэд алдаа гарлаа')
    toast.success('Имэйл дахин илгээгдлээ ✉️')
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full p-6 sm:w-[380px] sm:p-0">
        <div className="text-center flex flex-col items-center gap-2">
          <motion.h2 className="text-2xl font-semibold leading-9 text-foreground mt-4 font-gilroy"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
          >
            Имэйл баталгаажуулах
          </motion.h2>
          <motion.div className='text-sm font-medium text-muted-foreground'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Таны <span className='font-semibold text-foreground'>{user.email}</span> имэйл хаяг руу илгээгдсэн 6 оронтой кодыг оруулна уу.
          </motion.div>
        </div>

        <div className="mt-6">
          <div className="space-y-4 grid">
            <motion.div className='flex justify-center'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
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
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button type="button" onClick={handleVerify} isLoading={loading} className="w-full" loadingMessage="Баталгаажуулж байна...">
                Баталгаажуулах
              </Button>
              <Button type="button" onClick={handleResend} icon={RotateCcw} isLoading={resendLoading} variant="ghost" className="w-full" loadingMessage="Илгээж байна...">
                Дахин илгээх
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div className='mt-8 flex flex-col items-center gap-1'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className='text-center text-sm font-medium text-muted-foreground'>Мэдээллээ буруу оруулсан уу?</div>
          <Button type="button" onClick={() => router.push('/logout?url=/register')} variant="ghost" className="w-full">
            Шинээр эхлэх
          </Button>
        </motion.div>
      </div>
    </div>
  )
}