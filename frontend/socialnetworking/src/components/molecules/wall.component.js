import React, { useState, useEffect, useRef } from "react";
 
const API_URL = "http://localhost:4000";
 
const Wall = () => {
  const [post, setPost] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("text");
  const [wallPosts, setWallPosts] = useState([]);
 
  // Refs for file inputs
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
 
  useEffect(() => {
    fetchPosts();
  }, []);
 
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/posts/posts`);
      const data = await response.json();
      setWallPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
 
  const handlePostChange = (e) => {
    setPost(e.target.value);
  };
 
  const handleMediaChange = (e, type) => {
    if (e.target.files.length > 0) {
      setMedia(e.target.files[0]);
      setMediaType(type);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", post);
    if (media) {
      formData.append("media", media);
      formData.append("mediaType", mediaType);
    }
 
    try {
      const response = await fetch(`${API_URL}/api/posts/posts`, {
        method: "POST",
        body: formData,
      });
 
      if (response.ok) {
        setPost("");
        setMedia(null);
        setMediaType("text");
        fetchPosts();
      } else {
        console.error("Failed to submit post");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
 
  return (
    <div className="container">
      <h2 style={{ background: "#004aad", color: "white", padding: "10px", borderRadius: "5px" }}>Wall</h2>
     
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write on the wall"
          value={post}
          onChange={handlePostChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
 
        {/* Hidden File Inputs */}
        <input type="file" ref={imageInputRef} accept="image/*" style={{ display: "none" }} onChange={(e) => handleMediaChange(e, "image")} />
        <input type="file" ref={videoInputRef} accept="video/*" style={{ display: "none" }} onChange={(e) => handleMediaChange(e, "video")} />
 
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="button" onClick={() => setMediaType("text")} style={{ padding: "5px 10px", cursor: "pointer" }}>✏️ Text</button>
          <button type="button" onClick={() => imageInputRef.current.click()} style={{ padding: "5px 10px", cursor: "pointer" }}>🖼️ Image</button>
          <button type="button" onClick={() => videoInputRef.current.click()} style={{ padding: "5px 10px", cursor: "pointer" }}>🎥 Video</button>
        </div>
 
        <button type="submit" style={{ display: "block", marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}>Submit</button>
      </form>
 
      <div style={{ marginTop: "20px" }}>
        {wallPosts.map((item, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
            {item.text && <p>{item.text}</p>}
            {item.media && (
              item.mediaType === "image" ? (
                <img src={`${API_URL}${item.media}`} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: "200px" }} />
              ) : (
                <video controls style={{ maxWidth: "100%" }}>
                  <source src={`${API_URL}${item.media}`} type="video/mp4" />
                </video>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Wall;  
 