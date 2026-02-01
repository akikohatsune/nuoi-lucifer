"use client"; // Client component: cần Clipboard API + DOM.

import React, { useState } from 'react';

// Danh sách member hiển thị trên trang.
const members = [
  {
    id: 1,
    name: "Lucifer",
    role: "Organizer",
    stats: "Luckiness // Lucifer, The D€vil Corporated",
    avatarBg: "av-1",
    imgSrc: "/image/lucifer.jpg", // Ảnh nằm trong public/image
    socials: {
      youtube: "https://www.youtube.com/@ybLuc1fer666",
      discord: "tdc.luc1fer"
    }
  },
  {
    id: 2,
    name: "SatoriMaiden (Kome)",
    role: "Page Manager",
    stats: "C#, Python, HTML, LuaBinary. JS, Fullstack",
    avatarBg: "av-2",
    imgSrc: "/image/miku.png",
    socials: {
      github: "https://github.com/akikohatsune",
      youtube: "https://www.youtube.com/@reopymiku",
      discord: "reopymiku"
    }
  },
  {
    id: 3,
    name: "TheRealShu07",
    role: "Contributor",
    stats: "Main Treasurer",
    avatarBg: "av-4", 
    imgSrc: "/image/shu.jpg",
    socials: {
      youtube: "https://www.youtube.com/@TheRealShu07",
      discord: "aicungconhucaudevatva"
    }
  },
  {
    id: 4,
    name: "Dosewicht",
    role: "Contributor/YTB",
    stats: "autistic person",
    avatarBg: "av-4",
    imgSrc: "/image/dose.jpg",
    socials: {
      youtube: "https://www.youtube.com/@Dosewicht",
      discord: "dosewichte"
    }
  }
];

// Nút Discord: copy username + tooltip.
const DiscordButton = ({ username }: { username: string }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    // Hiển thị tooltip trong 2s.
    const triggerTooltip = () => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    };

    // Cách 1: Clipboard API (HTTPS/localhost).
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(username)
        .then(triggerTooltip)
        .catch((err) => {
          console.error('Lỗi copy:', err);
          alert('Không thể copy: ' + username);
        });
    } 
    // Cách 2: Fallback dùng textarea (chạy mọi nơi).
    else {
      const textArea = document.createElement("textarea");
      textArea.value = username;
      
      // Giấu input để không ảnh hưởng layout.
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        triggerTooltip();
      } catch (err) {
        console.error('Fallback copy error', err);
        alert('Vui lòng copy thủ công: ' + username);
      }
      
      document.body.removeChild(textArea);
    }
  };

  return (
    <button className="social-btn" onClick={handleCopy} title="Click to copy Discord">
      <i className="fab fa-discord"></i>
      <span className={`tooltip-text ${showTooltip ? 'show-tooltip' : ''}`}>
        Copied!
      </span>
    </button>
  );
};

export default function MemberPage() {
  return (
    <div className="container">
      <h2>Members</h2>
      <div className="members-grid">
        
        {members.map((mem) => (
          <div className="member-card" key={mem.id}>
            <div className={`avatar ${mem.avatarBg}`}>
              <img src={mem.imgSrc} alt={mem.name} />
            </div>
            
            <div className="info">
              <h3>{mem.name}</h3>
              <div className="role">{mem.role}</div>
              <div className="stats">{mem.stats}</div>
              
              <div className="social-links">
                {mem.socials.github && (
                  <a href={mem.socials.github} target="_blank" className="social-btn">
                    <i className="fab fa-github"></i>
                  </a>
                )}
                
                {mem.socials.youtube && (
                  <a href={mem.socials.youtube} target="_blank" className="social-btn">
                    <i className="fab fa-youtube"></i>
                  </a>
                )}

                {mem.socials.discord && (
                  <DiscordButton username={mem.socials.discord} />
                )}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
