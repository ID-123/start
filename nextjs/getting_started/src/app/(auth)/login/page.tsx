"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Login } from "@/app/lib/actions";
import { SubmitButton } from "@/app/ui/submit-button";
import { FormState } from "@/app/lib/types";
import ReturnButton from "@/app/ui/return-button";

const initialState: FormState = {};

export default function LoginPage() {
  // Check form status and set message
  const [state, formAction] = useActionState(Login, initialState);
  
  // Mock delay and Redirect
  useEffect(() => {
  if (state.message !== "Login successful!") {
    return;
  }

  const timeout = setTimeout(() => {
    window.location.href = "/dashboard";
  }, 500);

  return () => clearTimeout(timeout);
}, [state.message]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <p>
        <strong>Log In</strong>
      </p>

      <form
        action={formAction}
        noValidate
        className="flex items-center justify-center flex-col gap-1.5 details-content:h-1/2"
      >
        <input
          className="border p-0.5"
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        {state.errors?.email && <p>{state.errors.email[0]}</p>}

        <input
          className="border p-0.5"
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        {state.errors?.password && <p>{state.errors.password[0]}</p>}

        <SubmitButton />
      </form>

      <p>{state.message}</p>

      <p>
        Don't have an account?{" "}
        <Link href={"/register"} className="underline hover:text-blue-500">
          Register
        </Link>
      </p>
      <ReturnButton />
    </div>
  );
}
