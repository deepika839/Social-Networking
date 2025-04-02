import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../molecules/navbar';  // Common Navbar
import Footer from '../molecules/footer';  // Common Footer
import FriendsList from '../molecules/friendlist';  // Left Sidebar
import LatestGroupsList from '../molecules/latest.component';  // Right Sidebar
import LoginForm from '../molecules/Login/login';


const MainLayout = ({ children}) => {
    const handleLogin = (data) => {
        console.log("Login Data:", data);
    };
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12'>
                    <LoginForm></LoginForm>
                    <Navigation></Navigation>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-8'>{children}    
                </div>
                <div className='col-md-4'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <FriendsList></FriendsList>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <LatestGroupsList></LatestGroupsList>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-12'>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
