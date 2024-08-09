import NextLink from "next/link";
import { Button, ButtonGroup } from "@nextui-org/react";
import { FiMinus, FiPhone, FiPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/provider";
import { ChangeEvent, useState } from "react";
import { handleAuthErrors } from "@/auth/firebase";
import { support } from "@/config/site-config";
import { useCart } from "@/cart/provider";

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
