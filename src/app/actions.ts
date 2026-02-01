"use server"; // Server action (chạy trên server).

export async function verifyKeyAction(userKeyContent: string) {
  // Đọc key thật từ biến môi trường.
  const realKey = process.env.SECRET_KEY_CONTENT;

  if (userKeyContent.trim() === realKey) {
    return true;
  }
  return false;
}
