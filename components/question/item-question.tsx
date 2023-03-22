import { motion } from 'framer-motion'
import { Check, FolderPlus, Save } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '../ui/button'

interface Props {
  question: Question
  index: number
  subject: string
}

const ItemQuestion = ({ question: q, index, subject }: Props) => {

  const [isSaved, setIsSaved] = useState(false)
  const [iseLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    const res = await fetch('/api/questionbank', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: q.question,
        a: q.options?.[0] || null,
        b: q.options?.[1] || null,
        c: q.options?.[2] || null,
        d: q.options?.[3] || null,
        e: q.options?.[4] || null,
        answer: q.answer,
        subject
      })
    })

    if (res.status === 200) {
      setIsSaved(true)
    }

    setIsLoading(false)
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  const itemTransition = {
    type: 'spring',
    duration: 0.3,
    delay: index * 0.1, // tambahkan delay pada setiap item dengan nilai yang berbeda
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={itemTransition}
      className="flex w-full flex-col rounded-lg border p-7"
    >
      <div className="inline-flex gap-2">
        <span className="flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-black text-sm text-white">
          {index}
        </span>
        <span className="font-bold">{q?.question}</span>
      </div>

      <div className="mt-4 flex flex-col gap-4 pl-7 text-sm">
        {q?.options?.map((option, index) => {
          return (
            <div key={index}>
              {option}
            </div>
          )
        })}
        {q?.answer && (
          <div className="mt-4">
            Jawaban : <span className="font-bold text-emerald-500">{q?.answer}</span>
          </div>
        )}
      </div>

      <div className='mt-4 flex flex-row justify-end gap-2'>
        <Button className='inline-flex items-center justify-center' variant="outline" size="sm" onClick={()=>toast("Fitur sedang dikembangkan")}><FolderPlus className="mr-2 h-4 w-4" />Tambah ke grup</Button>
        <Button className='inline-flex items-center justify-center' variant="outline" size="sm" disabled={iseLoading || isSaved} onClick={() => !isSaved && handleSave()}>{isSaved ? <><Check className="mr-2 h-4 w-4 text-emerald-500" />Tersimpan</> : <><Save className="mr-2 h-4 w-4" />Simpan</>}</Button>
      </div>
    </motion.div>
  )
}

export default ItemQuestion
