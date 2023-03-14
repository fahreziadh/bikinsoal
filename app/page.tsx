import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'
import MainPage from './main'

const Page = async() => {
  const session = await getServerSession(authOptions)
  return (
    <MainPage session={session}/>
  )
}

export default Page