"use client"
import { Button } from '@/components/ui/button'
import { getToken } from 'next-auth/jwt';
import { useState } from 'react';

const Page = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const generate = async () => {

    };
    return (
        <div className='container mt-4 flex flex-col gap-2'>
            <Button onClick={generate}>Generate</Button>
            <div className='flex flex-col gap-1'>
                {questions.map((question, index) => {
                    return <div key={index} className="border p-4">
                        <p>{index + 1}</p>
                        <p>{question.question}</p>
                        <p>{JSON.stringify(question.options)}</p>
                        <p>{question.answer}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Page