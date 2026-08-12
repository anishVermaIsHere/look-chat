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


export const sendMessageSchema = z.object({
  sender: z.object({
    id: z.string(),
    location: z.object({
      latitude: z.coerce.number(),
      longitude: z.coerce.number()
    }),
  }),
  content: z.string()
});

export type SendMessageSchema = z.infer<typeof sendMesageSchema>