import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "./components/sidebars/sidebar";
import Subsidebar from "./components/sidebars/subsidebar";
import Headroom from 'react-headroom';

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
            <Sidebar/>
          <main>
            {children}
          </main>
          <Subsidebar/>
        </body>
      </html>      
    </ClerkProvider>
  );
}
