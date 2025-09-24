import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sourish Ghosh",
  description: "This is the portfolio of Sourish Ghosh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-mono`}
      >
        {/* Mobile Notice */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-red-900 text-white p-2 text-center text-sm">
          ⚠️ This portfolio is not mobile-friendly yet. Please view on desktop for the best experience.
        </div>
        {children}
      </body>
    </html>
  );
}
