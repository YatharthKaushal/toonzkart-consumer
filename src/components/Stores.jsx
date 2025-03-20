import React from 'react';

const collections = [
  {
    title: "Exclusive School Books Shops",
    subtitle: "19 Places",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477694/1_gbvnfh.png",
    link: "/stores",
  },
  {
    title: "Stationery Stores",
    subtitle: "8 Places",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477728/10_hvjvip.png",
    link: "/stores",
  },
  {
    title: "Sports and Toys",
    subtitle: "16 Places",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477709/6_ocn3ua.png",
    link: "/stores",
  },
  {
    title: "All India Delivery Stores",
    subtitle: "25 Places",
    image: "https://res.cloudinary.com/dco22xvey/image/upload/v1742477718/13_lxqjea.png",
    link: "/stores",
  },
];

const Stores = () => {
  return (
    <div className="w-full px-6 my-10">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Stores</h2>
        <a href="/stores" className="text-red-500 hover:underline flex items-center">
          All Stores <i className="fas fa-chevron-right ml-2"></i>
        </a>
      </div>

      {/* Collection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {collections.map((collection, index) => (
          <a 
            key={index} 
            href={collection.link} 
            className="relative rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <img 
              src={collection.image} 
              alt={collection.title} 
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0  bg-opacity-30"></div>
            {/* Text Content */}
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{collection.title}</h3>
              <div className="flex items-center">
                <p className="text-sm">{collection.subtitle}</p>
                <i className="fas fa-chevron-right ml-2 text-white"></i>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Stores;