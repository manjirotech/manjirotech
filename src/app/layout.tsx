import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Manjiro Tech - Innovative Digital & IT Solutions",
  description:
    "Elevate your brand with Manjiro Tech. We provide innovative digital & IT solutions designed to drive results.",
  icons: {
    icon: 'manjirotech/favicon.ico',
    apple: 'manjirotech/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="manjirotech/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}

