import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Searchsymbol from '../assets/searchsymbol.png'
import ccubeevent from '../assets/ccubeevent.png'
import ccubegrpphoto from '../assets/ccubegrpphoto.png'
import pin from '../assets/pin.png'
import './aboutus.css'

function Aboutus() {
    const [activeButton, setActiveButton] = useState(null);
    const [searchSymbolVisible, setSearchSymbolVisible] = useState(true);
    const [searchActive, setSearchActive] = useState(false);
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

    const handleClick = (button) => {
        if (button === activeButton) {
            setActiveButton(null);
        } else {
            setActiveButton(button);
        }
    };

    const handleSearchClick = () => {
        setSearchSymbolVisible(false);
        setSearchActive(true);
    };

    return (
        <div>
            <nav className="navbar">
                <span className='navtext'>EVENTOPIA</span>
                <div ref={searchContainerRef} className={`search-container ${searchActive ? 'active' : ''}`}>
                    {searchSymbolVisible && <img src={Searchsymbol} alt="Search" className="searchsymbol" />}
                    <input type="search" className="search-input" onClick={handleSearchClick} />
                </div>
                <ul>
                    <li className="nav-item"><Link to="/signup">SIGN UP</Link></li>
                    <li className="nav-item"><Link to="/signin">SIGN IN</Link></li>
                    <li className="nav-item"><Link to="/aboutus">ABOUT US</Link></li>
                </ul>
            </nav>
            <div className="horizontal-line"></div>
            <div className="aboutusparas">
                <p className="aboutusparaupper">We serve as guides and commentators in the realm of events, while also functioning as a platform for club promotions, thereby alleviating the workload for clubs.</p>
                <p className="aboutusparalower">Whether you are event enthusiat or a club promoter, we're here to shine a light on the most exciting, skillful and impactful activities of our time.</p>
            </div>
            <div className="pasteventsdiv">
                <hr className="shortline" />
                <h2 className="pasteventstxt">PAST EVENTS</h2>
                <hr className="shortline" />
            </div>
            <div>
                <div className="pasteventcontent">
                    <h3 className="pasteventname">Cloud Computing Club</h3>
                    <br />
                    <p>16/07/2023</p>
                </div>
                <hr className="contentline1" />
                <img src={ccubeevent} alt="" className="ccubeeventposter" />
                <img src={pin} alt="" className="pin" />
                <hr className="contentline2" />
                <img src={ccubegrpphoto} alt="" className="ccubegrpphoto" />
            </div>

        </div>
    );
}

export default Aboutus;
