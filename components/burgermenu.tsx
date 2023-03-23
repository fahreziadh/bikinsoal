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
import { LogIn, LogOut, Menu } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

export function BurgerMenu() {
    const { data: session } = useSession()
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
                {session?.user ?
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                    :
                    <DropdownMenuItem>
                        <Link href={"/login"} className="inline-flex items-center">
                            <LogIn className="mr-2 h-4 w-4" />
                            <span>Login</span>
                        </Link>
                    </DropdownMenuItem>
                }

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
