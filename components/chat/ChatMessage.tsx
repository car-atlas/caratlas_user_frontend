"use client"

import type { CarListing } from "@/lib/api"
import ChatListingCard from "./ChatListingCard"

export interface ChatMessageData {
  role: "user" | "assistant"
  content: string
  listings?: CarListing[]
}

interface ChatMessageProps {
  message: ChatMessageData
}

function formatMessageText(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return part
    })
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] sm:max-w-[75%] ${isUser ? "order-2" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-foreground shadow-sm"
          }`}
        >
          <div className="text-sm whitespace-pre-wrap break-words">
            {formatMessageText(message.content)}
          </div>
        </div>
        {!isUser && message.listings && message.listings.length > 0 && (
          <div className="mt-3 overflow-x-auto flex gap-3 pb-2 -mx-1 px-1">
            {message.listings.map((car) => (
              <ChatListingCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
