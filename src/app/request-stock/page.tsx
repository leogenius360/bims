"use client";

import { useStockRequests } from "@/stock-request/provider";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RequestStockPage() {
  const router = useRouter();

  const { stockRequests } = useStockRequests();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button onClick={router.back}>Back</Button>
      <h3 className="font-bold">RequestStockPage yet to be design</h3>
      <ul className="ml-4 list-inside list-disc leading-relaxed">
        {stockRequests.map((req) => (
          <li key={req.productId} className="text-sm">
            <span className="font-bold">Name:</span> {req.productName} {"; "}
            <span className="font-bold">Quantity:</span> {req.productQty}
          </li>
        ))}
      </ul>
    </section>
  );
}
