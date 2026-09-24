"use server";

import * as z from "zod";
import { loginSchema, registerSchema } from "./validations";

type FormState = {
  message?: string;
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
};

export async function Login(
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validateFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    const errors = z.flattenError(validateFields.error);

    return {
      errors: errors.fieldErrors,
    };
  }

  const { email, password } = validateFields.data;

  console.log(`Data received: ${email} | ${password}`);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    message: `Login received for ${email}`,
  };
}

export async function Register(
  previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const validateFields = registerSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    const errors = z.flattenError(validateFields.error);

    return {
      errors: errors.fieldErrors,
    };
  }

  const { username, email, password } = validateFields.data;

  console.log(`Data received: ${username} | ${email} | ${password}`);

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    message: `Welcome, ${username}!`,
  };
}
