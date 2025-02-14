import { auth } from "@/auth"
import BurgerMenu from "@/components/BurgerMenu"
import { IconDoorExit, IconUser, IconUsers } from "@tabler/icons-react"
import React from "react"

const Dashboard = async () => {
  const session = await auth()
  return (
    <div className="flex-1 p-8 ">
      <div className="flex gap-2 items-start">
        <BurgerMenu name={session?.user?.name} role={session?.user?.role} />
        <div className="flex flex-col ">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-500">Welcome to your dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-8 sm:grid-cols-3">
        <div className="flex flex-col gap-4 items-center p-4 bg-background rounded-lg border border-primary hover:bg-primary hover:text-white cursor-pointer">
          <div className="text-white bg-primary rounded-full p-2">
            <IconUser size={32} />
          </div>
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">20</p>
        </div>
        <div className="flex flex-col gap-4 items-center p-4 bg-background rounded-lg border border-primary hover:bg-primary hover:text-white cursor-pointer">
          <div className="text-white bg-primary rounded-full p-2">
            <IconUsers size={32} />
          </div>
          <h3 className="text-xl font-semibold">Total Employees</h3>
          <p className="text-3xl font-bold">32</p>
        </div>
        <div className="flex flex-col gap-4 items-center p-4 bg-background rounded-lg border border-primary hover:bg-primary hover:text-white cursor-pointer">
          <div className="text-white bg-primary rounded-full p-2">
            <IconDoorExit size={32} />
          </div>
          <h3 className="text-xl font-semibold">Total Leave Requests</h3>
          <p className="text-3xl font-bold">4</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
