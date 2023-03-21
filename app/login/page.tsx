import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { SectionButton } from './SectionButton'



const page = async() => {
    const session = await getServerSession(authOptions)

    if(session?.user) {
        redirect('/generate')
    }

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <SectionButton />
        </div>
    )
}

export default page