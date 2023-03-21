"use client"



import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Menu } from "lucide-react"
import Link from "next/link"

export function BurgerMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"><Menu className="h-4 w-4" /> </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link prefetch={false} href="/generate">
                        <DropdownMenuItem>
                            Generate Soal
                        </DropdownMenuItem>
                    </Link>

                    <Link prefetch={false} href="/banksoal">
                        <DropdownMenuItem>
                            Bank Soal
                        </DropdownMenuItem>
                    </Link>

                    <Link prefetch={false} href="/myaccount">
                        <DropdownMenuItem>
                            Akun Saya
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
