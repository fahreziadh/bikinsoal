"use client"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn, fetcher } from "@/lib/utils"

import { Coins } from "lucide-react"
import { type Session } from "next-auth"
import Link from "next/link"
import useSWR from "swr"

const PaketToken = [
    {
        token: 200,
        price: 20000
    },
    {
        token: 350,
        price: 30000
    },
    {
        token: 500,
        price: 40000
    }
]

export function TokenCount({ session }: { session: Session | null }) {
    const { data, isLoading, isValidating } = useSWR<{ token: number }>("/api/token", fetcher)
    const token = data?.token ?? 0
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='sm' variant='outline' className={cn(isLoading || isValidating ? "animate-pulse":"")}><Coins size={14} className="mr-2" /> {token}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                {/* {session ? (<div>
                    <div className="mb-4"><span className="font-bold underline">1 Token = 1 Soal</span>. Untuk menambah token silahkan pilih paket dibawah ini.</div>
                    {PaketToken.map((paket, index) => (
                        <Button key={index} className="w-full mt-1 inline-flex items-center justify-between" variant='outline'>
                            <span className="font-bold">{paket.token} Token</span>
                            <span>{Intl.NumberFormat("id-ID", { style: 'currency', currency: "IDR", minimumFractionDigits: 0 }).format(paket.price ?? 0)}</span>
                        </Button>
                    ))}
                </div>) : (
                    <div>
                        Kamu harus <Link href="/api/auth/signin" className="text-blue-500 underline">login</Link> terlebih dahulu untuk membeli token.
                    </div>
                )} */}
                Token akan ke-reset setiap tanggal 1 setiap bulannya. Kamu akan mendapat 120 token setiap bulannya.
            </PopoverContent>
        </Popover>
    )
}
