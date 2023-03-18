import React from 'react'
import SectionFeature from './home/SectionFeature'
import SectionHeader from './home/SectionHeader'
import SectionPricing from './home/SectionPricing'
import SectionVideo from './home/SectionVideo'

export const revalidate = 3600;

const Page = () => {
  return (
    <div className='container'>
      <SectionHeader />
      <SectionVideo />
      <SectionFeature />
      <SectionPricing />
    </div>
  )
}

export default Page