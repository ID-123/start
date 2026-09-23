"use client";

import Link from "next/link";

export default function LoginForm() {
  function handleSubmit(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(`Data received: ${email} | ${password}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2">
      <p>
        <strong>Log In</strong>
      </p>

      <form
        action={handleSubmit}
        className="flex items-center justify-center flex-col gap-1.5"
      >
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
        Don't have an account?{" "}
        <Link href={"/register"} className="underline hover:text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
}
