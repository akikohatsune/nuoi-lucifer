"use client";

import React, { Suspense, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
  increment,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./style.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
function BlogContent() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postType, setPostType] = useState<"NOTE" | "NORMAL">("NOTE");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [votedPosts, setVotedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAdmin(false);
        setAuthReady(true);
        return;
      }
      try {
        const adminDoc = await getDoc(doc(db, "admins", user.uid));
        setIsAdmin(adminDoc.exists());
      } finally {
        setAuthReady(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    if (typeof window !== "undefined") {
      const savedVotes = localStorage.getItem("voted_posts");
      if (savedVotes) setVotedPosts(new Set(JSON.parse(savedVotes)));
    }
    return () => unsubscribe();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handlePost = async () => {
    if (!isAdmin) {
      alert("Only admins can post.");
      return;
    }
    if (!content.trim() && !imageFile) return;
    setIsUploading(true);
    let imageUrl = "";
    try {
      if (imageFile) imageUrl = await uploadToCloudinary(imageFile);
      await addDoc(collection(db, "posts"), {
        title,
        content,
        type: postType,
        imageUrl,
        createdAt: new Date().toISOString(),
        reactions: { love: 0, fire: 0 },
      });
      setTitle("");
      setContent("");
      setImageFile(null);
      setPreviewUrl(null);
    } catch (e) {
      alert("Posting failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) return;
    if (confirm("Delete this post?")) {
      await deleteDoc(doc(db, "posts", id));
    }
  };

  const handleReact = async (id: string, type: "love" | "fire") => {
    if (votedPosts.has(id)) return;
    await updateDoc(doc(db, "posts", id), {
      [`reactions.${type}`]: increment(1),
    });
    const newVotes = new Set(votedPosts);
    newVotes.add(id);
    setVotedPosts(newVotes);
    localStorage.setItem("voted_posts", JSON.stringify(Array.from(newVotes)));
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const getBtnStyle = (postId: string) =>
    votedPosts.has(postId) ? { opacity: 0.5, cursor: "not-allowed" } : {};

  return (
    <div className="layout-container">
      <div className="header-box">
        <div>
          <h1 className="page-title">Tiền của tôi đã đi đâu😭?</h1>
          <p className="page-subtitle">
            Nơi Lucifer cung cấp bằng chứng về số tiền của bạn đã đi đâu và đến nơi nào!
          </p>
        </div>
      </div>

      {authReady && isAdmin && (
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <button
            onClick={handleLogout}
            style={{
              background: "#333",
              color: "#fff",
              border: "1px solid #555",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      )}

      {isAdmin && (
        <div className="admin-section fade-in">
          <div className="post-form">
            <div className="form-header">Create a new entry...</div>
            <div className="form-row">
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value as "NOTE" | "NORMAL")}
              >
                <option value="NOTE">Announcement</option>
                <option value="NORMAL">Story</option>
              </select>
              <input
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <textarea
              placeholder="Write something..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="image-upload-area">
              <label htmlFor="file-input" className="custom-file-upload">
                Add Image...
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              {previewUrl && (
                <div className="image-preview-box">
                  <img src={previewUrl} alt="Preview" className="image-preview" />
                  <button
                    className="btn-remove-img"
                    onClick={() => {
                      setImageFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <button className="btn-post" onClick={handlePost} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Post"}
            </button>
          </div>
        </div>
      )}

      <div className="feed-container">
        {posts.map((post) => (
          <div key={post.id} className="fade-in">
            {post.type === "NOTE" ? (
              <div className="style-note">
                <div className="note-header">
                  <span className="note-hash">#</span>
                  {post.title || "Announcement"}
                </div>
                {post.imageUrl && (
                  <img src={post.imageUrl} alt="img" className="post-image note-image" />
                )}
                <div className="note-body">{post.content}</div>
                <div className="reaction-area">
                  <button
                    onClick={() => handleReact(post.id, "love")}
                    style={getBtnStyle(post.id)}
                  >
                    Love {post.reactions?.love || 0}
                  </button>
                  <button
                    onClick={() => handleReact(post.id, "fire")}
                    style={getBtnStyle(post.id)}
                  >
                    Fire {post.reactions?.fire || 0}
                  </button>
                  {isAdmin && (
                    <button className="btn-del" onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="style-card">
                <div className="card-icon"></div>
                <div className="card-info">
                  <div className="card-title">{post.title}</div>
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="img" className="post-image card-image" />
                  )}
                  <div className="card-desc">{post.content}</div>
                </div>
                <div className="card-action">
                  <button
                    onClick={() => handleReact(post.id, "love")}
                    style={getBtnStyle(post.id)}
                  >
                    Love {post.reactions?.love || 0}
                  </button>
                  {isAdmin && (
                    <button className="btn-del" onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <>
      <Suspense fallback={<div style={{ color: "#fff", padding: 20 }}>Loading...</div>}>
        <BlogContent />
      </Suspense>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
