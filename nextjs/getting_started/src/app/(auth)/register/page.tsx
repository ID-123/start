"use client";

import { Register } from "@/app/lib/actions";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <p>
        <strong>Register</strong>
      </p>

      <form
        action={Register}
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
      <p>
        Already hace an account?{" "}
        <Link href={"/login"} className="underline hover:text-blue-600">
          Log In
        </Link>
      </p>
    </div>
  );
}
