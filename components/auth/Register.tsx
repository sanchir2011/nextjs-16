'use client'

import { useState, useEffect } from 'react'
import { isValidEmail, isValidName } from '@/lib/util'
import { signIn } from 'next-auth/react'
import { checkUserEmail, checkUserPhone, register } from '@/lib/request'
import { toast } from '@/lib/toast'
import { useRouter, useSearchParams } from 'next/navigation'

import Image from "next/image"
import Favicon from "@/public/icon.png"
import FaviconWhite from "@/public/icon.png"
import Logo from "@/public/icon.png"
import LogoWhite from "@/public/icon.png"

import { Button } from '../elements/Button'
import Input from '../elements/Input'
import { Loader2 } from 'lucide-react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')   
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const [emailLoading, setEmailLoading] = useState(false)
  const [emailError, setEmailError] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const defaultEmail = searchParams.get('email')

  useEffect(() => {
    if(defaultEmail && isValidEmail(defaultEmail)) {
      setEmail(defaultEmail)
    }
  }, [defaultEmail])

  useEffect(() => {
    if(searchParams.has('error')) {
      setLoading(false)
      setGoogleLoading(false)
      if(searchParams.get('error') == 'CredentialsSignin') toast.error('Бүртгэл үүсгэх боломжгүй байна')
    }
  }, [searchParams])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if(email && isValidEmail(email)) {
      timeout = setTimeout(() => {
        checkEmailExists()
      }, 500)
    }
    else {
      setEmailError('')
    }
    return () => {
      if(timeout) clearTimeout(timeout)
    }
  }, [email])

  const checkEmailExists = async () => {
    if(!email) return toast.error('Имэйл хаяг хоосон байна')
    if(!isValidEmail(email)) return toast.error('Имэйл хаяг буруу байна')
    setEmailLoading(true)
    const { error } = await checkUserEmail(email)
    setEmailLoading(false)
    console.log('email check', error)
    if(error) return setEmailError('Энэ имэйл хаяг бүртгэлтэй байна')
    else setEmailError('')
  }

  const handleEmailChange = (event: any) => setEmail(event.target.value)
  const handlePasswordChange = (event: any) => setPassword(event.target.value)
  const handleFirstNameChange = (event: any) => setFirstName(event.target.value)
  const handleLastNameChange = (event: any) => setLastName(event.target.value)

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') handleRegister(event)
  }

  const registerWithGoogle = async () => {
    setGoogleLoading(true)
    if(callbackUrl) return await signIn('google', { callbackUrl: callbackUrl })
    await signIn('google')
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()

    if(!email) return toast.error('Имэйл хаяг хоосон байна')
    if(!firstName) return toast.error('Нэр хоосон байна')
    if(!lastName) return toast.error('Овог хоосон байна')
    if(!password) return toast.error('Нууц үг хоосон байна')
    if(!isValidEmail(email)) return toast.error('Имэйл буруу байна')
    if(!isValidName(firstName)) return toast.error('Нэр буруу байна')
    if(!isValidName(lastName)) return toast.error('Овог буруу байна')
    if(password.length < 8) return toast.error('Нууц үг богинхон байна')

    setLoading(true)
    const response = await register({ email, password, firstName, lastName })
    if(!response) {
      setLoading(false)
      return toast.error('Сервертэй холбогдоход алдаа гарлаа')
    }
    if(response.error) {
      setLoading(false)
      return toast.error(response.error)
    }
    toast.success('Амжилттай бүртгэгдлээ')
    await signIn('credentials', { email, password, redirect: false })
    setTimeout(() => {
      if(callbackUrl) router.push(callbackUrl)
      else router.push('/')
    }, 100)
  }

  const routeToLogin = () => {
    if(callbackUrl) router.push(`/login?callbackUrl=${callbackUrl}`)
    else router.push('/login')
  }

  return (
    <div className="w-full p-6 sm:w-[380px] sm:p-0">
      <div className="hidden sm:inline-block absolute top-4 left-4">
        <Image src={Favicon} alt="logo" className="dark:hidden" width={60} />
        <Image src={FaviconWhite} alt="logo" className="hidden dark:inline-block" width={60} />
      </div>
      <div className="w-full flex justify-center sm:hidden">
        <Image src={Logo} alt="logo" className="dark:hidden" height={40} />
        <Image src={LogoWhite} alt="logo" className="hidden dark:inline-block" height={40} />
      </div>

      <div className="text-center flex flex-col items-center mt-4 sm:mt-0">
        <h2 className="text-2xl font-bold leading-9 font-gilroy text-foreground mt-4">
          Бүртгэл үүсгэх
        </h2>
      </div>

      <div className="mt-2">
        <p className="mb-6 text-sm leading-6 text-muted-foreground text-center font-medium">
          Аль хэдийн бүртгэлтэй юу?{' '}
          <span onClick={routeToLogin} className="cursor-pointer font-semibold text-foreground ml-1">
            Нэвтрэх
          </span>
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <Button onClick={registerWithGoogle} loadingMessage="Нэвтэрч байна..." isLoading={googleLoading} variant="secondary" width="full">
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
            </svg>
            <span className="text-sm font-semibold leading-6">Google ашиглах</span>
          </Button>
        </div>

        <div className="relative mt-6 mb-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-background px-6 text-muted-foreground">Эсвэл</span>
          </div>
        </div>

        <div className="space-y-4 grid grid-cols-2 gap-x-4">
          <Input value={lastName} label="Овог" placeholder="Таны овог" onChange={handleLastNameChange} autoFocus required container="col-span-full sm:col-span-1 !max-w-none" />
          <Input value={firstName} label="Нэр" placeholder="Таны нэр" onChange={handleFirstNameChange} required container="col-span-full sm:col-span-1 !max-w-none" />
          <Input value={email} label="Имэйл хаяг" type="email" placeholder="example@example.mn" onChange={handleEmailChange} required container="col-span-full !max-w-none" errorText={emailError} rightIcon={emailLoading ? Loader2 : null} />
          <Input value={password} label="Шинэ нууц үг" type="password" placeholder="Шинэ нууц үгээ оруулна уу" onChange={handlePasswordChange} onKeyDown={handleKeyDown} description='8-аас дээш тэмдэгтэй байх ёстой' required container="col-span-full !max-w-none" />

          <div className='pt-2 col-span-full'>
            <Button onClick={handleRegister} isLoading={loading} width="full">Бүртгүүлэх</Button>
          </div>
        </div>
        <p className="mt-6 text-xs leading-4 text-muted-foreground text-center font-medium">
          Бүртгэл үүсгэснээр манай <a href={`${process.env.NEXT_PUBLIC_LANDING_URL}/terms`} target='_blank' className='text-primary! font-semibold'>Үйлчилгээний нөхцөл</a>-тэй танилцсан болно.
        </p>
      </div>
    </div>
  )
}