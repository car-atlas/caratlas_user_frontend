"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { sendChatMessage, type ChatResponse } from "@/lib/chatApi"
import type { ChatMessageData } from "./ChatMessage"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import { useLocation } from "@/contexts/LocationContext"
import { Compass, Sparkles, SlidersHorizontal } from "lucide-react"

const WELCOME_MESSAGE: ChatMessageData = {
  role: "assistant",
  content:
    "Hi! 👋 I can help you find the right car. Just ask in plain language, for example:\n\n" +
    "• **Show me Swift under 5 lakh in Mumbai**\n" +
    "• **Best diesel SUVs under 15 lakh**\n" +
    "• **Maruti Baleno in Delhi**\n\n" +
    "I'll suggest matching cars, and you can tap any option to see full details.",
};

interface ChatPanelProps {
  className?: string
  city?: string
  contextListingIds?: string[]
  popupMode?: boolean
  inlineMode?: boolean
}

export default function ChatPanel({ className, city: cityProp, contextListingIds, popupMode, inlineMode }: ChatPanelProps) {
  const { location } = useLocation()
  const city = cityProp ?? location?.city
  const [messages, setMessages] = useState<ChatMessageData[]>([WELCOME_MESSAGE])
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollContainerRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
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
    <div
      className={`flex flex-col overflow-hidden ${popupMode ? "h-full" : inlineMode ? "rounded-2xl bg-card border border-border shadow-lg min-h-[320px] max-h-[85vh] h-full" : "rounded-2xl border border-border bg-card shadow-lg"
        } ${className ?? ""}`}
    >
      {inlineMode && (
        <div
          className="shrink-0 flex items-center justify-between gap-3 p-5 text-white relative overflow-hidden"
          style={{
            background: "linear-gradient(to right, var(--atlas-navy), var(--atlas-cyan))",
          }}
        >
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          <div className="relative flex items-center gap-3 min-w-0 flex-1">
            <div className="size-12 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30 shrink-0 bg-white/20">
              <Compass className="size-7 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-lg flex items-center gap-2 truncate">
                Atlas
                <Sparkles className="size-4 text-[var(--atlas-green)] shrink-0" />
              </h2>
              <p className="text-xs text-white/90 flex items-center gap-1.5">
                <span className="size-2 bg-[var(--atlas-green)] rounded-full animate-pulse shrink-0" />
                AI Guide • Always ready to help
              </p>
            </div>
            <span className="shrink-0 px-2.5 py-1 rounded-md text-xs font-medium bg-white/20 border-0">
              Online
            </span>
          </div>
          <Link
            href="/search"
            className="relative shrink-0 inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Go to search page"
          >
            <SlidersHorizontal size={16} />
          </Link>
        </div>
      )}
      <div
        ref={scrollContainerRef}
        className={`flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-5 space-y-4 ${popupMode ? "" : inlineMode ? "bg-gradient-to-b from-gray-50 to-white" : "min-h-[280px] max-h-[60vh]"
          }`}
      >
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} inlineStyle={inlineMode} />
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="size-8 rounded-lg flex items-center justify-center mr-2 flex-shrink-0 bg-[var(--atlas-cyan)]">
              <Compass className="size-4 text-white" />
            </div>
            <div className="rounded-2xl px-5 py-4 bg-white shadow-md border-2 border-gray-100">
              <div className="flex gap-1.5 items-center">
                <span className="text-xs text-gray-500 mr-2">Atlas is thinking</span>
                <span className="size-2 bg-[var(--atlas-cyan)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="size-2 bg-[var(--atlas-cyan)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="size-2 bg-[var(--atlas-cyan)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className={`shrink-0 border-t-2 border-gray-100 bg-white ${inlineMode ? "p-5" : "p-4 sm:p-5"}`}>
        <ChatInput onSend={handleSend} disabled={sending} inlineStyle={inlineMode} />
      </div>
    </div>
  )
}
