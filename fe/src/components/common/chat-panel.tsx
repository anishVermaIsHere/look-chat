import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react"
import { TextStreamChatTransport  } from 'ai';
import {
    ArrowUpIcon,
    GlobeIcon,
    ImageIcon,
    MessageCircleDashedIcon,
    PaperclipIcon,
    PlusIcon,
    RotateCwIcon,
    TelescopeIcon,
} from "lucide-react"
import { MessageAnimated } from "@/components/common/message-animated"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group"
import {
    MessageScroller,
    MessageScrollerButton,
    MessageScrollerContent,
    MessageScrollerProvider,
    MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { ProfileMenu } from "./profile-menu"
import { AppConfig } from "@/config/app-config"
import { API_ENDPOINTS } from "@/services/apis/endpoints"
import { getUserLocation } from "@/utils";


export default function ChatPanel() {
    const [input, setInput] = useState("");
    const [location, setLocation] = useState({ latitude: 0.0, longitude: 0.0 });
    const { messages, sendMessage, status, setMessages } = useChat({
        transport: new TextStreamChatTransport({
            api: `${AppConfig.baseUrl}/api/v1${API_ENDPOINTS.CHAT.SEND_MESSAGE}`,
            credentials: "include",
            fetch: async (url, options) => {
                return fetch(url, {
                    ...options,
                    method: "POST",
                    credentials: "include",
                });
            },
            prepareSendMessagesRequest: ({ messages }) => {
                const lastMessage = messages[messages.length - 1];
                const textPart = lastMessage?.parts.find(
                    (part) => part.type === "text"
                );
                return {
                    body: {
                    sender: {
                        id: "user-id",
                        location: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        },
                    },

                    content: textPart?.text ?? "",
                    },
                };
            },
        }),
    });
    
    const isBusy = status === "submitted" || status === "streaming"

    const resetChat = () => setMessages([]);

    const submitMessage = (e) => {
        e.preventDefault();
        if (!input.trim() || isBusy) {
            return
        }
        sendMessage({ text: input });
        setInput("");
    }


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
        <MessageScrollerProvider>
            <div className="relative w-full flex flex-col items-center gap-4">
                <Card className="mx-auto h-screen w-full gap-0 pt-0 bg-main">
                    <CardHeader className="pt-2 pb-2 px-4 gap-1 border-b bg-[#1f1c2c]">
                        <CardTitle>Look</CardTitle>
                        <CardDescription>AI Assistant</CardDescription>
                        <CardAction className="flex gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Reset conversation"
                                onClick={resetChat}
                                isDisabled={isBusy}
                                className="w-20 flex gap-2"
                            >
                                <RotateCwIcon /> Reset
                            </Button>
                            <ProfileMenu />
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex-1 w-full overflow-hidden p-0">
                        {!messages.length ? (
                            <Empty className="h-full">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <MessageCircleDashedIcon />
                                    </EmptyMedia>
                                    <EmptyTitle>Hi! I am Look, your AI Assistant</EmptyTitle>
                                    <EmptyDescription>
                                        What's on your mind? Ask anything
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        ) : (
                            <MessageScroller>
                                <MessageScrollerViewport>
                                    <MessageScrollerContent
                                        aria-busy={isBusy}
                                        className="p-(--card-spacing)"
                                    >
                                        {messages.map((message) => (
                                            <MessageAnimated
                                                key={message.id}
                                                message={message}
                                                scrollAnchor={message.role === "user"}
                                            />
                                        ))}
                                    </MessageScrollerContent>
                                </MessageScrollerViewport>
                                <MessageScrollerButton />
                            </MessageScroller>
                        )}
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <form
                            onSubmit={submitMessage}
                            className="w-full"
                        >
                            <InputGroup className="max-w-2xl mx-auto overflow-hidden">
                                <div className="h-14 w-full px-3 py-2.5 bg-[#1f1c2c]">
                                    {/* <span
                                        className="line-clamp-2 opacity-60 data-[status=ready]:opacity-100"
                                        data-status={status}
                                    >
                                        {nextMessage ? (
                                            getMessageText(nextMessage)
                                        ) : (
                                            <span className="text-muted-foreground">
                                                No messages queued. Reset the conversation.
                                            </span>
                                        )}
                                    </span> */}
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask anything..."
                                        disabled={isBusy}
                                        className="h-14 w-full resize-none border-0 bg-transparent px-3 py-2.5 outline-none"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                e.currentTarget.form?.requestSubmit();
                                            }
                                        }}
                                    />
                                </div>

                                <InputGroupAddon align="block-end" className="pt-1 bg-[#1f1c2c]">
                                    <DropdownMenu>
                                        {/* 1. The Trigger goes inside DropdownMenu and wraps the button */}
                                        <DropdownMenuTrigger render={<InputGroupButton />}>
                                            <InputGroupButton
                                                aria-label="Add files"
                                                type="button"
                                                size="icon-sm"
                                                variant="outline"
                                            >
                                                <PlusIcon />
                                            </InputGroupButton>
                                        </DropdownMenuTrigger>

                                        {/* 2. DropdownMenuContent wraps the menu items */}
                                        {/* <DropdownMenuContent side="top" align="start" className="w-44">
                                            <DropdownMenuItem>
                                                <PaperclipIcon />
                                                Add Photos & Files
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <ImageIcon />
                                                Create Image
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <TelescopeIcon />
                                                Deep Research
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <GlobeIcon />
                                                Web Search
                                            </DropdownMenuItem>
                                        </DropdownMenuContent> */}
                                    </DropdownMenu>
                                    <InputGroupButton
                                        type="submit"
                                        variant="default"
                                        size="icon-sm"
                                        isDisabled={!input.trim() || isBusy}
                                        className="ml-auto"
                                    >
                                        <ArrowUpIcon />
                                        <span className="sr-only">Send</span>
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </MessageScrollerProvider>
    )
}
