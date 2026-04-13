import crypto from "crypto"

const algorithm = "aes-256-cbc"

const key = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_KEY!, "hex")
const iv = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_IV!, "hex")

export function decrypt(text: string) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv)

  let decrypted = decipher.update(text, "hex", "utf8")
  decrypted += decipher.final("utf8")

  return JSON.parse(decrypted)
}