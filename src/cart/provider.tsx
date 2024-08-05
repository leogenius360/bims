// context/CartContext.tsx
import { Product } from "@/db/schemas";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string, all?: boolean) => void;
  clearCart: () => void;
  getProducts: () => Product[];
  getTotalPricePerProduct: () => { [key: string]: number };
  getCartTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: string, all = false) => {
    if (all) {
      setCart((prevCart) =>
        prevCart.filter((product) => product.id !== productId),
      );
    } else {
      const productIndex = cart.findIndex(
        (product) => product.id === productId,
      );
      if (productIndex !== -1) {
        const newCart = [...cart];
        newCart.splice(productIndex, 1);
        setCart(newCart);
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getProducts = () => {
    const uniqueProductsMap = new Map<string, Product>();
    cart.forEach((product) => {
      if (!uniqueProductsMap.has(product.id)) {
        uniqueProductsMap.set(product.id, product);
      }
    });
    return Array.from(uniqueProductsMap.values());
  };

  const getTotalPricePerProduct = () => {
    const totalPricePerProduct: { [key: string]: number } = {};
    cart.forEach((product) => {
      if (!totalPricePerProduct[product.id]) {
        totalPricePerProduct[product.id] = 0;
      }
      totalPricePerProduct[product.id] += product.price;
    });
    return totalPricePerProduct;
  };

  const getCartTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getProducts,
        getTotalPricePerProduct,
        getCartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
