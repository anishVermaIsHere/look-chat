import { type ReactNode } from "react"
import ChatPanel from "./chat-panel"

const AppLayout = ({ children }: { children?: ReactNode }) => {
    return <div className="h-screen flex items-center justify-center">
    <ChatPanel />
    {children}
    </div>
}

export default AppLayout