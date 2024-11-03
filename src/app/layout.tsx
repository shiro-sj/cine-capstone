import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "@/components/ui/navbar";

export const metadata: Metadata = {
  title: "cine",
  description: "watch data statistics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <NavBar/>
          <main>
            {children}
          </main>
        </body>
      </html>      
    </ClerkProvider>
  );
}
