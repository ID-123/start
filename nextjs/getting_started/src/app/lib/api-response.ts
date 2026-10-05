import { NextResponse } from "next/server";

export function webhookReceivedResponse() {
  return NextResponse.json({ received: true });
}
