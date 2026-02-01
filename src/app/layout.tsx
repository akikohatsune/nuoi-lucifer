import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import NavMenu from "./components/NavMenu";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Nuôi Lucifer!",
  description: "Tôi nghèo, tôi cần tiền, nhưng tôi KHÔNG MẤT LƯƠNG TÂM!",
  openGraph: {
    title: "Nuôi Lucifer!",
    description: "Tôi nghèo, tôi cần tiền, nhưng tôi KHÔNG MẤT LƯƠNG TÂM! Mỗi đồng tiền các bạn gửi, tôi sẽ chi tiêu rõ ràng.",
    siteName: "Nuôi Lucifer",
    images: [
      {
        url: "/image/miku.png", 
        width: 630,
        height: 630,
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ff66aa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body>
        <header>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="logo" style={{ fontWeight: 'bold', fontSize: '20px' }}>
              Nuôi Lucifer
            </div>
          </Link>
          <NavMenu />
        </header>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
