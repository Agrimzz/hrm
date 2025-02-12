"use client"
import { useState } from "react"
import { login } from "@/actions/auth"
import { useRouter } from "next/navigation"

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    try {
      const result = await login(formData)
      console.log(result)
      if (result?.error) {
        setError(result.error)
      } else {
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Something went wrong!")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-lg font-bold text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="you@email.com"
          className="w-full p-2 outline-none border border-gray-400 rounded-md"
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-lg font-bold text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          className="w-full p-2 outline-none border border-gray-400 rounded-md"
          required
        />
      </div>
      <button
        disabled={pending}
        type="submit"
        className="w-full rounded-md bg-primary text-white p-2 text-lg hover:bg-primary/80"
      >
        {pending ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}

export default LoginForm
