import NextLink from "next/link";
import { Button, Input } from "@nextui-org/react";
import { FiMinus, FiPhone, FiPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/provider";
import { useState } from "react";
import { handleAuthErrors } from "@/auth/firebase";
import { support } from "@/config/site-config";
import { CartProduct, useCart } from "@/cart/provider";
import { StockCartProduct, useStockCart } from "@/stock/provider";
import {
  StockRequestProduct,
  useStockRequests,
} from "@/stock-request/provider";

export const SupportButton = () => {
  return (
    <Button
      as={NextLink}
      size="sm"
      href={support.phone}
      radius="full"
      color="primary"
      variant="ghost"
      endContent={<FiPhone />}
      className="h-6 w-full min-w-28 text-sm font-semibold ring-1 ring-emerald-600 ring-offset-1 lg:h-7 dark:text-white dark:ring-offset-gray-800"
    >
      Support
    </Button>
  );
};

export const GoogleLoginButton = () => {
  const [errors, setErrors] = useState<string>("");
  const router = useRouter();

  const { loginWithGoogle } = useAuth();

  const handleGoogleAuth = async () => {
    try {
      const user = await loginWithGoogle();
      router.forward();
    } catch (error) {
      handleAuthErrors(error, setErrors);
      console.log(error);
    }
  };

  return (
    <Button
      size="md"
      radius="none"
      color="primary"
      variant="ghost"
      onClick={handleGoogleAuth}
      className="text-sx w-full rounded-md border-1 font-semibold shadow-md"
      startContent={<FcGoogle size={16} className="" />}
    >
      Google
    </Button>
  );
};

export const CartButton = ({ product }: { product: CartProduct }) => {
  const { cart, addProduct, updateProductQty } = useCart();
  const cartProduct = cart.find((p) => p.id === product.id);

  return cartProduct ? (
    <Input
      type="text"
      placeholder="0"
      value={cartProduct?.qty.toString() || "0"}
      size="sm"
      radius="sm"
      color="primary"
      variant="bordered"
      startContent={
        <Button
          isIconOnly
          size="sm"
          radius="none"
          color="primary"
          variant="solid"
          onClick={() =>
            updateProductQty({ id: product.id, minus: true })
          }
        >
          <FiMinus size={18} />
        </Button>
      }
      endContent={
        <Button
          isIconOnly
          size="sm"
          radius="none"
          color="primary"
          variant="solid"
          onClick={() =>
            updateProductQty({ id: product.id, plus: true })
          }
        >
          <FiPlus size={18} />
        </Button>
      }
      onChange={(e) =>
        updateProductQty({
          id: product.id,
          quantity: Number(e.target.value),
        })
      }
      className="max-w-28 items-center"
      classNames={{
        inputWrapper:
          "border-emerald-700 data-[hover=true]:border-primary px-0 overflow-hidden font-bold",
        input: "text-center font-semibold",
      }}
    />
  ) : (
    <Button
      className="font-bold"
      size="sm"
      color="primary"
      radius="sm"
      variant="ghost"
      onClick={async () =>
        addProduct({
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
        })
      }
    >
      Add to cart
    </Button>
  );
};

export const StockCartButton = ({ product }: { product: StockCartProduct }) => {
  const {
    stockCart,
    addStockProduct,
    updateStockProductQty,
    updateStockProductPrice,
  } = useStockCart();

  const cartProduct = stockCart.find((p) => p.id === product.id);

  // if (!cartProduct) {
  //   return <span className="text-xs text-red-600">Unknown Error ...</span>;
  // }

  return cartProduct ? (
    <div className="flex items-center justify-between gap-3">
      <Input
        type="text"
        placeholder="0.00"
        defaultValue="0.00"
        value={cartProduct?.price.toString()}
        size="sm"
        radius="sm"
        color="primary"
        variant="bordered"
        startContent={
          <div className="pointer-events-none flex items-center">
            <small className="text-xs text-default-500">GHC</small>
          </div>
        }
        className="max-w-28 items-center"
        classNames={{
          inputWrapper: "border-primary data-[hover=true]:border-primary",
          input: "font-semibold",
        }}
        onChange={(e) =>
          updateStockProductPrice(product.id, Number(e.target.value))
        }
      />

      <Input
        type="text"
        placeholder="0"
        defaultValue="0"
        value={cartProduct.qty.toString()}
        size="sm"
        radius="sm"
        color="primary"
        variant="bordered"
        startContent={
          <div className="pointer-events-none flex items-center">
            <small className="text-xs text-default-500">QTY</small>
          </div>
        }
        className="max-w-28 items-center"
        classNames={{
          inputWrapper: "border-primary data-[hover=true]:border-primary",
          input: "font-semibold",
        }}
        onChange={(e) =>
          updateStockProductQty({
            id: product.id,
            quantity: Number(e.target.value),
          })
        }
      />
    </div>
  ) : (
    <Button
      className="font-bold"
      size="sm"
      color="primary"
      radius="sm"
      variant="ghost"
      onClick={async () =>
        addStockProduct({
          id: product.id,
          name: product.name,
          price: 0,
          qty: 1,
        })
      }
    >
      New stock
    </Button>
  );
};

export const RequestStockButton = ({
  product,
}: {
  product: StockRequestProduct;
}) => {
  const { stockRequests, addRequestedProduct, updateRequestedProductQty } =
    useStockRequests();
  const stockRequestsProduct = stockRequests.find(
    (p) => p.id === product.id,
  );

  return stockRequestsProduct ? (
    <Input
      type="text"
      placeholder="0"
      value={stockRequestsProduct.qty.toString() || "0"}
      size="sm"
      radius="sm"
      color="primary"
      variant="bordered"
      startContent={
        <Button
          isIconOnly
          size="sm"
          radius="none"
          color="primary"
          variant="solid"
          onClick={() =>
            updateRequestedProductQty({
              id: product.id,
              minus: true,
            })
          }
        >
          <FiMinus size={18} />
        </Button>
      }
      endContent={
        <Button
          isIconOnly
          size="sm"
          radius="none"
          color="primary"
          variant="solid"
          onClick={() =>
            updateRequestedProductQty({
              id: product.id,
              plus: true,
            })
          }
        >
          <FiPlus size={18} />
        </Button>
      }
      onChange={(e) =>
        updateRequestedProductQty({
          id: product.id,
          quantity: Number(e.target.value),
        })
      }
      className="max-w-32 items-center"
      classNames={{
        inputWrapper:
          "border-emerald-700 data-[hover=true]:border-primary px-0 overflow-hidden font-bold",
        input: "text-center font-semibold",
      }}
    />
  ) : (
    <Button
      className="font-bold"
      size="sm"
      color="primary"
      radius="sm"
      variant="ghost"
      onClick={async () =>
        addRequestedProduct({
          id: product.id,
          name: product.name,
          qty: product.qty,
        })
      }
    >
      Request stock
    </Button>
  );
};
