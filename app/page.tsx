import { auth } from "@/auth"
import LoginForm from "@/components/LoginForm"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  if (session) {
    redirect("/dashboard")
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent">
      <div className="max-w-4xl bg-backgroundLight rounded-[24] p-8 border border-gray-400">
        <h2 className="text-3xl font-bold text-primary">
          Welcome to HRM System
        </h2>
        <p className="mt-4 text-lg text-gray-600">Please login to continue.</p>

        <LoginForm />
      </div>
    </div>
  )
}
