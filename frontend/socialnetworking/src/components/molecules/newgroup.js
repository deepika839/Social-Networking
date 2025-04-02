import React, { useEffect, useState } from "react";
import '../../App.css';
import sampleImage from '../../img/group.png';
//import { Button } from "bootstrap";
import Button from '../atoms/Button/button'
 
const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const userId = "67e10986d3a764bbb613a138"; // Replace with actual logged-in user ID67e124222069663eaa748916
 
  // Fetch groups from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/groups/groups")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Groups:", data);
        // Add a 'joined' field to track membership status
        const updatedGroups = data.map(group => ({
          ...group,
          joined: group.members.includes(userId) // Check if user is a member
        }));
        setGroups(updatedGroups);
      })
      .catch(error => console.error("Error fetching groups:", error));
  }, []);
 
  // Join group function
  const joinGroup = async (groupId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/groups/groups/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, groupId }),
      });
 
      const data = await response.json();
      if (response.ok) {
        // Update frontend state
        setGroups(groups.map(group =>
          group._id === groupId ? { ...group, joined: true } : group
        ));
      } else {
        console.error("Error joining group:", data.message);
      }
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };
 
  // Leave group function
  const leaveGroup = async (groupId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/groups/groups/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, groupId }),
      });
 
      const data = await response.json();
      if (response.ok) {
        // Update frontend state
        setGroups(groups.map(group =>
          group._id === groupId ? { ...group, joined: false } : group
        ));
      } else {
        console.error("Error leaving group:", data.message);
      }
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };
 
  return (
    <div className="group-container">
      <h3>Groups</h3>
      <hr />
      {groups.length > 0 ? (
        groups.map(group => (
          <div key={group._id} className="group-card">
            <img src={sampleImage} alt="Group" className="group-icon" />
            <div className="group-info">
              <h5>{group.name}</h5>
              <p>{group.description}</p>
             
              {group.joined ? (
                <Button label='Leave Group'
                  onClick={() => leaveGroup(group._id)}
                  className="leave-btn"
                />
              ) : (
                <Button label='Join Group'
                  onClick={() => joinGroup(group._id)}
                  className="join-btn"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Loading groups...</p>
      )}
    </div>
  );
};
 
export default GroupList;
 