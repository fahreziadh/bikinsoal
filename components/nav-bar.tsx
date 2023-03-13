import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className='container flex justify-between py-8'>
      <div className='inline-flex'>
        <Image alt='logo' src={"/logo.png"} width={175} height={100} />
        <div><span className='rounded-full bg-black px-4 py-1 text-sm text-white'>Beta</span></div>
      </div>
      <Button>Login</Button>
    </div>
  )
}

export default Navbar