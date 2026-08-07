import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type User = {
  id: string,
  firstName: string,
  lastName: string,
  fullName: string,
  contact: { phone: string, address: string },
  email: string
}