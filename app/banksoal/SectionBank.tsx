import { Dialog } from '@/components/dialog'
import LoadingItemQuestionBank from '@/components/loading/loading-item-questionbank'
import Paginations from '@/components/pagination'
import ItemQuestionBank from '@/components/question/item-question-bank'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useDebounceValue from '@/hooks/use-debounce'
import { fetcher } from '@/lib/fetcher'
import { exportToXLSX } from '@/utils/exportexcel'
import { QuestionBank } from '@prisma/client'
import { Download, FolderPlus, Pointer, Trash, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

const SectionBank = () => {
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(20)
  const search = useSearchParams()
  const [select, setSelect] = useState<string[]>([])
  const [state, setState] = useState<"idle" | "onSelect">("idle");
  const [query, setQuery] = useState<string>(search?.get('query') || '')
  const [dialogOpen, setDialogOpen] = useState<"delete" | "">("")
  const router = useRouter()
  const queryDebounce = useDebounceValue(query, 500)
  const { data, isLoading, mutate } = useSWR<{ questions: QuestionBank[], pagination: { totalPage: number, currentPage: number, limit: number } }>(`/api/questionbank?query=${search?.get('query') || ''}&page=${page}&limit=${limit}}`, fetcher)

  useEffect(() => {
    if (queryDebounce) {
      router.push('/banksoal?query=' + queryDebounce)
    } else {
      router.push('/banksoal')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDebounce])

  const onCancelSelect = () => {
    setState('idle')
    setSelect([])
  }

  const onExportClick = () => {
    if (select.length === 0) return
    const se = data?.questions.filter(q => select.includes(q.id)).map(q => {
      return {
        'Mata Pelajaran': q.subject,
        // 'Kelas': q.grade,
        'Soal': q.question,
        'Jawaban': q.answer,
        'Pilihan A': q.a,
        'Pilihan B': q.b,
        'Pilihan C': q.c,
        'Pilihan D': q.d,
        'Pilihan E': q.e,
      }
    })
    exportToXLSX(se || [], `bikinsoal-${new Date().toISOString()}`)
    setDialogOpen('')
    setSelect([])
    setState('idle')
  }

  const onRemoveClick = () => {
    if (select.length === 0) return
    setDialogOpen('delete')
  }

  const onConfirmDelete = async () => {
    setDialogOpen('')
    await fetch('/api/questionbank', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: select })
    }).then(res => res.json())
      .catch(err => console.log(err))
      .finally(() => {
        mutate()
        setSelect([])
        setState('idle')
      })
  }


  return (
    <div className='container flex min-h-screen w-full flex-col '>
      <Dialog
        isOpen={dialogOpen === 'delete'}
        title='Yakin Hapus Soal'
        onCancel={() => setDialogOpen('')}
        onConfirm={() => onConfirmDelete()}
      >
      </Dialog>

      <div className='mb-4 flex w-full flex-row items-center justify-between gap-2 lg:gap-12'>
        <div className='flex grow'>
          {state === "idle" && <Input placeholder='Cari Soal' value={query} onChange={(e) => setQuery(e.target.value)} />}
        </div>
        <div className='inline-flex items-center justify-end gap-2 lg:w-3/6'>
          {state === 'idle' && <Button onClick={() => setState('onSelect')}><Pointer className="mr-2 h-4 w-4" />Pilih</Button>}
          {state === 'onSelect' &&
            <>
              <Button onClick={onCancelSelect}><X className="h-4 w-4"/></Button>
              <Button variant="destructive" onClick={onRemoveClick}><Trash className="h-4 w-4" /></Button>
              <Button variant="outline" onClick={onExportClick}><Download className="h-4 w-4" /></Button>
              <Button variant="outline" onClick={()=>toast("Fitur ini masih dalam pengembangan")}><FolderPlus className="mr-2 h-4 w-4" />Masuk ke Grup</Button>
            </>}

        </div>
      </div>


      <div className='min-w-[900px]'>

        <div className='mb-2 flex flex-row items-center gap-4 rounded-md border p-3 text-sm text-zinc-600'>
          <h2 className="mx-8 w-1/3 overflow-hidden truncate font-medium hover:text-clip">
            Pertanyaan
          </h2>
          <span className='w-2/12 rounded-full'>
            Jenis
          </span>

          <span className='w-2/12 rounded-full'>
            Mata Pelajaran
          </span>

          <span className='w-2/12 rounded-full'>
            Dibuat
          </span>
          <span className='w-2/12 rounded-full'>
          </span>
        </div>

        {isLoading && <div className='flex flex-col'>{[...Array(5)].map((_, index) => (<LoadingItemQuestionBank key={index} />))}</div>}

        {!isLoading && !data?.questions.length && <div className='flex flex-col p-3'>Tidak ada data</div>}

        {data && data?.questions?.length > 0 && <div className="rounded-md border">
          {data?.questions?.map((item, index) => (
            <div
              className='cursor-pointer'
              //toggle select or unselect
              onClick={() => {
                if (state === "idle") return setSelect([])
                if (state === "onSelect") {
                  if (select.includes(item.id)) {
                    setSelect(select.filter((i) => i !== item.id))
                  } else {
                    setSelect([...select, item.id])
                  }
                }
              }}
              key={item.id} >
              <ItemQuestionBank
                iseSelected={select.includes(item.id)}
                index={(page - 1) * limit + (index + 1)}
                question={item} />
            </div>
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
    </div>
  )
}

export default SectionBank