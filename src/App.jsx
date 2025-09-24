import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calendar from './components/Calendar';
import DoctorSection from './components/DoctorSection';
import AppointmentBooking from './components/AppointmentBooking';
import Appointments from './components/Appointments'; 
import BlogsPreview from './components/BlogsPreview';
import PatientsReview from './components/PatientsReview';
import HealthTips from './components/HealthTips';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import About from './components/About';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        })
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-pink-50 font-sans">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route
            path="/calendar"
            element={user ? <Calendar user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/doctors"
            element={user ? <DoctorSection /> : <Navigate to="/login" />}
          />
          <Route
            path="/appointments"
            element={user ? <Appointments user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/appointments/book/:doctorId"
            element={user ? <AppointmentBooking user={user} /> : <Navigate to="/login" />}
          />
          <Route path="/blogs" element={<BlogsPreview />} />
          <Route path="/reviews" element={<PatientsReview />} />
          <Route path="/about" element={<About />} />
          <Route path="/tips" element={<HealthTips />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;