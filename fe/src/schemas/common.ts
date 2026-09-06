import { z } from "zod"

export const registerSchema = z
  .object({
    first_name: z.string().min(3),
    last_name: z.string().min(3),
    email: z.email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const sendMessageSchema = z.object({
  sender: z.object({
    id: z.string(),
    location: z.object({
      latitude: z.coerce.number(),
      longitude: z.coerce.number(),
    }),
  }),
  content: z.string(),
})

export type SendMessageSchema = z.infer<typeof sendMessageSchema>

export type RegisterSchema = z.infer<typeof registerSchema>

export type LoginSchema = z.infer<typeof loginSchema>

export type User = {
  id: string
  firstName: string
  lastName: string
  fullName: string
  contact: { phone: string; address: string }
  email: string
}
