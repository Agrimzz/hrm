import Link from "next/link"

export default async function LeaveLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex-1 p-8 ">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">Leave Request</h2>
          <p className="text-gray-500">Manage all the Leave Requests</p>
        </div>
        <Link
          href=""
          className="bg-primary p-3 text-white rounded-md hover:bg-primary/80"
        >
          Request Leave
        </Link>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  )
}
