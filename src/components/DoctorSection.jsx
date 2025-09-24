import React from 'react';
import { Link } from 'react-router-dom';
import commonDoctor from './common_doctor.png';
import maleDoc from './male_doctors.png';

const DoctorSection = () => {
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sakura',
      specialty: 'Gynecologist with 10 years of experience',
      contact: '56789',
      image: commonDoctor,
    },
    {
      id: '2',
      name: 'Dr. Priya',
      specialty: 'Obstetrician with 8 years of experience',
      contact: '56789',
      image: commonDoctor,
    },
    {
      id: '3',
      name: 'Dr. Anjali',
      specialty: 'Fertility Specialist with 12 years of experience',
      contact: '56789',
      image: commonDoctor,
    },
    {
      id: '4',
      name: 'Dr. John',
      specialty: 'Fertility Specialist with 12 years of experience',
      contact: '1234566',
      image: maleDoc,
    },
    {
      id: '5',
      name: 'Dr. Shiv',
      specialty: 'Fertility Specialist with 12 years of experience',
      contact: '567890',
      image: maleDoc,
    },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Meet Our Doctors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-red-100 p-4 rounded-lg shadow-md text-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
            />
            <h3 className="text-xl text-red-500">{doctor.name}</h3>
            <p className="text-red-400">{doctor.specialty}</p>
            <p className="text-red-400">Contact: {doctor.contact}</p>
            <Link
              to={`/appointments/book/${doctor.id}`}
              className="mt-4 inline-block bg-red-300 text-white p-2 rounded hover:bg-red-400"
            >
              Book Appointment
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSection;