"use client"
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-hot-toast'

const CardPricingFree = () => {
  return <div className='flex min-h-[40px] w-full flex-col justify-between rounded-2xl border p-8'>
    <div className='flex w-full flex-row justify-between'>
      <span className='text-xl font-bold'>Coba Gratis</span>
      <div><span className='rounded-full bg-emerald-50 p-2 text-xs font-bold text-emerald-600'>Selamanya</span></div>
    </div>
    <p className='mt-5 text-sm opacity-75'>Cobain gratis selamanya</p>
    <p className='mt-5'><span className='text-2xl font-bold'>Rp. 0,00</span></p>
    <div className='mt-5 flex flex-col gap-4'>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Fitur Generate Soal</span>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Simpan Bank Soal</span>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Generate Up to 15 Soal/hari</span>
    </div>
    <Link href={"/generate"} className="w-full"><Button className='mt-8 w-full bg-emerald-500 font-bold hover:bg-emerald-600' size="sm">Coba Gratis</Button></Link>
  </div>
}


export const CardPricingBulanan = () => {
  return <div className='flex min-h-[40px] w-full flex-col rounded-2xl border p-8'>
    <div className='flex w-full flex-row justify-between'>
      <span className='text-xl font-bold'>Bulanan</span>
      <div><span className='rounded-full bg-emerald-50 p-2 text-xs font-bold text-emerald-600'>30 Hari</span></div>
    </div>
    <p className='mt-5 text-sm opacity-75'>Dapatkan manfaat dari fitur AI kami selama sebulan penuh.</p>
    <p className='mt-5 flex flex-col'>
      <span className='text-xs line-through'>Rp. 42.000</span>
      <span className='text-2xl font-bold'>Rp. 35.000 <span className='text-xs font-light underline'>Diskon 20%</span></span>
    </p>
    <div className='mt-5 flex flex-col gap-4'>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Fitur Generate Soal</span>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Simpan Bank Soal</span>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Unlimited Soal</span>
    </div>
    <Button className='mt-8 bg-emerald-500 font-bold hover:bg-emerald-600' onClick={() => toast("Fitur ini masih dalam pengembangan")} size="sm">Pilih Bulanan</Button>
  </div>
}

export const CardPricingMingguan = () => {
  return <div className='flex min-h-[40px] w-full flex-col justify-between rounded-2xl border p-8'>
    <div className='flex w-full flex-row justify-between'>
      <span className='text-xl font-bold'>Mingguan</span>
      <div><span className='rounded-full bg-emerald-50 p-2 text-xs font-bold text-emerald-600'>7 Hari</span></div>
    </div>
    <p className='mt-5 text-sm opacity-75'>Dapatkan manfaat dari fitur AI kami selama 7 hari.</p>
    <p className='mt-5 flex flex-col'>
      <span className='text-2xl font-bold'>Rp. 12.000</span>
    </p>
    <div className='mt-5 flex flex-col gap-4'>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Fitur Generate Soal</span>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Simpan Bank Soal</span>
      <span className='inline-flex items-center text-sm'><Check className="mr-2 h-4 w-4 text-emerald-500" />Unlimited Soal</span>
    </div>
    <Button className='mt-8 bg-emerald-500 font-bold hover:bg-emerald-600' onClick={() => toast("Fitur ini masih dalam pengembangan")}>Pilih Mingguan</Button>
  </div>
}

const SectionPricing = ({ title = "Daftar Harga", description = "Jelajahi paket berlangganan sesuai kebutuhan anda" }) => {
  return (
    <div className='mt-40 flex flex-col items-center justify-center'>
      <h1 className='text-center text-3xl font-bold'>{title}</h1>
      <h2 className='mt-4 text-lg'>{description}</h2>
      <div className='mt-8 grid w-full grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-6'>
        <CardPricingFree />
        <CardPricingBulanan />
        <CardPricingMingguan />
      </div>
    </div>
  )
}

export default SectionPricing