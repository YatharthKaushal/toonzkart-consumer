import React from 'react';

const categories = [
  {
    title: "Shop by School",
    subtitle: "Find books recommended by your school",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477676/2_rxzfvv.png",
    link: "/shop",
  },
  {
    title: "Shop by Products",
    subtitle: "Browse books by subject and topics",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477682/3_mnuhos.png",
    link: "/shop",
  },
  {
    title: "Shop by Demand",
    subtitle: "Discover trending and in-demand books",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477709/6_ocn3ua.png",
    link: "/shop",
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