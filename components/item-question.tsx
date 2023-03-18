import { motion } from 'framer-motion'
import React from 'react'

interface Props {
  question: Question
  index: number
}

const ItemQuestion = ({ question: q, index }: Props) => {
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
              <span className="font-bold">{String.fromCharCode(97 + index)}.</span> {option}
            </div>
          )
        })}
        {q?.answer && (
          <div className="mt-4">
            Jawaban : <span className="font-bold text-emerald-500">{q?.answer}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ItemQuestion
