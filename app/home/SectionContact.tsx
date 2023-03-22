import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SectionContact = () => {
    return (
        <div className='container mt-40 flex flex-col items-center'>
            <h1 className='text-center text-3xl font-bold'>Contact</h1>
            <h2 className='mt-4 text-center text-lg'>Ingin tahu lebih lanjut? atau mengalami masalah? silahkan hubungi kontak berikut:</h2>
            <Button onClick={()=>window.open('https://wa.me/6285156492236')} className='mt-4 flex items-center justify-center p-8' size="lg">
                <Image src={"/whatsapp.png"} width={200} height={200} className="ml-4 h-8 w-8" alt='whatsapp'/>
                <span className='px-4 text-xl'>Hubungi Whatsapp</span>
            </Button>
        </div>
    )
}

export default SectionContact