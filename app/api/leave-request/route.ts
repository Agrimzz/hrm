import { prisma } from "@/prisma"

export const POST = async (req: Request) => {
  const { userId, type, subject, startDate, endDate, body } = await req.json()
  console.log(userId, type, subject, startDate, endDate, body)

  try {
    const leave = await prisma.leaveRequest.create({
      data: {
        userId,
        type,
        subject,
        body,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    })

    return new Response(
      JSON.stringify({
        success: true,
        leave,
        message: "Leave request submitted succesfully",
      }),
      { status: 200 }
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Error submitting request",
        error: error.message,
      }),
      { status: 500 }
    )
  }
}

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    // Get role and userId from query parameters
    const role = searchParams.get("role")
    const userId = searchParams.get("userId")

    let leaveRequests
    if (role === "EMPLOYEE" || role === "MANAGER") {
      leaveRequests = await prisma.leaveRequest.findMany({
        where: { userId: userId || undefined },
        include: {
          user: { select: { name: true } },
        },
      })
    } else {
      leaveRequests = await prisma.leaveRequest.findMany({
        include: {
          user: { select: { name: true } },
        },
      })
    }

    return new Response(JSON.stringify(leaveRequests), { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Error fetching leave requests",
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
