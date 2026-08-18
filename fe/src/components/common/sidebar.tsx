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
import { getUserChats } from "@/services/apis/user"
import { useQuery } from "@tanstack/react-query"
import Spinner from "@/widgets/spinner"
import ChatOptions from "@/components/chat/chat-option"
import type { ChatData } from "@/types/chat"
import useChatBubbleMenu from "@/hooks/use-chat-bubble-menu"


export default function AppSidebar() {
  const { user } = useAuthStore(s=>s);
  const menu = useChatBubbleMenu();
  const { isPending, data } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => await getUserChats(user?.id as string)
  });
  const chats = data?.data || [];

  if(isPending) return <Spinner />

  return (
    <Sidebar>
      <SidebarHeader>
        Chats
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {chats?.map((ch: ChatData) => (
            <SidebarMenuItem key={ch?.id}>
              <SidebarMenuButton className="font-light flex justify-between bg-[#403c55]">
                <span>{ch?.title}</span>
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