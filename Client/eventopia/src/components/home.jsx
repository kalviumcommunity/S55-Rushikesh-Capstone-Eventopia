import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Seats from '../assets/seats.png';
import Rightarrow from '../assets/rightarrow.png'
import Cross from '../assets/cross.png'
import './home.css';

function Home() {
  const [showBookContainer, setShowBookContainer] = useState(false);

  const toggleBookContainer = (show) => {
    setShowBookContainer(show);
  };

  useEffect(() => {

    const toggleScrollbar = () => {
      document.body.style.overflow = showBookContainer ? 'hidden' : 'auto';
    };

    toggleScrollbar();

    return () => {
      if (!showBookContainer) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [showBookContainer]);

  return (
    <>
      {showBookContainer && <div className='overlay'></div>} 
      <div className='bookcontainer' style={{ display: showBookContainer ? 'block' : 'none' }}>
        <div className='myticketbox'>
          <p className='mytickettxt'>MY TICKET</p>
          <img src={Cross} alt="" className='cross' onClick={() => toggleBookContainer(false)}/>
          <span className='items'>1 item</span>
        </div>
        <div className='grid-container'>
        <div className='container'>
          <div className='eventheadline'>
            <span>DSA BOOTCAMP 2.0</span>
          </div>
          <div className='eventdetails'>
            <div className='eventdetailsbolden'>
              <p>DATE: <span className='details'>12th-15th March</span> </p>
              <p>LOCATION: <span className='details'>SOC 519</span> </p>
              <p>TIMING: <span className='details'>10AM-12:30PM</span></p>
              <p>ORGANIZERS: <span className='details'>GFG, CODECHEF</span></p>
            </div>
            <div className='seatcontainer'><span><img src={Seats} alt="" className='seatsimg' /><span className='seats'>150</span></span><span className='pricetxt'>FREE</span></div>
            <div className="containerbtn">
              <button id='viewposterbtn'>VIEW POSTER</button>
              <button id='bookbtn' onClick={() => toggleBookContainer(true)}> <span className='booktxt'>BOOK</span> <img src={Rightarrow} alt="" className='rightarrowimg' /></button>
            </div>
          </div>
        </div>
      </div>
        <div className='bookcontainerbtncontainer'>  
          <button className='cancelticket' onClick={() => toggleBookContainer(false)} >CANCEL TICKET</button>
          <button className='confirmticket'>CONFIRM TICKET</button>
        </div>
      </div>
      <Navbar />

      <div className='grid-container'>
        <div className='container'>
          <div className='eventheadline'>
            <span>DSA BOOTCAMP 2.0</span>
          </div>
          <div className='eventdetails'>
            <div className='eventdetailsbolden'>
              <p>DATE: <span className='details'>12th-15th March</span> </p>
              <p>LOCATION: <span className='details'>SOC 519</span> </p>
              <p>TIMING: <span className='details'>10AM-12:30PM</span></p>
              <p>ORGANIZERS: <span className='details'>GFG, CODECHEF</span></p>
            </div>
            <div className='seatcontainer'><span><img src={Seats} alt="" className='seatsimg' /><span className='seats'>150</span></span><span className='pricetxt'>FREE</span></div>
            <div className="containerbtn">
              <button id='viewposterbtn'>VIEW POSTER</button>
              <button id='bookbtn' onClick={() => toggleBookContainer(true)}> <span className='booktxt'>BOOK</span> <img src={Rightarrow} alt="" className='rightarrowimg' /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
