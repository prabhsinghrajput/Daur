import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAUR | Luxury Fashion",
  description: "A premium luxury fashion collection. Minimalism, elegance, and high-fashion aesthetic.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
