import { auth } from "@/auth"
import LeaveTable from "@/components/LeaveTable"
import React from "react"

const Leave = async () => {
  const session = await auth()
  return (
    <div className="min-w-[1100px]  bg-background border border-primary p-4 rounded-lg overflow-x-auto shrink-0">
      {(session?.user?.role === "EMPLOYEE" ||
        session?.user?.role === "MANAGER") && (
        <p className="text-primary text-lg font-semibold">
          Your Leave Requests
        </p>
      )}
      <LeaveTable role={session?.user?.role} userId={session?.user?.id} />
    </div>
  )
}

export default Leave
