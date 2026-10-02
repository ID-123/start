import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { createReservation } from "@/app/lib/reservation-actions";

export default async function ReservationsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session){
    return (
      <p>Not Authenticated</p>
    )
  }
  
  const reservations = await prisma.reservation.findMany({
    where: {
      userId: session.user.id 
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main>
      <h1 className="mb-4 text-xl">Reservations</h1>

      <form action={createReservation} className="mb-4">
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white cursor-pointer"
        >
          Create reservation
        </button>
      </form>

      <p>Total: {reservations.length}</p>

      <pre>{JSON.stringify(reservations, null, 2)}</pre>
    </main>
  );
}