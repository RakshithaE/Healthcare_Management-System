import React from 'react';

const HealthTips = () => {
  const tipsImages = [
    {
      src: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      alt: 'Glass of water',
      caption: 'Stay hydrated during your period',
    },
    {
      src: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      alt: 'Iron-rich foods',
      caption: 'Eat iron-rich foods',
    },
    {
      src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      alt: 'Yoga pose',
      caption: 'Practice gentle yoga',
    },
    {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      alt: 'Warm compress',
      caption: 'Apply a warm compress',
    },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-500 mb-6 text-center">Health Tips</h2>
      <div className="flex flex-col items-center gap-6 mb-8">
        {tipsImages.map((image, index) => (
          <div key={index} className="flex flex-col items-center w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="w-64 h-40 object-cover rounded-lg shadow-md"
            />
            <p className="text-red-400 text-sm mt-2 text-center">{image.caption}</p>
          </div>
        ))}
      </div>
      <ul className="list-disc pl-5 text-red-400">
        <li>Stay hydrated during your period.</li>
        <li>Eat iron-rich foods to boost energy.</li>
        <li>Practice gentle yoga for relaxation.</li>
        <li>Apply a warm compress to ease cramps.</li>
        <li>Get adequate sleep to support recovery.</li>
        <li>Consume calcium-rich foods for bone health.</li>
        <li>Avoid caffeine to reduce discomfort.</li>
        <li>Take short walks to improve circulation.</li>
        <li>Use a heating pad for lower back pain.</li>
      </ul>
    </div>
  );
};

export default HealthTips;