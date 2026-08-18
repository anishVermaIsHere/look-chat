import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { ChatData, ChatOption } from "@/types/chat"
import { Icons } from "@/widgets/icons"



export default function ChatOptions({ chatData, menu }:{ chatData: ChatData, menu: ChatOption[]}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Icons.ellipsis />} />
      <DropdownMenuContent className="w-40" align="start">
        {menu?.map((m: ChatOption)=>{
          const Icon = m.icon
          return  <DropdownMenuGroup key={m.label}>
              <DropdownMenuItem onClick={()=>m.handler(chatData?.id)}>
                <span>{<Icon />}</span>
                {m.label}
                <DropdownMenuShortcut></DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
