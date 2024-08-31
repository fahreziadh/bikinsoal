import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Bikinsoal.com",
  description: "Generate soal ujian online dengan mudah dan cepat",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`dark relative min-h-screen bg-background font-sans antialiased ${inter.variable}`}
      >
        <TRPCReactProvider headers={headers()}>
          <NextTopLoader color="#e11d48" />
          <Navbar />
          {children}
          <Toaster position="bottom-center" />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
