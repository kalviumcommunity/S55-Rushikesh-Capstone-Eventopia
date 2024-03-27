import React from "react";
import './navbar.css';
import Searchsymbol from '../assets/searchsymbol.png'
import Awslogo from '../assets/awslogo.png'
import Cbclogo from '../assets/cbclogo.jpg'
import Ccubelogo from '../assets/ccubelogo.jpg'
import Gdsclogo from '../assets/gdsclogo.png'
import Humanlibrarylogo from '../assets/humanlibrarylogo.jpg'
import Tedxlogo from '../assets/tedxlogo.jpg'
import Swiftlogo from '../assets/swiftlogo.jpg'
import Cognisancelogo from '../assets/cognisancelogo.jpg'
import Mlsclogo from '../assets/mlsclogo.jpg'
import Gfglogo from '../assets/gfglogo.jpg'

function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <span className='navtext'>EVENTOPIA</span>
                <div className="search-container">
                    <input type="search" placeholder="Search..." className="search-input" />
                </div>
                <ul>
                    <li className="nav-item">SIGN UP</li>
                    <li className="nav-item">SIGN IN</li>
                    <li className="nav-item">ABOUT US</li>
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
        </div>
    );
}

export default Navbar;
