/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "@/constants";
import { setSession } from "@/lib/sessions/actions";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const response = await axios.post(
      `${baseUrl}/auth/login`,
      { email, password }
    );

    const { data } = response;

    // ✅ STORE SESSION IN COOKIE
    await setSession({
      token: data.token,
      user: data.user,
    });

    return NextResponse.json({
      message: "Login successful",
      user: data.user,
    });

  } catch (error: any) {
    return NextResponse.json({
      message: "Login failed",
      error: error?.response?.data || error.message,
    }, { status: 400 });
  }
}