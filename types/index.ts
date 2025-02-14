export type FormState = {
  error: string | null
}

export type EmployeeData = {
  id: string
  name: string
  email: string
  employeeType: string
  password?: string
  role: string
  department: string
  salary: number
}

export type EmployeeFormProps = {
  employee?: EmployeeData
  action: "edit" | "add"
  role?: string
}

export type LeaveData = {
  id: string
  type: string
  subject: string
  body: string
  status: string
  startDate: Date
  endDate: Date
  user: {
    name: string
  }
}

export type LeaveTableProps = {
  role: string
  userId: string
}
