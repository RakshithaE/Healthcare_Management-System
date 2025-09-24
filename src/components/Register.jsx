import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    contact: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    periodDate: '',
    periodRegularity: 'regular',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          contact: formData.contact,
          email: formData.email,
          age: formData.age,
          password: formData.password,
          periodDate: formData.periodDate,
          periodRegularity: formData.periodRegularity,
        }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/calendar');
      } else {
        alert(data.msg);
      }
    } catch (err) {
      alert('Error registering');
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Register</h2>
      <div className="bg-red-100 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-red-200 p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Surname"
          value={formData.surname}
          onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
          className="border border-red-200 p-2 rounded mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Contact"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="border border-red-200 p-2 rounded mb-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border border-red-200 p-2 rounded mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="border border-red-200 p-2 rounded mb-2 w-full"
        />
        <div className="relative mb-2">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border border-red-200 p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.675 0 3.245.517 4.557 1.407M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 4.418-3.582 8-8 8M9 12H3m18 0h-6" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        <div className="relative mb-2">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="border border-red-200 p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {showConfirmPassword ? (
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c1.675 0 3.245.517 4.557 1.407M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 4.418-3.582 8-8 8M9 12H3m18 0h-6" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        <input
          type="date"
          placeholder="Last Period Date"
          value={formData.periodDate}
          onChange={(e) => setFormData({ ...formData, periodDate: e.target.value })}
          className="border border-red-200 p-2 rounded mb-2 w-full"
        />
        <select
          value={formData.periodRegularity}
          onChange={(e) => setFormData({ ...formData, periodRegularity: e.target.value })}
          className="border border-red-200 p-2 rounded mb-2 w-full"
        >
          <option value="regular">Regular</option>
          <option value="irregular">Irregular</option>
        </select>
        <button onClick={handleSubmit} className="bg-red-300 text-white p-2 rounded hover:bg-red-400 w-full">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;