import Login from "@/components/auth/Login"
import { redirect } from 'next/navigation'
import { Metadata } from "next"
import { auth } from "@/auth"

export const metadata: Metadata = {
  title: 'Нэвтрэх'
}

export default async function LoginPage() {
  const session = await auth()
  if(session) return redirect('/')

  return <Login />
}