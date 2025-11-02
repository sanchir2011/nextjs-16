'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { validateCode, resetPassword } from '@/lib/request'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CircleX } from 'lucide-react'
import Input from '../elements/Input'
import { Button } from '../elements/Button'

export default function VerifyReset(){
  const [loading, setLoading] = useState(true)
  const [btnLoading, setBtnLoading] = useState(false)
  const [valid, setValid] = useState(false)

  const [password, setPassword] = useState('')
  const [passwordRep, setPasswordRep] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()
 
  const email = searchParams.get('email')
  const code = searchParams.get('code')

  useEffect(() => {
    if(email && code) {
      const verify = async () => {
        const response = await validateCode({ email, code })
        if(response && response.status == 200) setValid(true)
        else setValid(false)
        setLoading(false)
      }
      verify()
    }
  }, [email, code])

  const handlePasswordChange = (event: any) => setPassword(event.target.value)
  const handlePasswordRepChange = (event: any) => setPasswordRep(event.target.value)

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') handleResetPassword(event)
  }

  const handleResetPassword = async (e: any) => {
    e.preventDefault()

    if(!email) return toast.error('Имэйл хоосон байна')
    if(!code) return toast.error('Код хоосон байна')
    if(!password) return toast.error('Нууц үг хоосон байна')
    if(!passwordRep) return toast.error('Нууц үг давтах хоосон байна')
    if(password.length < 8) return toast.error('Нууц үг богинхон байна')
    if(password !== passwordRep) return toast.error('Нууц үг таарахгүй байна')

    setBtnLoading(true)
    const response = await resetPassword({ email, password, code })
    if(!response) {
      setBtnLoading(false)
      return toast.error('Сервертэй холбогдоход алдаа гарлаа')
    }
    if(response.error) {
      setBtnLoading(false)
      return toast.error(response.error)
    }
    toast.success('Амжилттай нууц үг солигдлоо')
    setTimeout(() => {
      router.push('/login')
    }, 100)
  }

  
  return (
    <div>
      { !loading && (
        valid ? (
          <div className='w-full p-6 sm:w-[380px] sm:p-0 mx-auto'>
            <div className="text-center flex flex-col items-center">
              <h2 className="text-2xl font-bold leading-9 tracking-tight text-foreground mt-4">
                Нууц үг сэргээх
              </h2>
            </div>
            <div className="space-y-4 mt-6">
              <Input label="Шинэ нууц үг" type="password" onChange={handlePasswordChange} required placeholder='Таны шинэ нууц үг' onKeyDown={handleKeyDown} description='8-аас дээш тэмдэгтэй байх ёстой' />
              <Input label="Шинэ нууц үг давтах" type="password" onChange={handlePasswordRepChange} required placeholder='Шинэ нууц үг давтах' onKeyDown={handleKeyDown} />
              <Button onClick={handleResetPassword} isLoading={btnLoading} className='w-full mt-2'>
                Нууц үг солих
              </Button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-4 items-center justify-center'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <CircleX className='w-20 h-20 text-foreground' />
            </motion.div>
            <motion.div className='text-center text-xl font-semibold text-foreground' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Код хүчингүй болсон эсвэл имэйл хаяг буруу байна 😢
            </motion.div>
            <motion.div className='grow-0 mt-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <Button onClick={() => router.push('/')}>
                Нүүр хуудас
              </Button>
            </motion.div>
          </div>
        )
      ) }
    </div>
  )
}