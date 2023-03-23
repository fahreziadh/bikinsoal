"use client"
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

export const SectionButton = () => {
  return (
    <Button variant="ghost" size="lg" className='p-0 text-lg' onClick={()=>signIn('google')}><Image src={"/btn_google.png"} alt="google login" width={200} height={100}/></Button>
  )
}
