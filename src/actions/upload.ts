"use server"

import { put } from "@vercel/blob"
import { auth } from "@/lib/auth"

export async function uploadImage(formData: FormData) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const file = formData.get("file") as File
  if (!file) throw new Error("No file provided")

  const blob = await put(`hesp/${Date.now()}-${file.name}`, file, {
    access: "public",
  })

  return blob.url
}
