import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "HRM System",
  description: "HRM System",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
