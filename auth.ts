import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from "next-auth/providers/twitter";
import type { User, Session } from './lib/types';

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"]
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        const { email, password } = credentials ?? {};
        // TODO: replace the following with real authentication logic (DB lookup / password verification)
        if (!email || !password) return null;
        // Return a User-like object on success; return null on failure
        return { id: email, name: String(email).split('@')[0], email } as any;
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
        if(!profile) return null;
        if(!profile.azp) return null;
        if(profile.azp !== process.env.GOOGLE_CLIENT) return null;
        // use profile.email to auth as google provider
      }

      if(trigger == "update"){
        return { ...token, ...session.user }
      }

      return { ...token }
    },
    async session({ session, token }: { session: Session; token: any }) {
      session.user = token as User;
      return session;
    },
  },
});