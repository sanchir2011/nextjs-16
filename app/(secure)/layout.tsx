import { auth } from "@/auth"
import Email from "@/components/auth/Email"
import { sendRequest } from "@/lib/request"
import { redirect } from "next/navigation"

export default async function SecureLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if(!session || !session.user) return redirect('/login')

  const { data: user } = await sendRequest({ url: '/user' })
  if(!user) return redirect('/logout')
  if(user.isVerified === false) return <Email user={user} />

  return (
    <div>
      {children}
    </div>
  )
}
