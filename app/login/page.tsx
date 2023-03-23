import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { SectionButton } from './SectionButton'



const page = async () => {
    const session = await getServerSession(authOptions)

    if (session?.user) {
        redirect('/generate')
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center rounded-lg border p-4'>
                <h1 className='mb-4 text-xl font-bold'>Masuk Sekarang</h1>
                <SectionButton />

            </div>
        </div>
    )
}

export default page