import { type ReactNode } from "react"
import ChatPanel from "../chat/chat-panel"
import { SidebarProvider } from "../ui/sidebar"
import AppSidebar from "./sidebar"


const AppLayout = ({ children }: { children?: ReactNode }) => {
    return (
    <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
            <ChatPanel />
            {children}
        </main>
    </SidebarProvider>
    )
}

export default AppLayout