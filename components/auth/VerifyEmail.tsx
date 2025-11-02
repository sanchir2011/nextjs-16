'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { verifyEmailById } from '@/lib/request'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CircleCheck, CircleX } from 'lucide-react'

import { Button } from '../elements/Button'

export default function VerifyEmail(){
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const searchParams = useSearchParams()
  const router = useRouter()
 
  const email = searchParams.get('email')
  const id = searchParams.get('id')

  useEffect(() => {
    if(email && id) {
      const verify = async () => {
        const response = await verifyEmailById({ email, id })
        if(response && response.status == 200) {
          setSuccess(true)
          setMessage('Имэйл хаяг амжилттай баталгаажлаа 🤗')
        }
        else {
          setSuccess(false)
          setMessage('Код хүчингүй болсон эсвэл имэйл хаяг буруу байна 😢')
        }
        setLoading(false)
      }
      verify()
    }
  }, [email, id])

  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      { !loading && (
        <>
          { success ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <CircleCheck className='w-20 h-20 text-green-500' />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <CircleX className='w-20 h-20 text-destructive' />
            </motion.div>
          ) }
          <motion.div className='text-center text-xl font-semibold text-foreground px-8 font-gilroy' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{ message }</motion.div>
          { success ? (
            <motion.div className='grow-0 mt-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <Button onClick={() => router.push('/')}>
                Нүүр хуудас
              </Button>
            </motion.div>
          ) : (
            <motion.div className='grow-0 mt-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <Button onClick={() => router.push('/login')}>
                Нэвтрэх
              </Button>
            </motion.div>
          )}
        </>
      ) }
    </div>
  )
}