import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { ReactQueryClientProvider } from "./components/ReactQueryProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Peopaygo",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
       
      </html>
    </ReactQueryClientProvider>
  );
}
