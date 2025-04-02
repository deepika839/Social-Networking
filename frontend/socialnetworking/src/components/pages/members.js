import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
 
export default function MemberList() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    fetch("http://localhost:4000/api/profile/profile") // Update with your backend URL
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to load members.");
        setLoading(false);
      });
  }, []);
 
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="members">
              <h1 className="page-header">Members</h1>
 
              {loading && <p>Loading members...</p>}
              {error && <p className="text-danger">{error}</p>}
 
              {!loading && !error && members.length === 0 && (
                <p>No members available.</p>
              )}
 
              {!loading &&
                !error &&
                members.map((member) => (
                  <div className="row member-row" key={member._id}>
                    {/* Profile Picture & Name */}
                    <div className="col-md-3">
                      <img
                        src={
                          member.profilePicture
                            ? `http://localhost:4000/uploads/${member.profilePicture}`
                            : "/img/user.png"
                        }
                        alt={member.name}
                        className="img-thumbnail"
                      />
                      <div className="text-center">{member.name}</div>
                    </div>
 
                    {/* Add Friend Button */}
                    <div className="col-md-3">
                      <p>
                        <button className="btn btn-success btn-block">
                          <i className="fa fa-user"></i> Add Friend
                        </button>
                      </p>
                    </div>
 
                    {/* Send Message Button */}
                    <div className="col-md-3">
                      <p>
                        <button className="btn btn-default btn-block">
                          <i className="fa fa-envelope"></i> Send Message
                        </button>
                      </p>
                    </div>
 
                    {/* View Profile Button (Navigates to Profile Page) */}
                    <div className="col-md-3">
                      <p>
                        <Link to={`/profile/${member._id}`} className="btn btn-primary btn-block">
                          <i className="fa fa-edit"></i> View Profile
                        </Link>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 
 