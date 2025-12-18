"use client";

import React from 'react';

// --- CẤU HÌNH ---
const BANK_ID = "TPB";
const ACCOUNT_NO = "22310062007"; 
const ACCOUNT_NAME = "DAO GIA KHANH";
const TEMPLATE = "qr_only";

export default function OverlayQR() {
  // Link tạo QR từ VietQR
  const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'transparent' // Để nền trong suốt cho OBS
    }}>
      {/* --- QUAN TRỌNG: CSS ĐỂ ẨN MENU/HEADER CỦA WEB --- */}
      <style jsx global>{`
        header, nav, footer { 
          display: none !important; 
        }
        body {
          background: transparent !important;
          overflow: hidden;
        }
      `}</style>

      {/* --- KHUNG MÃ QR --- */}
      <div style={{
        background: 'white',
        padding: '15px',
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(255, 102, 170, 0.5)',
        textAlign: 'center'
      }}>
        {/* Tiêu đề nhỏ */}
        <div style={{ 
          color: '#ff66aa', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          fontSize: '18px',
          textTransform: 'uppercase'
        }}>
          Scan to Donate
        </div>

        {/* Ảnh QR */}
        <img 
          src={qrUrl} 
          alt="QR Donate" 
          style={{ width: '250px', height: 'auto', display: 'block' }} 
        />
        
        {/* Số tài khoản nhỏ ở dưới (phòng khi quét ko được) */}
        <div style={{ 
          marginTop: '10px', 
          color: '#333', 
          fontSize: '14px',
          fontWeight: 'bold' 
        }}>
          {BANK_ID} - {ACCOUNT_NO}
        </div>
      </div>
    </div>
  );
}