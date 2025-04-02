import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/style.css';
import defaultimg from "../../img/user.png";
import { useNavigate } from 'react-router-dom';
 
// const API_URL = "http://localhost:4000";
 
export default function Postlike() {
 
  const [comment, setComment] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch(`http://localhost:4000/api/postlike/posts`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Posts:", data);
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);
 
  const handleLike = async (postId) => {
    try {
      const res = await fetch(`http://localhost:4000/api/postlike/posts/${postId}/like`, {
        method: "POST",
      });
 
      if (!res.ok) {
        throw new Error("Failed to like post");
      }
 
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
 
  const handleAddComment = async (postId) => {
    const userId = "67e1247a2069663eaa748918"; //localStorage.getItem("userId"); //  Get userId from storage
    const commentText = comment[postId]?.trim();
 
    console.log("User ID:", userId); //  Debugging userId
    console.log("Comment Text:", commentText); // Debugging comment
 
    if (!userId) {
      alert("User must be logged in to comment.");
      return;
    }
 
    if (!commentText) {
      alert("Comment cannot be empty.");
      return;
    }
 
    try {
      const res = await fetch(`http://localhost:4000/api/postlike/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, comment: commentText }), // Ensure correct request body
      });
 
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || "Failed to add comment");
      }
 
      const updatedPost = await res.json();
      console.log('updatedPost', updatedPost.message)
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: updatedPost.post.comments } : post
        )
      );
 
      setComment({ ...comment, [postId]: "" }); //  Clear input field
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
 
  const handleImageClick = (user) => {
    // If user is an object, extract _id; otherwise assume it's a string.
    const id = typeof user === "object" && user !== null ? user._id : user;
    if (!id) {
      console.error("User id is missing");
      return;
    }
    navigate(`/profile/${id}`);
  };
 
  if (loading) return <p>Loading posts...</p>;
 
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="panel panel-default post">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <div key={post._id} className="panel panel-default post mb-4">
                    <div className="panel-body">
                      <div className="row">
                        {/* User Avatar and Likes */}
                        <div className="col-sm-2">
                          <a className="post-avatar thumbnail" onClick={() => handleImageClick(post.userId)} style={{ cursor: "pointer" }}>
                            <img
                              src={post.userId?.profilePicture ? `http://localhost:4000/uploads/${post.userId.profilePicture}` : defaultimg}
                              alt={post.userId?.name || post.name || "User"}
                              className="img-fluid"
                            />
                            <div className="text-center">
                              {post.userId?.name || post.name || "Unknown User"}
                            </div>
                          </a>
                          <div className="likes text-center">{post.likes} Likes</div>
                        </div>
 
                        {/* Post Content and Actions */}
                        <div className="col-sm-10">
                          <div className="bubble">
                            <div className="pointer">
                              <p>{post.content}</p>
                            </div>
                            <div className="pointer-border"></div>
                          </div>
 
                          <p className="post-actions">
                            <a href="#" onClick={() => handleLike(post._id)}>Like</a> -
                            <a href="#">Comment</a> -
                            <a href="#">Follow</a> -
                            <a href="#">Share</a>
                          </p>
 
                          {/* Comment Form */}
                          <div className="comment-form">
                            <form className="form-inline" onSubmit={(e) => { e.preventDefault(); handleAddComment(post._id); }}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Comment"
                                  value={comment[post._id] || ""}
                                  onChange={(e) => setComment({ ...comment, [post._id]: e.target.value })}
                                />
                              </div>
                              <button type="submit" className="btn btn-default">
                                Add
                              </button>
                            </form>
                          </div>
 
                          {/* Display Comments */}
                          <div className="clearfix"></div>
                          <div className="comments">
                            {post.comments.length > 0 ? (
                              post.comments.map((c, index) => (
                                <div key={index} className="comment">
                                  <div className="comment-avatar pull-left">
                                    <img src={defaultimg} alt="User" />
                                  </div>
                                  <div className="comment-text">
                                    <p>{c.comment}</p>
                                  </div>
                                  <div className="clearfix"></div>
                                </div>
                              ))
                            ) : (
                              <p>No comments yet.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 