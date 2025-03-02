import React from 'react';

const categories = [
  {
    title: "Shop by School",
    subtitle: "Find books recommended by your school",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQTR-IT3E65fMCzbtuMaWP_7F3Q-qAMQdrA&s",
    link: "/shop-by-school",
  },
  {
    title: "Shop by Subject",
    subtitle: "Browse books by subject and topics",
    image: "https://jacksonjournal.news/wp-content/uploads/2023/12/preview-school-subjects-01-1da8db463d53b76965d1667795c62eda86eb2dd4146879c719431522da0a855a.jpg",
    link: "/shop-by-subject",
  },
  {
    title: "Shop by Demand",
    subtitle: "Discover trending and in-demand books",
    image: "https://www.realsimple.com/thmb/m1YY-PipA4UpKqtRTacPaJ1IA7g=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/great-books-for-anytime-2000-4ff4221eb1e54b659689fef7d5e265d5.jpg",
    link: "/shop-by-demand",
  }
];

const ShopBy = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 my-20 px-6">
      {categories.map((category, index) => (
        <a 
          key={index} 
          href={category.link} 
          className="w-full md:w-1/4 bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
        >
          <img 
            src={category.image} 
            alt={category.title} 
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="p-4 text-center">
            <h3 className="text-xl font-semibold">{category.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{category.subtitle}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ShopBy;
