import { useEffect, useRef, useContext } from "react"
import type { SyntheticEvent } from "react"
import { Icons } from "@/widgets/icons"
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
import { SidebarTrigger } from "../ui/sidebar"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group"
import { MessageScroller, MessageScrollerProvider } from "@/components/ui/message-scroller"
import ChatMessages from "./chat-messages"
import { ProfileMenu } from "../common/profile-menu"
import { useQueryClient } from "@tanstack/react-query"
import { ChatContext } from "@/context/chat-context"
import BubbleAnimation from "./animation"


export default function ChatPanel() {
    const queryClient = useQueryClient();
    const hasSentMessage = useRef(false);
    const { chat: { messages, sendMessage, status, setMessages }, input, setInput } = useContext(ChatContext);

    const isBusy = status === "submitted" || status === "streaming"

    const resetChat = () => setMessages([]);

    const submitMessage = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!input.trim() || isBusy) return
        hasSentMessage.current = true;
        sendMessage({ text: input });
        setInput("");
    }

    useEffect(() => {
        if (status === "ready" && hasSentMessage.current) {
            hasSentMessage.current = false;
            queryClient.invalidateQueries({
                queryKey: ["chats"],
            });
        }
    }, [status, queryClient]);

    return (
        <MessageScrollerProvider defaultScrollPosition="last-anchor">
            <div className="relative w-full flex flex-col items-center gap-4">
                <Card className="mx-auto h-screen w-full gap-0 pt-0 rounded-none bg-main">
                    <CardHeader className="pt-2 pb-2 px-4 gap-1 border-b rounded-none bg-[#1f1c2c]">
                        <div className="flex items-center">
                            <SidebarTrigger />
                            <CardTitle>Look AI</CardTitle>
                        </div>
                        <CardAction className="flex gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="New chat"
                                onClick={resetChat}
                                isDisabled={isBusy}
                                className="w-20 flex gap-2"
                            >
                                <Icons.plus /> Chat
                            </Button>
                            <ProfileMenu />
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex-1 w-full overflow-hidden p-0">
                        {!messages.length ? (
                            <Empty className="h-full relative">
                                <BubbleAnimation density={0.00015} minRadius={0.5} maxRadius={8} twinkleSpeed={0.05} />
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <Icons.messageCircle />
                                    </EmptyMedia>
                                    <EmptyTitle>Hi! I am Look, your AI Assistant</EmptyTitle>
                                    <EmptyDescription>
                                        What's on your mind? Ask anything
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        ) : (
                            <MessageScroller className="relative">
                                <BubbleAnimation density={0.00015} minRadius={0.5} maxRadius={8} twinkleSpeed={0.05} />
                                <ChatMessages messages={messages} isBusy={isBusy} status={status}/>
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
                                                <Icons.plus />
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
                                        <Icons.arrowUp />
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
