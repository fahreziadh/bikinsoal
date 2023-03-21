import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'
import MainPage from './main'

const page = async () => {
  const session = await getServerSession(authOptions)
  return (
    <MainPage session={session} />
  )
}

export default page