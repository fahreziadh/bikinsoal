"use client"

import * as React from "react"
import { Calendar, ChevronsUpDown, MoreHorizontal, Pen, Tags, Trash, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sma = [
    {
        label: "1",
        value: "1 SMA",
    },
    {
        label: "2",
        value: "2 SMA",
    },
    {
        label: "3",
        value: "3 SMA",
    },
]

const smp = [
    {
        label: "1",
        value: "1 SMP",
    },
    {
        label: "2",
        value: "2 SMP",
    },
    {
        label: "3",
        value: "3 SMP",
    },
]

const sd = [
    {
        label: "1",
        value: "1 SD",
    },
    {
        label: "2",
        value: "2 SD",
    },
    {
        label: "3",
        value: "3 SD",
    },
    {
        label: "4",
        value: "4 SD",
    },
    {
        label: "5",
        value: "5 SD",
    },
    {
        label: "6",
        value: "6 SD",
    },
]

interface Props {
    onChange?: (value: string) => void
    value?: string
    disabled?: boolean
}

export function Grade({ onChange, value, disabled = false }: Props) {
    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button
                        disabled={disabled}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between bg-white">
                        {
                            value
                                ? value
                                : "Pilih Kelas"
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={()=>onChange?.('Umum')}>
                            Umum
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        {/* SD */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                SD
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {sd.map((item) => (
                                                <CommandItem
                                                    key={item.label}
                                                    onSelect={(value) => {
                                                        onChange?.(item.value)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {item.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        {/* SMP */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                SMP
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {smp.map((item) => (
                                                <CommandItem
                                                    key={item.label}
                                                    onSelect={(value) => {
                                                        onChange?.(item.value)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {item.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>


                        {/* SMA */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                SMA
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent className="p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {sma.map((item) => (
                                                <CommandItem
                                                    key={item.label}
                                                    onSelect={(value) => {
                                                        onChange?.(item.value)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {item.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </DropdownMenuSubContent>
                        </DropdownMenuSub>

                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
