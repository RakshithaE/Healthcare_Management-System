import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentBooking = ({ user }) => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(doctorId || '');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch all doctors
        const doctorsRes = await fetch('http://localhost:5000/api/doctors', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const doctorsData = await doctorsRes.json();
        if (doctorsRes.ok) {
          setDoctors(doctorsData.doctors);
        } else {
          setError(doctorsData.msg || 'Failed to fetch doctors');
        }

        // Fetch availability for selected doctor
        if (selectedDoctor) {
          const slotsRes = await fetch(`http://localhost:5000/api/doctors/${selectedDoctor}/availability`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          const slotsData = await slotsRes.json();
          if (slotsRes.ok) {
            setAvailableSlots(slotsData.slots);
          } else {
            setError(slotsData.msg || 'Failed to fetch slots');
          }
        }
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate, selectedDoctor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !date || !selectedSlot) {
      alert('Please select a doctor, date, and time slot');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          doctorId: selectedDoctor,
          userId: user.id,
          date,
          time: selectedSlot,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Appointment booked successfully! You will receive a confirmation via email/SMS.');
        navigate('/appointments');
      } else {
        alert(data.msg || 'Failed to book appointment');
      }
    } catch (err) {
      alert('Error booking appointment');
      console.error(err);
    }
  };

  if (!user) return null;
  if (loading) return <div className="p-4 text-center text-red-500">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Book Appointment</h2>
      <div className="bg-red-100 p-4 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-red-500 mb-2">Select Doctor</label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="border border-red-200 p-2 rounded w-full text-red-400"
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name} ({doctor.specialty})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-red-500 mb-2">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="border border-red-200 p-2 rounded w-full text-red-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-red-500 mb-2">Select Time Slot</label>
            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="border border-red-200 p-2 rounded w-full text-red-400"
              disabled={!selectedDoctor || !date}
            >
              <option value="">Select a time slot</option>
              {availableSlots
                .filter((slot) => slot.date === date)
                .map((slot, index) => (
                  <option key={index} value={slot.time}>
                    {slot.time}
                  </option>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-red-300 text-white p-2 rounded hover:bg-red-400 w-full"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;