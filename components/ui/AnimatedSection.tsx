"use client"

import { motion } from "motion/react"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  id?: string
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
}: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.section>
  )
}
