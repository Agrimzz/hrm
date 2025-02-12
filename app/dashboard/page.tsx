import { auth } from "@/auth"
import Logout from "@/components/Logout"
import React from "react"

const Dashboard = async () => {
  const session = await auth()
  return (
    <div>
      Dashboard
      <Logout />
      {session?.user?.email}
    </div>
  )
}

export default Dashboard
