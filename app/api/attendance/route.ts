import { prisma } from "@/prisma"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json(
        { error: "User id is required" },
        { status: 400 }
      )
    }

    //get dates from last week to generate random date
    const now = new Date()
    const lastWeekStart = new Date(now)
    lastWeekStart.setDate(now.getDate() - 7)
    const lastWeekEnd = new Date(now)
    lastWeekEnd.setDate(now.getDate() - 1)

    const randomDateBetween = (start: Date, end: Date) => {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      )
    }

    const checkIn = randomDateBetween(lastWeekStart, lastWeekEnd)
    const checkOut = new Date(checkIn.getTime() + 8 * 60 * 60 * 1000)

    const attendance = await prisma.attendance.create({
      data: {
        userId,
        checkIn,
        checkOut,
      },
    })

    return NextResponse.json(
      {
        success: true,
        attendance,
        message: "Attendance added successfully",
      },
      { status: 200 }
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error adding attendance:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    let attendance
    if (userId) {
      attendance = await prisma.attendance.findMany({
        where: { userId },
      })
    } else {
      attendance = await prisma.attendance.findMany()
    }
    return NextResponse.json(attendance, { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching attendance:", error)
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    )
  }
}
