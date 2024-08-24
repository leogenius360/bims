import { Card, CardBody, Image } from "@nextui-org/react";
import { FiGitCommit } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { CartButton, RequestStockButton, StockCartButton } from "../buttons";
import { Product } from "@/db/product";
import { useState } from "react";
import { User } from "firebase/auth";
import { isAdminUser, isSalesUser } from "@/auth/utils";

interface ProductCardProps {
  user: User | null;
  product: Product;
  filter?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  user,
  product,
  className,
}) => {
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
              className="max-h-32 object-cover"
              height={"100%"}
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
                {product.price.toFixed(2)}
              </h3>
            </div>

            <div>
              <small className="inline-flex w-full items-center justify-between font-semibold text-foreground/80">
                Stock:
                <span className="text-emerald-400">{product.stock?.qty}</span>
                <FiGitCommit size={18} className="-mb-0.5 px-0.5" />
                <span className="text-red-500">
                  -{product.stock?.outgoing} out
                </span>
                <FiGitCommit size={18} className="-mb-0.5 px-0.5" />
                <span className="text-emerald-500">
                  +{product.stock?.incoming} next
                </span>
              </small>
            </div>

            <p>{product.description}</p>

            <div className="mt-auto flex w-full items-center justify-between gap-2">
              {isAdminUser(user) && (
                <>
                  <RequestStockButton
                    product={{
                      id: product.id,
                      name: product.name,
                      qty: 1,
                    }}
                  />

                  <StockCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      qty: 1,
                    }}
                  />
                </>
              )}

              {isSalesUser(user) && (
                <>
                  <StockCartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      qty: 1,
                    }}
                  />
                  <CartButton
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      qty: 1,
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
