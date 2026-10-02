import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { lusitana } from "@/app/ui/fonts";
import Card from "../ui/dashboard/cards";


export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main>
      <div className={`${lusitana.className} flex flex-row justify-between`}>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <p>Logged in as: {session?.user.name ?? "Not authenticated"}</p>
        <p>UserID: {session?.user.id ?? "Not authenticated"}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Reservations" value="-" type="reservations" />
        <Card title="Payments" value="-" type="payments" />
        <Card title="Tickets" value="-" type="tickets" />
        <Card
          title="Customers"
          value="-"
          type="customers"
        />
      </div>
    </main>
  );
}
