"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/auth/provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect");

  if (user) redirectUrl ? router.push(redirectUrl) : null;

  return <main className="mx-auto w-full max-w-xl px-2 py-6">{children}</main>;
}
