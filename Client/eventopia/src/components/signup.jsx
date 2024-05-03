import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`https://s55-rushikesh-capstone-eventopia.onrender.com/signup`, { username, password });
            if (response.status === 200) {
                console.log('Form submitted successfully');
                navigate('/')
            } else {
                console.error('Signup failed');
                setSignupError('Signup failed')
            }
        } catch (err) {
            console.error('An error occurred during the signup:', err);
            setSignupError('An error occured during the signup')
        }
    }

    return (
        <div>
            <p className='navtextsignup'>EVENTOPIA </p>

            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        
                        required
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        
                        required
                    />
                </label>
                <br />
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
                <input type="submit" value="Sign Up" />
            </form>
            <p className='signinoptiontxt'>Already a member? <Link to="/signin" className="signup-link">Sign In</Link></p> 
            <div></div>
        </div> 
    );
};

export default Signup;
