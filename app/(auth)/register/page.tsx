import Register from "@/components/auth/Register"
import { redirect } from 'next/navigation'
import { auth } from "@/auth"

export const metadata = {
  title: 'Бүртгүүлэх'
}

export default async function RegisterPage(){
  const session = await auth()
  if(session) return redirect('/')

  return <Register />
}