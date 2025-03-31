import React from "react";

const affiliatedSchools = [
  { name: "St. Raphael's Higher Secondary School", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoKhEzVHptao6zgaJJMoyfXWygdS2cXLm2A&s" },
  { name: "The Emerald Heights International School", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBp6l4GK3cZkiogp8_fGQMzN8rygWgABe_sA&s" },
  { name: "Agarwal Public School - Indore", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSto7S2bUaL7bfHxvT-z-GvFu6aMbMFwJQDebKThf_c09u326n3d-q-4bxWnLEBeswveWI&usqp=CAU" },
  { name: "Chameli Devi Public School", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwboHr5p1-GoOBJB2HKBJ62l2Ta8NGUWUmqg&s" },
  { name: "Medi-Caps International School", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk_td3Y1kXzMWEJR8e-KVgjsuo-ofF0SxYHw&s" },
  { name: "Delhi Public School Indore", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC7B0ynTaZIDb-yoJ9VvSjCW9TAK2YFXXBuQ&s" },
  { name: "SICA School, Nipaniya", imgSrc: "https://www.sircarsecurity.in/images/cl11.png" },
  { name: "Delhi International School", imgSrc: "https://play-lh.googleusercontent.com/KZO9ezE6pc3VxL9F1HJgHvDCeg_jjJ9WX1jz1DgQPa-MZyeFEeKkbR4JLANSv8uaUB4" },
  { name: "Choithram School, North Campus", imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwEhZ2yUlAWzccaxgmxBaT3uAF74PPvRysabZaAN5Vap8uNx-zvXJuX0xsqx17yNMbxkU&usqp=CAU" },
  { name: "The Shishukunj International School", imgSrc: "https://www.shishukunj.in/jhalaria-campus/wp-content/themes/shishukunj/assets/images/cat_default_image1.jpg" },
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