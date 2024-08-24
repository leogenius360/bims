import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import { CartButton, StockCartButton } from "../buttons";
import { Product } from "@/db/product";
import { useEffect, useState } from "react";
import { CgTrash } from "react-icons/cg";

interface CartProductCardProps {
  id: string;
  name: string;
  price: number;
  qty: number;
  removeProduct: (id: string) => void;
  className?: string;
}

export const CartProductCard: React.FC<CartProductCardProps> = ({
  id,
  name,
  price,
  qty,
  removeProduct,
  className,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const product = await Product.get(id); // assuming a function exists to fetch product details by ID
        setImageUrl(product!.imageUrl);
      } catch (err) {
        setError("Failed to load product image");
        console.error(err);
      }
    };

    fetchProductImage();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card
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
            {imageUrl && (
              <Image
                alt="Product image"
                className="max-h-32 object-cover"
                height={"100%"}
                width="100%"
                radius="sm"
                shadow="md"
                src={imageUrl}
              />
            )}
          </div>

          <div className="col-span-6 flex flex-col justify-between gap-1 md:col-span-8">
            <div className="flex items-start justify-between">
              <h6 className="flex flex-col text-sm font-semibold">
                {name}
                <span className="text-sm text-foreground/60">
                  <small className="text-xs">GHC</small>
                  {price.toFixed(2)}
                </span>
              </h6>
              <h6 className="flex flex-col text-sm font-semibold">
                <span>
                  Total (<small className="text-xs">GHC</small>)
                </span>
                <span>{qty * price}</span>
              </h6>
            </div>

            <div className="mt-2 flex w-full items-center justify-between gap-2">
              <Button
                size="sm"
                color="danger"
                radius="sm"
                variant="ghost"
                startContent={<CgTrash />}
                onClick={() => removeProduct(id)}
                className="font-bold"
              >
                Remove
              </Button>

              <CartButton
                product={{
                  id: id,
                  name: name,
                  price: price,
                  qty: 1,
                }}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const StockCartProductCard: React.FC<CartProductCardProps> = ({
  id,
  name,
  price,
  qty,
  removeProduct,
  className,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const product = await Product.get(id);
        setImageUrl(product!.imageUrl);
      } catch (err) {
        setError("Failed to load product image");
        console.error(err);
      }
    };

    fetchProductImage();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card
      className={twMerge(
        "h-full w-full border-1 border-emerald-500 bg-background/60 dark:bg-default-100/50",
        className,
      )}
      shadow="sm"
      radius="sm"
    >
      <CardBody>
        <div className="grid h-full w-full grid-cols-6 items-center justify-center gap-6 md:grid-cols-12 md:gap-4">
          <div className="relative col-span-6 overflow-hidden md:col-span-4">
            {imageUrl && (
              <Image
                alt="Product image"
                className="max-h-32 object-cover"
                height={"100%"}
                width="100%"
                radius="sm"
                shadow="md"
                src={imageUrl}
              />
            )}
          </div>

          <div className="col-span-6 flex flex-col justify-between gap-1 md:col-span-8">
            <div className="flex items-start justify-between">
              <h6 className="flex flex-col text-sm font-semibold">
                {name}
                <span className="text-sm text-foreground/60">
                  <small className="text-xs">GHC</small>
                  {(qty * price).toFixed(2)}
                </span>
              </h6>

              <Button
                isIconOnly
                size="sm"
                color="danger"
                radius="sm"
                variant="light"
                startContent={<CgTrash size={18} />}
                onClick={() => removeProduct(id)}
                className="font-bold"
              ></Button>
            </div>

            <div className="mt-2 flex w-full items-center justify-between gap-2">
              <StockCartButton
                product={{
                  id: id,
                  name: name,
                  price: price,
                  qty: 1,
                }}
              />
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
