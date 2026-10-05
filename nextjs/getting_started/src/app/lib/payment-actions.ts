"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";
import { prisma } from "./prisma";
import { stripe } from "./stripe";

export async function createCheckoutSession(formData: FormData) {
  
  const reservationId = formData.get("reservationId")
  
  if (typeof reservationId !== "string" || !reservationId) {
    throw new Error("Reservation ID is required.")
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not logged in");
  }

  const reservation = await prisma.reservation.findFirst({
    where: {
      id: reservationId,
      userId: session.user.id,
      status: "PENDING",
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found or can't be paid.")
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Reservation" },
          unit_amount: 1000,
        },
        quantity: 1,
      },
    ],
    metadata: {
      reservationId: reservation.id,
      userId: session.user.id,
    },

    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/reservations/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/reservations`,
  });

  if (!checkoutSession.url) {
    throw new Error("Stripe checkout URL was not created.");
  }

  redirect(checkoutSession.url);
}
