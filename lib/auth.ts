// lib/auth.ts
export type Role = "admin" | "author"

export function getCurrentUser() {
  return {
    id: "user_001",
    name: "Shashank",
    role: "admin" as Role, // change to "author" to test
  }
}
