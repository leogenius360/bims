"use client";

import "@/styles/bootstrap.scss";
import "@/styles/style.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/auth/provider";
import { firebaseConfig } from "@/config/firebase-config";

export function Providers({ children, ...themeProps }: ThemeProviderProps) {
  const router = useRouter();
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
          {children}
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
