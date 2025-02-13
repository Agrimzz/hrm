import { prisma } from "@/prisma"
import bcrypt from "bcryptjs"

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params
    const deletedEmployee = await prisma.user.delete({
      where: { id },
    })

    return new Response(JSON.stringify({ success: true, deletedEmployee }), {
      status: 200,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting employee:", error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Error deleting employee",
      }),
      {
        status: 500,
      }
    )
  }
}

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params
    const employee = await prisma.user.findUnique({
      where: { id },
    })

    return new Response(JSON.stringify({ success: true, employee }), {
      status: 200,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching employee:", error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Error fetching employee",
      }),
      {
        status: 500,
      }
    )
  }
}

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params
    const { name, email, password, role, department, employee_type, salary } =
      await req.json()

    const updatedEmployee = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role,
        department,
        employeeType: employee_type,
        salary: parseFloat(salary),
      },
    })

    return new Response(JSON.stringify({ success: true, updatedEmployee }), {
      status: 200,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating employee:", error)
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Error updating employee",
      }),
      {
        status: 500,
      }
    )
  }
}
