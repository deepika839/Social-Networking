 
import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../../img/user.png'
 
 
const API_URL = "http://localhost:4000";
 
const Profile = ({ userId }) => {
  const [post, setPost] = useState("");  
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("text");
  const [wallPosts, setWallPosts] = useState([]);
  const [profileData, setProfileData] = useState({});

 
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
 
  useEffect(() => {
    fetchPosts();
    fetchProfileData();
  }, []);
 
 
   //asynchronous function to fetch posts from the server and update the wallPosts state
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setWallPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
 
  //asynchronous function to fetch profile data from the server and update the profileData state
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/profile/profile/${userId}`);
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
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
    <div className="profile-container">
      <h2 className="profile-name">{profileData.name}</h2>
      <div className="profile-info">
        <img
          src={profileData.profilePicture ? `http://localhost:4000/uploads/${profileData.profilePicture}` : image}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-details">
          <ul className="profile-list">
            <li><strong>Name:</strong> {profileData.name}</li>
            <li><strong>Email Address:</strong> {profileData.email}</li>
            <li><strong>City:</strong> {profileData.city}</li>
            <li><strong>State:</strong> {profileData.state}</li>
            <li><strong>Gender:</strong> {profileData.gender}</li>
            <li><strong>Profession:</strong> {profileData.profession}</li>
          </ul>
        </div>
      </div>
 
      <div className="profile-wall">
        <h2 className="wall-title">Profile Wall</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write on the wall"
            value={post}
            onChange={handlePostChange}
            className="form-control"
          />
 
          <input type="file" ref={imageInputRef} accept="image/*" className="d-none" onChange={(e) => handleMediaChange(e, "image")} />
          <input type="file" ref={videoInputRef} accept="video/*" className="d-none" onChange={(e) => handleMediaChange(e, "video")} />
 
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Submit</button>
            <div className="media-buttons">
              <button type="button" onClick={() => setMediaType("text")} className="btn btn-secondary">✏️ Text</button>
              <button type="button" onClick={() => imageInputRef.current.click()} className="btn btn-secondary">🖼️ Image</button>
              <button type="button" onClick={() => videoInputRef.current.click()} className="btn btn-secondary">🎥 Video</button>
            </div>
          </div>
        </form>
 
        <div className="wall-posts">
          {wallPosts.map((item, index) => (
            <div key={index} className="wall-post">
              {item.text && <p>{item.text}</p>}
              {item.media && (
                item.mediaType === "image" ? (
                  <img src={`${API_URL}${item.media}`} alt="Uploaded" className="uploaded-media" />
                ) : (
                  <video controls className="uploaded-media">
                    <source src={`${API_URL}${item.media}`} type="video/mp4" />
                  </video>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default Profile;
 
 