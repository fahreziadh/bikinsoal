"use client"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { SubjectChoice } from '../components/subject';
import { Session } from 'next-auth';
import { Options } from '../components/options';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { mataPelajaran } from '@/lib/mapel';
import { Input } from '@/components/ui/input';
import { Grade } from '../components/grade';
import ItemQuestion from '@/components/item-question';
import { Question } from '@/types/question';
import { Slider } from '@/components/ui/slider';
import LoadingItemQuestion from '@/components/loading-item-question';
import useSWR from 'swr'

interface IParams {
    subject: string;
    grade: string;
    have_options?: boolean;
    total?: number;
}

interface Props {
    session: Session | null
}

const fetcher = (url) => fetch(url).then(res => res.json())

const MainPage = ({ session }: Props) => {
    const router = useRouter()
    const [subject, setSubject] = useState<string>("");
    const [grade, setGrade] = useState<string>("umum");
    const [haveOptions, setHaveOptions] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [topic, setTopic] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0)


    const { data: counter, error } = useSWR('/api/getcounter', fetcher)


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

        if (total === 0) {
            return;
        }

        if (subject === "") {
            toast("Pilih mata pelajaran terlebih dahulu", { position: 'bottom-center' })
            return;
        }
        await generate({ subject, grade, have_options: haveOptions, total: total });
    }

    const reset = () => {
        setQuestions([])
    }

    const generate = async ({ grade = "umum", subject, have_options = false, total }: IParams) => {
        setIsLoading(true)
        reset()
        const response = await fetch("/api/question", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subject: subject,
                grade: grade,
                have_options: haveOptions,
                topic: topic,
                total: total,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        // This data is a ReadableStream
        const { json: { choices } } = await response.json()
        const data = choices[0].message.content.trim()
        const jsonParsed = JSON.parse(data)

        setQuestions(jsonParsed)
        setIsLoading(false)
        scrollToBios();
        addQuestionTotal()
    };

    const addQuestionTotal = async (total = 5) => {
        await fetch("/api/counter?total=" + total)
    }

    useEffect(() => {
        reset()
    }, [haveOptions, grade, subject])

    return (
        <div className='container'>
            <div className="flex flex-col items-center justify-center bg-[url('/bg-transparent.svg')] pb-10 pt-24">
                <Image
                    src="/illustration.png"
                    alt="illustration"
                    width={100}
                    height={100}
                    quality={100}
                />
                <h1 className='mt-8 text-center text-[40px] font-bold leading-none text-[#1B1A1E] sm:text-[60px]'>Generate Soal Ujian di bantu AI</h1>
                <h2 className='mt-8 inline-flex gap-2'>
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className='font-bold'>{counter?.counter}</span>
                    </motion.div>
                    Soal sudah di generate </h2>
                <form className="mt-10 flex w-full flex-col">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="message-2">Mata Pelajaran / Subject</Label>
                        <SubjectChoice disabled={isLoading} onChange={(value) => setSubject(value)} value={subject} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: subject ? 1 : 0, height: subject ? "auto" : 0, display: subject ? "flex" : "none" }}
                        className='flex flex-col gap-2'>
                        <Label className='mt-4'>Topik Terkait</Label>
                        <Textarea onChange={(e) => setTopic(e.target.value)} value={topic} disabled={isLoading} placeholder={`Seperti : ${!subject ? "materi pelajaran, kata kunci, dll." : mataPelajaran.find((v) => v.nama === subject)?.subTopik}`} />
                        <span className='text-xs text-zinc-500'>Kamu bisa memasukkan lebih dari satu topik.</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: subject ? 1 : 0, height: subject ? "auto" : 0, display: subject ? "flex" : "none" }}
                        className='flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-2'>

                        <div className='mt-4 flex w-full flex-col gap-2 sm:w-1/2'>
                            <Label>Tingkatan / Kelas</Label>
                            <Grade disabled={isLoading} onChange={setGrade} value={grade} />
                        </div>
                        <div className='mt-4 flex w-full flex-col gap-2 sm:w-1/2'>
                            <Label>Pilihan Jawaban</Label>
                            <Options disabled={isLoading} onChange={setHaveOptions} haveOptions={haveOptions} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: subject ? 1 : 0, height: subject ? "auto" : 0, display: subject ? "flex" : "none" }}
                        className='flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-2'>

                        <div className='mt-4 flex w-full flex-col gap-2'>
                            <Label>Jumlah Soal <span className='text-lg font-bold'>--{total}--</span></Label>
                            <Slider disabled={isLoading} defaultValue={[0]} max={20} step={5} onValueChange={(e) => setTotal(e[0])} />
                        </div>
                    </motion.div>
                    <div className='mt-4 flex flex-row items-center justify-center gap-2'>
                        <Button
                            className='h-14 bg-emerald-500 text-lg hover:bg-emerald-400'
                            size={"lg"}
                            disabled={isLoading}
                            onClick={onSubmit}
                            type="button">
                            {isLoading ? "Sedang Menulis..." : "Generate"}
                        </Button>
                    </div>
                </form>
            </div>
            <div className='flex w-full flex-col gap-7 py-8'>
                {isLoading && questions.length === 0 && (
                    <h1 className='text-center text-2xl font-bold text-[#1B1A1E]' ref={soalRef}>Tunggu sebentar...</h1>
                )}
                {questions.length > 0 && (
                    <h1 className='text-center text-2xl font-bold text-[#1B1A1E]' ref={soalRef}>Soal yang sudah di generate</h1>
                )}


                {questions.map((q, index) => (
                    <ItemQuestion question={q} index={index + 1} key={index} />
                ))}

                {isLoading && questions.length === 0 && (
                    [1, 2, 3, 4, 5].map(item => (
                        <LoadingItemQuestion key={item} />
                    ))
                )}
            </div>
        </div >
    )
}

export default MainPage;