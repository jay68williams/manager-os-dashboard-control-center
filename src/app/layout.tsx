import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manager OS Hub",
  description: "Operator-level command centre for all client Manager OS deployments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
