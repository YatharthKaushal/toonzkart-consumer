import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Shop by School",
    subtitle: "Find books recommended by your school",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477676/2_rxzfvv.png",
    tabId: "school",
  },
  {
    title: "Shop by Stores",
    subtitle: "Explore books available at partner stores",
    image: "https://im.hunt.in/cg/bokaro/City-Guide/BHFDG.jpg",
    tabId: "stores",
  },
  {
    title: "Shop by Products",
    subtitle: "Browse books by subject and topics",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477682/3_mnuhos.png",
    tabId: "product",
  },
  {
    title: "Shop by Demand",
    subtitle: "Discover trending and in-demand books",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477709/6_ocn3ua.png",
    tabId: "demand",
  }
];

const ShopBy = () => {
  return (
    <div className="w-full py-8 md:py-16 px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Shop By Category</h2>
      
      <div className="flex flex-col lg:flex-row flex-wrap justify-center items-stretch gap-4">
        {categories.map((category, index) => (
          <Link 
            key={index} 
            to="/shop" 
            state={{ activeTab: category.tabId }}
            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)] bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg overflow-hidden transition-transform hover:scale-105 border border-gray-100"
          >
            <div className="flex flex-row sm:flex-col items-center sm:items-stretch">
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-24 h-24 sm:w-full sm:h-40 md:h-48 object-cover"
                loading="lazy"
              />
              <div className="p-3 md:p-4 text-left sm:text-center flex-1 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-semibold">{category.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">{category.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopBy;