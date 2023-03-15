import { Question } from '@/types/question'
import React from 'react'

interface Props {
    question: Question
    index: number
}

const ItemQuestion = ({ question: q, index }: Props) => {
    return (
        <div className="flex w-full flex-col rounded-lg bg-white p-7 shadow-md">
            <div className='inline-flex gap-2'>
                <span className='flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-black text-sm text-white'>{index}</span>
                <span className='font-bold'>{q?.question}</span>
            </div>
            <div className='mt-4 flex flex-col gap-4 pl-7 text-sm'>
                {q?.options?.map((option, index) => {
                    return (
                        <div key={index}>{option}</div>
                    )
                })}
                {q?.answer && <div className='mt-4'><span className='font-bold'>Jawaban : </span>{q?.answer}</div>}
            </div>
        </div>
    )
}

export default ItemQuestion