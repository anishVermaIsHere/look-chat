import type { MouseEvent } from "react"
import type { LucideIcon } from "lucide-react"


export type BasicChatOptionType = {
  label: string;
  icon?: LucideIcon;
  type?: "button" | "link";
  separator?: boolean;
};

export type ChatOption =
  | (BasicChatOptionType & {
      handler: (e: MouseEvent, chatId: string) => void | Promise<void>;
    })
  | (BasicChatOptionType & {
      handler: (e: MouseEvent, chatId: string) => void | Promise<void>;
    });

export type ChatData = {
  user_id: string,
  id: string,
  title: string,
  created_at: string
}


type MessageParts = {
  type: string,
  text?: string,
  state?: string
}

export type Message = {
  parts: MessageParts[],
  id: string,
  role: "user" | "assistant"
}

export type UserLocation = {
  latitude: number,
  longitude: number,
  accuracy: number
}

export type ResponseMessage = {
  id: string,
  chat_id: string,
  sender: {
    id: string,
    location: Omit<UserLocation, "accuracy"> | null
  },
  content: string,
  role: string,
  created_At: string
}
