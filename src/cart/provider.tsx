import { SalesProductProps } from "@/db/sales";
import { createContext, useContext, useState, ReactNode } from "react";

export interface CartProduct extends SalesProductProps { }

export interface CartContextType {
  cart: CartProduct[];
  addProduct: (product: CartProduct) => void;
  updateProductQty: ({
    id,
    quantity,
    plus,
    minus,
  }: {
    id: string;
    quantity?: number;
    plus?: boolean;
    minus?: boolean;
  }) => void;
  removeProduct: (id: string) => void;
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
        (p) => p.id === product.id,
      );
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id
            ? {
                ...p,
                qty: p.qty + product.qty,
              }
            : p,
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const updateProductQty = ({
    id,
    quantity,
    plus = false,
    minus = false,
  }: {
    id: string;
    quantity?: number;
    plus?: boolean;
    minus?: boolean;
  }) => {
    setCart((prevCart) =>
      prevCart.flatMap((p) => {
        if (p.id === id) {
          if (quantity !== undefined) {
            p.qty = quantity;
          } else if (plus) {
            p.qty += 1;
          } else if (minus) {
            p.qty -= 1;
          }
          if (p.qty < 1) {
            return [];
          }

          return [{ ...p }];
        }

        return [p];
      }),
    );
  };

  const removeProduct = (id: string) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== id));
  };

  const getTotalCost = () => {
    return cart.reduce(
      (total, product) =>
        total + product.price * product.qty,
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
