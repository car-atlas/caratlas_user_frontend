"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface ChatContextType {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error("useChat must be used within ChatProvider")
  }
  return ctx
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const openChat = useCallback(() => setIsOpen(true), [])
  const closeChat = useCallback(() => setIsOpen(false), [])
  return (
    <ChatContext.Provider value={{ isOpen, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  )
}
