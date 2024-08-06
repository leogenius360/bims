"use client";

import NextLink from "next/link";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
} from "@nextui-org/react";
import { FiGitCommit, FiMinus, FiPlus } from "react-icons/fi";
import { TiFilter } from "react-icons/ti";
import { twMerge } from "tailwind-merge";
import { useCart } from "@/cart/provider";
import { Product } from "@/db/schemas";
import { useAuth } from "@/auth/provider";
import useWindowSize from "@/lib/window_size";
import { allowedUsers } from "@/config/site-config";
import { ChangeEvent, FocusEvent, useState } from "react";
import { CartButton } from "./buttons";

interface ProductCardProps {
  product: Product;
  filter?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  filter,
  className,
}) => {
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <Card
      isBlurred
      className={twMerge(
        "h-full w-full border-1 border-emerald-500 bg-background/60 dark:bg-default-100/50",
        className,
      )}
      shadow="sm"
      radius="sm"
    >
      <CardBody>
        <div className="grid h-full w-full grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Product image"
              className="object-cover"
              height={200}
              width="100%"
              radius="sm"
              shadow="md"
              src={product.imageUrl}
            />
          </div>

          <div className="col-span-6 flex h-full w-full flex-col gap-1 md:col-span-8">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-foreground/90">
                {product.name}
              </h3>
              <h3>
                <small className="text-xs text-emerald-500">GHC</small>
                {product.price}
              </h3>
            </div>

            <div>
              <small className="inline-flex w-full items-center justify-between font-semibold text-foreground/80">
                Stock:
                <span className="text-emerald-400">{product.quantity}</span>
                <FiGitCommit size={18} className="-mb-0.5 px-0.5" />
                <span className="text-red-500">-{product.quantity} out</span>
                <FiGitCommit size={18} className="-mb-0.5 px-0.5" />
                <span className="text-emerald-500">
                  +{product.quantity} next
                </span>
              </small>
            </div>

            <p>{product.description}</p>

            {user && allowedUsers.sales.includes(user.email!) ? (
              <div className="mt-auto flex w-full items-center justify-between gap-2">
                <Button
                  className="font-bold"
                  size="sm"
                  color="primary"
                  radius="sm"
                  variant="ghost"
                >
                  Request stock
                </Button>

                {cart &&
                  (cart.some((cartProduct) => cartProduct.id === product.id) ? (
                    <CartButton product={product} />
                  ) : (
                    <Button
                      className="font-bold"
                      size="sm"
                      color="primary"
                      radius="sm"
                      variant="ghost"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </Button>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

interface ProductHeadlineProps {
  categories: string[];
  tags?: string[] | undefined;
  selectedKeys: Set<string>;
  setSelectedKeys: (keys: Set<string>) => void;
  selectedValue: string;
}

export const ProductHeadline = ({
  categories,
  tags = [],
  selectedKeys,
  setSelectedKeys,
  selectedValue,
}: ProductHeadlineProps) => {
  const { user } = useAuth();
  const { width } = useWindowSize();
  const keys = categories.concat(...tags);

  return (
    <section className="flex items-center justify-between gap-3 px-3 py-3 md:px-6 md:py-4">
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            color="primary"
            radius="sm"
            size="sm"
            startContent={<TiFilter size={22} className="text-emerald-500" />}
            className="font-bold capitalize dark:text-white"
          >
            {selectedValue ? selectedValue : "All products"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="flat"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
          className="w-full"
        >
          {keys.map((key) => (
            <DropdownItem key={key} className="capitalize">
              {key}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      {user && allowedUsers.admins.includes(user.email!) ? (
        <Button
          data-bs-toggle="offcanvas"
          data-bs-target="#newProductForm"
          aria-controls="newProductForm"
          isIconOnly={width && width < 640 ? true : false}
          size="sm"
          radius="sm"
          color="primary"
          variant="ghost"
          startContent={<FiPlus />}
          className="text-sm font-semibold dark:text-white"
        >
          <span className="hidden sm:flex">New product</span>
        </Button>
      ) : null}
    </section>
  );
};

export const CartProductCard = ({ product }: { product: Product }) => {
  const { user } = useAuth();
  const {
    cart,
    addToCart,
    removeFromCart,
    getTotalPricePerProduct,
    getCartTotalPrice,
  } = useCart();

  const totalPricePerProduct = getTotalPricePerProduct();

  return (
    <Card
      isBlurred
      className="border-1 border-emerald-500 bg-background/60 dark:bg-default-100/50"
      shadow="sm"
      radius="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Product image"
              className="object-cover"
              height={200}
              width="100%"
              radius="sm"
              shadow="md"
              src={product.imageUrl}
            />
          </div>

          <div className="col-span-6 flex flex-col justify-between gap-1 md:col-span-8">
            <div className="flex items-start justify-between">
              <h3 className="flex flex-col font-semibold">
                {product.name}
                <span className="text-sm text-foreground/60">
                  <small className="text-xs">GHC</small>
                  {product.price.toFixed(2)}
                </span>
              </h3>
              <h6 className="flex flex-col font-semibold">
                <span>
                  Total (<small className="text-xs">GHC</small>)
                </span>
                <span>{totalPricePerProduct[product.id].toFixed(2)}</span>
              </h6>
            </div>

            <div className="mt-2 flex w-full items-center justify-between gap-2">
              <Button
                className="font-bold"
                size="sm"
                color="primary"
                radius="sm"
                variant="ghost"
                onClick={() => removeFromCart(product.id, true)}
              >
                Remove
              </Button>

              <CartButton product={product} />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
