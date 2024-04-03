import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './signin.css'; 

const Signin = () => {
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

    const handleSignIn = (e) => {
        e.preventDefault();
        console.log('Signing in:', { email, password });
    };

    return (
        <div>
            <p className='navtextsignin'>EVENTOPIA</p>

            <form className='signinform' onSubmit={handleSignIn} >
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
                <input type="submit" value="Sign In" />
            </form>

            <p className='signupoptiontxt'>Not a member? <Link to="/signup" className="signup-link" >Sign Up</Link></p> 
        </div>
    );
};

export default Signin;
