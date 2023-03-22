"use client"
import { CardPricingBulanan, CardPricingMingguan } from '@/app/home/SectionPricing'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const Page = () => {
  const [isLoading, setIsloading] = useState(false)
  const [orderId, setOrderId] = useState('')
  const router = useRouter()

  const handleOnClick = async (code) => {
    setIsloading(true)
    await fetch("/api/payment/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code: code
      })
    }).then(res => res.json()).then(res => {
      if (res.redirect_url) {
        //open new tab
        window.open(res.redirect_url, '_blank')
        setOrderId(res.order_id)
      } else {
        toast.error("Terjadi kesalahan")
      }
    }).catch(() => {
      toast.error("Terjadi kesalahan")
    }).finally(() => {
      setIsloading(false)
    })
  }

  if (isLoading) {
    return <div className='container'>Loading...</div>
  }

  if (orderId) {
    return <div className='container mt-20 flex min-h-screen flex-col items-center'>
      <Button onClick={() => { router.replace("/generate") }}>Saya sudah membayar</Button>
    </div>
  }

  return (
    <div className='container mt-20 flex min-h-screen flex-col items-center'>
      <div className='mt-40 flex flex-col items-center justify-center'>
        <h1 className='text-center text-3xl font-bold'>Batasan Free Trial Anda Telah Terpenuhi</h1>
        <h2 className='mt-4 text-lg'>Tenang... kamu bisa melanjutkan dengan langganan berikut : </h2>
        <div className='mt-8 grid w-full grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6'>
          <CardPricingBulanan onClick={() => handleOnClick('monthly')} />
          <CardPricingMingguan onClick={() => handleOnClick("weekly")} />
        </div>
      </div>
    </div>
  )
}

export default Page