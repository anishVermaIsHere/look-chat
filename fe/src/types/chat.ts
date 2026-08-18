import type { LucideIcon } from "lucide-react"


export type BasicChatOptionType = {
  label: string;
  icon?: LucideIcon;
  type?: "button" | "link";
  separator?: boolean;
};

export type ChatOption =
  | (BasicChatOptionType & {
      handler: (chatId: string) => void | Promise<void>;
    })
  | (BasicChatOptionType & {
      handler: (chatId: string) => void | Promise<void>;
    });

export type ChatData = {
  user_id: string,
  id: string,
  title: string,
  created_at: string
}


type MessageParts = {
  type: string,
  text: string
}

export type Message = {
  parts: MessageParts[],
  id: string,
  role: "user" | "assistant"
}