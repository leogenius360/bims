"use client";

import "@/styles/bootstrap.scss";
import "@/styles/style.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/auth/provider";
import { firebaseConfig } from "@/config/firebase-config";
import { CartProvider } from "@/cart/provider";
import { StockCartProvider } from "@/stock/provider";
import { StockRequestProvider } from "@/stock-request/provider";
import { useDisclosure } from "@nextui-org/react";
import { UpdateCartForm, UpdateStockCartForm } from "@/components/forms/cart";
import { NewProductCategoryForm } from "@/components/forms/new-category-form";
import { NewProductForm } from "@/components/forms/products";
import { StockForm } from "@/components/forms/stock-form";
import { SalesForm } from "@/components/forms/sales-form";

export function Providers({ children, ...themeProps }: ThemeProviderProps) {
  const router = useRouter();
  const newStockModal = useDisclosure();
  const salesModal = useDisclosure();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <Toaster position="bottom-right" />
        <AuthProvider
          authProvider="firebase"
          firebase={{ config: firebaseConfig }}
        >
          <StockRequestProvider>
            <StockCartProvider>
              <CartProvider>
                {children}

                <NewProductForm />
                <NewProductCategoryForm />
                <SalesForm salesModal={salesModal} />
                <UpdateCartForm salesModal={salesModal} />

                <StockForm newStockModal={newStockModal} />
                <UpdateStockCartForm newStockModal={newStockModal} />
              </CartProvider>
            </StockCartProvider>
          </StockRequestProvider>
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
