"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Register } from "@/app/lib/actions";
import { SubmitButton } from "@/app/ui/submit-button";
import { FormState } from "@/app/lib/types";

const initialState: FormState = {};

export default function RegisterPage() {
  // Check form status and set message
  const [state, formAction] = useActionState(Register, initialState);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <p>
        <strong>Register</strong>
      </p>

      <form
        action={formAction}
        className="flex flex-col items-center justify-center gap-1.5"
        noValidate
      >
        <input
          className="border p-0.5"
          type="text"
          name="username"
          placeholder="Username"
          required
        />

        {state.errors?.username && <p>{state.errors.username[0]}</p>}

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
        Already hace an account?{" "}
        <Link href={"/login"} className="underline hover:text-blue-600">
          Log In
        </Link>
      </p>
    </div>
  );
}
