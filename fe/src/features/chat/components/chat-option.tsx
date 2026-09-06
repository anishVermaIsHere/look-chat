import type { MouseEvent } from "react"
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
import type { ChatData, ChatOption } from "@/features/chat/types/chat"
import { Icons } from "@/widgets/icons"



export default function ChatOptions({ chatData, menu }:{ chatData: ChatData, menu: ChatOption[]}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Icons.ellipsis />} onClick={(e: MouseEvent)=>e.stopPropagation()}/>
      <DropdownMenuContent className="w-40" align="start">
        {menu?.map((m: ChatOption)=>{
          const Icon = m.icon
          return  <DropdownMenuGroup key={m.label}>
              <DropdownMenuItem onClick={(e)=>m.handler(e, chatData?.id)}>
                <span>{Icon && <Icon />}</span>
                {m.label}
                <DropdownMenuShortcut></DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
