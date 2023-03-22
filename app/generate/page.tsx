import { prisma } from '@/lib/db'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession, Session } from 'next-auth'
import React from 'react'
import MainPage from './main'

const getLimit = async (session: Session | null) => {
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

  let limit_max = 15
  let have_subscription = false

  // get user's transaction depend on pack code and validate the date 
  const transaction = await prisma.transaction.findMany({
    where: {
      user: {
        email: session?.user?.email
      },
      is_active: true,
      expired_at: {
        gte: new Date()
      }
    },
    select: {
      package: true,
      updatedAt: true,
      is_active: true,
      expired_at: true
    }
  })

  if (transaction && transaction.length > 0) {
    have_subscription = true
  }

  return {
    limit_left: limit_max - (total._sum.total || 0),
    limit_max,
    expired_at: transaction.find((item) => item.is_active)?.expired_at?.toString(),
    have_subscription: have_subscription,
    is_limit_reached: (total._sum.total || 0) >= limit_max,
  }
}

const page = async () => {
  const session = await getServerSession(authOptions)
  const limit = await getLimit(session)

  return (
    <MainPage limit={limit} session={session} />
  )
}

export default page