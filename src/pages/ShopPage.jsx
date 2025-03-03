import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import ShopBySchool from "../components/ShopBySchool";
import ShopBySubject from "../components/ShopBySubject";
import ShopByDemand from "../components/ShopByDemand";
import toonzkartLogo from "../assets/toonzkart_logo.png"; // Ensure the logo is in your assets

const ShopPage = () => {
  const [activeTab, setActiveTab] = useState("school"); // Default tab

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white py-4 px-6 shadow-md flex items-center justify-between">
        {/* Logo & Search Bar */}
        <div className="flex items-center space-x-6">
          {/* Increased Logo Size */}
          <img src={toonzkartLogo} alt="ToonzKart Logo" className="h-14 w-auto" />
          
          {/* Search Bar */}
          <div className="flex items-center bg-gray-200 rounded-lg px-4 py-3">
            <FaMapMarkerAlt className="text-gray-500 mr-2 text-lg" />
            <select className="bg-transparent focus:outline-none text-gray-700 font-medium">
              <option>Indore</option>
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Delhi</option>
              <option>Mumbai</option>
            </select>
            <div className="h-6 w-px bg-gray-400 mx-3"></div>
            <input
              type="text"
              placeholder="Search for products, subjects..."
              className="bg-transparent focus:outline-none w-100 text-gray-700"
            />
            <FaSearch className="text-gray-500 ml-3 text-lg" />
          </div>
        </div>

        {/* Login & Signup */}
        <div className="space-x-5">
          <button className="text-gray-600 font-semibold text-lg">Log in</button>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg text-lg font-semibold">
            Sign up
          </button>
        </div>
      </header>

      {/* Tabs Section */}
      <div className="flex justify-center bg-white shadow-sm py-5">
        <button
          className={`px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "school"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("school")}
        >
          🏫 Shop by School
        </button>
        <button
          className={`px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "subject"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("subject")}
        >
          📚 Shop by Subject
        </button>
        <button
          className={`px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "demand"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("demand")}
        >
          🔥 Shop by Demand
        </button>
      </div>

      {/* Content Section */}
      <div className="max-w-100vw mx-auto bg-white rounded-lg shadow-lg">
        {activeTab === "school" && <ShopBySchool />}
        {activeTab === "subject" && <ShopBySubject />}
        {activeTab === "demand" && <ShopByDemand />}
      </div>
    </div>
  );
};

export default ShopPage;