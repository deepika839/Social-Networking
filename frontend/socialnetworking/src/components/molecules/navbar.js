import React, { useEffect, useState } from 'react';
 
const Navigation = () => {
    const [items, setItems] = useState([]);
 
    useEffect(() => {
      fetch('http://localhost:4000/api/navigation')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => console.error('Error fetching navigation items:', error));
    }, []);
 
    return (
      <nav>
        <ul className="navbar">
          {items.map(item => (
            <li key={item._id} className="nav-item">
              <a href={item.link} className="nav-link">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
 
export default Navigation;