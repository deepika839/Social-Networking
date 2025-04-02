import React from "react";
import "../../App.css";
 
import 'bootstrap/dist/css/bootstrap.min.css';
import sampleImage from '../../img/user.png';
const FriendsList = () => {
  const friends = new Array(12).fill("img/user.png"); // Placeholder avatars
 
  return (
    <div className="friends-container">
      <div className="panel panel-default friends">
        <div className="panel-heading">
          <h3 className="panel-title">My Friends</h3>
        </div>
        <div className="panel-body">
          <ul>
            {friends.map((friend, index) => (
              <li key={index}>
                <button className="thumbnail" href="profile.html">
                  <img src={sampleImage} alt="User" />
                </button>
              </li>
            ))}
          </ul>
          <div className="clearfix"></div>
          <a className="btn btn-primary" href="#" >View All Friends</a>
        </div>
      </div>
    </div>
  );
};
 
export default FriendsList;
 
 