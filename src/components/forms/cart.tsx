"use client";

import { Button } from "@nextui-org/react";
import { Divider } from "..";
import { useCart } from "@/cart/provider";
import { CartProductCard, StockCartProductCard } from "../cards/cart-product-card";
import { useStockCart } from "@/stock/provider";
import Link from "next/link";
import { internalUrls } from "@/config/site-config";

export const UpdateCartForm = () => {
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
              key={product.productId}
              productId={product.productId}
              productName={product.productName}
              productPrice={product.productPrice}
              productQty={product.productQty}
              removeProduct={removeProduct}
            />
          ))}
        </section>
      </div>
      <div className="offcanvas-footer bg-default-50 px-2 py-1 shadow-inner drop-shadow-md">
        {cart.length > 0 ? (
          <div className="flex gap-3">
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
            <Button
              as={Link}
              href={internalUrls.checkout}
              data-bs-dismiss="offcanvas"
              variant="ghost"
              color="primary"
              radius="none"
              className="w-full rounded font-bold"
            >
              Proceed to checkout
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

export const UpdateStockCartForm = () => {
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
              key={product.productId}
              productId={product.productId}
              productName={product.productName}
              productPrice={product.productPrice}
              productQty={product.productQty}
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
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              Add more stock
            </Button>

            <Button
              as={Link}
              href={internalUrls.addStock}
              variant="ghost"
              color="primary"
              className="w-full rounded font-bold"
              radius="none"
            >
              Save and proceed
            </Button>
          </div>
        ) : (
          <Button
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
