import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Searchsymbol from '../assets/searchsymbol.png';
import Awslogo from '../assets/awslogo.png';
import Cbclogo from '../assets/cbclogo.jpg';
import Ccubelogo from '../assets/ccubelogo.jpg';
import Gdsclogo from '../assets/gdsclogo.png';
import Humanlibrarylogo from '../assets/humanlibrarylogo.jpg';
import Tedxlogo from '../assets/tedxlogo.jpg';
import Swiftlogo from '../assets/swiftlogo.jpg';
import Cognisancelogo from '../assets/cognisancelogo.jpg';
import Mlsclogo from '../assets/mlsclogo.jpg';
import Gfglogo from '../assets/gfglogo.jpg';
import './navbar.css';

function Navbar({ onCategorySelect, setSearchQuery }) {
  const [activeButton, setActiveButton] = useState(null);
  const [searchSymbolVisible, setSearchSymbolVisible] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchSymbolVisible(true);
        setSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username && username !== "") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleClick = (button) => {
    if (button === activeButton) {
      setActiveButton(null);
      onCategorySelect(null);
    } else {
      setActiveButton(button);
      onCategorySelect(button);
    }
  };

  const handleSearchClick = () => {
    setSearchSymbolVisible(false);
    setSearchActive(true);
  };

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="navbar">
        <span className='navtext'>EVENTOPIA</span>
        <div ref={searchContainerRef} className={`search-container ${searchActive ? 'active' : ''}`}>
          {searchSymbolVisible && <img src={Searchsymbol} alt="Search" className="searchsymbol" />}
          <input
            type="search"
            className="search-input"
            onClick={handleSearchClick}
            onChange={handleSearchInput}
          />
        </div>
        <ul>
          {isLoggedIn ? (
            <>
              <li className="nav-item"><Link to="/myaccount">MY ACCOUNT</Link></li>
              <li className="nav-item" id="logoutbtn"><button onClick={handleLogout}>LOGOUT</button></li>
            </>
          ) : (
            <>
              <li className="nav-item"><Link to="/signup">SIGN UP</Link></li>
              <li className="nav-item"><Link to="/signin">SIGN IN</Link></li>
            </>
          )}
          <li className="nav-item" ><Link to="/aboutus">ABOUT US</Link></li>
        </ul>
      </nav>
      <div className="horizontal-line"></div>
      <div className="marquee-container">
        <div className="marquee">
          <img src={Awslogo} alt="" />
          <div className="line"></div>
          <img src={Cbclogo} alt="" />
          <div className="line"></div>
          <img src={Ccubelogo} alt="" />
          <div className="line"></div>
          <img src={Gdsclogo} alt="" />
          <div className="line"></div>
          <img src={Humanlibrarylogo} alt="" />
          <div className="line"></div>
          <img src={Tedxlogo} alt="" />
          <div className="line"></div>
          <img src={Swiftlogo} alt="" />
          <div className="line"></div>
          <img src={Cognisancelogo} alt="" />
          <div className="line"></div>
          <img src={Mlsclogo} alt="" />
          <div className="line"></div>
          <img src={Gfglogo} alt="" />
        </div>
      </div>
      <div className="filtercontainer">
        <p className="filtercontainertext">Connecting College, One Event at a Time</p>
        <div className="buttons">
          <button className={activeButton === 'technical' ? "pressed" : ""} onClick={() => handleClick('technical')}>TECHNICAL</button>
          <button className={activeButton === 'cultural' ? "pressed" : ""} onClick={() => handleClick('cultural')}>CULTURAL</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
