import { CartContextType, CartProduct } from "@/cart/provider";
import { createContext, useContext, useState, ReactNode } from "react";

export interface StockCartProduct extends CartProduct {}

interface StockCartContextType {
  stockCart: StockCartProduct[];
  addStockProduct: (product: StockCartProduct) => void;
  updateStockProductQty: ({
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
  updateStockProductPrice: (productId: string, price: number) => void;
  removeStockProduct: (productId: string) => void;
  getTotalStockCost: () => number;
  clearStockCart: () => void;
}

const StockCartContext = createContext<StockCartContextType | undefined>(
  undefined,
);

export const useStockCart = () => {
  const context = useContext(StockCartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface StockCartProviderProps {
  children: ReactNode;
}

export const StockCartProvider = ({ children }: StockCartProviderProps) => {
  const [stockCart, setStockCart] = useState<StockCartProduct[]>([]);

  const addStockProduct = (product: StockCartProduct) => {
    setStockCart((prevCart) => {
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

  const updateStockProductQty = ({
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
    setStockCart((prevCart) =>
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

  const updateStockProductPrice = (productId: string, price: number) => {
    setStockCart((prev) =>
      prev.map((p) =>
        p.productId === productId ? { ...p, productPrice: price } : p,
      ),
    );
  };

  const removeStockProduct = (productId: string) => {
    setStockCart((prevCart) =>
      prevCart.filter((p) => p.productId !== productId),
    );
  };

  const getTotalStockCost = () => {
    return stockCart.reduce(
      (total, product) =>
        total + product.productPrice * product.productQty,
      0,
    );
  };

  const clearStockCart = () => {
    setStockCart([]);
  };

  return (
    <StockCartContext.Provider
      value={{
        stockCart,
        addStockProduct,
        updateStockProductQty,
        updateStockProductPrice,
        removeStockProduct,
        getTotalStockCost,
        clearStockCart,
      }}
    >
      {children}
    </StockCartContext.Provider>
  );
};
