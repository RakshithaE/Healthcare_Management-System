import React from 'react';

const ProductReviewCard = ({ title, reviewer, ageRange, effectiveness, speedRelief, sideEffects, sideEffectsDesc, experience }) => {
  return (
    <div className="bg-pink-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto my-8 shadow-md">
      {/* Review Header */}
      <h3 className="text-xl font-bold text-red-700 mb-2">
        Review Title: {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 border-b pb-2">
        Review by: {reviewer} | Age {ageRange}
      </p>

      {/* Star Ratings Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Effectiveness Rating */}
        <div>
          <p className="font-semibold text-gray-800">Effectiveness:</p>
          <div className="flex items-center">
            <span className="text-yellow-500 text-2xl">{effectiveness}</span>
            <span className="ml-2 text-sm text-gray-600">({effectiveness.length}/5 stars)</span>
          </div>
        </div>

        {/* Speed of Relief Rating */}
        <div>
          <p className="font-semibold text-gray-800">Speed of Relief:</p>
          <div className="flex items-center">
            <span className="text-yellow-500 text-2xl">{speedRelief}</span>
            <span className="ml-2 text-sm text-gray-600">({speedRelief.length}/5 stars)</span>
          </div>
        </div>

        {/* Side Effects Rating */}
        <div>
          <p className="font-semibold text-gray-800">Side Effects:</p>
          <div className="flex items-center">
            <span className="text-yellow-500 text-2xl">{sideEffects}</span>
            <span className="ml-2 text-sm text-gray-600">({sideEffects.length}/5 stars)</span>
          </div>
        </div>
      </div>
      
      {/* Side Effects Description */}
      <p className="text-sm text-gray-600 mt-2">
        "{sideEffectsDesc}"
      </p>

      {/* Experience Section */}
      <div className="mt-6 border-t pt-4">
        <p className="font-semibold text-gray-800">"My Experience:"</p>
        <p className="text-gray-700 italic mt-2">
          "{experience}"
        </p>
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Product Reviews</h2>
      <div className="space-y-8">
        <ProductReviewCard
          title="Midol Review for Cramps"
          reviewer="Anonymous User"
          ageRange="25-30"
          effectiveness="★★★★★"
          speedRelief="★★★★☆"
          sideEffects="★☆☆☆☆"
          sideEffectsDesc="Felt a little drowsy, but worth it."
          experience="I've always had terrible cramps that keep me from work. Midol has been a lifesaver. It starts working in about 30 minutes, and the relief lasts for hours. The only downside is a bit of drowsiness, but it's a small price to pay for being able to function normally."
        />
        <ProductReviewCard
          title="Pamprin Review for Bloating"
          reviewer="Rina M."
          ageRange="30-35"
          effectiveness="★★★★☆"
          speedRelief="★★★☆☆"
          sideEffects="★★☆☆☆"
          sideEffectsDesc="Mild stomach upset, manageable."
          experience="Pamprin helped reduce my bloating during my period, though it took a bit longer to kick in than I expected. The relief was decent, and the stomach upset was minor, making it a good option for me."
        />
        <ProductReviewCard
          title="Advil Review for Heavy Flow"
          reviewer="Neha K."
          ageRange="20-25"
          effectiveness="★★★★★"
          speedRelief="★★★★★"
          sideEffects="★★★☆☆"
          sideEffectsDesc="Slight headache, but rare."
          experience="Advil worked wonders for my heavy flow days. The pain relief was almost immediate, and it really helped me get through work. The occasional headache is a small trade-off for the effectiveness."
        />
        <ProductReviewCard
          title="Tylenol Review for Mild Cramps"
          reviewer="Lakshmi T."
          ageRange="35-40"
          effectiveness="★★★☆☆"
          speedRelief="★★★☆☆"
          sideEffects="★★★★☆"
          sideEffectsDesc="No noticeable side effects."
          experience="Tylenol was okay for my mild cramps, but it didn’t provide the strong relief I sometimes need. The lack of side effects is a plus, though, so it’s good for lighter days."
        />
      </div>
    </div>
  );
};

export default ReviewsSection;