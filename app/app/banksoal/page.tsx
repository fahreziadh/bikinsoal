"use client"
import LoadingItemQuestionBank from '@/components/loading/loading-item-questionbank'
import Paginations from '@/components/pagination'
import ItemQuestionBank from '@/components/question/item-question-bank'
import { Input } from '@/components/ui/input'
import useDebounceValue from '@/hooks/use-debounce'
import { fetcher } from '@/lib/fetcher'
import { QuestionBank } from '@prisma/client'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'

const Page = () => {
  const [query, setQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)

  const queryDebounce = useDebounceValue(query, 500)

  const { data, isLoading } = useSWR<{ questions: QuestionBank[], pagination: { totalPage: number, currentPage: number, limit: number } }>(`/api/questionbank?query=${queryDebounce}&page=${page}&limit=${limit}}`, fetcher)


  return (
    <div className='flex min-h-screen w-full flex-col'>
      <h1 className='mb-8 text-2xl font-bold'>List Soal</h1>
      <div className='mb-4 inline-flex w-full items-center gap-2'>
        <Input placeholder='Cari Soal' className='w-6/12' value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className='mb-2 flex flex-row items-center gap-4 rounded-md border p-3 text-sm text-zinc-600'>
        <h2 className="mr-12 w-1/3 overflow-hidden truncate font-medium hover:text-clip">
          Pertanyaan
        </h2>
        <span className='rounded-full px-4 py-1'>
          Jenis
        </span>
      </div>

      {isLoading && <div className='flex flex-col'>{[...Array(5)].map((_, index) => (<LoadingItemQuestionBank key={index} />))}</div>}
      {!isLoading && !data?.questions.length && <div className='flex flex-col p-3'>Tidak ada data</div>}

      {data && data?.questions?.length > 0 && <div className="rounded-md border">
        {data?.questions?.map((item, index) => (
          <Link key={item.id} href="/"><ItemQuestionBank index={index + 1} question={item} /></Link>
        ))}
      </div>
      }
      <Paginations
        onClick={(page) => setPage(page)}
        className='mt-4 self-end'
        total={data?.pagination.totalPage}
        currentPage={data?.pagination.currentPage}
      />
    </div>
  )
}

export default Page