"use client"
import { domAnimation, LazyMotion } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import SectionFeature from './home/SectionFeature'
import SectionHeader from './home/SectionHeader'
import SectionPricing from './home/SectionPricing'
import SectionVideo from './home/SectionVideo'

const Page = () => {

  return (
    <SessionProvider>
      <LazyMotion features={domAnimation}>
        <div className='container'>
          <SectionHeader />
          <SectionVideo />
          <SectionFeature />
          <SectionPricing />
        </div>
      </LazyMotion>
    </SessionProvider>
  )
}

export default Page