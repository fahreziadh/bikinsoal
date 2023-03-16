import { motion } from 'framer-motion'
import React from 'react'

const LoadingItemQuestion = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} transition={{ duration: 0.5, ease: 'easeInOut' }} animate={{ opacity: 1, y: 0 }} className="flex w-full flex-col rounded-lg  border p-7">
            <div className="flex animate-pulse space-x-4">
                <div className="h-6 w-6 rounded-full bg-zinc-300"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-zinc-300"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 h-2 rounded bg-zinc-300"></div>
                            <div className="col-span-1 h-2 rounded bg-zinc-300"></div>
                        </div>
                        <div className="h-2 rounded bg-zinc-300"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default LoadingItemQuestion