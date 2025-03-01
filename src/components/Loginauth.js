import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Authnavbar from './Authnavbar';
import pattern from '../images/patt.png'
import axios from 'axios';


function Loginauth({ onLoginSuccess }) {
    const [showLogin, setShowLogin] = useState(true);
    const [loginError, setLoginError] = useState(null); // State to hold login error message
    const [signupErrorUsername, setSignupErrorUsername] = useState(null); // State to hold login error message
   
    const handleLoginSuccess = (credentialResponse) => {
        const credentialResponsedecoded = jwtDecode(credentialResponse.credential);
        const loggedInName = credentialResponsedecoded.name; // Assuming the username is stored in the JWT token
        const loggedInUsername = ('google~'+credentialResponsedecoded.given_name); // Assuming the username is stored in the JWT token
        const loggedInEmail = credentialResponsedecoded.email;
        const loggedInPrfilepic = credentialResponsedecoded.picture;
    
       
    
        console.log(loggedInUsername);
    
        localStorage.setItem('stored_username', loggedInUsername.toUpperCase());
        window.localStorage.setItem("isLoggedIn", true);
        onLoginSuccess();
    
        axios.post("https://gorevlerbackend.onrender.com/google_email", {
            name: loggedInName,
            username: loggedInUsername,
            email: loggedInEmail,
            prfilepic: loggedInPrfilepic
        })
        .then(response => {
            // Handle success response from the server
            console.log('User data sent to server successfully:', response.data);
        })
        .catch(error => {
            // Handle error
            console.error('Error sending user data to server:', error);
        });
    };
    

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: ''
    });

    const handleLocalSubmit = (e) => {
        e.preventDefault();
        axios.post("https://gorevlerbackend.onrender.com/login", loginCredentials)
            .then(res => {
                if (res.data && res.data.Status === "Success") {
                    onLoginSuccess();
                    window.localStorage.setItem("isLoggedIn", true);
                    console.log("Localloggedin");
                    const localusername = ('~'+ loginCredentials.username.toUpperCase())
                    localStorage.setItem('stored_username', localusername );
                    console.log(loginCredentials.username);

                } else {
                    setLoginError("Incorrect username or password!"); // Set login error message
                    // Clear error message after 5 seconds
                    setTimeout(() => {
                        setLoginError(null);
                    }, 5000);
                }
            })
            .catch(err => {
                console.error("Error during login:", err);
                setLoginError("An error occurred while logging in. Please try again later."); // Set login error message
                // Clear error message after 5 seconds
                setTimeout(() => {
                    setLoginError(null);
                }, 5000);
            });
    };

    const [credentials, setCredentials] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })
    const handelSubmit = (e) => {
        e.preventDefault();
        axios.post("https://gorevlerbackend.onrender.com/register", credentials)
            .then(res => {
                if (res.data && res.data.Status === "Success") {
                    alert('You are signed up! Now login using your credentials');
                } else {
                    console.log("Signup failed: ", res.data); // Log the response for debugging
                    setSignupErrorUsername("Username already exists please try a diferent one")
                    setTimeout(() => {
                        setSignupErrorUsername(null);
                    }, 5000);
                }
            })
            .catch(err => {
                console.error("Error during signup:", err);
            });
    };

    return (
        <>
            <Authnavbar></Authnavbar>

            <div className='authgrid'>
                <div className='authform'>
                    {showLogin ? (
                        <form onSubmit={handleLocalSubmit}>
                            <center><h1><strong>LOGIN</strong></h1></center>
                            <input id="username" type="text" placeholder="Username" onChange={e => setLoginCredentials({ ...loginCredentials, username: e.target.value })} />
                            <br />
                            <input id="password" type="password" placeholder="Password" onChange={e => setLoginCredentials({ ...loginCredentials, password: e.target.value })} />
                            <br /><br />
                            <input type="checkbox" />
                            <font class="signinedin"> Keep me signed in
                            </font>
                            <a class="pswd" href="">Forgot password</a>
                            <div className='authbtns'>
                                <button class="tglloginbtn" onClick={toggleForm}>SIGN-UP</button>
                                <button class="loginbtn" type='submit'>LOGIN</button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handelSubmit}>
                            <center><h1><strong>SIGN-UP</strong></h1></center>
                            <input id="name" type="text" placeholder="Name" onChange={e => setCredentials({ ...credentials, name: e.target.value })} required />
                            <br /><br />
                            <input id="username" type="text" placeholder="Username" onChange={e => setCredentials({ ...credentials, username: e.target.value })} required />
                            <br />
                            <input id="email" type="text" placeholder="Email" onChange={e => setCredentials({ ...credentials, email: e.target.value })} required />
                            <br />
                            <input id="password" type="password" placeholder="Password" onChange={e => setCredentials({ ...credentials, password: e.target.value })} required />
                            <br />

                            <br />
                            <div className='authbtns'>
                                <button class="tglloginbtn" onClick={toggleForm}>LOGIN</button>
                                <button class="loginbtn" type='submit' >SIGN-UP</button>
                            </div>
                        </form>
                    )}

                    {loginError && <p style={{ color: 'red', fontStyle: 'italic' }} className="error-message">{loginError}</p>}
                    {signupErrorUsername && <p style={{ color: 'red', fontStyle: 'italic' }} className="error-message">{signupErrorUsername}</p>}

                    <center>
                        <p>--or--</p>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                    </center>
                </div>
                <div className='pattern' >
                    <img src={pattern}></img>
                </div>

            </div>
        </>
    );
}

export default Loginauth;
