import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { ToastProvider } from "@heroui/react";
import Footer from "@/components/shared/Footer";
import { Providers } from "@/components/shared/ThemeProvider";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Flavor Flow - Home",
  description:
    "Discover and share your favorite flavor combinations with Flavor Flow.",
};

export default async function RootLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session && session.user.isBlocked) {
    // Sign out on the server side first
    await auth.api.signOut({
      headers: await headers(),
    });

    // Then redirect
    redirect("/login");
  }

  return (
    <html
      lang="en"
      className={`${inter.className}  h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ToastProvider placement="top end" />
        </Providers>
      </body>
    </html>
  );
}
