"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="border p-0.5 hover:cursor-pointer"
      type="submit"
      disabled={pending}
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}
