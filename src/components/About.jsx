import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-red-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-pink-200 p-6 text-center">
        <h1 className="text-3xl font-bold text-red-500">About Ruthu</h1>
        <p className="text-red-400 mt-2">Empowering women’s health, one cycle at a time.</p>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Our Story</h2>
          <p className="text-red-400 leading-relaxed">
            Ruthu was founded with a vision to provide a supportive and informative platform for women
            to track their menstrual cycles and access expert care. Inspired by the strength and beauty
            of nature, we aim to make health management seamless and empowering.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Our Mission</h2>
          <p className="text-red-400 leading-relaxed">
            At Ruthu, our mission is to offer personalized health insights, connect users with
            experienced doctors, and foster a community that celebrates every stage of a woman’s life.
            We are committed to accuracy, care, and innovation in women’s wellness.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-red-500 mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-pink-200 p-4 rounded-lg text-center shadow-md">
              <div className="w-20 h-20 bg-red-300 rounded-full mx-auto flex items-center justify-center text-white text-xl mb-2">
                A
              </div>
              <h3 className="text-lg text-red-500">Anjali Sharma</h3>
              <p className="text-red-400">Founder & CEO</p>
            </div>
            <div className="bg-pink-200 p-4 rounded-lg text-center shadow-md">
              <div className="w-20 h-20 bg-red-300 rounded-full mx-auto flex items-center justify-center text-white text-xl mb-2">
                P
              </div>
              <h3 className="text-lg text-red-500">Priya Mehta</h3>
              <p className="text-red-400">Lead Developer</p>
            </div>
            <div className="bg-pink-200 p-4 rounded-lg text-center shadow-md">
              <div className="w-20 h-20 bg-red-300 rounded-full mx-auto flex items-center justify-center text-white text-xl mb-2">
                S
              </div>
              <h3 className="text-lg text-red-500">Sakura Patel</h3>
              <p className="text-red-400">Health Consultant</p>
            </div>
          </div>
        </section>
      </main>

      {/* Back to Home Link */}
      <div className="text-center p-4">
        <Link to="/" className="text-red-500 hover:text-red-700 underline">Back to Home</Link>
      </div>
    </div>
  );
};

export default About;