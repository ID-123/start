"use server";

import { headers } from "next/headers";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function createReservation(_formData: FormData): Promise<void> {
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

export async function deleteAllReservation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not logged in");
  }

  await prisma.reservation.deleteMany({
    where: { userId: session.user.id },
  });
}

export async function deletePendingReservations() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Not logged in");
  }

  await prisma.reservation.deleteMany({
    where: {
      userId: session.user.id,
      status: "PENDING",
    },
  });
}
