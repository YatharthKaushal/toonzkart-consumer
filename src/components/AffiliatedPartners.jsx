import React from "react";

const affiliatedSchools = [
  { name: "St. Raphael's Higher Secondary School", imgSrc: "" },
  { name: "The Emerald Heights International School", imgSrc: "" },
  { name: "Agarwal Public School - Indore", imgSrc: "" },
  { name: "Chameli Devi Public School", imgSrc: "" },
  { name: "Medi-Caps International School", imgSrc: "" },
  { name: "Delhi Public School Indore", imgSrc: "" },
  { name: "SICA School, Nipaniya", imgSrc: "" },
  { name: "Delhi International School", imgSrc: "" },
  { name: "Sri Sathya Sai Vidya Vihar", imgSrc: "" },
  { name: "The Shishukunj International School", imgSrc: "" },
];

const AffiliatedPartners = () => {
  return (
    <div className="w-full py-16 px-8 bg-gray-100">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">School Curriculum Books</h2>
        <p className="text-lg text-gray-600 mt-2">
          Official textbooks and materials from these leading educational institutions
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {affiliatedSchools.map((school, index) => (
          <div key={index} className="flex flex-col items-center group">
            {/* Circular Image with hover effect */}
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-blue-500">
              <img
                src={school.imgSrc}
                alt={school.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* School Name */}
            <p className="text-gray-800 font-semibold mt-3 text-center transition-colors duration-300 group-hover:text-blue-600">{school.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliatedPartners;