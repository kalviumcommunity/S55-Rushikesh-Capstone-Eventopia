import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './signup.css';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleInputFocus = (e) => {
        const label = e.target.parentElement.querySelector('label');
        label.classList.add('active');
    }

    const handleInputBlur = (e) => {
        if (e.target.value === '') {
            const label = e.target.parentElement.querySelector('label');
            label.classList.remove('active');
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log('Signing up:', { firstName, lastName, email, password });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`https://s55-rushikesh-capstone-eventopia.onrender.com`, { username, password });
            if (response.status === 200) {
                console.log('Form submitted successfully');
                navigate("/")
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
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
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
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
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
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
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
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        required
                    />
                </label>
                <br />
                <input type="submit" value="Sign Up" />
            </form>
            <p className='signinoptiontxt'>Already a member? <Link to="/signin" className="signup-link">Sign In</Link></p> 
        </div>
    );
};

export default Signup;
