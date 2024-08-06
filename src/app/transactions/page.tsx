"use client";

import { useAuth, withLoginRequired } from "@/auth/provider";
import { allowedUsers, internalUrls, support } from "@/config/site-config";
import { Button } from "@nextui-org/react";
import Link from "next/link";

const TransactionsPage = () => {
  const { user } = useAuth();

  if (user && !allowedUsers.admins.includes(user.email!)) {
    return (
      <section className="flex h-[75vh] flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className="text-center font-bold">Access Denied!</h1>
        <p className="text-center">
          Sorry, you don&apos;t have access to this route / page
        </p>

        <div className="text-center">
          <Button
            href={support.phone}
            as={Link}
            color="primary"
            variant="shadow"
          >
            Contact support
          </Button>
        </div>

        <p className="mt-5 text-center">
          <Link href={internalUrls.login} className="text-sky-500">
            login
          </Link>{" "}
          with a defferent credentials
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h3>Transactions page</h3>
    </section>
  );
};

export default withLoginRequired(TransactionsPage);
