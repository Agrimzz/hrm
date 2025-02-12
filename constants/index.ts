import { IconDoorExit, IconHome, IconUsers } from "@tabler/icons-react"

export const roleNavlinks: Record<
  string,
  { name: string; href: string; icon: React.FC<{ size: number }> }[]
> = {
  EMPLOYEE: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: IconHome,
    },
    {
      name: "Leave Request",
      href: "/leave-request",
      icon: IconDoorExit,
    },
  ],
  MANAGER: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: IconHome,
    },
    {
      name: "Leave Request",
      href: "/leave-request",
      icon: IconDoorExit,
    },
  ],
  SUPER_ADMIN: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: IconHome,
    },
    {
      name: "Employee",
      href: "/employee",
      icon: IconUsers,
    },
    {
      name: "Leave Request",
      href: "/leave-request",
      icon: IconDoorExit,
    },
  ],
  HR: [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: IconHome,
    },
    {
      name: "Employee",
      href: "/employee",
      icon: IconUsers,
    },
    {
      name: "Leave Request",
      href: "/leave-request",
      icon: IconDoorExit,
    },
  ],
}
