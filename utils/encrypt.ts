import crypto from "crypto"

const algorithm = process.env.ENCRYPTION_ALGORITHM as string
const key = Buffer.from(process.env.ENCRYPTION_KEY as string, "hex")
const iv = Buffer.from(process.env.ENCRYPTION_IV as string, "hex")

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, key, iv)

  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")

  return encrypted
}