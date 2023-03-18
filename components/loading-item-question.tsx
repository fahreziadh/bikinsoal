import { motion } from 'framer-motion'
import React from 'react'

const LoadingItemQuestion = () => {
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, type: 'spring' }}
            className="flex w-full flex-col rounded-lg  border p-7"
        >
            <div className="flex animate-pulse space-x-4">
                <div className="h-6 w-6 rounded-full bg-zinc-300"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-zinc-300"></div>
                    <div className="space-y-3">
                        <motion.div variants={itemVariants}>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="col-span-2 h-2 rounded bg-zinc-300"></div>
                                <div className="col-span-1 h-2 rounded bg-zinc-300"></div>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <div className="h-2 rounded bg-zinc-300"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default LoadingItemQuestion