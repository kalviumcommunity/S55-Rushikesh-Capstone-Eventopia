import React from 'react';
import Navbar from './navbar';
import Seats from '../assets/seats.png';
import Rightarrow from '../assets/rightarrow.png'
import './home.css';

function Home() {
  return (
    <>
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
              <button id='bookbtn'> <span className='booktxt'>BOOK</span> <img src={Rightarrow} alt="" className='rightarrowimg' /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
