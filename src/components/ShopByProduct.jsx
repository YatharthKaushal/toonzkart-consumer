import React, { useState } from "react";
import { FaShoppingBag, FaFilter, FaSearch } from "react-icons/fa";

const products = [
  { id: 1, name: "Textbooks", image: "https://source.unsplash.com/150x150/?textbook,education" },
  { id: 2, name: "Notebooks", image: "https://source.unsplash.com/150x150/?notebook,stationery" },
  { id: 3, name: "Pens & Pencils", image: "https://source.unsplash.com/150x150/?pen,pencil" },
  { id: 4, name: "Backpacks", image: "https://source.unsplash.com/150x150/?backpack,school" },
  { id: 5, name: "Art Supplies", image: "https://source.unsplash.com/150x150/?art,supplies" },
  { id: 6, name: "Calculators", image: "https://source.unsplash.com/150x150/?calculator,math" },
  { id: 7, name: "Desk Accessories", image: "https://source.unsplash.com/150x150/?desk,accessory" },
  { id: 8, name: "Sports Equipment", image: "https://source.unsplash.com/150x150/?sports,equipment" },
];

const ShopByProduct = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 pl-10 pr-4 py-2 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-md"
          />
        </div>

        {/* Filter Button */}
        <button className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-5 py-2 rounded-md transition shadow mt-4 md:mt-0">
          <FaFilter /> Filter
        </button>
      </div>

      {/* Product Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3 text-gray-800 flex items-center gap-2">
              <FaShoppingBag className="text-blue-500" /> {product.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByProduct;