import { useContext } from "react"
import { ChatContext } from "@/context/chat-context"
import { Icons } from "@/widgets/icons"
import { useQueryClient } from "@tanstack/react-query"
import { deleteChat } from "@/services/apis/chat"
import type { ChatOption } from "@/types/chat";



export default function useChatBubbleMenu(){
  const queryClient = useQueryClient();
  const { chat: { setMessages }} = useContext(ChatContext);

  return [
    {
      label: "Rename",
      handler: (chatId: string) => {},
      icon: Icons.pencil,
      type: "button",
    },
    {
      label: "Delete",
      handler: async (chatId: string) => {
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