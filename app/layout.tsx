import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nailed It by Chazi | Home Nail Salon",
  description:
    "Professional nail services by Chazi. Gel polish, softgel extensions, and more. Book your slot today — let your nails do the talking!",
  keywords: ["nail salon", "gel polish", "softgel extension", "home nail salon", "Chazi"],
  openGraph: {
    title: "Nailed It by Chazi",
    description: "Let your nails do the talking 💅✨",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#C9956C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-cream font-body antialiased">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#2d1b1b",
              borderRadius: "12px",
              border: "1px solid #F4E5D8",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#C9956C", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#E91E4D", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
