"use client"
import { EmployeeData } from "@/types"
import { IconLoader2 } from "@tabler/icons-react"
import axios from "axios"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import AttendanceCalendar from "@/components/AttendanceCalendar"
import "react-big-calendar/lib/css/react-big-calendar.css"

const EmployeeDetails = () => {
  const params = useParams()
  const { id } = params

  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState<EmployeeData>()

  useEffect(() => {
    async function fetchEmployee() {
      const response = await axios.get(`/api/user/${id}`)

      setLoading(false)
      setDetails(response.data.employee)
    }
    if (id) fetchEmployee()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col bg-background p-4 rounded-lg border border-primary">
        <IconLoader2 size={32} className="animate-spin mx-auto" />
      </div>
    )
  }
  return (
    <>
      <div className="max-w-2xl mx-auto flex flex-col bg-background p-4 rounded-lg border border-primary">
        <h2 className="text-xl font-bold">Employee Details</h2>
        <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          <p className="text-lg text-gray-500 font-semibold">Name:</p>
          <p className="text-lg text-primary font-bold">{details?.name}</p>
          <p className="text-lg text-gray-500 font-semibold">Email:</p>
          <p className="text-lg text-primary font-bold">{details?.email}</p>
          <p className="text-lg text-gray-500 font-semibold">Role:</p>
          <p className="text-lg text-primary font-bold">{details?.role}</p>
          <p className="text-lg text-gray-500 font-semibold">Employee Type:</p>
          <p className="text-lg text-primary font-bold">
            {details?.employeeType}
          </p>
          <p className="text-lg text-gray-500 font-semibold">Department:</p>
          <p className="text-lg text-primary font-bold">
            {details?.department}
          </p>
          <p className="text-lg text-gray-500 font-semibold">Salary:</p>
          <p className="text-lg text-primary font-bold">Rs.{details?.salary}</p>
        </div>
      </div>
      <AttendanceCalendar userId={id as string} />
    </>
  )
}

export default EmployeeDetails
