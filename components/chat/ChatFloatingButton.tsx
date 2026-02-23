"use client"

import { usePathname } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { useChat } from "@/contexts/ChatContext"

export default function ChatFloatingButton() {
  const pathname = usePathname()
  const { openChat } = useChat()

  if (pathname === "/") return null

  return (
    <button
      type="button"
      onClick={openChat}
      className="fixed bottom-5 left-5 z-[9998] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Open chat"
    >
      <MessageCircle size={28} />
    </button>
  )
}
