import NextLink from "next/link";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { FiMinus, FiPhone, FiPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/provider";
import { ChangeEvent, useState } from "react";
import { handleAuthErrors } from "@/auth/firebase";
import { support } from "@/config/site-config";
import { useCart } from "@/cart/provider";
import { useStockCart } from "@/stock/provider";
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

export const CartButton = ({ productId }: { productId: string }) => {
  const { cart, updateProductQuantity } = useCart();
  const cartProduct = cart.find((product) => product.productId === productId);

  return (
    <ButtonGroup size="sm" variant="ghost" color="primary">
      <Button
        isIconOnly
        onClick={() =>
          updateProductQuantity({ productId: productId, minus: true })
        }
      >
        <FiMinus size={18} />
      </Button>

      <input
        type="text"
        value={cartProduct?.productQuantity.toString() || "0"}
        onChange={(e) =>
          updateProductQuantity({
            productId: productId,
            quantity: Number(e.target.value),
          })
        }
        className="w-12 cursor-text border-0 border-y-2 border-primary py-1 text-center text-sm font-bold outline-none dark:text-white"
      />

      <Button
        isIconOnly
        onClick={() =>
          updateProductQuantity({ productId: productId, plus: true })
        }
      >
        <FiPlus size={18} />
      </Button>
    </ButtonGroup>
  );
};

export const StockCartButton = ({ productId }: { productId: string }) => {
  const { stockCart, updateStockProductQty, updateStockProductPrice } =
    useStockCart();

  const cartProduct = stockCart.find(
    (product) => product.productId === productId,
  );

  if (!cartProduct) {
    return <span className="text-xs text-red-600">Unknown Error ...</span>;
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <Input
        type="text"
        placeholder="0.00"
        defaultValue="0.00"
        value={cartProduct?.productPrice.toString()}
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
          inputWrapper: "border-emerald-800 data-[hover=true]:border-primary",
        }}
        onChange={(e) =>
          updateStockProductPrice(productId, Number(e.target.value))
        }
      />

      <Input
        type="text"
        placeholder="0"
        defaultValue="0"
        value={cartProduct.productQuantity.toString()}
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
          inputWrapper: "border-emerald-800 data-[hover=true]:border-primary",
        }}
        onChange={(e) =>
          updateStockProductQty({
            productId: productId,
            quantity: Number(e.target.value),
          })
        }
      />
    </div>
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
    (p) => p.productId === product.productId,
  );

  return stockRequestsProduct ? (
    <Input
      type="text"
      placeholder="0"
      value={stockRequestsProduct.productQty.toString() || "0"}
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
              productId: product.productId,
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
              productId: product.productId,
              plus: true,
            })
          }
        >
          <FiPlus size={18} />
        </Button>
      }
      onChange={(e) =>
        updateRequestedProductQty({
          productId: product.productId,
          quantity: Number(e.target.value),
        })
      }
      className="max-w-32 items-center"
      classNames={{
        inputWrapper:
          "border-emerald-700 data-[hover=true]:border-primary px-0 overflow-hidden font-bold",
        input: "text-center",
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
          productId: product.productId,
          productName: product.productName,
          productQty: product.productQty,
        })
      }
    >
      Request stock
    </Button>
  );
};
