import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Appointments = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/appointments/user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json();
        if (res.ok) {
          setAppointments(data.appointments);
        } else {
          setError(data.msg || 'Failed to fetch appointments');
        }
      } catch (err) {
        setError('Error fetching appointments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, navigate]);

  const handleCancel = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${appointmentId}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      if (res.ok) {
        setAppointments(appointments.map((appt) =>
          appt._id === appointmentId ? { ...appt, status: 'cancelled' } : appt
        ));
        alert('Appointment cancelled successfully');
      } else {
        alert(data.msg || 'Failed to cancel appointment');
      }
    } catch (err) {
      alert('Error cancelling appointment');
      console.error(err);
    }
  };

  if (!user) return null;
  if (loading) return <div className="p-4 text-center text-red-500">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-red-400 text-center">
          No appointments booked yet. <a href="/doctors" className="text-red-500 hover:text-red-700">Book now</a>.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-red-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl text-red-500">{appointment.doctorId.name}</h3>
              <p className="text-red-400">Specialty: {appointment.doctorId.specialty}</p>
              <p className="text-red-400">Date: {appointment.date}</p>
              <p className="text-red-400">Time: {appointment.time}</p>
              <p className="text-red-400">Status: {appointment.status}</p>
              {appointment.status === 'confirmed' && (
                <button
                  onClick={() => handleCancel(appointment._id)}
                  className="mt-2 bg-red-300 text-white p-2 rounded hover:bg-red-400"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;