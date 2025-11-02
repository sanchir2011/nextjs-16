import Forgot from "@/components/auth/Forgot"
import { redirect } from 'next/navigation'
import { auth } from "@/auth"

export const metadata = {
  title: 'Нууц үг сэргээх'
}

export default async function ForgotPage(){
  const session = await auth()
  if(session) return redirect('/')

  return <Forgot />
}