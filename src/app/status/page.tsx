"use client";

import React, { useState, useEffect } from 'react';
import './status.css';

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSEAUBRs8RmNLMlelOmHJoc4369oJ3CDD8s27L5JKAM54hQ6r6aAFl-J0KYKrrVJWYKz2VOUo5ZLJ3s/pub?output=csv";


export default function ServiceStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [latency, setLatency] = useState<number>(0);
  const [timeString, setTimeString] = useState<string>('Loading...');

  const getFormattedTime = () => {
    const now = new Date();
    
    const time = now.toLocaleTimeString('vi-VN', { hour12: false });
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);
    
    return `Last updated ${time} | today is ${day}:${month}:${year}`;
  };

  const checkService = async () => {
    setStatus('checking');
    const start = Date.now();
    
    try {
      const res = await fetch(`${SHEET_CSV_URL}&t=${start}`, { method: 'HEAD' });
      
      const end = Date.now();
      setLatency(end - start);

      if (res.ok) {
        setStatus('online');
      } else {
        setStatus('offline');
      }
    } catch (error) {
      console.error(error);
      setStatus('offline');
    } finally {
      setTimeString(getFormattedTime());
    }
  };

  useEffect(() => {
    checkService();

    const interval = setInterval(checkService, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-container">
      <div className="status-card">
        <h1>System Status</h1>

        <div className={`status-indicator ${status}`}>
          <span className="dot"></span>
          <span>
            {status === 'online' && 'OPERATIONAL'}
            {status === 'offline' && 'SERVICE DOWN'}
            {status === 'checking' && 'CHECKING...'}
          </span>
        </div>

        <div className="details">
          <p>Target: Google Sheets CSV</p>
          <p>Latency: <strong>{status === 'online' ? `${latency}ms` : '--'}</strong></p>
        </div>

        <div className="footer-time">
          {timeString}
        </div>
      </div>
    </div>
  );
}
