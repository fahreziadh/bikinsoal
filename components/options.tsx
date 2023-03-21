"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const options = [
  "Essay",
  "Pilihan Ganda",
]

interface Props {
  // eslint-disable-next-line no-unused-vars
  onChange?: (haveOptions: boolean) => void
  haveOptions?: boolean
  disabled?: boolean
}

export function Options({ onChange, disabled, haveOptions }: Props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white"
        >
          {haveOptions
            ? "Pilihan Ganda"
            : "Essay"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option}
                onSelect={(currentValue) => {
                  onChange?.(currentValue === 'pilihan ganda' ? true : false)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    option === (haveOptions ? 'Pilihan Ganda' : 'Essay') ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
