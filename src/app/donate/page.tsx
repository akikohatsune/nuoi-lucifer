"use client";

// Import SpeedInsights từ Vercel để tối ưu hiệu suất
import { SpeedInsights } from "@vercel/speed-insights/next"
<SpeedInsights/>

// Import and use the <Analytics/> React component into your app's layout.
import { Analytics } from "@vercel/analytics/next"
<Analytics/>


import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

// --- CẤU HÌNH ---
const BANK_ID = "TPB";
const ACCOUNT_NO = "22310062007"; 
const ACCOUNT_NAME = "DAO GIA KHANH";
const TEMPLATE = "compact2";

// --- DÁN LINK CSV TỪ GOOGLE SHEET CỦA BẠN VÀO ĐÂY ---
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEAUBRs8RmNLMlelOmHJoc4369oJ3CDD8s27L5JKAM54hQ6r6aAFl-J0KYKrrVJWYKz2VOUo5ZLJ3s/pub?output=csv";

interface Donation {
  timestamp: string;
  name: string;
  amount: string;
  content: string;
}

export default function DonatePage() {
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('Lucifer');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  // Link QR
  const qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-${TEMPLATE}.png?amount=${amount}&addInfo=${encodeURIComponent(content)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_CSV_URL);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            // Mapping dữ liệu từ Google Form sang định dạng web cần
            // Cột Google Form thường là: "Dấu thời gian", "Tên người gửi", "Số tiền", "Lời nhắn"
            const rawData = results.data;
            
            const cleanData = rawData.map((row: any) => ({
              // Sửa tên cột bên dưới cho khớp CHÍNH XÁC với dòng 1 trong Google Sheet của bạn
              timestamp: row['Dấu thời gian'] || row['Timestamp'],
              name: row['Tên người gửi'] || row['Tên'],
              amount: row['Số tiền'] || '0',
              content: row['Lời nhắn'] || ''
            }));

            // Đảo ngược để mới nhất lên đầu
            setDonations(cleanData.reverse());
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Lỗi:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingBottom: '50px' }}>
        <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '30px', border: 'none' }}>Donate cho Lucifer</h2>

            {/* --- PHẦN QR CODE (GIỮ NGUYÊN) --- */}
            <div className="donate-box-grid">
                <div className="input-section">
                    <h3 style={{ color: '#ff66aa', marginTop: 0 }}>1. Nhập thông tin</h3>
                    <div className="form-group">
                        <label>Số tiền (VNĐ):</label>
                        <input type="number" placeholder="VD: 50000" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Lời nhắn:</label>
                        <textarea rows={3} placeholder="Lời nhắn..." value={content} onChange={(e) => setContent(e.target.value)} />
                    </div>
                </div>
                <div className="qr-section">
                    <h3 style={{ color: '#ff66aa', marginTop: 0 }}>2. Quét mã này</h3>
                    <div className="qr-frame"><img src={qrUrl} alt="VietQR" /></div>
                </div>
            </div>

            {/* --- DANH SÁCH TỪ GOOGLE FORM --- */}
            <h2 style={{ marginTop: '50px' }}>Danh sách ủng hộ (Live)</h2>
            <p className="lead">Cập nhật nhanh từ Server "Cơm".</p>
            <p className="lead">SheetLink: <a href="https://docs.google.com/spreadsheets/d/1PYj1ZbWCfCdplER2zkGB_W-NfPPSiiFAYZiPgPTfIxg/edit?usp=sharing" target="_blank">Link Google Sheet</a>.</p>

            <div className="sao-ke-container">
                {loading ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#ccc' }}>Đang tải dữ liệu...</div>
                ) : (
                    <table className="donation-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40%' }}>Tên / Nội dung</th>
                                <th style={{ width: '30%' }}>Số tiền</th>
                                <th style={{ width: '30%' }}>Thời gian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div style={{ fontWeight: 'bold', color: '#fff' }}>{item.name}</div>
                                        <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                                            {item.content}
                                        </div>
                                    </td>
                                    <td className="amount-green">{item.amount}</td>
                                    <td className="time-gray">
                                        {/* Cắt bớt phần giây trong timestamp cho gọn */}
                                        {item.timestamp ? item.timestamp.split(' ')[1] + ' ' + item.timestamp.split(' ')[0] : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </div>
  );
}