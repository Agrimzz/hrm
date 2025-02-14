import { prisma } from "@/prisma"

export const PATCH = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params

  const { status } = await req.json()

  try {
    const leave = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status,
      },
    })
    return new Response(JSON.stringify({ success: true, leave }), {
      status: 200,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    )
  }
}
