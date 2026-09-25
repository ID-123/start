"use server";

import * as z from "zod";
import { headers } from "next/headers";

import { auth } from "./auth";
import { FormState } from "./types";
import { loginSchema, registerSchema } from "./validations";

export async function Login(
  _previousState: FormState,
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

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    return {
      message: "Login successful!",
    };
  } catch (error) {
    console.error("Login failed:", error);

    return {
      message: "Invalid email or password.",
    };
  }
}

export async function Register(
  _previousState: FormState,
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

  console.log(`Data received: ${username} | ${email}`);

  try {
    await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password,
      },
    });

    return {
      message: `Welcome in, ${username}!`,
    };
  } catch (error) {
    console.error("Registration failed:", error);

    return {
      message: "Unable to create your account.",
    };
  }
}
