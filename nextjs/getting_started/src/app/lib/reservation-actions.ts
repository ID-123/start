"use server";

import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";


export async function createReservation(
  _formData: FormData,
): Promise<void> {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  await prisma.reservation.create({
    data: {
      userId: session.user.id,
    },
  });
}
