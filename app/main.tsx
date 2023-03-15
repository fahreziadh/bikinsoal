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

interface IParams {
    subject: string;
    grade: string;
    have_options?: boolean;
    total?: number;
}

interface Props {
    session: Session | null
    counter: number
}

const MainPage = ({ session, counter }: Props) => {
    const router = useRouter()
    const [subject, setSubject] = useState<string>("");
    const [grade, setGrade] = useState<string>("umum");
    const [haveOptions, setHaveOptions] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [topic, setTopic] = useState<string>("");
    const [total, setTotal] = useState<number>(0);
    const [state, setState] = useState<'onSetTotal' | 'onQuestionGenerated' | 'onLoading' | ''>('')

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
            setState('onSetTotal')
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
        setState('onLoading');
        reset()
        const response = await fetch("/api/request-question-trial", {
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
        const data = response.body;

        if (!data) {
            return;
        }

        const decoder = new TextDecoder();
        const reader = data.getReader();
        let buffer = ""
        let done = false;

        let tempQuestion: Question[] = [{
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
        setState('onQuestionGenerated');
        setTotal(0)
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
                <h2 className='mt-8'><span className='font-bold'>{counter}</span> Soal sudah di generate </h2>
                <form className="mt-10 flex w-full flex-col">
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="message-2">Mata Pelajaran / Subject</Label>
                        <SubjectChoice disabled={state === 'onLoading'} onChange={(value) => setSubject(value)} value={subject} />
                    </div>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: subject ? 1 : 0, height: subject ? "auto" : 0, display: subject ? "flex" : "none" }}
                        className='flex flex-col gap-2'>
                        <Label className='mt-4'>Topik Terkait</Label>
                        <Textarea onChange={(e) => setTopic(e.target.value)} value={topic} disabled={state === 'onLoading'} placeholder={`Seperti : ${!subject ? "materi pelajaran, kata kunci, dll." : mataPelajaran.find((v) => v.nama === subject)?.subTopik}`} />
                        <span className='text-xs text-zinc-500'>Kamu bisa memasukkan lebih dari satu topik.</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: subject ? 1 : 0, height: subject ? "auto" : 0, display: subject ? "flex" : "none" }}
                        className='flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-2'>

                        <div className='mt-4 flex w-full flex-col gap-2 sm:w-1/2'>
                            <Label>Tingkatan / Kelas</Label>
                            <Grade disabled={state === 'onLoading'} onChange={setGrade} value={grade} />
                        </div>
                        <div className='mt-4 flex w-full flex-col gap-2 sm:w-1/2'>
                            <Label>Pilihan Jawaban</Label>
                            <Options disabled={state === 'onLoading'} onChange={setHaveOptions} haveOptions={haveOptions} />
                        </div>

                    </motion.div>
                    <div className='mt-4 flex flex-row items-center justify-center gap-2'>
                        <Button
                            size={"lg"}
                            disabled={state === 'onLoading'}
                            onClick={onSubmit}
                            type="button">
                            {!session ? "Coba Gratis Sekarang" : null}
                            {state === 'onLoading' ? "Sedang Menulis..." : null}
                            {state === 'onQuestionGenerated' ? "Generate Lagi" : null}
                            {total === 0 && state === 'onSetTotal' ? "Pilih Jumlah Soal ->" : null}
                            {state === '' && session ? "Generate" : null}
                            {total > 0 && state === 'onSetTotal' ? `Generate ${total} Soal` : null}
                        </Button>
                        <motion.div initial={{ display: 'none', opacity: 0 }} transition={{ ease: 'easeInOut' }} animate={{ display: state === 'onSetTotal' ? 'flex' : 'none', opacity: state === 'onSetTotal' ? 1 : 0 }} className='inline-flex gap-2'>
                            <Button type='button' className='text-xs' variant="outline" onClick={() => setTotal(5)}>5 Soal</Button>
                            {/* <Button type='button' disabled={false} className='text-xs' variant="outline" onClick={() => setTotal(10)}>10 Soal 👑</Button>
                            <Button type='button' disabled={false} className='text-xs' variant="outline" onClick={() => setTotal(15)}>15 Soal 👑</Button>
                            <Button type='button' disabled={false} className='text-xs' variant="outline" onClick={() => setTotal(20)}>20 Soal 👑</Button> */}
                        </motion.div>
                    </div>
                </form>
            </div>
            <div className='flex w-full flex-col gap-7 py-8'>
                {state === 'onLoading' && questions.length === 0 && (
                    <h1 className='text-center text-2xl font-bold text-[#1B1A1E]' ref={soalRef}>Tunggu sebentar...</h1>
                )}
                {questions.length > 0 && (
                    <h1 className='text-center text-2xl font-bold text-[#1B1A1E]' ref={soalRef}>Soal yang sudah di generate</h1>
                )}

                {questions.map((q, index) => (
                    <ItemQuestion question={q} index={index + 1} key={index} />
                ))}
            </div>
        </div >
    )
}

export default MainPage;