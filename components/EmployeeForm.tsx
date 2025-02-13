"use client"
import { EmployeeFormProps } from "@/types"
import { IconLoader2 } from "@tabler/icons-react"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

const EmployeeForm = ({ employee, action, role }: EmployeeFormProps) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EMPLOYEE",
    employee_type: "FULL_TIME",
    department: "",
    salary: 0,
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (action === "edit") {
      setFormData({
        name: employee?.name || "",
        email: employee?.email || "",
        password: employee?.password || "",
        role: employee?.role || "EMPLOYEE",
        employee_type: employee?.employeeType || "FULL_TIME",
        department: employee?.department || "",
        salary: employee?.salary || 0,
      })
    }
  }, [employee, action])

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
    const payload = formData

    if (action === "add") {
      try {
        const response = await axios.post("/api/user", payload)
        if (response.data.success) {
          alert("Employee added successfully")
          router.push("/employee")
        } else {
          setError(response.data.message)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError("Something went wrong!")
        console.error("Error adding employee:", error)
      } finally {
        setIsSubmitting(false)
      }
    }

    if (action === "edit") {
      try {
        const response = await axios.put(`/api/user/${employee?.id}`, payload)
        if (response.data.success) {
          alert("Employee updated successfully")
          router.push("/employee")
        } else {
          setError(response.data.message)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError("Something went wrong!")
        console.error("Error adding employee:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  return (
    <div className="flex flex-col mt-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 "
      >
        <div className="space-y-2">
          <label htmlFor="name" className="form_label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g John Doe"
            className="form_input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="form_label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="e.g johndoe@gmail.com"
            className="form_input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="form_label">
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Account Password"
            className="form_input"
            value={formData.password}
            onChange={handleChange}
            disabled={action === "edit"}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="role" className="form_label">
            Role
          </label>
          <select
            name="role"
            id="role"
            className="form_input"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={role !== "SUPER_ADMIN"}
          >
            <option value="EMPLOYEE">Employee</option>
            {role === "SUPER_ADMIN" && <option value="HR">HR</option>}
            <option value="MANAGER">Manager</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="department" className="form_label">
            Department
          </label>
          <input
            type="text"
            name="department"
            id="department"
            placeholder="e.g Accounting"
            className="form_input"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="employee_type" className="form_label">
            Employee Type
          </label>
          <select
            name="employee_type"
            id="employee_type"
            className="form_input"
            value={formData.employee_type}
            onChange={handleChange}
            required
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PROBATION">Probation</option>
            <option value="INTERN">Intern</option>
            <option value="NOTICE_PERIOD">Notice Period</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="salary" className="form_label">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            id="salary"
            placeholder="e.g 20000"
            className="form_input"
            value={formData.salary}
            onChange={handleChange}
            required
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
          ) : action === "add" ? (
            "Add Employee"
          ) : (
            "Update Employee"
          )}
        </button>
      </form>
    </div>
  )
}

export default EmployeeForm
