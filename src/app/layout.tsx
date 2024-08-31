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
     <div className="flex flex-col items-center justify-center h-screen container max-w-[600px]">
        <h1 className="">
          This project has developed into evaly.io :)
        </h1>
        <h1 className="mt-2">
          To access this project, you can see the following repository: <a className="text-blue-500" href="https://github.com/fahreziadh/bikinsoal">https://github.com/fahreziadh/bikinsoal</a>
        </h1>
     </div>
        {/* <TRPCReactProvider headers={headers()}>
          <NextTopLoader color="#e11d48" />
          <Navbar />
          {children}
          <Toaster position="bottom-center" />
        </TRPCReactProvider> */}
      </body>
    </html>
  );
}
