import { getSession } from "@/lib/sessions/actions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session.isLoggedIn) {
      return NextResponse.json(
        { user: null },
        { status: 200 } // ✅ still return JSON
      );
    }

    return NextResponse.json({
      user: session.user,
    });
  } catch (error) {
    return NextResponse.json(
      { user: null, error: 'Session error' },
      { status: 500 }
    );
  }
}