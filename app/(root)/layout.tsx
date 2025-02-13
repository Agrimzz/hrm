import { auth } from "@/auth"
import Sidebar from "@/components/Sidebar"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  if (!session) {
    redirect("/")
  }
  return (
    <div className="w-full h-screen flex">
      <Sidebar name={session?.user?.name} role={session?.user?.role} />
      {children}
    </div>
  )
}
