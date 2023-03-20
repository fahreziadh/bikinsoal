"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import SectionFeature from './home/SectionFeature'
import SectionHeader from './home/SectionHeader'
import SectionPricing from './home/SectionPricing'
import SectionVideo from './home/SectionVideo'

const Page = () => {

  return (
    <SessionProvider>
      <div className='container'>
        <SectionHeader />
        <SectionVideo />
        <SectionFeature />
        <SectionPricing />
      </div>
    </SessionProvider>
  )
}

export default Page