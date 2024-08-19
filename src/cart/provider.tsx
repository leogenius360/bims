import { createContext, useContext, useState, ReactNode } from "react";

export interface CartProduct {
  productId: string;
  productName: string;
  productPrice: number;
  productQty: number;
}

export interface CartContextType {
  cart: CartProduct[];
  addProduct: (product: CartProduct) => void;
  updateProductQty: ({
    productId,
    quantity,
    plus,
    minus,
  }: {
    productId: string;
    quantity?: number;
    plus?: boolean;
    minus?: boolean;
  }) => void;
  removeProduct: (productId: string) => void;
  getTotalCost: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addProduct = (product: CartProduct) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (p) => p.productId === product.productId,
      );
      if (existingProduct) {
        return prevCart.map((p) =>
          p.productId === product.productId
            ? {
                ...p,
                productQty: p.productQty + product.productQty,
              }
            : p,
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const updateProductQty = ({
    productId,
    quantity,
    plus = false,
    minus = false,
  }: {
    productId: string;
    quantity?: number;
    plus?: boolean;
    minus?: boolean;
  }) => {
    setCart((prevCart) =>
      prevCart.flatMap((p) => {
        if (p.productId === productId) {
          if (quantity !== undefined) {
            p.productQty = quantity;
          } else if (plus) {
            p.productQty += 1;
          } else if (minus) {
            p.productQty -= 1;
          }
          if (p.productQty < 1) {
            return [];
          }

          return [{ ...p }];
        }

        return [p];
      }),
    );
  };

  const removeProduct = (productId: string) => {
    setCart((prevCart) => prevCart.filter((p) => p.productId !== productId));
  };

  const getTotalCost = () => {
    return cart.reduce(
      (total, product) =>
        total + product.productPrice * product.productQty,
      0,
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        updateProductQty,
        removeProduct,
        getTotalCost,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
