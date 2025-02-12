// next-auth.d.ts
import "next-auth"
import "next-auth/core/adapters"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
  interface User {
    role: string
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string
  }
}
