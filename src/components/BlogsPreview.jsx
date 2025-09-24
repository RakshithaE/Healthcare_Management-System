import React from 'react';

const BlogsPreview = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl text-red-500">Managing Period Pain</h3>
          <p className="text-red-400">Tips to ease discomfort during your cycle</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl text-red-500">Understanding Your Cycle</h3>
          <p className="text-red-400">A guide to tracking and interpreting your menstrual phases</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl text-red-500">Healthy Diet for Periods</h3>
          <p className="text-red-400">Foods to support your body during menstruation</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl text-red-500">Exercise During Your Cycle</h3>
          <p className="text-red-400">Best workouts for different menstrual phases</p>
        </div>
        <div className="bg-pink-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl text-red-500">Myths About Periods</h3>
          <p className="text-red-400">Debunking common misconceptions</p>
        </div>
      </div>
    </div>
  );
};

export default BlogsPreview;