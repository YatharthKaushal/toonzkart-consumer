import React, { useState } from "react";
import ShopBySchool from "../components/ShopBySchool";
import ShopBySubject from "../components/ShopBySubject";
import ShopByDemand from "../components/ShopByDemand";
import Header from "../components/Header"; // Import the new Header component
import toonzkartLogo from "../assets/toonzkart_logo.png";

const ShopPage = () => {
  const [activeTab, setActiveTab] = useState("school"); // Default tab

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Use the Header component */}
      <Header logo={toonzkartLogo} />

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