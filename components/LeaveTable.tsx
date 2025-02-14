"use client"

import { LeaveData, LeaveTableProps } from "@/types"
import { IconLoader2 } from "@tabler/icons-react"
import axios from "axios"
import React, { useEffect, useState } from "react"

const LeaveTable = ({ role, userId }: LeaveTableProps) => {
  const [requests, setRequests] = useState<LeaveData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    const response = await axios.get(
      `/api/leave-request?role=${role}&userId=${userId}`
    )
    console.log(response)
    setLoading(false)
    setRequests(response.data)
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axios.patch(`/api/leave-request/${id}`, {
        status: newStatus,
      })
      if (response.data.success) {
        setRequests((prev) =>
          prev.map((request) =>
            request.id === id ? { ...request, status: newStatus } : request
          )
        )
        alert("Status updated successfully")
      }
    } catch (error) {
      console.error("Error updating status", error)
    }
  }

  if (loading) {
    return (
      <div className="w-full">
        <IconLoader2 size={32} className="mx-auto animate-spin" />
      </div>
    )
  }

  return (
    <table className="w-full overflow-x-hidden">
      <thead>
        <tr>
          <th className="table_head">Name</th>
          <th className="table_head">Leave Type</th>
          <th className="table_head">Subject</th>
          <th className="table_head">Start Date</th>
          <th className="table_head">End Date</th>
          <th className="table_head">Status</th>
        </tr>
      </thead>
      <tbody>
        {requests?.length > 0 ? (
          requests.map((request: LeaveData) => (
            <tr key={request.id} className="py-2 border-t border-primary">
              <td className="py-4 whitespace-nowrap text-sm md:text-base">
                {request.user.name}
              </td>
              <td className="py-4 whitespace-nowrap text-sm md:text-base">
                {request.type}
              </td>
              <td className="py-4 whitespace-nowrap text-sm md:text-base">
                {request.subject}
              </td>
              <td className="py-4 whitespace-nowrap text-sm md:text-base">
                {new Date(request.startDate).toLocaleDateString()}
              </td>
              <td className="py-4 whitespace-nowrap text-sm md:text-base">
                {new Date(request.endDate).toLocaleDateString()}
              </td>
              <td className="py-4 whitespace-nowrap text-sm md:text-base">
                {" "}
                <select
                  value={request.status}
                  onChange={(e) =>
                    handleStatusChange(request.id, e.target.value)
                  }
                  className="form_input"
                  disabled={role === "EMPLOYEE" || role === "MANAGER"}
                >
                  <option value="REVIEW">Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="DECLINED">Declined</option>
                </select>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} className="text-center py-4">
              No Requests
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default LeaveTable
