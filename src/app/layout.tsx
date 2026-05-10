import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAUR | Luxury Fashion",
  description: "A premium luxury fashion collection. Minimalism, elegance, and high-fashion aesthetic.",
};

import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}


