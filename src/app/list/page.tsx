"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, increment, deleteDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation'; 
import './style.css';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook lấy tham số trên URL
  
  const [posts, setPosts] = useState<any[]>([]);
  
  // Mặc định là FALSE (chưa đăng nhập)
  const [isAdmin, setIsAdmin] = useState(false);
  
  // State Form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'NOTE' | 'NORMAL'>('NOTE');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [votedPosts, setVotedPosts] = useState<Set<string>>(new Set());

  // --- 1. LOGIC CHECK ADMIN MỚI (DỰA VÀO URL) ---
  useEffect(() => {
    // Kiểm tra xem trên link có ?auth=success không
    const authCode = searchParams.get('auth');

    if (authCode === 'success') {
        // Nếu có -> Xác nhận là Admin
        setIsAdmin(true);
        
        // Sau đó xóa sạch dấu vết trên URL để nhìn cho đẹp (và để F5 là mất)
        router.replace('/list'); 
    }
  }, [searchParams, router]);

  // 2. Tải bài viết (Giữ nguyên)
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    
    // Load lịch sử vote
    if (typeof window !== 'undefined') {
        const savedVotes = localStorage.getItem('voted_posts');
        if (savedVotes) setVotedPosts(new Set(JSON.parse(savedVotes)));
    }
    return () => unsubscribe();
  }, []);

  // ... (CÁC HÀM XỬ LÝ ẢNH, POST, REACT GIỮ NGUYÊN) ...
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET); 
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url; 
  };

  const handlePost = async () => {
    if (!content.trim() && !imageFile) return;
    setIsUploading(true);
    let imageUrl = "";
    try {
        if (imageFile) imageUrl = await uploadToCloudinary(imageFile);
        await addDoc(collection(db, "posts"), {
            title, content, type: postType, imageUrl,
            createdAt: new Date().toISOString(), reactions: { love: 0, fire: 0 }
        });
        setTitle(''); setContent(''); setImageFile(null); setPreviewUrl(null);
    } catch (e) { alert("Lỗi đăng bài!"); } finally { setIsUploading(false); }
  };

  const handleDelete = async (id: string) => { 
      if (confirm("Xóa bài này nhé?")) await deleteDoc(doc(db, "posts", id)); 
  };

  const handleReact = async (id: string, type: 'love' | 'fire') => {
    if (votedPosts.has(id)) return;
    await updateDoc(doc(db, "posts", id), { [`reactions.${type}`]: increment(1) });
    const newVotes = new Set(votedPosts); newVotes.add(id); setVotedPosts(newVotes);
    localStorage.setItem('voted_posts', JSON.stringify(Array.from(newVotes)));
  };

  const getBtnStyle = (postId: string) => votedPosts.has(postId) ? { opacity: 0.5, cursor: 'not-allowed' } : {};
  
  // Hàm Logout (Chỉ cần reload trang là xong)
  const handleLogout = () => {
    window.location.href = "/list"; // Reload lại trang blog sạch -> Tự mất quyền admin
  };

  return (
    <div className="layout-container">
      <div className="header-box" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
        <div>
            <h1 className="page-title">Tiền của tôi đã đi đâu😭?</h1>
            <p className="page-subtitle">Nơi Lucifer cung cấp bằng chứng về số tiền của bạn đã đi đâu và đến nơi nào!</p>
        </div>
      </div>

      {/* FORM CHỈ HIỆN KHI ĐANG CÓ SESSION (isAdmin = true) */}
      {isAdmin && (
        <div className="admin-section fade-in">
            <div className="post-form">
                <div className="form-header">Tạo một bản sao kê mới...</div>
                <div className="form-row">
                    <select value={postType} onChange={(e:any) => setPostType(e.target.value)}>
                        <option value="NOTE">Thông báo</option>
                        <option value="NORMAL">Sao kê</option>
                    </select>
                    <input placeholder="Tiêu đề..." value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <textarea placeholder="Nội dung bài viết..." value={content} onChange={e => setContent(e.target.value)} />

                <div className="image-upload-area">
                    <label htmlFor="file-input" className="custom-file-upload">Add Image...</label><br>
                    </br>
                    <input id="file-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    {previewUrl && (
                        <div className="image-preview-box">
                            <img src={previewUrl} alt="Preview" className="image-preview" />
                            <button className="btn-remove-img" onClick={() => {setImageFile(null); setPreviewUrl(null);}}>✕</button>
                        </div>
                    )}
                </div>
                <button className="btn-post" onClick={handlePost} disabled={isUploading}>
                    {isUploading ? "ĐANG TẢI LÊN..." : "ĐĂNG BÀI"}
                </button>
            </div>
        </div>
      )}

      {/* FEED (Luôn hiển thị) */}
      <div className="feed-container">
        {posts.map((post) => (
            <div key={post.id} className="fade-in">
                {post.type === 'NOTE' ? (
                    <div className="style-note">
                        <div className="note-header"><span className="note-hash">#</span>{post.title || 'Thông báo'}</div>
                        {post.imageUrl && <img src={post.imageUrl} alt="img" className="post-image note-image" />}
                        <div className="note-body">{post.content}</div>
                        <div className="reaction-area">
                            <button onClick={() => handleReact(post.id, 'love')} style={getBtnStyle(post.id)}>❤️ {post.reactions?.love || 0}</button>
                            <button onClick={() => handleReact(post.id, 'fire')} style={getBtnStyle(post.id)}>🔥 {post.reactions?.fire || 0}</button>
                            {isAdmin && <button className="btn-del" onClick={() => handleDelete(post.id)}>Xóa</button>}
                        </div>
                    </div>
                ) : (
                    <div className="style-card">
                        <div className="card-icon"></div>
                        <div className="card-info">
                            <div className="card-title">{post.title}</div>
                            {post.imageUrl && <img src={post.imageUrl} alt="img" className="post-image card-image" />}
                            <div className="card-desc">{post.content}</div>
                        </div>
                        <div className="card-action">
                            <button onClick={() => handleReact(post.id, 'love')} style={getBtnStyle(post.id)}>👍 {post.reactions?.love || 0}</button>
                            {isAdmin && <button className="btn-del" onClick={() => handleDelete(post.id)}>X</button>}
                        </div>
                    </div>
                )}
            </div>
        ))}
      </div>
    </div>
  );
}