import { prisma } from '@/lib/db';
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'
import MainPage from './main'

export const revalidate = 60;

const getCounter = async () => {
  const counter = await prisma.questionGenerated.aggregate({
    _sum: {
      total: true
    }
  })
  return counter?._sum.total || 0
}

const Page = async () => {

  const counter = await getCounter()
  const session = await getServerSession(authOptions)
  
  return (
    <MainPage session={session} counter={counter} />
  )
}

export default Page