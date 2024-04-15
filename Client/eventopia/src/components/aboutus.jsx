import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import Searchsymbol from '../assets/searchsymbol.png'
import ccubeevent from '../assets/ccubeevent.png'
import ccubegrpphoto from '../assets/ccubegrpphoto.png'
import pin from '../assets/pin.png'
import seats from '../assets/seats.png'
import ccubelogo from '../assets/ccubelogo.jpg'
import tedxevent from '../assets/tedxevent.jpg'
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

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setSearchSymbolVisible(true);
                setSearchActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
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
        <div className="section1">
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
                <p className="aboutusparalower">Whether you are event enthusiast or a club promoter, we're here to shine a light on the most exciting, skillful, and impactful activities of our time.</p>
            </div>
            <div className="pasteventsdiv">
                <hr className="shortline" />
                <h2 className="pasteventstxt">PAST EVENTS</h2>
                <hr className="shortline" />
            </div>
            <div>
                <div className="pasteventcontent">
                    <div className="pasteventnameandlogo">
                        <h3 className="pasteventname">Cloud Computing Club</h3>
                        <img src={ccubelogo} alt="ccubelogo" className="ccubelogoaboutus" />
                    </div>
                    <p className="pasteventdateccube">16/07/2023</p>
                    <img src={seats} alt="seats" className="seatsimgaboutus" />
                    <span className="noofseatsaboutus">100</span>
                    <p className="address"> [ 5th floor N518 SOE building ]</p>
                </div>
                <hr className="contentline1" />
                <img src={ccubeevent} alt="" className="ccubeeventposter" />
                <img src={pin} alt="" className="pin" />
                <div className="pasteventinfo">
                    <h3 className="pasteventinfoname">ANSIBLE</h3>
                    <hr className="contentline2" />
                    <p className="pasteventcontent1">Ansible is an open-source automation tool designed for orchestrating, configuring, and managing computer systems. It enables users to automate various IT tasks, such as software provisioning, configuration management, application deployment, and IT orchestration.</p>
                </div>
                <img src={ccubegrpphoto} alt="" className="ccubegrpphoto" />
            </div>

            <div className="section2">
                <div className="pastevent">

                </div>
            </div>

        </div>
    );
}

export default Aboutus;
