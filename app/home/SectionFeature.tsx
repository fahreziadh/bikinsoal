"use client"
import { motion } from 'framer-motion'
import { Activity, Boxes, ChevronUp, ClipboardList, Cpu, Timer } from 'lucide-react'
import React from 'react'

interface FeatureItemProps {
  icon: React.ReactNode
  title?: string
  description?: string
}

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <div className='flex flex-col'>
      <div className='inline-flex items-center'>
        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-200 text-emerald-500'>{icon}</div>
        <span className='ml-6 text-lg font-bold'>{title}</span>
      </div>
      <p className='mt-7'>
        {description}
      </p>
    </div>
  )
}

const SectionFeature = () => {
  return (
    <motion.div className='mt-20 flex w-full flex-col'>
      <h1 className='text-2xl font-bold text-emerald-500'>Fitur</h1>
      <h2 className='mt-3 text-xl font-bold leading-snug md:text-2xl lg:text-4xl xl:text-5xl'>Keunggulan Bikinsoal.com<br />Antara Lain:</h2>
      <div className='mt-20 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3'>
        <FeatureItem title={"Hemat Waktu"} description={"AI otomatis menghasilkan soal, membebaskan pengajar untuk fokus pada aspek pendidikan lainnya."} icon={<Timer className="text-2xl " />} />
        <FeatureItem title={"Variasi Soal Luas"} description={"Soal menantang dan unik mengurangi risiko kebocoran dan meningkatkan kualitas ujian."} icon={<Boxes className="text-2xl " />} />
        <FeatureItem title={"Kesulitan yang Fleksibel"} description={"Kesulitan yang Fleksibel Sesuaikan tingkat kesulitan sesuai kebutuhan, cocok untuk berbagai jenis ujian."} icon={<ChevronUp className="text-2xl " />} />
        <FeatureItem title={"Materi Lintas Bidang"} description={"Cocok untuk beragam mata pelajaran, mulai dari matematika hingga ilmu sosial."} icon={<ClipboardList className="text-2xl " />} />
        <FeatureItem title={"Integrasi Bank Soal"} description={"Impor dan kelola bank soal lama, memudahkan transisi ke sistem baru."} icon={<Activity className="text-2xl " />} />
        <FeatureItem title={"AI yang Berkembang"} description={"Kami menggunakan GPT-4 yang baru saja di release oleh OpenAI, Sehingga soal yang diberikan lebih akurat."} icon={<Cpu className="text-2xl " />} />
      </div>
    </motion.div>
  )
}

export default SectionFeature