import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketPlace",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOption);
  return (
    <html lang="en">

      <body className={inter.className}>
        <Header session={session}/>
        {children}
      </body>
    </html>
  );
}
