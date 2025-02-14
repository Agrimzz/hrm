import { auth } from "@/auth"
import LeaveRequestForm from "@/components/LeaveRequestForm"
import React from "react"

const LeaveRequest = async () => {
  const session = await auth()
  return (
    <div className="max-w-3xl mx-auto flex flex-col bg-background p-4 rounded-lg border border-primary">
      <h2 className="text-xl font-bold">Request Leave</h2>
      <LeaveRequestForm userId={session?.user?.id} />
    </div>
  )
}

export default LeaveRequest
