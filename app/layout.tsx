import Navbar from "@/components/nav-bar"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import Toaster from "@/components/toaster";

export const metadata = {
  title: 'BikinSoal - Generate Soal Online',
  description: 'BikinSoal adalah platform untuk membuat soal secara online. Dengan fitur yang lengkap, membuat soal menjadi lebih mudah dan menyenangkan.',
  keywords: [
    "AI",
    "ChatGPT",
    "Chatbot",
    "Soal",
    "Soal Online",
    "Soal Ujian",
    "Soal Tryout",
    "Soal Ujian Nasional",
    "Soal UN",
    "Soal Ujian Sekolah",
    "Soal Ujian Sekolah Dasar",
    "Soal Ujian Sekolah Menengah Pertama",
    "Soal Ujian Sekolah Menengah Atas",
    "Soal Ujian Sekolah Menengah Kejuruan",
    "Soal Ujian Sekolah Menengah Kejuruan",
    "Soal Ujian Sekolah Menengah Kejuruan",
    "Soal Ujian Sekolah Menengah Kejuruan",
  ],
  authors: [
    {
      name: "fahreziadh",
      url: "https://instagram.com/izerhaf_",
    }
  ],
  creator: "fahreziadh",
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://bikinsoal.com/',
    title: 'BikinSoal - Generate Soal Online',
    description: 'BikinSoal adalah platform untuk membuat soal secara online. Dengan fitur yang lengkap, membuat soal menjadi lebih mudah dan menyenangkan.',
  },
  twitter: {
    creator: "@fahreziadhaa",
  }
}

const inter = Inter({
  variable: '--inter-font',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={cn('dark:bg-[#0c0c0c] dark:text-white', inter.className)}>
        {/* @ts-expect-error Server Component */}
        <Navbar />
        <main>
          {children}
          <Analytics />
          <Toaster />
        </main>
      </body>
    </html>
  )
}
