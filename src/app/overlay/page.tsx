"use client";

import React from 'react';

const BANK_ID = "TPB";
const ACCOUNT_NO = "22310062007"; 
const ACCOUNT_NAME = "DAO GIA KHANH";
const TEMPLATE = "qr_only";

export default function OverlayQR() {
  const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'transparent'
    }}>
      <style jsx global>{`
        header, nav, footer { 
          display: none !important; 
        }
        body {
          background: transparent !important;
          overflow: hidden;
        }
      `}</style>

      <div style={{
        background: 'white',
        padding: '15px',
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(255, 102, 170, 0.5)',
        textAlign: 'center'
      }}>
        <div style={{ 
          color: '#ff66aa', 
          fontWeight: 'bold', 
          marginBottom: '10px',
          fontSize: '18px',
          textTransform: 'uppercase'
        }}>
          Scan to Donate
        </div>

        <img 
          src={qrUrl} 
          alt="QR Donate" 
          style={{ width: '250px', height: 'auto', display: 'block' }} 
        />
        
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
