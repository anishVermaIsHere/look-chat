import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import useAuthStore from "@/store/auth"
import { getUserChats } from "@/features/user/services/apis/user"
import { getChat, searchChat } from "@/features/chat/services/apis/chat"
import { useQuery } from "@tanstack/react-query"
import Spinner from "@/widgets/spinner"
import ChatOptions from "@/features/chat/components/chat-option"
import type { ChatData, ResponseMessage } from "@/features/chat/types/chat"
import useChatBubbleMenu from "@/hooks/use-chat-bubble-menu"
import { useChatContext } from "@/context/chat-context"
import BrandLogo from "@/widgets/logo"
import Searchbar from "@/features/chat/components/searchbar"
import useAppStore from "@/store/app"


async function onSearch(query: string): Promise<ChatData[]>{
  if(query.length >= 3) {
   const res = await searchChat(query);
   return res.data;
  } 
  return [];
}

export default function AppSidebar() {
  const { user } = useAuthStore(s=>s);
  const menu = useChatBubbleMenu();
  const { chatId, setChatId, chat } = useChatContext();
  const { searchInput } = useAppStore(s=>s);
  const { toggleSidebar, isMobile } = useSidebar();

  const { isPending, data: chatData } = useQuery({
    queryKey: ["chats"],
    queryFn: () => getUserChats(user?.id as string),
    enabled: !!user?.id,
  });

  const search = searchInput.trim();

  const { data: searchData } = useQuery({
      queryKey: ["chat-search", search],
      queryFn: () => onSearch(search),
      enabled: Boolean(search.length)
  });

  const chats = search ? searchData ?? [] : chatData?.data ?? [];


  const loadChat = async (chatId: string)=> {
    fetchChat(chatId as string);
    if(isMobile) { toggleSidebar(); }
  }


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
        <Searchbar />
        <SidebarMenu>
          {chats?.map((ch: ChatData) => (
            <SidebarMenuItem key={ch?.id}>
              <SidebarMenuButton 
                className={`font-light flex justify-between ${chatId === ch.id ? 'bg-[#403c55]' : ''} `} 
                onClick={()=>loadChat(ch?.id as string)}>
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