import type { Metadata } from "next";
import Link from "next/link"; // Import thẻ Link để chuyển trang không cần load lại
import "./globals.css"; // Import CSS toàn cục

// Cấu hình Metadata (SEO & Embed Discord) - Dùng chung cho cả web
export const metadata: Metadata = {
  title: "Nuôi Lucifer!",
  description: "Tôi nghèo, tôi cần tiền, nhưng tôi KHÔNG MẤT LƯƠNG TÂM!",
  openGraph: {
    title: "Nuôi Lucifer!",
    description: "Tôi nghèo, tôi cần tiền, nhưng tôi KHÔNG MẤT LƯƠNG TÂM! Mỗi đồng tiền các bạn gửi, tôi sẽ chi tiêu rõ ràng.",
    url: "https://nuoilucifer.web.app/",
    siteName: "Nuôi Lucifer",
    images: [
      {
        url: "/image/miku.png", // Ảnh đại diện khi gửi link (nhớ để ảnh trong thư mục public/image)
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
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
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/member">Member</Link>
            <Link href="/donate">Donate</Link>
            <Link href="/help">Help</Link>
            {/* Link Logs là web ngoài nên dùng thẻ <a> thường */}
            <a href="https://stats.uptimerobot.com/8Q9tg0IAza" target="_blank" rel="noopener noreferrer">
              Logs
            </a>
          </nav>
        </header>
        
        {/* --- NỘI DUNG CỦA TỪNG TRANG SẼ HIỆN Ở DƯỚI ĐÂY --- */}
        {children}
        
      </body>
    </html>
  );
}