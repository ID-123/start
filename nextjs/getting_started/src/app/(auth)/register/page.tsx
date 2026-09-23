"use client";

import { useActionState } from "react";
import { Register } from "@/app/lib/actions";
import Link from "next/link";

const initialState = {
  message: "",
};

export default function RegisterPage() {
  const [state, formAction] = useActionState(Register, initialState);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <p>
        <strong>Register</strong>
      </p>

      <form
        action={formAction}
        className="flex flex-col items-center justify-center gap-1.5"
      >
        <input
          className="border p-0.5"
          type="text"
          name="username"
          placeholder="Username"
        />

        <input
          className="border p-0.5"
          type="email"
          name="email"
          placeholder="Email"
        />

        <input
          className="border p-0.5"
          type="password"
          name="password"
          placeholder="Password"
        />

        <button className="border p-0.5 hover:cursor-pointer" type="submit">
          Send
        </button>
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
