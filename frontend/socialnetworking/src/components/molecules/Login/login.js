import React from "react";
import TextInput from "../../atoms/Input/input";
import Button from "../../atoms/Button/button";
import Checkbox from "../../atoms/Checkbox/checkbox";
import ImagePlaceholder from "../../atoms/Image/image";
import { useState } from "react";
import '../../../../src/App.css';
import logo from '../../../cglogo.png';
import { useNavigate } from 'react-router-dom';

// const API_URL = "http://localhost:4000"; 
const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    //after signing in it should navigate to home page
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await fetch("http://localhost:4000/api/userlog/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, rememberMe }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Store token
            if (rememberMe) {

                localStorage.setItem("token", data.token);
                navigate('/home', 1000)
            } else {
                sessionStorage.setItem("token", data.token);
                navigate('/home', 1000)
            }

            onSubmit(); // Notify App.js that login was successful
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <header>
            <div className="logo">
                <ImagePlaceholder src={logo} alt="Capgemini Logo" className="logo-img" />
                <span>Social Networking for Everyone</span>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="remember-me">
                    <Checkbox
                        label="Remember me"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)} />
                </div>
                <div className="login-row">
                    <TextInput
                        placeholder="Email"

                        className="inputBox"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                    <TextInput
                        placeholder="Password" s
                        type="password"
                        className="inputBox"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />

                    <Button className="btn" label="Sign In" type="submit" />
                </div>



            </form>
        </header>


    )
}

export default LoginForm;