import React from 'react';
import './docs.css'; // Import file CSS vừa tạo

export default function Documentation() {
  return (
    <div className="docs-container">
      <h1>Hướng Dẫn Sử Dụng Overlay</h1>
      
      <p>
        Chào mừng đến với trang tài liệu hướng dẫn setup <strong>Alert Overlay/OverlayQR</strong>. 
        Hệ thống này giúp hiển thị thông báo Donate theo thời gian thực từ Google Sheets lên OBS.
      </p>

      {/* --- PHẦN 1: GOOGLE SHEETS --- */}
      <h2>1. Cấu hình Google Sheets (Quan trọng)</h2>
      <p>Để hệ thống hoạt động, file Google Sheet của bạn <strong>BẮT BUỘC</strong> phải có đúng các cột theo thứ tự sau:</p>
      
      <table>
        <thead>
          <tr>
            <th>Tên cột (Header)</th>
            <th>Mô tả</th>
            <th>Ví dụ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>STT</code></td>
            <td>Số thứ tự (Tăng dần, không trùng lặp)</td>
            <td>1, 2, 3...</td>
          </tr>
          <tr>
            <td><code>Dấu thời gian</code></td>
            <td>Thời gian nhận tiền (Google Form tự sinh)</td>
            <td>10/12/2025 10:00:00</td>
          </tr>
          <tr>
            <td><code>Số tiền</code></td>
            <td>Số tiền donate (có thể kèm chữ 'đ')</td>
            <td>50.000, 100k</td>
          </tr>
          <tr>
            <td><code>Tên</code></td>
            <td>Tên người gửi</td>
            <td>Ẩn danh</td>
          </tr>
          <tr>
            <td><code>Lời nhắn</code></td>
            <td>Nội dung tin nhắn hiển thị</td>
            <td>Chúc stream vui vẻ!</td>
          </tr>
        </tbody>
      </table>

      <h3>Cách lấy Link CSV:</h3>
      <ol>
        <li>Mở Google Sheet của bạn.</li>
        <li>Chọn <strong>Tệp (File)</strong> &rarr; <strong>Chia sẻ (Share)</strong> &rarr; <strong>Công bố lên web (Publish to web)</strong>.</li>
        <li>Ở phần "Toàn bộ tài liệu", đổi thành <strong>Sheet 1</strong> (hoặc tên sheet chứa dữ liệu).</li>
        <li>Ở phần "Trang web", đổi thành <strong>Các giá trị được phân cách bằng dấu phẩy (.csv)</strong>.</li>
        <li>Nhấn <strong>Xuất bản (Publish)</strong> và copy đường link đó.</li>
      </ol>

      {/* --- PHẦN 2: CẤU HÌNH CODE --- */}
      <h2>2. Cấu hình Code Next.js</h2>
      <p>Mở file <code>src/app/overlay/alert/page.tsx</code> và sửa các dòng sau:</p>
      
      <pre><code>// 1. Dán link CSV bạn vừa copy vào đây
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/xxxxx/pub?output=csv";

// 2. Thời gian check dữ liệu mới (Mili giây)
const CHECK_INTERVAL = 3000; // 3 giây check 1 lần

// 3. Chế độ Test (Bật true để chỉnh sửa giao diện, False để live thật)
const TEST_MODE = false; </code></pre>

      {/* --- PHẦN 3: CÀI ĐẶT OBS --- */}
      <h2>3. Thêm vào OBS Studio (Alert Overlay)</h2>
      <p>Làm theo các bước sau để hiển thị Overlay lên livestream:</p>
      <ol>
        <li>Mở OBS &rarr; Phần <strong>Sources</strong> &rarr; Chuột phải &rarr; Add <strong>Browser</strong>.</li>
        <li>Đặt tên là <code>Alert Donate</code>.</li>
        <li><strong>URL:</strong> Điền link web của bạn (VD: <code>https://nuoi-lucifer.komekokomi.id.vn/overlay/alert</code>).</li>
        <li><strong>Width:</strong> <code>1920</code> (Hoặc độ rộng màn hình stream).</li>
        <li><strong>Height:</strong> <code>1080</code>.</li>
        <li>Tích vào ô: <code>Shutdown source when not visible</code> (Tùy chọn).</li>
        <li>Nhấn <strong>OK</strong>.</li>
      </ol>

      <div style={{ background: '#330000', padding: '15px', borderLeft: '5px solid red', margin: '20px 0' }}>
        <strong>⚠️ Lưu ý quan trọng:</strong><br/>
        Mỗi khi bạn sửa code hoặc cập nhật CSS, bạn cần vào OBS &rarr; Double click vào Browser Source &rarr; Kéo xuống dưới cùng và nhấn nút <strong style={{color: '#ff66aa'}}>Refresh cache of current page</strong> để OBS nhận giao diện mới.
      </div>

      {/* --- PHẦN 3: CÀI ĐẶT OBS --- */}
      <h2>3. Thêm vào OBS Studio (OverlayQR)</h2>
      <p>Làm theo các bước sau để hiển thị Overlay QR lên livestream:</p>
      <ol>
        <li>Mở OBS &rarr; Phần <strong>Sources</strong> &rarr; Chuột phải &rarr; Add <strong>Browser</strong>.</li>
        <li>Đặt tên là <code>QR Donate</code>.</li>
        <li><strong>URL:</strong> Điền link web của bạn (VD: <code>https://nuoi-lucifer.komekokomi.id.vn/overlay</code>).</li>
        <li><strong>Width:</strong> <code>1920</code> (Hoặc độ rộng màn hình stream).</li>
        <li><strong>Height:</strong> <code>1080</code>.</li>
        <li>Tích vào ô: <code>Shutdown source when not visible</code> (Tùy chọn).</li>
        <li>Nhấn <strong>OK</strong>.</li>
      </ol>

      <div style={{ background: '#330000', padding: '15px', borderLeft: '5px solid red', margin: '20px 0' }}>
        <strong>⚠️ Lưu ý quan trọng:</strong><br/>
        Mỗi khi bạn sửa code hoặc cập nhật CSS, bạn cần vào OBS &rarr; Double click vào Browser Source &rarr; Kéo xuống dưới cùng và nhấn nút <strong style={{color: '#ff66aa'}}>Refresh cache of current page</strong> để OBS nhận giao diện mới.
      </div>


      {/* --- PHẦN 4: CUSTOM GIAO DIỆN --- */}
      <h2>4. Chỉnh sửa Giao diện (CSS)</h2>
      <p>
        Mọi chỉnh sửa về màu sắc, font chữ, kích thước đều nằm trong file: 
        <br/><code>src/app/overlay/alert/style.css</code>
      </p>
      <ul>
        <li><strong>Đổi màu tên:</strong> Tìm class <code>.name</code> sửa <code>color</code>.</li>
        <li><strong>Đổi màu tiền:</strong> Tìm class <code>.amount</code> sửa <code>color</code>.</li>
        <li><strong>Đổi font chữ:</strong> Hệ thống đang dùng font <strong>Montserrat</strong>.</li>
      </ul>

      <hr style={{ borderColor: '#333', margin: '40px 0' }} />
      <p style={{ textAlign: 'center', fontSize: '0.9em', color: '#666' }}>
        Documented by <strong>komekokomi</strong> © 2025
      </p>
    </div>
  );
}