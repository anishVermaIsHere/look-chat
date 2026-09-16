import { createContext, useContext } from "react"
import type { UIMessage, UseChatHelpers } from "@ai-sdk/react"

export type ChatCTX = {
  chat: UseChatHelpers<UIMessage>;
  input: string,
  chatId: string,
  selectedRenameChat: string,
  setInput: (input: string)=>void,
  setChatId: (chatId: string)=>void,
  setSelectedRenameChat: (chatId: string)=>void
}

export const ChatContext = createContext<ChatCTX | null>(null);

export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChatContext must be used inside ChatContext.Provider"
    );
  }

  return context;
}
