import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from "./components/templates/mainlayout";
import ProfilePage from "./components/pages/profile";
import GroupsPage from "./components/pages/group";
import PhotosPage from "./components/pages/photos";
import MembersPage from "./components/pages/members";
import HomePage from "./components/pages/home";
// import './css/style.css';
// import './css/ekko-lightbox.css';
const members = [
  { name: "SomeUser01", image: "img/user.png" },
 { name: "SomeUser02", image: "img/user.png" },
  { name: "SomeUser03", image: "img/user.png" }
];

function App() {
  const handleLogin = (data) => {
    console.log("Login Data:", data);
  };
  return (
    // <div className="container-fluid" >
    //   <div className="App">
        
    //     <Router>
    //     <LoginForm onSubmit={handleLogin} />
    //     <Navigation />
        
      
    //     <Routes>
    //       <Route path="/home" element={<Home />} />
    //       <Route path="/members" element={<Members />} />
    //       <Route path="/profile/" element={<Profile userId={'67e43e4b55cc359b2d7f3f34'} />} />
    //       {/* <Route path="/profile/:id" element={<Profile userId={'67e43e4b55cc359b2d7f3f34'} />} /> */}
    //       <Route path="/profile/:userId" element={<Profile />} />
    //       <Route path="/photos" element={<Photos />} />
    //       <Route path="/groups" element={<Groups />} />
    //       {/* <Route path="/home" element={<Wall />} /> */}
    //     </Routes>
    //     </Router>

    //   </div>
    //   <div className="row">
    //   <div className="column-sm-4">
    //   <FriendsList></FriendsList>
    //   <LatestGroupsList></LatestGroupsList>
    //   </div>
    //   </div>
     

    //   <Footer></Footer>
    // </div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<MainLayout><HomePage></HomePage></MainLayout>} />
      <Route path="/home" element={<MainLayout><HomePage></HomePage></MainLayout>} />
      <Route path="/profile" element={<MainLayout><ProfilePage userId={'67e43e4b55cc359b2d7f3f34'}/></MainLayout>} />
      <Route path='/profile/:id' element={<MainLayout><ProfilePage userId={'67e43e1755cc359b2d7f3f30'}/></MainLayout>} />
        <Route path="/groups" element={<MainLayout><GroupsPage /></MainLayout>} />
        <Route path="/photos" element={<MainLayout><PhotosPage /></MainLayout>} />
        <Route path="/members" element={<MainLayout><MembersPage /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


