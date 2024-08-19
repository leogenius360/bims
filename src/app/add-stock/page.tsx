"use client";

import { useStockCart } from "@/stock/provider";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddStockPage() {
  const router = useRouter();

  const { stockCart } = useStockCart();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button onClick={router.back}>Back</Button>
      <h3 className="font-bold">AddStockPage yet to be design</h3>
      <ul className="ml-4 list-inside list-disc leading-relaxed">
        {stockCart.map((cart) => (
          <li key={cart.productId} className="text-sm">
            <span className="font-bold">Name:</span> {cart.productName} {"; "}
            <span className="font-bold">Quantity:</span> {cart.productQty}
          </li>
        ))}
      </ul>
    </section>
  );
}
