import React from 'react'
import { Routes, Route  } from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './components/home'
import Signup from './components/signup'
import Signin from './components/signin';
import Aboutus from './components/aboutus';
import Footer from './components/footer';
import './App.css'

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/footer" element={<Footer />} />
                    
        </Routes>

    
    </>
  )
}

export default App
