import React, { useEffect, useState } from 'react';
import "./myaccount.css";

const Myaccount = () => {
  const [username, setUsername] = useState(''); // State to store trimmed username
  const [email, setEmail] = useState(''); // State to store the full email
  const [age, setAge] = useState(null); // State to store random age

  useEffect(() => {
    // Fetch the email from localStorage
    const storedEmail = localStorage.getItem('username');
    if (storedEmail) {
      const trimmedUsername = storedEmail.split('@')[0]; // Trim everything after '@'
      setUsername(trimmedUsername);
      setEmail(storedEmail); // Keep the full email
    }

    // Set random age between 16 and 32
    const randomAge = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
    setAge(randomAge);
  }, []);

  return (
    <div className="my-account">
      {username ? (
        <div>
          <h2>My Account</h2>
          <p>Username: {username}</p> {/* Trimmed Username */}
          <p>Email: {email}</p> {/* Full Email */}
          <p>Age: {age}</p> {/* Random Age */}
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default Myaccount;
