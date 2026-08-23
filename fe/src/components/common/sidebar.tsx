import { useContext } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import useAuthStore from "@/store/auth"
import { getUserChats } from "@/features/user/services/apis/user"
import { getChat } from "@/features/chat/services/apis/chat"
import { useQuery } from "@tanstack/react-query"
import Spinner from "@/widgets/spinner"
import ChatOptions from "@/features/chat/components/chat-option"
import type { ChatData, ResponseMessage } from "@/features/chat/types/chat"
import useChatBubbleMenu from "@/hooks/use-chat-bubble-menu"
import { ChatContext } from "@/context/chat-context"
import BrandLogo from "@/widgets/logo"


export default function AppSidebar() {
  const { user } = useAuthStore(s=>s);
  const menu = useChatBubbleMenu();
  const { chatId, setChatId, chat } = useContext(ChatContext)
  const { isPending, data } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => await getUserChats(user?.id as string)
  });
  const chats = data?.data || [];


  async function fetchChat(selectedChatId: string){
    if(chatId === selectedChatId) return;
    const res = await getChat(selectedChatId);
    if(res?.status === 200){
      const chat_id = res.data.id;
      const messages = res.data.messages;
      const arr = messages?.map((mes: ResponseMessage)=>{
        if(mes.role === "user"){
          return {
            id: mes.id,
            role: mes.role,
            parts: [
              {
                type: "text",
                text: mes.content
              }
            ]
          }
        } else {
          return {
            id: mes.id,
            role: mes.role,
            parts: [
              {
                type: "step-start"
              },
              {
                type: "text",
                text: mes.content,
                state: "done"
              }
            ]
          }
        }
      })
      chat.setMessages(arr);
      setChatId(chat_id);
    }
  }

  if(isPending) return <Spinner />

  return (
    <Sidebar>
      <SidebarHeader className="items-center flex-row">
        <BrandLogo /> Chats
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {chats?.map((ch: ChatData) => (
            <SidebarMenuItem key={ch?.id}>
              <SidebarMenuButton className="font-light flex justify-between" style={chatId === ch.id && { background: "#403c55" }} onClick={()=>fetchChat(ch?.id as string)}>
                <span className="truncate" title={ch?.title}>{ch?.title}</span>
                <ChatOptions chatData={ch} menu={menu}/>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}