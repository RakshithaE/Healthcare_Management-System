import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserMd, FaEnvelope, FaLock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-red-100 p-4 mt-8">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/about" className="text-red-500 hover:text-red-700">
            <FaHome size={20} />
          </Link>
          <Link to="/contact" className="text-red-500 hover:text-red-700">
            <FaEnvelope size={20} />
          </Link>
          <Link to="/privacy" className="text-red-500 hover:text-red-700">
            <FaLock size={20} />
          </Link>
          <Link to="/terms" className="text-red-500 hover:text-red-700">
            <FaUserMd size={20} />
          </Link>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com/" className="text-red-500 hover:text-red-700">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.twitter.com/" className="text-red-500 hover:text-red-700">
            <FaTwitter size={20} />
          </a>
          <a href="https://www.instagram.com/" className="text-red-500 hover:text-red-700">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;