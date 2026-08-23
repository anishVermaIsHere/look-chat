import { type ReactNode } from "react"
import ChatPanel from "@/features/chat/components/chat-panel"
import { SidebarProvider } from "../ui/sidebar"
import AppSidebar from "./sidebar"
import { ChatProvider } from "@/features/chat/provider/chat-provider"


const AppLayout = ({ children }: { children?: ReactNode }) => {
    return (
        <ChatProvider>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <ChatPanel />
                    {children}
                </main>
            </SidebarProvider>
        </ChatProvider>
    )
}

export default AppLayout