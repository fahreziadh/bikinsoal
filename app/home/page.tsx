import React from 'react'
import SectionFeature from './SectionFeature'
import SectionFooter from './SectionFooter'
import SectionHeader from './SectionHeader'
import SectionPricing from './SectionPricing'
import SectionVideo from './SectionVideo'

const Page = () => {
  return (
    <div className='container'>
        <SectionHeader />
        <SectionVideo />
        <SectionFeature />
        <SectionPricing />
        <SectionFooter />
    </div>
  )
}

export default Page