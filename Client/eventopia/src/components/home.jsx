import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Footer from './footer';
import Seats from '../assets/seats.png';
import Rightarrow from '../assets/rightarrow.png';
import Cross from '../assets/cross.png';
import './home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [showBookContainer, setShowBookContainer] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posterUrl, setPosterUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPoster, setShowPoster] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isTicketConfirmed, setIsTicketConfirmed] = useState(false);
  const [showTicketConfirmation, setShowTicketConfirmation] = useState(false);
  const [isBookButtonRemoved, setIsBookButtonRemoved] = useState(false);
  const navigate = useNavigate();

  const toggleBookContainer = (show) => {
    setShowBookContainer(show);
    if (show) {
      setIsBookButtonRemoved(true);
    }
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

  useEffect(() => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('ACCESS_TOKEN='));
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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

  useEffect(() => {
    if (searchQuery) {
      const results = events.filter(event =>
        event.eventname.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, events]);

  const openPoster = (imageUrl) => {
    setPosterUrl(imageUrl);
    setShowPoster(true);
  };

  const closePoster = () => {
    setPosterUrl("");
    setShowPoster(false);
  };

  const handleBookClick = () => {
    const username = localStorage.getItem('username');
    if (username) {
      toggleBookContainer(true);
    } else {
      alert('Please log in to book an event.');
      navigate('/signin');
    }
  };

  const confirmTicket = () => {
    setIsTicketConfirmed(true);
    setShowTicketConfirmation(true);
    toggleBookContainer(false);
  };

  const reviews = [
    {
      username: 'Parth Zile',
      review: 'The event was amazing! I had a great time, and everything was well organized.',
      rating: 5,
    },
    {
      username: 'Ramesh Singh',
      review: 'Good experience overall, but the seating arrangement could have been better.',
      rating: 4,
    },
    {
      username: 'Raja Kumari',
      review: 'Had a blast! The organizers were friendly, and the atmosphere was fantastic.',
      rating: 5,
    },
    {
      username: 'Shreyash Wagh',
      review: 'It was decent. The event started late, but the speakers were engaging.',
      rating: 3,
    },
    {
      username: 'Sonakshi',
      review: 'Loved the tech talks! Well worth the time. Will attend next time too.',
      rating: 5,
    },
    {
      username: 'Rajesh',
      review: 'The event had great networking opportunities, but the food options were limited.',
      rating: 4,
    }
  ];

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
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
              {selectedEvent ? (
                <div className='container'>
                  <div className='eventheadline'>
                    <span>{selectedEvent.eventname}</span>
                  </div>
                  <div className='eventdetails'>
                    <div className='eventdetailsbolden'>
                      <p>DATE: <span className='details'>{selectedEvent.date}</span></p>
                      <p>LOCATION: <span className='details'>{selectedEvent.location}</span></p>
                      <p>TIMING: <span className='details'>{selectedEvent.timing}</span></p>
                      <p>ORGANIZERS: <span className='details'>{selectedEvent.organizers}</span></p>
                    </div>
                    <div className='seatcontainer'>
                      <span>
                        <img src={Seats} alt="" className='seatsimg' />
                        <span className='seats'>{selectedEvent.seats}</span>
                      </span>
                      <span className='pricetxt'>{selectedEvent.free ? 'FREE' : 'PAID'}</span>
                    </div>
                    <div className="containerbtn">
                      {isBookButtonRemoved ? null : (
                        <button id='bookbtn' onClick={handleBookClick}>
                          <span className='booktxt'>BOOK</span>
                          <img src={Rightarrow} alt="" className='rightarrowimg' />
                        </button>
                      )}
                      <button id='viewposterbtn' onClick={() => openPoster(selectedEvent.image)}>VIEW POSTER</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>No event selected</div>
              )}
            </div>
            <div className='bookcontainerbtncontainer'>
              <button className='cancelticket' onClick={() => toggleBookContainer(false)}>CANCEL TICKET</button>
              <button className='confirmticket' onClick={confirmTicket}>CONFIRM TICKET</button>
            </div>
          </div>
          <Navbar onCategorySelect={setSelectedCategory} setSearchQuery={setSearchQuery} />

          <div className='grid-container'>
            {(searchQuery ? searchResults : filteredEvents).map(event => (
              <div key={event._id} className='container'>
                <div className='eventheadline'>
                  <span>{event.eventname}</span>
                </div>
                <div className='eventdetails'>
                  <div className='eventdetailsbolden'>
                    <p>DATE: <span className='details'>{event.date}</span></p>
                    <p>LOCATION: <span className='details'>{event.location}</span></p>
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
                    <button id='bookbtn' onClick={() => { setSelectedEvent(event); handleBookClick(); }}>
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

          {showTicketConfirmation && (
            <div className="ticket-confirmation-overlay">
              <div className="ticket-confirmation-box">
                <h2>Ticket Booked</h2>
                <p>You have successfully booked a ticket for:</p>
                <div className="event-details">
                  <p><strong>Event:</strong> {selectedEvent.eventname}</p>
                  <p><strong>Date:</strong> {selectedEvent.date}</p>
                  <p><strong>Location:</strong> {selectedEvent.location}</p>
                  <p><strong>Timing:</strong> {selectedEvent.timing}</p>
                  <p><strong>Organizers:</strong> {selectedEvent.organizers}</p>
                </div>
                <button onClick={() => setShowTicketConfirmation(false)}>Close</button>
              </div>
            </div>
          )}

          <Footer />

          <div className="review-section">
    <h2>Reviews</h2>
    {reviews.map((review, index) => (
        <div key={index} className="review">
            <p><strong>{review.username}</strong></p>
            <p>{review.review}</p>
            <p className="rating">{renderStars(review.rating)}</p> {/* Added class for rating */}
        </div>
    ))}
</div>

        </>
      )}
    </>
  );
}

export default Home;
