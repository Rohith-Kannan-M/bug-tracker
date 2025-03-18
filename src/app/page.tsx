"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@bugtracker/store";

export default function Home() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user) as { role: string } | null;

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    } else {
      router.replace("/auth/login");
    }
  }, [user, router]);

  return <div>Redirecting...</div>;
}
