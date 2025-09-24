import React from 'react';
import { Link } from 'react-router-dom';
import ruthuLogo from './ruthu.png'; // Import the image from the components folder

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className="bg-red-100 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={ruthuLogo} alt="Ruthu Logo" className="h-20 w-auto mr-6 object-contain" />
        {/* <div className="text-2xl font-bold text-red-500">Ruthu</div> */}
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="text-red-500 hover:text-red-700">Home</Link>
        <Link to="/doctors" className="text-red-500 hover:text-red-700">Doctors</Link>
        <Link to="/appointments" className="text-red-500 hover:text-red-700">Appointments</Link>
        <Link to="/blogs" className="text-red-500 hover:text-red-700">Blogs</Link>
        <Link to="/reviews" className="text-red-500 hover:text-red-700">Reviews</Link>
        <Link to="/tips" className="text-red-500 hover:text-red-700">Health Tips</Link>
        <Link to="/about" className="text-red-500 hover:text-red-700">About</Link>
        <Link to="/contact" className="text-red-500 hover:text-red-700">Contact</Link>
        {user ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-300 rounded-full flex items-center justify-center text-white">
              {user.name[0]}
            </div>
            <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login" className="text-red-500 hover:text-red-700">Login</Link>
            <Link to="/register" className="text-red-500 hover:text-red-700">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;