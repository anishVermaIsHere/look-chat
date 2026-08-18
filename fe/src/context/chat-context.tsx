import { createContext } from "react"
import type { UseChatHelpers } from "@ai-sdk/react"


export const ChatContext = createContext<UseChatHelpers | null>(null);
