"use client"

import Image from "next/image"
import Link from "next/link"
import bgImage from "@/assets/images/bg1.jpeg"
import { SlidersHorizontal, MessageCircle } from "lucide-react"
import { useChat } from "@/contexts/ChatContext"

export default function Hero() {
  const { openChat } = useChat()

  return (
    <section className="relative">
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 md:px-8 py-10 md:py-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Get your car with our agent
            </h1>
            <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Tell us what you want in plain language. Our AI agent will find the right cars and show you options instantly.
            </p>
            <button
              type="button"
              onClick={openChat}
              className="inline-flex items-center gap-3 rounded-2xl bg-primary text-primary-foreground px-6 py-4 text-base sm:text-lg font-semibold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <MessageCircle size={28} />
              <span>Start chat</span>
            </button>
          </div>

          {/* Secondary: link to manual search (no form on landing) */}
          <div id="chat" className="mt-6">
            <p className="text-white/70 text-sm mb-3">Or search with filters</p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
            >
              <SlidersHorizontal size={18} />
              Go to search page
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
