'use client'

import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function Logout(){
  const searchParams = useSearchParams()
  const redirectUrl = searchParams.get('url')

  useEffect(() =>{
    if(redirectUrl) signOut({ callbackUrl: redirectUrl })
    else signOut({ callbackUrl: "/login" })
  }, [])

  return (
    <div className="flex h-screen justify-center items-center font-semibold text-foreground px-16 text-center">
      Таныг системээс гаргаж байна. Түр хүлээнэ үү...
    </div>
  )
}