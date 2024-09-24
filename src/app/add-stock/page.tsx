"use client";

import { useStockCart } from "@/stock/provider";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AddStockPage() {
  const router = useRouter();

  const { stockCart, getTotalStockCost } = useStockCart();

  return (
    <section className="mx-auto max-w-screen-md w-s px-3 py-6 md:py-10 lg:px-6 lg:py-8">
      <Button onClick={router.back}>Back</Button>
      <h3 className="font-bold">Add Stock Page</h3>

      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        <div className="card rounded-md px-6 py-3">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                <th className="font-bold">Product</th>
                <th className="font-bold">Price</th>
                <th className="font-bold">Quantity</th>
                <th className="font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {stockCart.map((product) => (
                <tr key={product.id}>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.price}</td>
                  <td className="py-2">{product.qty}</td>
                  <td className="py-2">
                    {(product.qty * product.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card max-h-full rounded-md px-6 py-3">
          <h4 className="font-bold">Summary</h4>
          <p>Total Cost: {getTotalStockCost().toFixed(2)}</p>
          {/* You can add more summary details here */}
        </div>
      </div>
    </section>
  );
}
