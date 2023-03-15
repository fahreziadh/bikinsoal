"use client"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { SubjectChoice } from './subject';
import { useSession } from "next-auth/react"
import { Session } from 'next-auth';
import { Grade } from './grade';
import { Options } from './options';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface IParams {
    subject: string;
    grade: string;
    total_option?: number;
}

interface Props {
    session: Session | null
    counter: number
}

interface IQuestions {
    id: number;
    question: string;
    options: string[];
    answer: string;
}


const MainPage = ({ session, counter }: Props) => {
    const router = useRouter()
    const [subject, setSubject] = useState<string>("");
    const [grade, setGrade] = useState<string>("umum");
    const [totalOption, setTotalOption] = useState<number>(0);
    const [questions, setQuestions] = useState<IQuestions[]>([]);

    const [isFetching, setIsFetching] = useState<boolean>(false);
    const soalRef = useRef<null | HTMLDivElement>(null);

    const scrollToBios = () => {
        if (soalRef.current !== null) {
            soalRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const onSubmit = async () => {
        if (!session?.user) {
            router.push("/api/auth/signin")
            return;
        }

        if (subject === "") {
            toast("Pilih mata pelajaran terlebih dahulu", { position: 'bottom-center' })
            return;
        }
        await generate({ subject, grade, total_option: totalOption });
    }

    const reset = () => {
        setQuestions([])
    }

    const generate = async ({ grade = "umum", subject, total_option = 4 }: IParams) => {
        setIsFetching(true);
        reset()
        const response = await fetch("/api/request-question-trial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subject: subject,
                grade: grade,
                total_option: total_option,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // This data is a ReadableStream
        const data = response.body;

        if (!data) {
            return;
        }

        const decoder = new TextDecoder();
        const reader = data.getReader();
        let buffer = ""
        let done = false;

        let tempQuestion: IQuestions[] = [{
            id: 0,
            question: "",
            options: [''],
            answer: ""
        }]

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            buffer += chunkValue;

            // remember the format is <q> pertanyaan </q> <options><o>opsi1<o><o>opsi..</o/><options> <a> opsi yang benar </a> and </break> is the end of question
            buffer.split("<break/>").map((object, index) => {
                //format looks like  <q> Jika a = 5 dan b = 3, berapa hasil dari 2a + b ? </q> <options>A|B|C|D</options> <a> 13 </a>
                const question = object.split("<q>")[1]?.split("</q>")[0]
                const options = object.split("<options>")[1]?.split("</options>")[0]
                const answer = object.split("<a>")[1]?.split("</a>")[0]
                if (!question && !options && !answer) {
                    return
                }

                tempQuestion[index] = {
                    id: index,
                    question,
                    options: options?.split("||"),
                    answer
                }
                // add tempQuestion to setQuestions with the previous state of questions with the id as index
                setQuestions((prevQuestions) => {
                    const updatedQuestions = [...prevQuestions];
                    updatedQuestions[index] = tempQuestion[index];
                    return updatedQuestions;
                }
                )

            })
        }

        scrollToBios();
        addQuestionTotal()
        setIsFetching(false);
    };

    const addQuestionTotal = async (total = 5) => {
        await fetch("/api/counter?total=" + total)
    }

    useEffect(() => {
        reset()
    }, [totalOption])

    return (
        <div className='container'>
            <div className="flex flex-col items-center justify-center bg-[url('/bg-transparent.svg')] py-10">
                <Image
                    src="/illustration.png"
                    alt="illustration"
                    width={100}
                    height={100}
                    quality={100}
                />
                <h1 className='mt-8 text-center text-[40px] font-bold leading-none text-[#1B1A1E] sm:text-[60px]'>Generate Soal Ujian di bantu AI</h1>
                <h2 className='mt-8'><span className='font-bold'>{counter}</span> Soal sudah di generate </h2>
                <form className="mt-10 flex w-full flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="message-2">Mata Pelajaran / Subject</Label>
                        <SubjectChoice disabled={isFetching} onChange={(value) => setSubject(value)} value={subject} />
                    </div>
                    <div className='flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-2'>
                        <div className='flex w-full flex-col gap-2 sm:w-1/2'>
                            <Label>Tingkatan / Kelas</Label>
                            <Grade disabled={isFetching} onChange={(value) => setGrade(value)} />
                        </div>
                        <div className='flex w-full flex-col gap-2 sm:w-1/2'>
                            <Label>Pilihan Jawaban</Label>
                            <Options disabled={isFetching} onChange={(value) => { value != "essay" ? setTotalOption(Number(value)) : setTotalOption(0) }} />
                        </div>

                    </div>

                    <Button disabled={isFetching} className='mt-2' onClick={onSubmit} type="button">{isFetching ? "Sedang Menulis..." : "Generate Soal 📃"}</Button>
                </form>
            </div>
            <div className='flex w-full flex-col gap-7 py-8'>
                {isFetching && questions.length === 0 && (
                    <h1 className='text-2xl font-bold text-[#1B1A1E]' ref={soalRef}>Tunggu sebentar...</h1>
                )}
                {questions.length > 0 && (
                    <h1 className='text-2xl font-bold text-[#1B1A1E]' ref={soalRef}>Soal yang sudah di generate</h1>
                )}

                {questions.map((q, index) => (
                    <div key={index} className="flex w-full flex-col rounded-lg bg-white p-7 shadow-md">
                        <div className='inline-flex gap-2'>
                            <span className='flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-black text-sm text-white'>{index + 1}</span>
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
                ))}
            </div>
        </div >
    )
}

export default MainPage;