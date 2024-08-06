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
import { Product } from "@/db/schemas";

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

export const CartButton = ({ product }: { product: Product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    product: Product,
  ) => {
    const newQuantity = parseInt(e.target.value, 10);

    removeFromCart(product.id, true);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      addToCart(product);
    } else {
      // removeFromCart(product.id, true);
      for (let i = 0; i < newQuantity; i++) {
        addToCart(product);
      }
    }
  };

  return (
    <ButtonGroup size="sm" variant="ghost" color="primary">
      <Button isIconOnly onClick={() => removeFromCart(product.id)}>
        <FiMinus size={18} />
      </Button>

      <input
        value={cart
          .filter((cartProduct) => cartProduct.id === product.id)
          .length.toString()}
        onChange={(e) => handleInputChange(e, product)}
        className="w-12 cursor-text border-0 border-y-2 border-primary py-1 text-center text-sm font-bold outline-none dark:text-white"
      />

      <Button isIconOnly onClick={() => addToCart(product)}>
        <FiPlus size={18} />
      </Button>
    </ButtonGroup>
  );
};
