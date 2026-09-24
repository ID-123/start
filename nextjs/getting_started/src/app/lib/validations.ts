import * as z from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid address."),
  password: z.string().min(1, "Password is required."),
});

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required."),
  email: z.email("Enter a valid address."),
  password: z.string().min(8, "Must contain 8 characters."),
});
