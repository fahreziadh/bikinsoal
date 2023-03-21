import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='flex min-h-[100px] min-w-[300px] flex-col items-start gap-2'>
      <Link prefetch={false} href={"/generate"} className="rounded-md px-3 py-2 text-sm font-bold transition hover:bg-zinc-100">Generate</Link>
      <Link prefetch={false} href={"/banksoal"} className="rounded-md px-3 py-2 text-sm font-bold transition hover:bg-zinc-100">Bank Soal</Link>
      <Link prefetch={false} href={"/payment"}  className="rounded-md px-3 py-2 text-sm font-bold transition hover:bg-zinc-100">Pembyaran</Link>
    </div>
  )
}

export default Sidebar