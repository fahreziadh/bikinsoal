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
import { mapel } from "@/lib/mapel"

interface Props {
    onChange?: (value: string) => void
}

export function SubjectChoice({ onChange }: Props) {
    const [value, setValue] = useState("")
    const [showSuggestion, setShowSuggestion] = useState(false)

    const hideSuggestionWithDelay = () => {
        setTimeout(() => {
            setShowSuggestion(false)
        }, 150)
    }

    useEffect(() => {
        onChange?.(value)
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [value])

    return (
        <Command className="rounded-md border">
            <CommandInput required value={value} onValueChange={(e) => setValue(e)} placeholder="Ketik Mata Pelajaran, Misal : IPA, Matematika, dll." onFocus={(e) => setShowSuggestion(true)} onBlur={hideSuggestionWithDelay} />
            <CommandList hidden={!showSuggestion} className="max-h-40">
                <CommandEmpty>Belum ada mapel untuk <span className="font-bold">{value}</span>, <button type="button">Tetap Cari</button></CommandEmpty>
                <CommandGroup heading="Pilih Mata Pelajaran" onSelect={(s) => { }}>
                    {mapel.map((item) => (
                        <CommandItem key={item} onSelect={(currentValue) => { setValue(currentValue); setShowSuggestion(false) }}>
                            <span>{item}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}