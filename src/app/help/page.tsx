import React from 'react';

// Import SpeedInsights từ Vercel để tối ưu hiệu suất
import { SpeedInsights } from "@vercel/speed-insights/next"
<SpeedInsights/>

// Import and use the <Analytics/> React component into your app's layout.
import { Analytics } from "@vercel/analytics/next"
<Analytics/>


export default function HelpPage() {
  return (
    <div className="container">
        
        <h2>Câu hỏi thường gặp</h2>
        
        <div className="info-box">
            <h3>Làm sao để có trong sao kê?</h3>
            <p>Bạn không cần đăng ký. Chỉ cần Donate. Kome sẽ tự động ghi nhận khi tiền của bạn được vào ví Lucifer.</p>
        </div>

        <div className="info-box">
            <h3>Tôi không thấy tên của mình được cập nhật?</h3>
            <p>Tên và tiền của bạn thường được cập nhật trong vòng 24 giờ sau khi Kome ghi nhận. Nếu sau 24 giờ vẫn chưa thấy, hãy liên hệ với chúng tôi.</p>
        </div>

        <h2>Contact Support</h2>
        <div className="contact-area">
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>Gặp vấn đề về sao kê hoặc lỗi hệ thống?</p>
            <p style={{ color: '#999', fontSize: '13px' }}>Vui lòng gửi email trực tiếp cho đội ngũ quản trị.</p>
            
            {/* Email 1 */}
            <a href="mailto:reopymiku@gmail.com" className="mail-link">
                <i className="fa-solid fa-envelope"></i> reopymiku@gmail.com
            </a>
            
            <br />
            
            {/* Email 2 */}
            <a href="mailto:hatsuneakiko@komekokomi.id.vn" className="mail-link">
                <i className="fa-solid fa-envelope"></i> hatsuneakiko@komekokomi.id.vn
            </a>
        </div>

    </div>
  );
}