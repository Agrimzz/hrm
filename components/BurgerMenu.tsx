"use client"
import { IconMenu2 } from "@tabler/icons-react"
import React, { useState } from "react"
import Sidebar from "./Sidebar"

const BurgerMenu = ({
  name,
  role,
}: {
  name: string | null | undefined
  role: string
}) => {
  const [active, setActive] = useState(false)
  return (
    <div className="block md:hidden mt-1">
      <IconMenu2 size={32} onClick={() => setActive(!active)} />
      {active && (
        <div className="absolute min-w-[300px] h-screen top-0 left-0 bg-accent">
          <Sidebar name={name} role={role} setActive={setActive} />
        </div>
      )}
    </div>
  )
}

export default BurgerMenu
