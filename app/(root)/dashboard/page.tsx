import { auth } from "@/auth"
import React from "react"

const Dashboard = async () => {
  const session = await auth()
  return (
    <div className="flex-1 p-8 ">
      <div className="flex flex-col ">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-gray-500">Welcome to your dashboard</p>
      </div>

      {session?.user?.role === "SUPER_ADMIN" && (
        <button className="bg-primary text-white px-4 py-2 rounded-lg">
          Add
        </button>
      )}
    </div>
  )
}

export default Dashboard
