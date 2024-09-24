"use client";

import { useAuth, withLoginRequired } from "@/auth/provider";
import { isAdminUser, isSalesUser } from "@/auth/utils";
import { AccessDenied } from "@/components/access-denied";
import { TransactionsTable } from "@/components/tables";


const TransactionsPage = () => {
  const { user } = useAuth();

  if (!user || (!isAdminUser(user!) && !isSalesUser(user))) {
    return (<AccessDenied />
    );
  }

  return (
    <section className="inline-block w-full px-3">
      <TransactionsTable />
    </section>
  );
};

export default withLoginRequired(TransactionsPage);
