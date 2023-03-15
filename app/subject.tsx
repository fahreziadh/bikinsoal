"use client"

import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { useEffect, useRef, useState } from "react"
import { mataPelajaran } from "@/lib/mapel"

interface Props {
    onChange?: (value: string) => void
    value?: string
    disabled?: boolean
}

export function SubjectChoice({ onChange, value, disabled }: Props) {
    const [showSuggestion, setShowSuggestion] = useState(false)

    const hideSuggestionWithDelay = () => {
        setTimeout(() => {
            setShowSuggestion(false)
        }, 150)
    }

    return (
        <Command className="rounded-md border">
            <CommandInput disabled={disabled} value={value} onValueChange={(e) => onChange?.(e)} placeholder="Ketik Mata Pelajaran, Misal : IPA, Matematika, dll." onFocus={(e) => setShowSuggestion(true)} onBlur={hideSuggestionWithDelay} />
            <CommandList hidden={!showSuggestion} className="max-h-40">
                <CommandEmpty>Belum ada mapel untuk <span className="font-bold">{value}</span>, <button type="button">Tetap Cari</button></CommandEmpty>
                <CommandGroup heading="Pilih Mata Pelajaran" onSelect={(s) => { }}>
                    {mataPelajaran.map((item) => (
                        <CommandItem key={item.nama} onSelect={(currentValue) => { onChange?.(currentValue); setShowSuggestion(false) }}>
                            <span>{item.nama}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}