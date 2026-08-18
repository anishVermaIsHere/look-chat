import * as React from "react"
import { Icons } from "@/widgets/icons"
import { motion, useReducedMotion } from "motion/react"
import type { MessageAnimationPreset } from "@/lib/message-animations"
import { MESSAGE_ANIMATIONS } from "@/lib/message-animations"
import MarkdownRenderer from "@/components/common/markdown-referer"
import Typing from "@/widgets/typing"

function Message({ align, children }: { align: "start" | "end"; children: React.ReactNode }) {
  return (
    <div className={`flex w-full ${align === "end" ? "justify-end" : "justify-start"}`}>
      {children}
    </div>
  )
}

function MessageContent({ children }: { children: React.ReactNode }) {
  return <div className="flex max-w-[80%] flex-col gap-2">{children}</div>
}

function Bubble({ 
  variant = "ghost", 
  children 
}: { 
  variant?: "ghost" | "muted" | string
  children: React.ReactNode 
}) {
  const variantStyles = variant === "muted" 
    ? "bg-[#1f1c2c] text-gray-100 rounded-md p-3.5" 
    : "bg-transparent text-foreground p-1"

  return <div className={variantStyles}>{children}</div>
}

function BubbleContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>
}

const MessageScrollerItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { messageId?: string; scrollAnchor?: boolean }>(
  ({ children, ...props }, ref) => <div ref={ref} {...props}>{children}</div>
)

MessageScrollerItem.displayName = "MessageScrollerItem"

type MessageAnimatedPart = {
  content?: unknown
  type: string
  text?: unknown
}

type MessageAnimatedMessage = {
  id: string
  role: string
  text?: string
  parts?: ReadonlyArray<MessageAnimatedPart>
}

const MotionMessageScrollerItem = motion.create(MessageScrollerItem)

function MessageAnimated({
  message,
  animationPreset = MESSAGE_ANIMATIONS["slide-up"],
  assistantVariant = "muted",
  scrollAnchor,
  userVariant = "muted",
  status,
  ...props
}: Omit<
  React.ComponentProps<typeof MotionMessageScrollerItem>,
  "animate" | "children" | "exit" | "initial" | "messageId" | "variants"
> & {
  animationPreset?: MessageAnimationPreset
  assistantVariant?: React.ComponentProps<typeof Bubble>["variant"]
  message: MessageAnimatedMessage
  userVariant?: React.ComponentProps<typeof Bubble>["variant"]
  status: string
}) {
  const shouldReduceMotion = useReducedMotion()
  const isUserMessage = message.role === "user"

  if (isUserMessage) {
    return (
      <MotionMessageScrollerItem
        messageId={message.id}
        scrollAnchor={scrollAnchor ?? true}
        variants={animationPreset.variants}
        initial={shouldReduceMotion ? false : "initial"}
        animate="animate"
        exit={shouldReduceMotion ? undefined : "exit"}
        {...props}
      >
        <MessageAnimatedRow
          message={message}
          assistantVariant={assistantVariant}
          userVariant={userVariant}
          status={status}
        />
      </MotionMessageScrollerItem>
    )
  }

  return (
    <MotionMessageScrollerItem
      messageId={message.id}
      scrollAnchor={scrollAnchor}
      initial={false}
      {...props}
    >
      <MessageAnimatedRow
        message={message}
        assistantVariant={assistantVariant}
        userVariant={userVariant}
        status={status}
      />
    </MotionMessageScrollerItem>
  )
}

function MessageAnimatedRow({
  message,
  assistantVariant,
  userVariant,
  status
}: {
  assistantVariant: React.ComponentProps<typeof Bubble>["variant"]
  message: MessageAnimatedMessage
  userVariant: React.ComponentProps<typeof Bubble>["variant"]
  status: string
}) {
  const isUserMessage = message.role === "user"
  const parts = getMessageAnimatedContentParts(message)

  const handleCopyResponse = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch(error){
      console.log("ERROR: while copying text", error);
    }
  } 

  return (
    <Message align={isUserMessage ? "end" : "start"}>
      <MessageContent>
        {parts.map((part) => {
          const paragraphs = part.text
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)

          if (part.type === "reasoning") {
            return (
              <div
                key={part.key}
                className="w-full border-l-2 border-muted-foreground/30 pl-3 text-muted-foreground"
              >
                <div className="mb-1 flex items-center gap-1.5 text-xs font-medium">
                  <Icons.brain className="size-3.5" />
                  Reasoning
                </div>
                <div className="space-y-1.5 text-sm">
                  {paragraphs.map((paragraph) => (
                      <MarkdownRenderer key={message.id} keyIndex={message.id} content={paragraph}/>
                  ))}
                </div>
              </div>
            )
          }

          const isGenerating = !isUserMessage && status === "streaming" && !part.text.trim()

          return (
            <Bubble
              key={part.key}
              variant={message.role === "user" ? userVariant : assistantVariant}
            >
              <BubbleContent className="space-y-2">
                {isGenerating ? <Typing /> : ''}
                {paragraphs.map((paragraph) => (
                    <MarkdownRenderer key={message.id} keyIndex={message.id} content={paragraph} />
                ))}
              </BubbleContent>
              {status === "ready" && message.role == "assistant" && <div className="flex justify-end gap-3 mt-6">
                <button className="border-none" onClick={()=>handleCopyResponse(paragraphs.join("\n\n"))} title="Copy">
                  <Icons.copy className="size-5 cursor-pointer" />
                </button>
                <button className="border-none" title="Share">
                  <Icons.share className="size-5 cursor-pointer" />
                </button>
                </div>}
            </Bubble>
          )
        })}
      </MessageContent>
    </Message>
  )
}

function getMessageAnimatedContentParts(message: MessageAnimatedMessage) {
  if (message.parts) {
    return message.parts.flatMap((part, index) => {
      const type =
        part.type === "reasoning" || part.type === "thinking"
          ? "reasoning"
          : part.type === "text"
            ? "text"
            : null
      const text =
        typeof part.text === "string"
          ? part.text
          : typeof part.content === "string"
            ? part.content
            : null

      if (!type || text === null) {
        return []
      }

      return [
        {
          key: `${message.id}-${index}`,
          text,
          type,
        },
      ]
    })
  }

  return typeof message.text === "string"
    ? [{ key: `${message.id}-text`, text: message.text, type: "text" }]
    : []
}

export { MessageAnimated, type MessageAnimatedMessage }