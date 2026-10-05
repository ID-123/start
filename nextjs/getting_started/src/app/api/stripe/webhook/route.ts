import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/app/lib/prisma";
import { stripe } from "@/app/lib/stripe";
import { webhookReceivedResponse } from "@/app/lib/api-response";

export async function POST(request: Request) {
  // Verifica firma usando el body de la petición
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  // Stripe comprueba autenticidad de la petición
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Stripe webhook signature verification failed: ", error);

    return NextResponse.json(
      { error: "Invalid Stripe signature" },
      { status: 400 },
    );
  }

  if (event.type !== "checkout.session.completed") {
    return webhookReceivedResponse();
  }

  const checkoutSession = event.data.object;

  if (checkoutSession.payment_status !== "paid") {
    console.log(`Checkout session ${checkoutSession.id} is not paid yet.`);

    return webhookReceivedResponse();
  }

  const reservationId = checkoutSession.metadata?.reservationId;

  if (!reservationId) {
    console.error("Missing reservationId in Stripe metadata.");

    return NextResponse.json(
      { error: "Missing reservationId" },
      { status: 400 },
    );
  }

  const reservation = await prisma.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });

  if (!reservation) {
    console.error(`Reservation ${reservationId} not found.`);

    return NextResponse.json(
      { error: "Reservation not found." },
      { status: 404 },
    );
  }

  if (reservation.status === "PAID") {
    console.log(`Reservation ${reservationId} is already PAID.`);

    return webhookReceivedResponse();
  }

  await prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      status: "PAID",
    },
  });

  return webhookReceivedResponse();
}
