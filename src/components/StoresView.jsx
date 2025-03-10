import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

const storesData = [
  { 
    id: 1, name: "Book Haven", image: "https://source.unsplash.com/200x150/?bookstore", 
    location: "New York", schools: ["Greenwood High", "Ryan International"], 
    books: [
      { id: 1, title: "The Alchemist", author: "Paulo Coelho", image: "https://source.unsplash.com/150x200/?book" },
      { id: 2, title: "Harry Potter", author: "J.K. Rowling", image: "https://source.unsplash.com/150x200/?magic" }
    ]
  },
  { 
    id: 2, name: "Readers' Corner", image: "https://source.unsplash.com/200x150/?library", 
    location: "San Francisco", schools: ["Delhi Public School", "St. Xavier’s"], 
    books: [
      { id: 3, title: "Game of Thrones", author: "George R.R. Martin", image: "https://source.unsplash.com/150x200/?fantasy" },
      { id: 4, title: "Inferno", author: "Dan Brown", image: "https://source.unsplash.com/150x200/?thriller" }
    ]
  },
];

const StoresView = ({ selectedSchool, selectedBook, onBack }) => {
  const navigate = useNavigate();

  const filteredStores = storesData.filter(
    (store) =>
      (selectedSchool && store.schools.includes(selectedSchool)) ||
      (selectedBook && store.books.some(book => book.title === selectedBook))
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {selectedSchool ? `Stores for ${selectedSchool}` : `Stores Selling "${selectedBook}"`}
      </h2>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <div
              key={store.id}
              className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/store/${store.id}`)}
            >
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3 text-gray-800">{store.name}</h3>
              <p className="text-gray-600 flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" /> {store.location}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">No stores available.</p>
        )}
      </div>
    </div>
  );
};

export default StoresView;
