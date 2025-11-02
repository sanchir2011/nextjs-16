export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex sm:h-screen justify-center items-center w-full">
      {children}
    </div>
  )
}
