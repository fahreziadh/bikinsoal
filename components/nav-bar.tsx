import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import ButtonSession from './button-session'
import { Button } from './ui/button'

const Navbar = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className='container flex justify-between py-8'>
      <div className='inline-flex'>
        <Image alt='logo' src={"/logo.png"} width={175} height={100} />
        <div><span className='rounded-full bg-black px-4 py-1 text-sm text-white'>Early Access</span></div>
      </div>
      <ButtonSession session={session} />
    </div>
  )
}

export default Navbar