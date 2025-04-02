import React, { useEffect, useState } from "react";
import "../../App.css";
import sampleImage from "../../img/group.png";
 
const GroupItem = ({ name, description }) => (
  <div className="card mb-2 p-2">
    <div className="d-flex align-items-center">
      <img src={sampleImage} alt="group" className="group-img me-3" style={{ width: "50px", height: "50px" }} />
      <div>
        <h5 className="card-title text-primary text-decoration-underline">{name || "No Name"}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  </div>
);
const LatestGroupsList = () => {
  const [groups, setGroups] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [allGroupsFetched, setAllGroupsFetched] = useState(false); // Track if all groups are loaded
 
  // Fetch only 3 latest groups initially
  useEffect(() => {
    fetch("http://localhost:4000/api/groups/latestgroup/top3") // Fetch only 3 groups initially
      .then((response) => response.json())
      .then((data) => setGroups(data))
      .catch((error) => console.error("Error fetching groups:", error));
  }, []);
 
  // Fetch all groups when "View All Groups" is clicked
  const fetchAllGroups = () => {
    if (!allGroupsFetched) {
      fetch("http://localhost:4000/api/groups/groups") // Fetch all groups from backend
        .then((response) => response.json())
        .then((data) => {
          setGroups(data);
          setAllGroupsFetched(true); // Set that all groups are fetched
        })
        .catch((error) => console.error("Error fetching all groups:", error));
    }
    setShowAll(!showAll); // Toggle view state
  };
 
  return (
    <div className="container-fluid">
      <div className="row">
        {/* <div className="col-md-8"></div> Empty space for content */}
 
        <div className="col-md-12 d-flex justify-content-end">
          <div className="latest-groups-container card p-3" style={{width:"500px"}}>
            <h4 className="card-header text-white bg-primary">Latest Groups</h4>
 
            <div className="card-body" style={{ maxHeight: "auto", overflow: "hidden" }}>
              {(showAll ? groups : groups.slice(0, 3)).map((group) => (
                <GroupItem key={group._id} name={group.name} description={group.description} />
              ))}
            </div>
 
            <button className="btn btn-primary mt-2" onClick={fetchAllGroups}>
              {showAll ? "Show Less" : "View All Groups"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default LatestGroupsList;
 