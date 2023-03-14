"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const grades = [
    "1 SD",
    "2 SD",
    "3 SD",
    "4 SD",
    "5 SD",
    "6 SD",
    "7 SMP",
    "8 SMP",
    "9 SMP",
    "10 SMA",
    "11 SMA",
    "12 SMA",
    "Umum"
]


interface Props {
    onChange?: (value: string) => void
    disabled?: boolean
}

export function Grade({ onChange, disabled }: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    React.useEffect(() => {
        onChange?.(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-white"
                >
                    {value
                        ? value
                        : "Umum"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className="max-h-96 ">
                    <CommandInput disabled={disabled} placeholder="Cari tingkatan..." />
                    <CommandEmpty>No grade found.</CommandEmpty>
                    <CommandGroup heading="Pilih Tingkat Sekolah">
                        {grades.map((grade) => (
                            <CommandItem
                                key={grade}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === grade ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {grade}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
