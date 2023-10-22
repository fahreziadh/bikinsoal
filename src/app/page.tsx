import React from 'react'
import Home from './home/home'
import { getServerAuthSession } from '@/server/auth'

const page = async() => {
  const session = await getServerAuthSession()
  return <Home session={session} />
}

export default page