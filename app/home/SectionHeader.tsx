"use client"
import { Button } from '@/components/ui/button'
import { fetcher } from '@/lib/fetcher'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

const SectionHeader = () => {
  const session = useSession()
  const { data: counter } = useSWR('/api/getcounter', fetcher, { refreshInterval: 10000 })

  const router = useRouter()

  const secondVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
      <div className="mt-24 flex flex-col items-center justify-center sm:mt-32 xl:mt-60">
        <Image
          src="/illustration.png"
          alt="illustration"
          width={100}
          height={100}
          className="w-16 object-contain sm:w-24"
          quality={100}
        />
        <motion.h1 className='mt-8 w-full text-center text-[28px] font-bold leading-snug text-[#1B1A1E] md:w-4/6 md:text-[32px] lg:text-[42px]'>Bikin Soal Jadi Mudah: Cerdas, Cepat, dan Inovatif dengan AI!</motion.h1>
        <h2 className='mt-8 inline-flex gap-2'>
          <span className='font-bold'>{counter?.counter || 0}</span>
          Soal sudah di generate </h2>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }} className='relative mt-10'>
          <Button
            onPointerDownCapture={e => e.stopPropagation()}
            className='relative h-14 bg-emerald-500 text-lg hover:bg-emerald-500'
            size={"lg"}
            onClick={() => router.push('/generate')}
            type="button">
            {session?.data?.user ? "Mulai Generate" : "Coba Gratis Sekarang!"}
          </Button>
        </motion.div>

        <motion.div variants={secondVariants} transition={{ type: 'tween', ease: 'easeInOut' }} initial="initial" animate="animate" className='mt-5 flex w-full flex-col items-center'>
          <span className='opacity-75'>Powered by : <span className='font-bold'>GPT-4</span></span>
          <div className='mt-9 flex w-5/6 flex-row items-center justify-center gap-10 sm:w-2/6'>
            <Image src="/openai.png" alt="logo-1" width={100} height={100} quality={100} className="w-1/3 object-contain" />
            <Image src="/vercel.png" alt="logo-1" width={100} height={100} quality={100} className="w-1/3 object-contain" />
            <Image src="/aws.png" alt="logo-1" width={100} height={100} quality={100} className="w-1/3 object-contain" />
          </div>
        </motion.div>
      </div>
  )
}

export default SectionHeader