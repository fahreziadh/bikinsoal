import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'
import LandingPage from './landing-page'

const Page = async() => {
  const session = await getServerSession(authOptions)
  return (
    <LandingPage session={session}/>
  )
}

export default Page