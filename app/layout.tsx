import type { Metadata } from "next";
import { Lato } from "next/font/google";

import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Medical Information Sharing System",
  description: "Built by Suhyeon Yu, Jaehyeon Kim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={lato.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
