import { useEffect } from "react"
import {
    MessageScrollerItem,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerViewport,
    useMessageScroller
} from "@/components/ui/message-scroller"
import { MessageAnimated } from "@/components/common/message-animated"

export default function ChatMessages({
    messages,
    isBusy,
    status
}: {
    messages: any[];
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
                    className="p-(--card-spacing)"
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