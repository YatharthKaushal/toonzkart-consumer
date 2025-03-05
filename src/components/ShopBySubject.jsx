import React, { useState } from "react";
import { FaBook, FaFilter, FaSearch } from "react-icons/fa";

const subjects = [
  { id: 1, name: "Mathematics", image: "https://source.unsplash.com/150x150/?mathematics,education" },
  { id: 2, name: "Science", image: "https://source.unsplash.com/150x150/?science,laboratory" },
  { id: 3, name: "History", image: "https://source.unsplash.com/150x150/?history,book" },
  { id: 4, name: "English", image: "https://source.unsplash.com/150x150/?books,reading" },
  { id: 5, name: "Computer Science", image: "https://source.unsplash.com/150x150/?technology,computer" },
  { id: 6, name: "Physics", image: "https://source.unsplash.com/150x150/?physics,atom" },
  { id: 7, name: "Chemistry", image: "https://source.unsplash.com/150x150/?chemistry,lab" },
  { id: 8, name: "Biology", image: "https://source.unsplash.com/150x150/?biology,dna" },
];



const ShopBySubject = () => {
  const [search, setSearch] = useState("");

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase())
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
            placeholder="Search for subjects..."
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

      {/* Subject Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSubjects.map((subject) => (
          <div
            key={subject.id}
            className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={subject.image}
              alt={subject.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3 text-gray-800 flex items-center gap-2">
              <FaBook className="text-blue-500" /> {subject.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopBySubject;
