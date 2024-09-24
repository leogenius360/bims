"use client";

import { Button, UseDisclosureProps } from "@nextui-org/react";
import { Divider } from "..";
import { useCart } from "@/cart/provider";
import {
  CartProductCard,
  StockCartProductCard,
} from "../cards/cart-product-card";
import { useStockCart } from "@/stock/provider";
import Link from "next/link";
import { internalUrls } from "@/config/site-config";
import { useRouter } from "next/navigation";

interface CartFormProps {
  salesModal?: UseDisclosureProps;
}

export const UpdateCartForm = ({ salesModal }: CartFormProps) => {
  const { cart, getTotalCost, removeProduct } = useCart();

  return (
    <div
      className="offcanvas offcanvas-end w-screen border-primary md:max-w-96"
      data-bs-scroll="false"
      id="updateCartForm"
      aria-labelledby="updateCartFormLabel"
    >
      <div className="offcanvas-header bg-default-50 drop-shadow-md">
        <h6 className="offcanvas-title font-bold" id="updateCartFormLabel">
          Cart
        </h6>
        <button
          className="btn-close"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <hr />
      </div>
      <div className="offcanvas-body">
        <Divider textContent={`Total value: ${getTotalCost().toFixed(2)}`} />

        <section className="flex flex-wrap gap-3">
          {cart.map((product) => (
            <CartProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              qty={product.qty}
              removeProduct={removeProduct}
            />
          ))}
        </section>
      </div>
      <div className="offcanvas-footer bg-default-50 px-2 py-1 shadow-inner drop-shadow-md">
        {cart.length > 0 ? (
          <div className="flex gap-3">
            <Button
              variant="ghost"
              color="primary"
              radius="none"
              className="w-full rounded font-bold"
              onPress={salesModal?.onOpen}
              data-bs-dismiss="offcanvas"
            >
              Proceed to checkout
            </Button>
            <Button
              aria-label="Close"
              data-bs-dismiss="offcanvas"
              variant="ghost"
              color="primary"
              radius="none"
              className="w-full rounded font-bold"
            >
              Add more products
            </Button>
          </div>
        ) : (
          <Button
            aria-label="Close"
            data-bs-dismiss="offcanvas"
            variant="ghost"
            color="primary"
            radius="none"
            className="w-full rounded font-bold"
          >
            Add more products
          </Button>
        )}
      </div>
    </div>
  );
};

interface StockCartFormProps {
  newStockModal?: UseDisclosureProps;
}
export const UpdateStockCartForm = ({ newStockModal }: StockCartFormProps) => {
  const router = useRouter();
  const { stockCart, getTotalStockCost, removeStockProduct } = useStockCart();

  return (
    <div
      className="offcanvas offcanvas-end w-screen border-primary md:max-w-96"
      data-bs-scroll="false"
      id="newStockForm"
      aria-labelledby="newStockFormLabel"
    >
      <div className="offcanvas-header bg-default-50 drop-shadow-md">
        <h6 className="offcanvas-title font-bold" id="newStockFormLabel">
          New Stock Cart
        </h6>
        <button
          className="btn-close"
          type="button"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        <hr />
      </div>
      <div className="offcanvas-body">
        <Divider
          textContent={`Total value: ${getTotalStockCost().toFixed(2)}`}
        />

        <section className="flex flex-wrap gap-3">
          {stockCart.map((product) => (
            <StockCartProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              qty={product.qty}
              removeProduct={removeStockProduct}
            />
          ))}
        </section>
      </div>
      <div className="offcanvas-footer bg-default-50 px-2 py-1 shadow-inner drop-shadow-md">
        {stockCart.length > 0 ? (
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              color="primary"
              className="w-full rounded font-bold"
              radius="none"
              onPress={newStockModal?.onOpen}
              data-bs-dismiss="offcanvas"
            >
              Save and proceed
            </Button>

            <Button
              onClick={() => router.push(internalUrls.home)}
              variant="ghost"
              color="primary"
              className="w-full rounded font-bold"
              radius="none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Add more stock
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => router.push(internalUrls.home)}
            variant="ghost"
            color="primary"
            className="w-full rounded font-bold"
            radius="none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Add more stock
          </Button>
        )}
      </div>
    </div>
  );
};
