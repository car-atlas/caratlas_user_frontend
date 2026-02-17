"use client"

import { useState, useRef, useEffect } from "react"
import { sendChatMessage, type ChatResponse } from "@/lib/chatApi"
import type { ChatMessageData } from "./ChatMessage"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import { useLocation } from "@/contexts/LocationContext"

const WELCOME_MESSAGE: ChatMessageData = {
  role: "assistant",
  content:
    "Hi! 👋 I can help you find the right car. Just ask in plain language, for example:\n\n" +
    "• **Show me Swift under 5 lakh in Mumbai**\n" +
    "• **Best diesel SUVs under 15 lakh**\n" +
    "• **Maruti Baleno in Delhi**\n\n" +
    "I’ll suggest matching cars, and you can tap any option to see full details.",
};

interface ChatPanelProps {
  className?: string
  city?: string
  contextListingIds?: string[]
  popupMode?: boolean
}

export default function ChatPanel({ className, city: cityProp, contextListingIds, popupMode }: ChatPanelProps) {
  const { location } = useLocation()
  const city = cityProp ?? location?.city
  const [messages, setMessages] = useState<ChatMessageData[]>([WELCOME_MESSAGE])
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (text: string) => {
    const userMsg: ChatMessageData = { role: "user", content: text }
    setMessages((prev) => [...prev, userMsg])
    setSending(true)

    let response: ChatResponse
    try {
      response = await sendChatMessage({
        message: text,
        city: city ?? undefined,
        listingIds: contextListingIds?.length ? contextListingIds : undefined,
      })
    } catch {
      response = {
        reply: "Something went wrong. Please try again or use manual search below.",
      }
    }

    setSending(false)
    const assistantMsg: ChatMessageData = {
      role: "assistant",
      content: response.reply,
      listings: response.listings,
    }
    setMessages((prev) => [...prev, assistantMsg])
  }

  return (
    <div className={`flex flex-col overflow-hidden ${popupMode ? "h-full" : "rounded-2xl border border-border bg-card/80 shadow-xl"} ${className ?? ""}`}>
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${popupMode ? "min-h-0" : "min-h-[320px] max-h-[65vh]"}`}>
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 bg-muted border border-border">
              <span className="text-sm text-muted-foreground">Searching for cars…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t border-border bg-background/80">
        <ChatInput onSend={handleSend} disabled={sending} />
      </div>
    </div>
  )
}
