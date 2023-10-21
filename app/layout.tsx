import "@/styles/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"

export const metadata = {
  title: "BikinSoal - Generate Soal Online",
  description:
    "BikinSoal adalah platform untuk membuat soal secara online. Dengan fitur yang lengkap, membuat soal menjadi lebih mudah dan menyenangkan.",
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
    },
  ],
  creator: "fahreziadh",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bikinsoal.com/",
    title: "BikinSoal - Generate Soal Online",
    description:
      "BikinSoal adalah platform untuk membuat soal secara online. Dengan fitur yang lengkap, membuat soal menjadi lebih mudah dan menyenangkan.",
  },
  twitter: {
    creator: "@fahreziadhaa",
  },
}

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={"dark:bg-[#0c0c0c] dark:text-white"}>
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Under Maintenance</h1>
          <Link href="https://revamp.bikinsoal.com/">Lihat Website Revamp</Link>
        </div>
      </body>
    </html>
  )
}
