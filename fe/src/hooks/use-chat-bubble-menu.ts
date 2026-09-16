import type { MouseEvent } from "react"
import { useChatContext } from "@/context/chat-context"
import { Icons } from "@/widgets/icons"
import { useQueryClient } from "@tanstack/react-query"
import { deleteChat } from "@/features/chat/services/apis/chat"
import type { ChatOption } from "@/features/chat/types/chat"



export default function useChatBubbleMenu(){
  const queryClient = useQueryClient();
  const { chat: { setMessages }, setSelectedRenameChat } = useChatContext();

  return [
    {
      label: "Rename",
      handler: async (e: MouseEvent, chatId: string) => {
        e.stopPropagation();
        setSelectedRenameChat(chatId);
      },
      icon: Icons.pencil,
      type: "button",
    },
    {
      label: "Delete",
      handler: async (e: MouseEvent, chatId: string) => {
        e.stopPropagation();
        const res = await deleteChat(chatId);
        if (res?.data?.success) {
          await queryClient.invalidateQueries({
            queryKey: ["chats"],
          });
          setMessages([]);
        }
      },
      icon: Icons.trash,
      type: "button",
    }
  ] satisfies ChatOption[]
}