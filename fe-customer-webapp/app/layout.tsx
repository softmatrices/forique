import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const oliver = localFont({
  src: "../public/fonts/Oliver-Regular.ttf",
  variable: "--font-oliver",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forique | Unique for You",
  description: "Discover exquisite jewelry pieces crafted with elegance. Curated collections from trusted artisans.",
  keywords: ["jewelry", "luxury", "fashion", "accessories", "rings", "necklaces", "earrings"],
  openGraph: {
    title: "Forique | Unique for You",
    description: "Discover exquisite jewelry pieces crafted with elegance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-screen flex flex-col antialiased ${oliver.variable}`}>
        {children}
      </body>
    </html>
  );
}
