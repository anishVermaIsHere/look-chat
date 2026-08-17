import { useEffect, useState } from "react"
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
import { deleteChat } from "@/services/apis/chat"
import { useQuery } from "@tanstack/react-query"
import Spinner from "@/widgets/spinner"
import ChatOptions from "@/components/chat/chat-option"

export default function AppSidebar() {
  const { user } = useAuthStore(s=>s);

  const { isPending, data } = useQuery({
    queryKey: ['chats'],
    queryFn: async () => await getUserChats(user?.id)
  });

  const chats = data?.data || [];

  if(isPending){
    return <Spinner />
  }

  return (
    <Sidebar>
      <SidebarHeader>
        Chats
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {chats?.map((ch) => (
            <SidebarMenuItem key={ch?.id}>
              <SidebarMenuButton className="font-light flex justify-between" onClick={async () => deleteChat(ch?.id)}>
                <span>{ch?.title}</span>
                <ChatOptions />
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