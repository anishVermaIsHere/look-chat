import { useEffect } from "react"
import {
    MessageScrollerItem,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerViewport
} from "@/components/ui/message-scroller"
import { useMessageScroller } from "@/hooks/message"
import { MessageAnimated } from "@/features/chat/components/message-animated"
import type { Message } from "@/features/chat/types/chat"

export default function ChatMessages({
    messages,
    isBusy,
    status
}: {
    messages: Message[];
    isBusy: boolean;
    status: string;
}) {
    const { scrollToMessage } = useMessageScroller();

    useEffect(() => {
        if (!messages.length) return;
        const lastMessage = messages[messages.length - 1];
        requestAnimationFrame(() => {
            scrollToMessage(lastMessage.id);
        });
    }, [messages, scrollToMessage]);
    
    return (
        <>
            <MessageScrollerViewport>
                <MessageScrollerContent
                    aria-busy={isBusy}
                    className="p-(--card-spacing) p-3"
                >
                    {messages.map((message) => (
                        <MessageScrollerItem
                            key={message.id}
                            messageId={message.id}
                            scrollAnchor={message.role === "user"}
                        >
                            <MessageAnimated
                                key={message.id}
                                message={message}
                                scrollAnchor={message.role === "user"}
                                status={status}
                            />
                        </MessageScrollerItem>
                    ))}
                </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
        </>
    );
}