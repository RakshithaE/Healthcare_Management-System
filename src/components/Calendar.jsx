import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PeriodCalendar = ({ user }) => {
  const [date, setDate] = useState(new Date());
  const [periodData, setPeriodData] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    // Fetch period history
    fetch('http://localhost:5000/api/period/history', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => setPeriodData(data))
      .catch(err => console.error(err));

    // Check period date and send notifications
    const periodDate = new Date(user.periodDate);
    const today = new Date();
    if (today.toDateString() === new Date(periodDate.getTime() - 24 * 60 * 60 * 1000).toDateString()) {
      alert('Your period is expected tomorrow! Take care and stay prepared 💖');
    }
    if (today.toDateString() === periodDate.toDateString()) {
      const confirmed = window.confirm('Did you get your period today?');
      if (!confirmed) {
        setTimeout(() => {
          alert('It seems you missed your period. Consider booking a doctor appointment. 💕');
        }, 2 * 24 * 60 * 60 * 1000); // 2 days later
      }
    }
  }, [user]);

  const handleDateChange = async (date) => {
    setDate(date);
    // Save period start/end date
    await fetch('http://localhost:5000/api/period/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ startDate: date, endDate: new Date(date.getTime() + 5 * 24 * 60 * 60 * 1000) }),
    });
    const duration = (new Date(periodData.endDate) - new Date(periodData.startDate)) / (24 * 60 * 60 * 1000);
    if (duration > 7 || duration < 3) {
      alert('Your period duration seems unusual. Consider consulting a doctor. Here are some health tips: Stay hydrated, eat balanced meals, and rest well. 💖');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Track Your Period</h2>
      <Calendar onChange={handleDateChange} value={date} className="border-red-200 rounded-lg" />
    </div>
  );
};

export default PeriodCalendar;