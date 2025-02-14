"use client"
import { IconLoader2 } from "@tabler/icons-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const LeaveRequestForm = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    userId,
    type: "SICK",
    subject: "",
    body: "",
    status: "REVIEW",
    startDate: "",
    endDate: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    const payload = formData
    console.log(payload)
    try {
      const response = await axios.post("/api/leave-request", payload)
      if (response.data.success) {
        alert("Leave request submitted succesfully")
        router.push("/leave-request")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex flex-col mt-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 "
      >
        <div className="space-y-2">
          <label htmlFor="type" className="form_label">
            Leave Type
          </label>
          <select
            name="type"
            id="type"
            className="form_input"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="SICK">Sick</option>
            <option value="UNPAID">Unpaid</option>
            <option value="VACATION">Vacation</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="form_label">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Leave Subject"
            className="form_input"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="startDate" className="form_label">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            min={new Date().toISOString().split("T")[0]}
            id="startDate"
            className="form_input"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="endDate" className="form_label">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            min={formData.startDate || new Date().toISOString().split("T")[0]}
            id="endDate"
            className="form_input"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2 col-span-full">
          <label htmlFor="body" className="form_label">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            className="form_input resize-none"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        {error && (
          <p className="col-span-full text-red-600 font-semibold">{error}</p>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-md bg-primary text-white p-2 text-lg hover:bg-primary/80 col-span-full"
        >
          {isSubmitting ? (
            <IconLoader2 className="animate-spin mx-auto" size={28} />
          ) : (
            "Submit Request"
          )}
        </button>
      </form>
    </div>
  )
}

export default LeaveRequestForm
