import { CartContextType, CartProduct } from "@/cart/provider";
import { createContext, useContext, useState, ReactNode } from "react";

export interface StockRequestProduct{
  productId: string;
  productName: string;
  productQty: number
}

interface StockRequestContextType {
  stockRequests: StockRequestProduct[];
  addRequestedProduct: (product: StockRequestProduct) => void;
  updateRequestedProductQty: ({
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
  removeRequestedProduct: (productId: string) => void;
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
        (p) => p.productId === product.productId,
      );
      if (existingProduct) {
        return prevCart.map((p) =>
          p.productId === product.productId
            ? {
                ...p,
                productQuantity: p.productQty + product.productQty,
              }
            : p,
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const updateRequestedProductQty = ({
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
    setStockRequests((prevCart) =>
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

  const removeRequestedProduct = (productId: string) => {
    setStockRequests((prevCart) =>
      prevCart.filter((p) => p.productId !== productId),
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
