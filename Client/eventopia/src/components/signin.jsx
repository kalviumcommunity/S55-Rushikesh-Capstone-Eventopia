import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './signin.css'; 

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signinError, setSigninError] = useState('');
    const navigate = useNavigate();

    const handleAuth = async () => {
        alert("SUCCCESSS")
        const access = axios.post('http://localhost:3000/auth', { username: email, password: password })
            .then(access => {
                console.log(access)
                document.cookie = "ACCESS_TOKEN=" + access.data.accessToken + "; expires=Thu, 22 Dec 2050 12:00:00 UTC; path=/"
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`https://s55-rushikesh-capstone-eventopia.onrender.com/signin`, { email, password });
            if (response.status === 200) {
                handleAuth();
                console.log('Login successful');
                navigate('/'); 
            } else {
                console.error('Login failed');
                setSigninError('Invalid credentials');
            }
        } catch (err) {
            console.error('An error occurred during the login:', err);
            setSigninError('Invalid Credentials');
        }
    }   


    return (
        <div>
            <p className='navtextsignin'>EVENTOPIA</p>

            <form className='signinform' onSubmit={handleSubmit} >
                <label>
                    Email Address:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                {signinError && <p className='error'>{signinError}</p>} 
                <input type="submit" value="Sign In" />
            </form>
            
            <p className='signupoptiontxt'>Not a member? <Link to="/signup" className="signup-link" >Sign Up</Link></p> 
        </div>
    );
};

export default Signin;
