import { auth } from "@/auth"
import EmployeeForm from "@/components/EmployeeForm"
import React from "react"

const AddEmployee = async () => {
  const session = await auth()
  return (
    <div className="max-w-3xl mx-auto flex flex-col bg-background p-4 rounded-lg border border-primary">
      <h2 className="text-xl font-bold">Add a new employee</h2>
      <EmployeeForm action="add" role={session?.user?.role} />
    </div>
  )
}

export default AddEmployee
