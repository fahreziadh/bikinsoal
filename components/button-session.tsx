"use client"
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

interface Props {
    session: Session | null
}
const ButtonSession = ({ session }: Props) => {
    return (
        <Button onClick={() => { session?.user ? signOut() : signIn() }}>{session?.user ? "Logout" : "Login"}</Button>
    )
}

export default ButtonSession