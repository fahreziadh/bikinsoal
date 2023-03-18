import "@/styles/globals.css"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container flex flex-row">
            {children}
        </div>
    )
}
