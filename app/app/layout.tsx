import "@/styles/globals.css"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container mt-32 flex flex-row">
            {children}
        </div>
    )
}
