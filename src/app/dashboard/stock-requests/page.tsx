"use client";

import { useAuth } from "@/auth/provider";
import { isAdminUser, isSalesUser } from "@/auth/utils";
import { AccessDenied } from "@/components/access-denied";
import { StockRequestsTable } from "@/components/tables";

export default function StockRequestPage() {
  const { user } = useAuth();

  if (!user || (!isAdminUser(user!) && !isSalesUser(user))) {
    return <AccessDenied />;
  }
  return (
    <section className="inline-block w-full px-3">
      <StockRequestsTable />
    </section>
  );
}
