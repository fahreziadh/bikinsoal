import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Coins } from "lucide-react"

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

export function TokenCount() {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='sm' variant='outline'><Coins size={14} className="mr-2" /> 120</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div>
                    <div className="mb-4"><span className="font-bold underline">1 Token = 1 Soal</span>. Untuk menambah token silahkan pilih paket dibawah ini.</div>
                    {PaketToken.map((paket, index) => (
                        <Button key={index} className="w-full mt-1 inline-flex items-center justify-between" variant='outline'>
                            <span className="font-bold">{paket.token} Token</span>
                            <span>{Intl.NumberFormat("id-ID", { style: 'currency', currency: "IDR", minimumFractionDigits: 0 }).format(paket.price ?? 0)}</span>
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}
