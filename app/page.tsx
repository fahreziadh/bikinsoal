import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import React from 'react'
import SectionFeature from './home/SectionFeature'
import SectionHeader from './home/SectionHeader'
import SectionPricing from './home/SectionPricing'
import SectionVideo from './home/SectionVideo'

export const revalidate = 3600;

const Page = async() => {
  const session = await getServerSession(authOptions)
  
  return (
    <div className='container'>
      <SectionHeader session={session} />
      <SectionVideo />
      <SectionFeature />
      <SectionPricing />
    </div>
  )
}

export default Page