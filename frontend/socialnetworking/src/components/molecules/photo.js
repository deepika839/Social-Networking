import React, { useState, useEffect } from "react";
import '../../App.css';
 
const Photo = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  // Fetch posts on component mount
  useEffect(() => {
    // Use fetch to GET the posts from your backend
    fetch("http://localhost:4000/api/posts/posts") // Change URL if your backend is running elsewhere
      .then((response) => response.json())  // Parse the response as JSON
      .then((data) => {
        setPosts(data);  // Set the posts state with the fetched data
        setLoading(false); // Set loading state to false once the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching posts:", error); // Catch any errors
        setLoading(false);  // Set loading state to false in case of an error
      });
  }, []); // Empty dependency array ensures this runs once on mount
 
  // If the posts are still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="container">
      <h1>Photo Gallery</h1>
      <div className="row">
        {/* Map through the posts and display each post */}
        {posts.map((post) => (
          <div key={post._id} className="col-md-4">
            <div className="card">
              {post.mediaType === "image" && (
                <img
                  src={`http://localhost:4000${post.media}`}  // Access the media from the backend
                  alt="Post"
                  className="card-img-top"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Photo;
 
 