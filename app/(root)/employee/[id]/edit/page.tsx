"use client"
import EmployeeForm from "@/components/EmployeeForm"
import { EmployeeData } from "@/types"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const EmployeeEdit = () => {
  const params = useParams()
  const { id } = params

  const [employee, setEmployee] = useState<EmployeeData>()

  useEffect(() => {
    async function fetchEmployee() {
      const response = await axios.get(`/api/user/${id}`)

      setEmployee(response.data.employee)
    }
    if (id) fetchEmployee()
  }, [id])

  return (
    <div className="max-w-3xl mx-auto flex flex-col bg-background p-4 rounded-lg border border-primary">
      <h2 className="text-xl font-bold">Edit employee {employee?.name}</h2>
      <EmployeeForm employee={employee} action="edit" />
    </div>
  )
}

export default EmployeeEdit
