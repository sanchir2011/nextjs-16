import { auth } from "@/auth"
import Forgot from "@/components/auth/Forgot"
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Нууц үг сэргээх'
}

export default async function ForgotPage(){
  const session = await auth()
  if(session) return redirect('/')

  return <Forgot />
}