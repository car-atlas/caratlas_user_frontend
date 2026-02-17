import Header from "@/components/shared/Header"
import Footer from "@/components/shared/Footer"
import ChatWidget from "@/components/chat/ChatWidget"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ChatWidget />
    </>
  )
}
