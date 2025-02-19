import { auth } from "@/auth"
import BurgerMenu from "@/components/BurgerMenu"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function EmployeeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (session?.user.role !== "SUPER_ADMIN" && session?.user.role !== "HR") {
    redirect("/dashboard")
  }
  return (
    <div className="flex-1 p-8 ">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="flex gap-2 items-start">
          <BurgerMenu name={session?.user?.name} role={session?.user?.role} />
          <div className="flex flex-col">
            <Link href="/employee">
              <h2 className="text-3xl font-bold">Employee</h2>
            </Link>
            <p className="text-gray-500">Manage all the Employee</p>
          </div>
        </div>
        <Link
          href="/employee/add"
          className="bg-primary p-3 text-white rounded-md hover:bg-primary/80 mt-4 sm:mt-0"
        >
          Add Employee
        </Link>
      </div>
      <div className="mt-8 w-full">{children}</div>
    </div>
  )
}
