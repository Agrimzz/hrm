"use client"
import { logout } from "@/actions/auth"
import { IconLogout } from "@tabler/icons-react"
import React from "react"

const Logout = () => {
  return (
    <div onClick={() => logout()}>
      <div className=" text-red-600 cursor-pointer">
        <IconLogout size={32} />
      </div>
    </div>
  )
}

export default Logout
