import { cn } from '@/lib/utils'
import React from 'react'
import { Button } from './ui/button'

interface Props {
    total?: number
    limit?: number
    currentPage?: number
    className?: string
    onClick?: (page: number) => void
}

const Paginations = ({ total = 0, className = "", currentPage = 0, limit = 0, onClick }: Props) => {
    return (
        <div className={cn('inline-flex gap-1', className)}>
            {[...Array(total)].map((_, index) => (
                <Button
                    key={index}
                    disabled={currentPage === index + 1}
                    variant={currentPage === index + 1 ? 'default' : 'ghost'}
                    className="text-xs"
                    onClick={() => onClick && onClick(index + 1)}>
                    {index + 1}
                </Button>
            ))}
        </div>
    )
}

export default Paginations