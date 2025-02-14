import { auth } from "@/auth"
import BurgerMenu from "@/components/BurgerMenu"
import Link from "next/link"

export default async function LeaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <div className="flex-1 p-8 ">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="flex gap-2 items-start">
          <BurgerMenu name={session?.user?.name} role={session?.user?.role} />
          <div className="flex flex-col">
            <Link href="/leave-request">
              <h2 className="text-3xl font-bold">Leave Request</h2>
            </Link>
            <p className="text-gray-500">Manage all the Leave Requests</p>
          </div>
        </div>
        <Link
          href="/leave-request/request"
          className="bg-primary p-3 text-white rounded-md hover:bg-primary/80 mt-4 sm:mt-0"
        >
          Request Leave
        </Link>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  )
}
