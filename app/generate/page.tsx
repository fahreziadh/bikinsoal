import { prisma } from '@/lib/db'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession, Session } from 'next-auth'
import React from 'react'
import MainPage from './main'

const getLimit = async (session: Session | null) => {
  //Get Total Questions Generated from Field Total in QuestionGenerated today

  const total = await prisma.questionGenerated.aggregate({
    where: {
      user: {
        email: session?.user?.email
      },
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
    _sum: {
      total: true,
    },
  })


  return 15 - (total._sum.total || 0)
}

const page = async () => {
  const session = await getServerSession(authOptions)
  const limit = await getLimit(session)
  
  return (
    <MainPage limit={limit} session={session} />
  )
}

export default page