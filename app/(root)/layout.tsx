import { auth } from "@/auth"
import Sidebar from "@/components/Sidebar"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <div className="w-full h-screen flex">
      <Sidebar name={session?.user?.name} role={session?.user?.role} />
      {children}
    </div>
  )
}
