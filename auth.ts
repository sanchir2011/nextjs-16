import NextAuth, { type DefaultSession, NextAuthConfig } from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from "next-auth/providers/twitter";
import { CredentialsSignin } from "next-auth";
import type { User, Session } from './lib/types';

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super()
    this.message = message
  }
}

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"]
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
            "Auth-Key": process.env.AUTH_SECRET_KEY!,
          },
          cache: "no-store",
        })
        const user = await res.json()
        if (res.ok && user?.status === 200) {
          return user.data as User
        }
        throw new CustomError(user?.error || "Имэйл эсвэл нууц үг буруу байна")
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/',
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      if (user) {
        token.id = user.id;
      }

      if(account && account.provider === "google"){
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`, {
          method: "POST",
          body: JSON.stringify(profile),
          headers: {
            "Content-Type": "application/json",
            "Auth-Key": process.env.AUTH_SECRET_KEY!,
          },
        })
        const userRes = await response.json()
        console.log('google sign in', userRes, response)
        if(!userRes) return null
        if(userRes.error) throw new CustomError(userRes.error)
        if(userRes.status === 200) return { ...userRes.data }
        else return null
      }

      if(trigger == "update"){
        return { ...token, ...session.user }
      }

      return { ...token, ...user }
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user = token as User;
      return session;
    },
  },
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)