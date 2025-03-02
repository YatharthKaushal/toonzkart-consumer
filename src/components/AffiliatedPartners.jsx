import React from "react";

const affiliatedSchools = [
  { name: "Springfield High", imgSrc: "https://via.placeholder.com/150" },
  { name: "Greenwood Academy", imgSrc: "https://via.placeholder.com/150" },
  { name: "Oakridge International", imgSrc: "https://via.placeholder.com/150" },
  { name: "St. Xavier's School", imgSrc: "https://via.placeholder.com/150" },
  { name: "Bright Future School", imgSrc: "https://via.placeholder.com/150" },
  { name: "Sunshine Public School", imgSrc: "https://via.placeholder.com/150" },
  { name: "Cambridge Academy", imgSrc: "https://via.placeholder.com/150" },
  { name: "Heritage Global", imgSrc: "https://via.placeholder.com/150" },
  { name: "The Millennium School", imgSrc: "https://via.placeholder.com/150" },
  { name: "Royal International", imgSrc: "https://via.placeholder.com/150" },
];

const AffiliatedPartners = () => {
  return (
    <div className="w-full py-16 px-8 bg-gray-100">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Our Affiliated Partners</h2>
        <p className="text-lg text-gray-600 mt-2">
          Partnering with the best schools for quality education resources.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {affiliatedSchools.map((school, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Circular Image */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
              <img
                src={school.imgSrc}
                alt={school.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* School Name */}
            <p className="text-gray-800 font-semibold mt-3 text-center">{school.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliatedPartners;
