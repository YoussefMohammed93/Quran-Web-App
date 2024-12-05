import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const cairoFont = localFont({
  src: "./fonts/cairo-font.ttf",
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Quran Web App",
  description: "Developed by : Youssef Mohammed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={`${cairoFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
