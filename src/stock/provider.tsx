import { CartContextType, CartProduct } from "@/cart/provider";
import { createContext, useContext, useState, ReactNode } from "react";

export interface StockCartProduct extends CartProduct {}

interface StockCartContextType {
  stockCart: StockCartProduct[];
  addStockProduct: (product: StockCartProduct) => void;
  updateStockProductQty: ({
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
  updateStockProductPrice: (id: string, price: number) => void;
  removeStockProduct: (id: string) => void;
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

  const updateStockProductQty = ({
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
    setStockCart((prevCart) =>
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

  const updateStockProductPrice = (id: string, price: number) => {
    setStockCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, price: price } : p,
      ),
    );
  };

  const removeStockProduct = (id: string) => {
    setStockCart((prevCart) =>
      prevCart.filter((p) => p.id !== id),
    );
  };

  const getTotalStockCost = () => {
    return stockCart.reduce(
      (total, product) =>
        total + product.price * product.qty,
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
