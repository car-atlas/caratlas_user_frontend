"use client"

import { Compass, Sparkles, Brain, MapPin } from "lucide-react"
import { motion } from "motion/react"
import ChatPanel from "@/components/chat/ChatPanel"

export default function Hero() {
  return (
    <>
      <motion.section
        id="chat"
        className="relative overflow-hidden py-16 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(to bottom right, var(--atlas-navy), var(--atlas-navy-dark), var(--atlas-navy))",
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, var(--atlas-cyan) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: "var(--atlas-cyan)" }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse" style={{ backgroundColor: "var(--atlas-cyan)", animationDelay: "1s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Atlas branding and copy */}
            <motion.div
              className="text-white pt-4 lg:pt-8"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="mb-8 flex items-center gap-4">
                <div className="relative">
                  <div
                    className="size-20 rounded-2xl flex items-center justify-center shadow-2xl"
                    style={{ backgroundColor: "var(--atlas-cyan)" }}
                  >
                    <Compass className="size-10 text-white" />
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 size-7 rounded-full border-4 flex items-center justify-center"
                    style={{ backgroundColor: "var(--atlas-green)", borderColor: "var(--atlas-navy)" }}
                  >
                    <Sparkles className="size-4 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-1">Meet Atlas</h1>
                  <p className="text-lg" style={{ color: "var(--atlas-cyan)" }}>
                    Your AI Car Shopping Guide
                  </p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <span
                  className="inline-block mb-4 text-sm px-4 py-1.5 rounded-full border"
                  style={{ backgroundColor: "rgba(0,191,255,0.2)", color: "var(--atlas-cyan)", borderColor: "rgba(0,191,255,0.3)" }}
                >
                  🇮🇳 India&apos;s First AI Used Car Shopping Assistant
                </span>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Search All Used Cars
                  <span className="block" style={{ color: "var(--atlas-cyan)" }}>
                    In One Place.
                  </span>
                </h2>

                <p className="text-xl text-gray-300 leading-relaxed">
                  Atlas searches through 50,000+ verified used cars across 1000+ dealers — all in one conversation. No more jumping between websites. Just chat with Atlas.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl p-4 border backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(0,191,255,0.3)" }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: "var(--atlas-cyan)" }}>2.5min</div>
                    <div className="text-sm text-gray-300">Avg. search time</div>
                  </div>
                  <div className="rounded-xl p-4 border backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(0,191,255,0.3)" }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: "var(--atlas-cyan)" }}>₹45K</div>
                    <div className="text-sm text-gray-300">Avg. savings</div>
                  </div>
                  <div className="rounded-xl p-4 border backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(0,191,255,0.3)" }}>
                    <div className="text-3xl font-bold mb-1" style={{ color: "var(--atlas-cyan)" }}>98%</div>
                    <div className="text-sm text-gray-300">Satisfaction</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(0,191,255,0.2)" }}>
                      <Brain className="size-5" style={{ color: "var(--atlas-cyan)" }} />
                    </div>
                    <div>
                      <div className="font-semibold">Learns Your Preferences</div>
                      <div className="text-sm text-gray-300">Gets smarter with every conversation</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(0,191,255,0.2)" }}>
                      <MapPin className="size-5" style={{ color: "var(--atlas-cyan)" }} />
                    </div>
                    <div>
                      <div className="font-semibold">Finds Local Deals</div>
                      <div className="text-sm text-gray-300">Searches 1000+ dealers in your city</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["A", "R", "P", "S"].map((letter, i) => (
                      <div
                        key={i}
                        className="size-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: "var(--atlas-cyan)", borderColor: "var(--atlas-navy)" }}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">15,000+ users</div>
                    <div className="text-gray-300 text-xs">this month</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div className="text-sm">
                  <div className="font-semibold">⭐ 4.9/5 Rating</div>
                  <div className="text-gray-300 text-xs">from verified buyers</div>
                </div>
              </div>
            </motion.div>

            {/* Right: Chat panel — full column width, height aligned with left content */}
            <motion.div
              className="lg:pt-4 w-full flex flex-col min-h-[600px]"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 bg-card flex-1 min-h-[560px] w-full flex flex-col" style={{ borderColor: "rgba(0,191,255,0.5)" }}>
                <ChatPanel className="w-full h-full min-h-0 !min-h-0 !max-h-none flex-1" inlineMode />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </>
  )
}
