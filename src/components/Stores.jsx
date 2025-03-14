import React from 'react';

const collections = [
  {
    title: "Best Luxury Stores",
    subtitle: "19 Places",
    image: "https://b.zmtcdn.com/data/collections/1861a2246de9e8cc96569b5dc4c3405c_1685696585.jpg?output-format=webp",
    link: "/stores",
  },
  {
    title: "Newly Opened",
    subtitle: "8 Places",
    image: "https://b.zmtcdn.com/data/collections/d470bac0f29786437a262c022cae76d5_1739519474.png?output-format=webp",
    link: "/stores",
  },
  {
    title: "Trending Book Shops",
    subtitle: "16 Places",
    image: "https://b.zmtcdn.com/data/collections/aaccef7199995c73258750f61c1961f0_1685696893.jpg?output-format=webp",
    link: "/stores",
  },
  {
    title: "Great Stationery Stores",
    subtitle: "25 Places",
    image: "https://b.zmtcdn.com/data/collections/3bb6a60fc5e06a9d88541a6c8895ba8a_1731665701.png?output-format=webp",
    link: "/stores",
  },
];

const Stores = () => {
  return (
    <div className="w-full px-6 my-10">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Stores</h2>
        <a href="/shop" className="text-red-500 hover:underline flex items-center">
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
