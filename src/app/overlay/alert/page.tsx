"use client";

import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { Montserrat } from 'next/font/google';

// --- QUAN TRỌNG: Import file CSS vừa tạo ---
import './style.css'; 

// Cấu hình font
const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
});

// --- CẤU HÌNH ---
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEAUBRs8RmNLMlelOmHJoc4369oJ3CDD8s27L5JKAM54hQ6r6aAFl-J0KYKrrVJWYKz2VOUo5ZLJ3s/pub?output=csv";
const CHECK_INTERVAL = 3000;
const TEST_MODE = false; // 🔥 Đang bật Test

export default function AlertOverlay() {
  const [data, setData] = useState({ name: 'Người Test', amount: '500.000đ', content: 'CSS đã được tách ra file riêng!' });
  const [animState, setAnimState] = useState(''); 
  
  const processedStts = useRef<Set<string>>(new Set());
  const isFirstRun = useRef<boolean>(true);

  useEffect(() => {
    // --- CHẾ ĐỘ TEST ---
    if (TEST_MODE) {
        setAnimState('show');
        return; 
    }

    // --- CHẾ ĐỘ CHẠY THẬT ---
    const checkDonation = async () => {
      try {
        const noCacheUrl = `${SHEET_CSV_URL}&t=${Date.now()}`;
        const response = await fetch(noCacheUrl);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true, skipEmptyLines: true,
          complete: (results: any) => {
            const rowData = results.data;
            if (rowData.length === 0) return;
            const newest = rowData[rowData.length - 1];
            
            const stt = newest['STT'];
            if (!stt || !newest['Số tiền'] || !newest['Tên']) return;
            
            const currentID = String(stt).trim();
            if (processedStts.current.has(currentID)) return;

            if (isFirstRun.current) {
                processedStts.current.add(currentID);
                isFirstRun.current = false;
                return;
            }

            triggerAlert(newest);
            processedStts.current.add(currentID);
          },
        });
      } catch (error) { console.error(error); }
    };

    const triggerAlert = (newData: any) => {
      setData({
        name: newData['Tên'] || 'Ẩn danh',
        amount: newData['Số tiền'] || '0đ',
        content: newData['Lời nhắn'] || ''
      });

      setAnimState('show');
      setTimeout(() => {
          setAnimState('fade-out'); 
          setTimeout(() => { setAnimState(''); }, 600);
      }, 10000);
    };

    const interval = setInterval(checkDonation, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    // Class alert-container nằm trong style.css
    <div className={`alert-container ${montserrat.className}`}>
      
      <div className={`alert ${animState}`} role="status">
          <div className="line1">
              <span className="name">{data.name}</span>
              <span className="status">đã donate</span>
              <span className="amount">{data.amount}</span>
          </div>
          <div className="line2">"{data.content}"</div>
      </div>

    </div>
  );
}