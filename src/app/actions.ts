// src/app/actions.ts
"use server"; // Dòng này bắt buộc để báo là code chạy trên Server

export async function verifyKeyAction(userKeyContent: string) {
  // Server đọc biến môi trường (Không cần NEXT_PUBLIC_)
  const realKey = process.env.SECRET_KEY_CONTENT;

  // So sánh
  if (userKeyContent.trim() === realKey) {
    return true; // Đúng
  } else {
    return false; // Sai
  }
}