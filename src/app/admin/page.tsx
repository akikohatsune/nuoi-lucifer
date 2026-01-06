"use client";

// Import SpeedInsights từ Vercel để tối ưu hiệu suất
import { SpeedInsights } from "@vercel/speed-insights/next"
<SpeedInsights/>

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// Import hàm check từ server về
import { verifyKeyAction } from '../actions'; 
import './style.css';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Hàm check file
  const checkKeyFile = (file: File) => {
    if (!file) return;

    if (file.name !== "key.mikustart") {
      setError("Sai key!");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => { // Thêm async
      const fileContent = (event.target?.result as string).trim();
      
      // --- THAY ĐỔI LỚN Ở ĐÂY ---
      // Không so sánh trực tiếp nữa. Gửi lên Server check hộ.
      const isValid = await verifyKeyAction(fileContent);

      if (isValid) {
        // Nếu Server bảo đúng -> Chuyển trang
        router.push("/blog?auth=success"); 
      } else {
        // Nếu Server bảo sai
        setError("Key không đúng!");
      }
    };
    reader.readAsText(file);
  };

  // ... (Các phần Drag & Drop giữ nguyên) ...
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) checkKeyFile(file);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) checkKeyFile(file);
  };

  return (
    <div className="admin-container">
      <div className="login-card">
        <h1 className="title">Login</h1>
        {/* 1d về chỗ!*/}
        <p className="subtitle">
            Phiên đăng nhập sẽ hết hạn ngay khi tải lại trang.<br></br>
            Chức năng này chỉ dành cho Staff!
            </p>
        <label 
            htmlFor="key-file" 
            className={`upload-zone ${isDragging ? 'drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {isDragging ? "THẢ RA ĐỂ LOGIN!" : "Tải lên Key"}
        </label>
        
        <input id="key-file" type="file" accept=".mikustart*" onChange={handleFileSelect} style={{ display: 'none' }} />

        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}