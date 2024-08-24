import { CartContextType, CartProduct } from "@/cart/provider";
import { createContext, useContext, useState, ReactNode } from "react";

export interface StockRequestProduct{
  id: string;
  name: string;
  qty: number
}

interface StockRequestContextType {
  stockRequests: StockRequestProduct[];
  addRequestedProduct: (product: StockRequestProduct) => void;
  updateRequestedProductQty: ({
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
  removeRequestedProduct: (id: string) => void;
  clearStockRequests: () => void;
}

const StockRequestContext = createContext<StockRequestContextType | undefined>(
  undefined,
);

export const useStockRequests = () => {
  const context = useContext(StockRequestContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface StockRequestProviderProps {
  children: ReactNode;
}

export const StockRequestProvider = ({ children }: StockRequestProviderProps) => {
  const [stockRequests, setStockRequests] = useState<StockRequestProduct[]>([]);

  const addRequestedProduct = (product: StockRequestProduct) => {
    setStockRequests((prevCart) => {
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

  const updateRequestedProductQty = ({
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
    setStockRequests((prevCart) =>
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

  const removeRequestedProduct = (id: string) => {
    setStockRequests((prevCart) =>
      prevCart.filter((p) => p.id !== id),
    );
  };

  const clearStockRequests = () => {
    setStockRequests([]);
  };

  return (
    <StockRequestContext.Provider
      value={{
        stockRequests,
        addRequestedProduct,
        updateRequestedProductQty,
        removeRequestedProduct,
        clearStockRequests,
      }}
    >
      {children}
    </StockRequestContext.Provider>
  );
};
