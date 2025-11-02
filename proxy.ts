import { authConfig } from "@/auth"
import NextAuth from "next-auth"

export default NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    authorized: ({ auth, request }) => {
      const { pathname, search, origin } = request.nextUrl

      const isPublicRoute = isPublicPath(pathname)

      if (isPublicRoute) {
        return true
      }

      if (!auth) {
        const callbackUrl = `${origin}${pathname}${search}`
        const loginUrl = new URL('/login', origin)
        loginUrl.searchParams.set('callbackUrl', callbackUrl)

        return false
      }

      return true
    },
  },
}).auth

function isPublicPath(pathname: string): boolean {
  const staticAssets = [
    '/icon.png',
    '/qpay-white.svg',
    '/qpay.svg',
    '/storepay-white.png',
    '/storepay.png',
    '/transfer.png'
  ]
  
  if (staticAssets.includes(pathname)) {
    return true
  }
  
  const publicRoutes = [
    '/api',
    '/login',
    '/access',
    '/forgot',
    '/logout',
    '/register',
    '/reset',
    '/verify',
    '/invitation',
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.',
  ]
  
  return publicRoutes.some(route => pathname.startsWith(route))
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ]
}