import type { Metadata, Viewport } from "next";
import Link from "next/link"; // Import thẻ Link để chuyển trang không cần load lại
import "./globals.css"; // Import CSS toàn cục
import NavMenu from "./components/NavMenu";

// Import SpeedInsights từ Vercel để tối ưu hiệu suất
import { SpeedInsights } from "@vercel/speed-insights/next";

// Import and use the <Analytics/> React component into your app's layout.
import { Analytics } from "@vercel/analytics/next";

// Cấu hình Metadata (SEO & Embed Discord) - Dùng chung cho cả web

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
        {/* QUAN TRỌNG: Link thư viện Icon FontAwesome để hiện icon GitHub, Discord */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </head>
      <body>
        {/* --- HEADER (MENU) DÙNG CHUNG --- */}
        <header>
          {/* Logo bấm vào sẽ về trang chủ */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="logo" style={{ fontWeight: 'bold', fontSize: '20px' }}>
              Nuôi Lucifer
            </div>
          </Link>
          
          {/* Menu điều hướng */}
          <NavMenu />
        </header>
        
        {/* --- NỘI DUNG CỦA TỪNG TRANG SẼ HIỆN Ở DƯỚI ĐÂY --- */}
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
