import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Authnavbar from './Authnavbar';
import pattern from '../images/patt.png';
import axios from 'axios';

function Loginauth({ onLoginSuccess }) {
    const [showLogin, setShowLogin] = useState(true);
    const [loginError, setLoginError] = useState(null);
    const [signupErrorUsername, setSignupErrorUsername] = useState(null);
    const [loading, setLoading] = useState(false);

    const toggleForm = (e) => {
        e.preventDefault();
        setShowLogin(prev => !prev);
        setLoginError(null);
        setSignupErrorUsername(null);
    };

    // ✅ Login Credentials
    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: ''
    });

    // ✅ Handle Local Login
    const handleLocalSubmit = (e) => {
        e.preventDefault();
        console.log("Attempting local login with:", loginCredentials);
    
        axios.post("https://gorevlerbackend.onrender.com/login", loginCredentials)
            .then(res => {
                console.log("Login Response:", res.data);
                
                if (res.data?.status === "Success") { // Fix: Check 'status' instead of 'Status'
                    onLoginSuccess();
                    localStorage.setItem("isLoggedIn", true);
                    
                    const localusername = '~' + loginCredentials.username.toUpperCase();
                    localStorage.setItem('stored_username', localusername);
                    console.log("Local Login Successful:", localusername);
    
                    // Clear error state
                    setLoginError(null);
                } else {
                    setLoginError(res.data?.message || "Incorrect username or password!");
                }
            })
            .catch(err => {
                console.error("Error during login:", err.response?.data || err.message);
                setLoginError("An error occurred while logging in. Please try again later.");
            });
    };
    

    // ✅ Signup Credentials
    const [credentials, setCredentials] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    // ✅ Handle Signup
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Attempting signup with:", credentials);
    
        axios.post("https://gorevlerbackend.onrender.com/register", credentials)
            .then(res => {
                console.log("Signup Response:", res.data);
                
                if (res.data?.status === "Success") {
                    alert('✅ You are signed up! Now login using your credentials');
                    
                    // Clear the error state on successful signup
                    setSignupErrorUsername(null);
                    
                    // Automatically switch to login form
                    setShowLogin(true);
                } else {
                    setSignupErrorUsername(res.data?.message || "Username already exists. Try a different one.");
                }
            })
            .catch(err => {
                console.error("Error during signup:", err.response?.data || err.message);
                setSignupErrorUsername("An error occurred during signup. Please try again.");
            });
    };
    
    // ✅ Handle Google Login
    const handleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const googleUser = {
            name: decoded.name,
            username: `google~${decoded.given_name}`,
            email: decoded.email,
            profilepic: decoded.picture
        };

        console.log("Google Login Successful:", googleUser.username);
        localStorage.setItem('stored_username', googleUser.username.toUpperCase());
        localStorage.setItem("isLoggedIn", true);
        onLoginSuccess();

        try {
            const res = await axios.post("https://gorevlerbackend.onrender.com/google_email", googleUser);
            console.log('User data sent to server successfully:', res.data);
        } catch (err) {
            console.error('Error sending user data to server:', err.response?.data || err.message);
        }
    };

    return (
        <>
            <Authnavbar />
            <div className='authgrid'>
                <div className='authform'>
                    {showLogin ? (
                        <form onSubmit={handleLocalSubmit}>
                            <center><h1><strong>LOGIN</strong></h1></center>
                            <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={loginCredentials.username}
                                onChange={e => setLoginCredentials(prev => ({ ...prev, username: e.target.value }))}
                                required
                            />
                            <br />
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={loginCredentials.password}
                                onChange={e => setLoginCredentials(prev => ({ ...prev, password: e.target.value }))}
                                required
                            />
                            <br /><br />
                            <input type="checkbox" />
                            <font className="signinedin"> Keep me signed in </font>
                            <a className="pswd" href="#">Forgot password?</a>
                            <div className='authbtns'>
                                <button className="tglloginbtn" onClick={toggleForm} disabled={loading}>SIGN-UP</button>
                                <button className="loginbtn" type="submit" disabled={loading}>
                                    {loading ? "Logging in..." : "LOGIN"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSignupSubmit}>
                            <center><h1><strong>SIGN-UP</strong></h1></center>
                            <input
                                id="name"
                                type="text"
                                placeholder="Name"
                                value={credentials.name}
                                onChange={e => setCredentials(prev => ({ ...prev, name: e.target.value }))}
                                required
                            />
                            <br /><br />
                            <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={credentials.username}
                                onChange={e => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                                required
                            />
                            <br />
                            <input
                                id="email"
                                type="text"
                                placeholder="Email"
                                value={credentials.email}
                                onChange={e => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                                required
                            />
                            <br />
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={e => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                                required
                            />
                            <br />
                            <div className='authbtns'>
                                <button className="tglloginbtn" onClick={toggleForm} disabled={loading}>LOGIN</button>
                                <button className="loginbtn" type="submit" disabled={loading}>
                                    {loading ? "Signing up..." : "SIGN-UP"}
                                </button>
                            </div>
                        </form>
                    )}

                    {loginError && <p style={{ color: 'red', fontStyle: 'italic' }}>{loginError}</p>}
                    {signupErrorUsername && <p style={{ color: 'red', fontStyle: 'italic' }}>{signupErrorUsername}</p>}

                    <center>
                        <p>--or--</p>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => console.log('Google Login Failed')}
                        />
                    </center>
                </div>
                <div className='pattern'>
                    <img src={pattern} alt="pattern" />
                </div>
            </div>
        </>
    );
}

export default Loginauth;
