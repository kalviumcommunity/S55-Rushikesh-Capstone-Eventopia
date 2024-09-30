import React, { useEffect, useState } from 'react';
import "./myaccount.css";

const Myaccount = () => {
  const [username, setUsername] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [age, setAge] = useState(null); 

  useEffect(() => {
    const storedEmail = localStorage.getItem('username');
    if (storedEmail) {
      const trimmedUsername = storedEmail.split('@')[0]; 
      setUsername(trimmedUsername);
      setEmail(storedEmail); 
    }

    const randomAge = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
    setAge(randomAge);
  }, []);

  return (
    <div className="my-account">
      {username ? (
        <div>
          <h2>My Account</h2>
          <p>Username: {username}</p>
          <p>Email: {email}</p> 
          <p>Age: {age}</p> 
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
};

export default Myaccount;
