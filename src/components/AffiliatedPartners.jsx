import React from "react";

const affiliatedSchools = [
  { name: "Springfield High", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi1hetCzzNp7VU3K4NJ0tu0vCV_pGj-3HV9g&s" },
  { name: "Greenwood Academy", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtcISCpzTdDOSUKEZNsrMmtLjm3PT11ERmJg&s" },
  { name: "Oakridge International", imgSrc: "https://via.placeholder.com/150" },
  { name: "St. Xavier's School", imgSrc: "https://stxaviersjagdalpur.in/wp-content/uploads/2020/02/24x24-inch-logo-1.png" },
  { name: "Bright Future School", imgSrc: "https://content3.jdmagicbox.com/comp/siliguri/q4/9999px353.x353.240206224148.y4q4/catalogue/bright-future-school-loknath-nagar-road-siliguri-english-medium-schools-c4wbp63ef5.jpg" },
  { name: "Sunshine Public School", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYa8rpBedi-426XTDh2k7seerEPBZlEgDbeQ&s" },
  { name: "Cambridge Academy", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlhfyUjm3sfww9wapTLLMgzXUPOdVHQmtkyg&s" },
  { name: "Heritage Global", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Rm1rB1dgkXTO2JiVei7C3a_GiMYjH76ZAg&s" },
  { name: "The Millennium School", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTifyQ02adLE8x0JfRYIE1SQ61u8uOxIZO-g&s" },
  { name: "Royal International", imgSrc: "https://www.risindia.co.in/wp-content/uploads/2022/12/cropped-logo.png" },
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
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg transition-transform duration-300 ">
              <img
                src={school.imgSrc}
                alt={school.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* School Name */}
            <p className="text-gray-800 font-semibold mt-3 text-center transition-colors duration-300">{school.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliatedPartners;