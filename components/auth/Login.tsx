'use client'

import { useEffect, useState } from 'react'
import { isValidEmail } from '@/lib/util'
import { signIn } from 'next-auth/react'
import { toast } from '@/lib/toast'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import Image from "next/image"
import Favicon from "@/public/icon.png"
import FaviconWhite from "@/public/icon.png"
import Logo from "@/public/icon.png"
import LogoWhite from "@/public/icon.png"

import Input from '../elements/Input'
import { Button } from '../elements/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  useEffect(() => {
    if(searchParams.has('error')) {
      setLoading(false)
      setGoogleLoading(false)
      if(searchParams.get('error') == 'notFound') toast.error('Бүртгэл олдсонгүй')
      if(searchParams.get('error') == 'serverError') toast.error('Сервертэй холбогдоход алдаа гарлаа')
    }
  }, [searchParams])

  const handleEmailChange = (event: any) => setEmail(event.target.value)
  const handlePasswordChange = (event: any) => setPassword(event.target.value)

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') handleLogin(event)
  }

  const signInWithGoogle = async () => {
    setGoogleLoading(true)
    if(callbackUrl) return await signIn('google', { callbackUrl: callbackUrl })
    await signIn('google')
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    
    if(!email) return toast.error('Имэйл хаяг хоосон байна')
    if(!password) return toast.error('Нууц үг хоосон байна')
    if(!isValidEmail(email)) return toast.error('Имэйл эсвэл нэвтрэх нэр буруу байна')
    setLoading(true)
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    setLoading(false)
    if(!response) return toast.error('Нэвтрэхэд алдаа гарлаа')
    if(response.error) return toast.error(response.error == "CredentialsSignin" ? 'Имэйл эсвэл нууц үг буруу байна' : response.error)
    if(response.ok === false) return toast.error('Нэвтрэхэд алдаа гарлаа')
    toast.success('Амжилттай нэвтэрлээ')
    setTimeout(() => {
      if(callbackUrl) router.push(callbackUrl)
      else router.push('/')
    }, 100)
  }

  const routeToRegister = () => {
    if(callbackUrl) router.push(`/register?callbackUrl=${callbackUrl}`)
    else router.push('/register')
  }

  const routeToForgot = () => {
    if(callbackUrl) router.push(`/forgot?callbackUrl=${callbackUrl}`)
    else router.push('/forgot')
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

      <div className="text-center flex flex-col items-center mt-8 sm:mt-0">
        <h2 className="text-2xl font-semibold leading-9 font-gilroy text-foreground mt-4">
          Нэвтрэх
        </h2>
      </div>


      <p className="mb-6 text-sm leading-6 text-muted-foreground text-center mt-2 font-medium">
        Шинэ хэрэглэгч үү?{' '}
        <span onClick={routeToRegister} className="cursor-pointer font-semibold text-foreground ml-1">
          Бүртгэл үүсгэх
        </span>
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <Button onClick={signInWithGoogle} loadingMessage="Нэвтэрч байна..." isLoading={googleLoading} variant="secondary" width="full">
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

      <div>
        <div className="space-y-3 grid grid-cols-2">
          <Input label='Имэйл хаяг' type='email' placeholder='Таны имэйл хаяг' onChange={handleEmailChange} onKeyDown={handleKeyDown} required autoFocus container="col-span-full !max-w-none" />

          <div className='col-span-full'>
            <Input label='Нууц үг' type='password' placeholder='Таны нууц үг' onChange={handlePasswordChange} onKeyDown={handleKeyDown} required container="w-full !max-w-none" />
            <div className="flex items-center justify-end mt-1">
              <div className="text-xs leading-6">
                <div onClick={routeToForgot} className="font-medium text-muted-foreground hover:text-foreground transition cursor-pointer">
                  Нууц үгээ мартсан уу?
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-full'>
            <Button type="button" onClick={handleLogin} isLoading={loading} className="w-full" loadingMessage="Нэвтэрч байна...">
              Нэвтрэх
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}