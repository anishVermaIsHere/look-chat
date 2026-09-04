import { useState, useEffect } from "react"
import { TextStreamChatTransport } from "ai"
import { useChat } from "@ai-sdk/react"
import { genUUID } from "@/lib/utils"
import { AppConfig } from "@/config/app-config"
import { API_ENDPOINTS } from "@/services/apis/endpoints"
import { getUserLocation } from "@/utils"
import { ChatContext } from "@/context/chat-context"


export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [input, setInput] = useState<string>("");
    const [chatId, setChatId] = useState<string>("");
    // const chatIdRef = useRef<string | null>(null);
    const [location, setLocation] = useState(null);
    const chat = useChat({
            transport: new TextStreamChatTransport({
              api: `${AppConfig.baseUrl}/api/v1${API_ENDPOINTS.CHAT.sendMessage()}`,
              credentials: "include",
              fetch: async (url, options) => {
                  const res = await fetch(url, {
                      ...options,
                      method: "POST",
                      credentials: "include",
                  });
                 const newChatId = res.headers.get("x-chat-id");
                if (newChatId && !chatId) {
                    setChatId(newChatId); 
                }
                return res;
              },
              prepareSendMessagesRequest: async ({ messages }) => {
                  const lastMessage = messages[messages.length - 1];
                  const textPart = lastMessage?.parts.find(
                      (part) => part.type === "text"
                  );
                  return {
                      body: {
                      chat_id: chatId,
                      sender: {
                          id: genUUID(),
                          location: {
                            latitude: location?.latitude,
                            longitude: location?.longitude
                          },
                      },
                      content: textPart?.text ?? "",
                      },
                  };
              }
          }),
      });
    
    useEffect(() => {
        async function getUserCurrentLocation() {
            try {
                const location = await getUserLocation();
                setLocation({
                    longitude: location?.longitude,
                    latitude: location?.latitude
                });
            } catch (error) {
                console.error("Failed to get location:", error);
            }
        }
        getUserCurrentLocation();
    }, []);

  return (
    <ChatContext value={{ chat, input, setInput, chatId, setChatId }}>
      <div data-testid="chat-context-wrapper">
      {children}
      </div>
    </ChatContext>
  );
}