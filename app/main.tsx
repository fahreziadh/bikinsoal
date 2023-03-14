"use client"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
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
}

const MainPage = ({ session }: Props) => {
    const router = useRouter()
    const [subject, setSubject] = useState<string>("");
    const [grade, setGrade] = useState<string>("umum");
    const [totalOption, setTotalOption] = useState<number>(0);

    const [responseBuffer, setResponseBuffer] = useState<string>("");
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
        setResponseBuffer("");
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
        let done = false;

        while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);

            setResponseBuffer((prev) => prev + chunkValue);
        }
        scrollToBios();
        setIsFetching(false);
    };

    useEffect(()=>{
        reset()
    },[totalOption])

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
                <h2 className='mt-8'><span className='font-bold'>120</span> Soal sudah di generate </h2>
                <form className="mt-10 flex w-full flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="message-2">Mata Pelajaran / Subject</Label>
                        <SubjectChoice disabled={isFetching} onChange={(value) => setSubject(value)} />
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
                {responseBuffer.split("(q)").length > 1 && <div className='flex w-full flex-col text-center'>
                    <h1 className='text-2xl font-bold text-[#1B1A1E]' ref={soalRef}>Soal yang sudah di generate</h1>
                </div>
                }
                {responseBuffer.split("(q)").map((question, index) => {
                    if (index === 0) {
                        return null;
                    }
                    return (
                        <div key={index} className="flex w-full flex-col rounded-lg bg-white p-7 shadow-md">
                            <div className='inline-flex gap-2'>
                                <span className='flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-black text-sm text-white'>{index}</span>
                                <span className='font-bold'>{totalOption > 0 ? question.split("(to)")[0] : question.split("(a)")[0]}</span>
                            </div>
                            <div className='mt-4 flex flex-col gap-4 pl-7 text-sm'>
                                {question.split("(a)")[0].split("(o)").map((option, index) => {
                                    if (index === 0) {
                                        return null;
                                    }
                                    return (
                                        <div key={index}>{option}</div>
                                    )
                                })}
                                {question.split("(a)")[1] && <div className='mt-4'><span className='font-bold'>Jawaban : </span>{question.split("(a)")[1]}</div>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MainPage;