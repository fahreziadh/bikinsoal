import { cn } from '@/lib/utils'
import { QuestionBank } from '@prisma/client'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import React from 'react'

interface Props {
    question: QuestionBank
    index: number
}

const ItemQuestionBank = ({ question, index }: Props) => {


    return (
        <motion.div
            className="flex flex-row items-center gap-4 border-b p-3 text-sm hover:bg-zinc-50">
            <span className="w-4 font-light text-zinc-600">{index}.</span>
            <h2 className="mr-8 w-4/12 overflow-hidden truncate font-medium hover:text-clip"      >
                {question.question}
            </h2>
            <div className='w-2/12'>
                <span
                    className={cn(
                        'rounded-full px-4 py-1 text-xs font-bold ',
                        question.a ? ' border border-indigo-500 bg-indigo-100 text-indigo-500' : 'border border-teal-500 bg-teal-100 text-teal-500'
                    )}>
                    {question.a ? 'Pilihan Ganda' : 'Essay'}
                </span>
            </div>
            <div className='w-2/12'>
                <span>{question.subject || '-'}</span>
            </div>
            <div className='w-2/12 text-xs'>
                <span>{dayjs(question.createdAt).format("HH:mm, D MMM YYYY")}</span>
            </div>
        </motion.div>
    )
}

export default ItemQuestionBank
