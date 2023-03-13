import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <div className='container flex justify-between py-8'>
        <Image alt='logo' src={"/logo.png"} width={175} height={100} />
        <Button>Login</Button>
    </div>
  )
}

export default Navbar