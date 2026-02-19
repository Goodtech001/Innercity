'use client'

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      sessionStorage.setItem(
        "course-training-profile",
        JSON.stringify({ token })
      );
      router.push("/");
    } else {
      router.push("/sign-in");
    }
  }, [router, searchParams]);

  return <p>Logging you in...</p>;
}
