"use client"
import { IconLoadBalancer } from "@tabler/icons-react"
import Link from "next/link"
import React from "react"
import Logout from "./Logout"
import { usePathname } from "next/navigation"
import { roleNavlinks } from "@/constants"

const Sidebar = ({
  name,
  role,
}: {
  name: string | null | undefined
  role: string
}) => {
  const pathname = usePathname()
  const navlinks = roleNavlinks[role] || roleNavlinks["EMPLOYEE"]
  return (
    <div className="w-[300px] h-full bg-accent/30 py-8 px-4 flex flex-col justify-between">
      <div>
        <div className="flex gap-1 items-center">
          <IconLoadBalancer size={32} />

          <h1 className="text-2xl font-bold text-primary">HRM System</h1>
        </div>

        <div className="flex flex-col mt-16 gap-4">
          {navlinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className={`w-full flex gap-2 items-center hover:bg-accent p-2 rounded-lg cursor-pointer ${
                pathname === link.href || pathname.startsWith(link.href)
                  ? "bg-accent"
                  : ""
              }`}
            >
              <link.icon size={24} />
              <p className="font-semibold text-md">{link.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex  items-center justify-between">
        <div className="flex flex-col">
          <p className="text-xl font-bold text-primary">{name}</p>
          <p className="text-sm font-semibold text-gray-500 capitalize">
            {role}
          </p>
        </div>
        <Logout />
      </div>
    </div>
  )
}

export default Sidebar
