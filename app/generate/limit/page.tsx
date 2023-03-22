import { CardPricingBulanan, CardPricingMingguan } from '@/app/home/SectionPricing'
import React from 'react'

const Page = () => {
    return (
        <div className='container mt-20 flex min-h-screen flex-col items-center'>
            <div className='mt-40 flex flex-col items-center justify-center'>
                <h1 className='text-center text-3xl font-bold'>Batasan Free Trial Anda Telah Terpenuhi</h1>
                <h2 className='mt-4 text-lg'>Tenang... kamu bisa melanjutkan dengan langganan berikut : </h2>
                <div className='mt-8 grid w-full grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6'>
                    <CardPricingBulanan />
                    <CardPricingMingguan />
                </div>
            </div>
        </div>
    )
}

export default Page