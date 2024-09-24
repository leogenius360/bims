
import { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import Link from "next/link";
import { siteConfig, siteFooter } from "@/config/site-config";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "bg-background font-sans antialiased",
          fontSans.variable,
          inter.className,
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <main className="flex min-h-screen flex-col">
            <Navbar />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
