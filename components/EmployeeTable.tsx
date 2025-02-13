"use client"

import { EmployeeData } from "@/types"
import {
  IconFileDescription,
  IconLoader2,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const EmployeeTable = ({ role }: { role: string }) => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEmployee = async () => {
    const response = await axios.get("/api/user")
    setLoading(false)
    setEmployees(response.data)
  }

  useEffect(() => {
    fetchEmployee()
  }, [])

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`/api/user/${id}`)
        fetchEmployee()
      } catch (error) {
        console.error("Error deleting employee", error)
      }
    }
  }

  const showActions = (employeeRole: string) => {
    if (role === "SUPER_ADMIN") return true
    if (role === "HR" && employeeRole === "EMPLOYEE") return true
    return false
  }

  if (loading) {
    return (
      <div className="w-full">
        <IconLoader2 size={32} className="mx-auto animate-spin" />
      </div>
    )
  }

  return (
    <table className="w-full border-collapse table-auto">
      <thead>
        <tr>
          <th className="table_head">Name</th>
          <th className="table_head">Email</th>
          <th className="table_head">Role</th>
          <th className="table_head">Employee Type</th>
          <th className="table_head">Salary</th>
          <th className="table_head">Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees?.length > 0 ? (
          employees.map((employee: EmployeeData) => (
            <tr key={employee.id} className="py-2 border-t border-primary">
              <td className="py-4 whitespace-nowrap">{employee.name}</td>
              <td className="py-4 whitespace-nowrap">{employee.email}</td>
              <td className="py-4 whitespace-nowrap">{employee.role}</td>
              <td className="py-4 whitespace-nowrap">
                {employee.employeeType}
              </td>
              <td className="py-4 whitespace-nowrap">Rs.{employee.salary}</td>
              <td className="py-4 whitespace-nowrap">
                {showActions(employee.role) && (
                  <div className="flex gap-2 items-center justify-end">
                    <Link href={`/employee/${employee.id}`}>
                      <IconFileDescription color="blue" />
                    </Link>
                    <Link href={`/employee/${employee.id}/edit`}>
                      <IconPencil color="green" />
                    </Link>
                    <IconTrash
                      color="red"
                      onClick={() => handleDelete(employee.id)}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center py-4">
              No Employee
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default EmployeeTable
