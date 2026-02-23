"use client"

import { MapPin, Image as ImageIcon } from "lucide-react"
import type { CarListing } from "@/lib/api"
import Link from "next/link"

interface ChatListingCardProps {
  car: CarListing
}

export default function ChatListingCard({ car }: ChatListingCardProps) {
  const imageList = (car.images && Array.isArray(car.images) ? car.images.filter(Boolean) : []) as string[]
  const priceStr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: car.currency || "INR",
    maximumFractionDigits: 0,
  }).format(car.price)
  const href = `/search/${car.id}`

  return (
    <Link
      href={href}
      className="flex gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all w-[260px] sm:w-[280px] shrink-0"
    >
      <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-muted shrink-0">
        {imageList[0] ? (
          <img src={imageList[0]} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={22} className="text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="font-semibold text-foreground text-sm truncate">{car.brand} {car.model}</p>
        {car.variant && <p className="text-xs text-muted-foreground truncate">{car.variant}</p>}
        <p className="text-sm font-semibold text-primary mt-1">{priceStr}</p>
        {(car.city || car.year) && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            {car.year && <span>{car.year}</span>}
            {car.city && (
              <>
                <span>·</span>
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{car.city}</span>
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
