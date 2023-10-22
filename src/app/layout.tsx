import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubIcon, Youtube, Twitter } from "lucide-react";
import { Toaster } from "react-hot-toast";

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
          <Card className="mx-auto mt-4 flex w-max items-center gap-2 px-2 py-1">
            <Link
              target="_blank"
              href="https://github.com/fahreziadh/bikinsoal.com"
            >
              <Button size={"icon"} variant="ghost">
                <GithubIcon size={18} />
              </Button>
            </Link>
            <Link
              target="_blank"
              href="https://www.youtube.com/channel/UCOhmLMgnGXcQIzeQihpHiYw"
            >
              <Button size={"icon"} variant="ghost">
                <Youtube size={18} />
              </Button>
            </Link>
            <Link href="https://twitter.com/fahreziadhaa" target="_blank">
              <Button size={"icon"} variant="ghost">
                <Twitter size={18} />
              </Button>
            </Link>
          </Card>
          {children}
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
