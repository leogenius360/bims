"use client";

import { useAuth, withLoginRequired } from "@/auth/provider";
import { isAdminUser, isSalesUser } from "@/auth/utils";
import { AccessDenied } from "@/components/access-denied";
import { StocksTable } from "@/components/tables";
import { allowedUsers, internalUrls, support } from "@/config/site-config";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const StockPage = () => {
  const { user } = useAuth();

  if (!user || (!isAdminUser(user!) && !isSalesUser(user))) {
    return <AccessDenied />;
  }

  return (
    <section className="inline-block w-full px-3">
      <StocksTable />
    </section>
  );
};

export default withLoginRequired(StockPage);
