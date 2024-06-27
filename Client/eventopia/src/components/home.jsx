import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Footer from './footer';
import Seats from '../assets/seats.png';
import Rightarrow from '../assets/rightarrow.png';
import Cross from '../assets/cross.png';
import './home.css';

function Home() {
  const [showBookContainer, setShowBookContainer] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPoster, setShowPoster] = useState(false);

  const toggleBookContainer = (show) => {
    setShowBookContainer(show);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://s55-rushikesh-capstone-eventopia.onrender.com/data");
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const toggleScrollbar = () => {
      document.body.style.overflow = showBookContainer || showPoster ? 'hidden' : 'auto';
    };

    toggleScrollbar();

    return () => {
      if (!showBookContainer && !showPoster) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [showBookContainer, showPoster]);

  const technicalEvents = [
    "DSA BOOTCAMP 2.0",
    "BATTLESHIP",
    "IDEATHON DAY-2",
    "FLUTTER",
    "CLASH OF CODERS",
    "INAUGURAL EVENT"
  ];

  const culturalEvents = [
    "TALES OF THE SEA",
    "GUEST SPEAKERS",
    "MEN'S DAY"
  ];

  const filteredEvents = selectedCategory === 'technical'
    ? events.filter(event => technicalEvents.includes(event.eventname))
    : selectedCategory === 'cultural'
      ? events.filter(event => culturalEvents.includes(event.eventname))
      : events;

  const openPoster = (imageUrl) => {
    setPosterUrl(imageUrl);
    setShowPoster(true); 
  };

  const closePoster = () => {
    setPosterUrl("");
    setShowPoster(false); 
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          {showBookContainer && <div className='overlay'></div>}
          {showPoster && <div className='overlay'></div>}
          <div className='bookcontainer' style={{ display: showBookContainer ? 'block' : 'none' }}>
            <div className='myticketbox'>
              <p className='mytickettxt'>MY TICKET</p>
              <img src={Cross} alt="" className='cross' onClick={() => toggleBookContainer(false)} />
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
                    <button id='viewposterbtn' onClick={() => openPoster('https://example.com/poster1.jpg')}>VIEW POSTER</button>
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
          <Navbar onCategorySelect={setSelectedCategory} />

          <div className='grid-container'>
            {filteredEvents.map(event => (
              <div key={event._id} className='container'>
                <div className='eventheadline'>
                  <span>{event.eventname}</span>
                </div>
                <div className='eventdetails'>
                  <div className='eventdetailsbolden'>
                    <p>DATE: <span className='details'>{event.date}</span> </p>
                    <p>LOCATION: <span className='details'>{event.location}</span> </p>
                    <p>TIMING: <span className='details'>{event.timing}</span></p>
                    <p>ORGANIZERS: <span className='details'>{event.organizers}</span></p>
                  </div>
                  <div className='seatcontainer'>
                    <span>
                      <img src={Seats} alt="" className='seatsimg' />
                      <span className='seats'>{event.seats}</span>
                    </span>
                    <span className='pricetxt'>{event.free ? 'FREE' : 'PAID'}</span>
                  </div>
                  <div className="containerbtn">
                    <button id='viewposterbtn' onClick={() => openPoster(event.image)}>VIEW POSTER</button>
                    <button id='bookbtn' onClick={() => toggleBookContainer(true)}>
                      <span className='booktxt'>BOOK</span>
                      <img src={Rightarrow} alt="" className='rightarrowimg' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {posterUrl && (
            <div className="poster-overlay">
              <img src={posterUrl} alt="Poster" className="poster-image" />
              <button onClick={closePoster} className="close-poster-button">
                Close
              </button>
            </div>
          )}
          <hr className="footerline" />
          <p className="footertext">
            Made with ❤️ by Rushikesh
          </p>
        </>
      )}
    </>
  );
}

export default Home;
