import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import {
  createReservation,
  deleteAllReservation,
  deletePendingReservations,
} from "@/app/lib/reservation-actions";
import { createCheckoutSession } from "@/app/lib/payment-actions";


export default async function ReservationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    return <p>Not Authenticated</p>;
  }
  

  const reservations = await prisma.reservation.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });


  return (
    <main>
      <h1 className="mb-4 text-xl">Reservations</h1>
      <div className="flex flex-row justify-around gap-1">
        <form action={createReservation} className="mb-4">
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white cursor-pointer"
          >
            Create reservation
          </button>
        </form>
        <form action={deleteAllReservation}>
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white cursor-pointer"
          >
            Delete all reservation
          </button>
        </form>
        <form action={deletePendingReservations}>
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white cursor-pointer"
          >
            Delete pending reservation
          </button>
        </form>
      </div>

      <p>Total: {reservations.length}</p>

      <div className="">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="mb-4 rounded border p-4">
            <p>
              <strong>ID:</strong> {reservation.id}
            </p>
            <p>
              <strong>Status:</strong> {reservation.status}
            </p>

            {reservation.status === "PENDING" && (
              <form action={createCheckoutSession} className="mt-2">
                <input
                  type="hidden"
                  name="reservationId"
                  value={reservation.id}
                />
                <button
                  type="submit"
                  className="rounded bg-black px-4 py-2 text-white cursor-pointer"
                >
                  Pay Reservation
                </button>
              </form>
            )}
          </div>
        ))}
      </div>

    </main>
  );
}
