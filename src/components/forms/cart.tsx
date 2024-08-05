"use client";

import { FormEvent, useState } from "react";
import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import { internalUrls } from "@/config/site-config";
import { Divider } from "..";
import { useCart } from "@/cart/provider";
import { CartProductCard, ProductCard } from "../product";

export const UpdateCartForm = () => {
  const { getProducts, getCartTotalPrice } = useCart();
  const cartTotalPrice = getCartTotalPrice();
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
        <Divider textContent={`Total value: ghc${cartTotalPrice}`} />

        <section className="flex flex-wrap gap-3">
          {getProducts().map((product) => (
            <CartProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
      <div className="offcanvas-footer bg-default-50 px-6 py-2 shadow-inner drop-shadow-md">
        <Button variant="ghost" color="primary" className="w-full font-bold" radius="sm">
          Proceed to buy
        </Button>
      </div>
    </div>
  );
};
