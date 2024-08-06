"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { internalUrls, support } from "@/config/site-config";

export default function AccessDenied() {
  return (
    <main className="flex h-[80vh] flex-col justify-center gap-3 p-3 align-middle">
      <h1 className="text-center font-bold">Access Denied!</h1>
      <p className="text-center">Sorry, you don&apos;t have access to BIMS </p>

      <div className="text-center">
        <Button href={support.phone} as={Link} color="primary" variant="shadow">
          Contact support
        </Button>
      </div>

      <p className="mt-5 text-center">
        <Link href={internalUrls.login} className="text-sky-500">
          login
        </Link>{" "}
        with a defferent credentials
      </p>
    </main>
  );
}
