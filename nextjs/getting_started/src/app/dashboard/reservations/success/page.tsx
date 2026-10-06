import Link from "next/link";

export default function paymentSucceded() {
  return (
    <div className="flex flex-col min-h-full items-center justify-center gap-2">
      <p>Payment Succeded!</p>
      <Link href={"/dashboard/reservations"} className="border p-1 rounded">
        {" "}
        Return to main{" "}
      </Link>
    </div>
  );
}
