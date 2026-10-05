"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "./auth";
import { prisma } from "./prisma";
import { stripe } from "./stripe";

export async function createCheckoutSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not logged in");
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId: session.user.id,
    },
  });

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
