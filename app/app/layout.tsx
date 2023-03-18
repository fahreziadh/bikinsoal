import Sidebar from "@/components/sidebar"
import "@/styles/globals.css"

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container">
            <Sidebar />
            <main>
                {children}
            </main>
        </div>
    )
}
