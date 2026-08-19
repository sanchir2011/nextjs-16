import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from 'next/font/local'
import { SessionProvider } from "next-auth/react"
import { SkeletonTheme } from 'react-loading-skeleton'
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { auth } from "@/auth";

const title = "NextJS 16 Starter Kit"
const description = "A starter kit for NextJS 16 with TypeScript, Tailwind CSS, and more."
const author = "Sanchir Enkhbold"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL!),
  title: title,
  description: description,
  robots: {
    index: true,
    follow: true,
    nocache: true,  
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: title,
    description: description
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description
  },
  creator: author,
  publisher: author,
  authors: [{ name: author, url: 'https://sanchir.dev' }],
  keywords: [],
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) { 
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} ${gilroy.variable} subpixel-antialiased`} >
        <SessionProvider session={session}>
          <SkeletonTheme baseColor="hsl(var(--muted))" highlightColor="hsl(var(--background))">
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange >
              <Toaster />
              <div>
                {children}
                <div className="fixed bottom-2 right-2">
                  <ThemeSwitcher />
                </div>
              </div>
            </ThemeProvider>
          </SkeletonTheme>
        </SessionProvider>
      </body>
    </html>
  );
}


const inter = Inter({ subsets: ["cyrillic-ext", "cyrillic", "latin"], variable: "--font-inter", display: "swap" })
const gilroy = localFont({
  src: [
    {
      path: '../assets/fonts/GIP-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-UltraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-UltraLightItalic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-SemiBoldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-ExtraBoldItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../assets/fonts/GIP-Heavy.otf',
      weight: '950',
      style: 'normal',
    },
    {
      path: '../assets/fonts/GIP-HeavyItalic.otf',
      weight: '950',
      style: 'italic',
    },
  ],
  variable: '--font-gilroy',
  display: 'swap',
})