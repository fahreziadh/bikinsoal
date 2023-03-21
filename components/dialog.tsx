"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Props {
    isOpen?: boolean
    onConfirm?: () => void
    onCancel?: () => void
    title?: string
    children?: React.ReactNode
}

export function Dialog({ isOpen, onConfirm, onCancel, title, children }: Props) {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {children}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {onCancel && <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>}
                    {onConfirm && <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
