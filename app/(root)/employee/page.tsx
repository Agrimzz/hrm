import { auth } from "@/auth"
import EmployeeTable from "@/components/EmployeeTable"
import React from "react"

const Employee = async () => {
  const session = await auth()
  return (
    <div className="min-w-[1100px]  bg-background border border-primary p-4 rounded-lg overflow-x-auto shrink-0">
      <EmployeeTable role={session?.user?.role} />
    </div>
  )
}

export default Employee
