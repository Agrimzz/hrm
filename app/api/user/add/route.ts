import { prisma } from "@/prisma"
import bcrypt from "bcryptjs"

export const POST = async (req: Request) => {
  const { name, email, password, role, department, employee_type, salary } =
    await req.json()

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })
  if (existingUser) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "User already exists",
      }),
      { status: 200 }
    )
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        department,
        employeeType: employee_type,
        salary: parseFloat(salary),
      },
    })

    return new Response(
      JSON.stringify({
        success: true,
        user,
        message: "Employee added successfully",
      }),
      { status: 200 }
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating employee:", error)
    return new Response(
      JSON.stringify({
        message: "Error creating employee",
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
