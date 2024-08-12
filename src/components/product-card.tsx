import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { FiGitCommit } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { useCart } from "@/cart/provider";
import { CartButton } from "./buttons";
import { Product } from "@/db/product";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { isAdminUser, isSalesUser } from "@/auth/utils";

interface ProductCardProps {
  user?: User;
  product: Product;
  filter?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  user,
  product,
  filter,
  className,
}) => {
  const { cart, addProduct } = useCart();
  const [price, setPrice] = useState<number | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [pendingOutStock, setPendingOutStock] = useState<number | null>(null);
  const [pendingStock, setPendingStock] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const price = await product.getPrice();
        const stock = await product.currentStock();
        const pendingOutStock = await product.pendingOutStock();
        const pendingStock = await product.pendingStock();

        setPrice(price);
        setStock(stock);
        setPendingOutStock(pendingOutStock);
        setPendingStock(pendingStock);
      } catch (err) {
        setError("Failed to load product data");
        console.error(err);
      }
    };

    fetchData();
  }, [product]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

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
                {price !== null ? price : "Loading..."}
              </h3>
            </div>

            <div>
              <small className="inline-flex w-full items-center justify-between font-semibold text-foreground/80">
                Stock:
                <span className="text-emerald-400">
                  {stock !== null ? stock : "Loading..."}
                </span>
                <FiGitCommit size={18} className="-mb-0.5 px-0.5" />
                <span className="text-red-500">
                  -{pendingOutStock !== null ? pendingOutStock : "Loading..."}{" "}
                  out
                </span>
                <FiGitCommit size={18} className="-mb-0.5 px-0.5" />
                <span className="text-emerald-500">
                  +{pendingStock !== null ? pendingStock : "Loading..."} next
                </span>
              </small>
            </div>

            <p>{product.description}</p>

            {(isAdminUser(user) || isSalesUser(user)) && (
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
                {isSalesUser(user) &&
                  (cart.some(
                    (cartProduct) => cartProduct.productId === product.id,
                  ) ? (
                    <CartButton productId={product.id} />
                  ) : (
                    <Button
                      className="font-bold"
                      size="sm"
                      color="primary"
                      radius="sm"
                      variant="ghost"
                      onClick={async () =>
                        addProduct({
                          productId: product.id,
                          productName: product.name,
                          productPrice: price!,
                          productQuantity: 1,
                        })
                      }
                    >
                      Add to cart
                    </Button>
                  ))}
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
