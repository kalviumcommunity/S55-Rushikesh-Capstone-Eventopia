import React, { useState } from 'react';
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

    return (
        <div>
            <p className='navtextsignup'>EVENTOPIA </p>

            <form onSubmit={handleSignUp}>
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
        </div>
    );
};

export default Signup;
