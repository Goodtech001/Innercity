import { removeSession } from "@/lib/sessions/actions";
import { NextResponse } from "next/server";

export async function POST() {
  await removeSession();

  return NextResponse.json({
    message: "Logged out successfully",
  });
}