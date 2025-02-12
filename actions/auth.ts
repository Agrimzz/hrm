"use server"

import { signIn, signOut } from "@/auth"
import { revalidatePath } from "next/cache"
import { AuthError } from "next-auth"

export const logout = async () => {
  await signOut({ redirectTo: "/" })
  revalidatePath("/")
}

export const login = async (
  formData: FormData
): Promise<{ error?: string | null }> => {
  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: "SUPER_ADMIN",
    redirect: false, // Prevent automatic redirect
  }

  try {
    const result = await signIn("credentials", rawFormData)
    if (
      result &&
      typeof result === "object" &&
      "error" in result &&
      result.error
    ) {
      return { error: result.error as string }
    }
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Invalid credentials!" }
      }
      return { error: "Something went wrong!" }
    }
    return { error: "An unexpected error occurred." }
  }
  revalidatePath("/")
  return { error: null }
}
