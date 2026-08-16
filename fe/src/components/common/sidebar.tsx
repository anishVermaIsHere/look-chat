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

export default function AppSidebar() {
  const { user } = useAuthStore(s=>s);
  const [ chats, setChats ] = useState([])


  // async function removeChat(chatId: string){
  //   await deleteChat(chatId);
  // }

  useEffect(()=>{
    async function getChats(){
      const res = await getUserChats(user?.id);
      setChats(res?.data || []);
      console.log(res)
    }
    getChats();
  },[]);

  return (
    <Sidebar>
      <SidebarHeader>
        Chats
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {chats.map((ch) => (
            <SidebarMenuItem key={ch?.id}>
              <SidebarMenuButton className="font-light">
                <span>{ch?.title}</span>
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