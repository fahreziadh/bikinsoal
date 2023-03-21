import { cn } from '@/lib/utils'
import { QuestionBank } from '@prisma/client'
import { motion } from 'framer-motion'
import React from 'react'

interface Props {
    question: QuestionBank
    index: number
}

const ItemQuestionBank = ({ question, index }: Props) => {

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    }

    const itemTransition = {
        type: 'spring',
        duration: 0.3,
        delay: index * 0.05, // tambahkan delay pada setiap item dengan nilai yang berbeda
    }


    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={itemTransition}
            className="flex flex-row items-center gap-4 border-b p-3 text-sm hover:bg-zinc-100">
            <span className="w-4 font-light text-zinc-600">{index}.</span>
            <h2 className="mr-8 w-1/3 overflow-hidden truncate font-medium hover:text-clip"      >
                {question.question}
            </h2>
            <span
                className={cn(
                    'rounded-full px-4 py-1 text-xs font-bold ',
                    question.a ? ' border border-indigo-500 bg-indigo-100 text-indigo-500' : 'border border-teal-500 bg-teal-100 text-teal-500'
                )}
            >
                {question.a ? 'Pilihan Ganda' : 'Essay'}
            </span>
        </motion.div>
    )
}

export default ItemQuestionBank
