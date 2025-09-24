import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <div className="absolute inset-0 bg-pink-200 bg-opacity-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Embrace Your Cycle with Care</h1>
          <p className="text-lg text-red-400 mt-2">A loving companion for your period journey</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;