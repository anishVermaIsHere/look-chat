"use client"

import { useChat } from "@ai-sdk/react"
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

import { createChat, getMessageText } from "@/lib/ai"
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
import { TooltipProvider, Tooltip, TooltipTrigger } from "@/components/ui/tooltip"

const chat = createChat()
    .user(
        "I'm learning how AI works, but I'm confused. When I ask an AI a question, does it actually know things like a human does, or is it just guessing the next word?"
    )
    .sleep(1000)
    .assistant(
        "That's one of the best questions to start with! At its core, AI works like a super-smart autocomplete. It doesn't 'know' facts the way humans do—it predicts the most likely next word based on patterns learned from reading billions of sentences.\n\nThink of it like learning to finish someone else's sentences. Because it has read so much, its 'guesses' end up sounding remarkably smart and helpful!"
    )
    .user(
        "That makes sense! But if it's just predicting words, how does it answer questions about stuff happening today, like live sports scores or current news?"
    )
    .sleep(1000)
    .assistant(
        "Great observation! On its own, a basic AI model only knows things up to the day its training stopped. To answer real-time questions, developers connect it to search tools.\n\nWhen you ask about today's news, the AI quietly searches the web first, reads the top results, and then uses that fresh information to build its answer for you in real time."
    )
    .user(
        "Ah! But what if the search results have wrong information or rumors? Wouldn't the AI just repeat those mistakes?"
    )
    .sleep(1000)
    .assistant(
        "It definitely can! That's why modern AI systems use cross-checking rules. Instead of trusting the first link it finds, the system compares multiple reliable sources before writing a reply.\n\nIt's just like a good journalist—it checks two or three sources before sharing the story with you, which cuts down on accidental mistakes."
    )
    .user("Got it! So what's the best way for a beginner like me to get good answers from an AI?")
    .sleep(1000)
    .assistant(
        "The secret is giving it clear context! Think of the AI as a helpful assistant who just walked into the room.\n\nIf you tell it who you are, what you're trying to achieve, and the format you want, it gives much better answers. The more context you provide, the less guessing the AI has to do!"
    )
    
const initialMessages = chat.get(0)
const transport = chat.transport({ delayMs: 20 })

export default function ChatPanel() {
    const { messages, sendMessage, status, setMessages } = useChat({
        messages: initialMessages,
        transport,
    })
    const nextMessage = chat.next(messages)
    const isBusy = status === "submitted" || status === "streaming"

    return (
        <MessageScrollerProvider>
            <div className="relative flex flex-col items-center gap-4">
                <Card className="mx-auto h-screen sm:h-140 w-full max-w-2xl gap-0 pt-0 bg-main">
                    <CardHeader className="pt-2 pb-2 px-4 gap-1 border-b bg-[#1f1c2c]">
                        <CardTitle>Look Chat</CardTitle>
                        <CardDescription>How can I help you today?</CardDescription>
                        <CardAction>
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Reset conversation"
                                onClick={() => setMessages(initialMessages)}
                                isDisabled={isBusy}
                            >
                                <RotateCwIcon />
                            </Button>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <p>Reset</p>
                                    </TooltipTrigger>
                                </Tooltip>
                            </TooltipProvider>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-hidden p-0">
                        {!messages.length ? (
                            <Empty className="h-full">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <MessageCircleDashedIcon />
                                    </EmptyMedia>
                                    <EmptyTitle>Morning, Look!</EmptyTitle>
                                    <EmptyDescription>
                                        What are we working on today? Press send to start a new
                                        conversation
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
                            onSubmit={(e) => {
                                e.preventDefault()
                                if (!nextMessage || isBusy) {
                                    return
                                }
                                void sendMessage(nextMessage)
                            }}
                            className="w-full"
                        >
                            <InputGroup>
                                <div className="h-14 w-full px-3 py-2.5">
                                    <span
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
                                    </span>
                                </div>
                                <InputGroupAddon align="block-end" className="pt-1">
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
                                        <DropdownMenuContent side="top" align="start" className="w-44">
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
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <InputGroupButton
                                        type="submit"
                                        variant="default"
                                        size="icon-sm"
                                        isDisabled={!nextMessage || isBusy}
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
                <div className="hidden sm:block px-0.5 text-center text-xs text-muted-foreground">
                    Demo is read only. Press send to send messages.
                </div>
            </div>
        </MessageScrollerProvider>
    )
}
