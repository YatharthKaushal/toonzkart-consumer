import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ShopBySchool from "../components/ShopBySchool";
import ShopByProduct from "../components/ShopByProduct";
import ShopByDemand from "../components/ShopByDemand";
import StoresViewBooks from "../components/StoresViewBooks";
import Header from "../components/Header";
import toonzkartLogo from "../assets/toonzkart_logo.png";

const ShopPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("school"); // Default tab
  const [selectedBook, setSelectedBook] = useState(null);

  // Add useEffect to fetch and log the user token when component mounts
  useEffect(() => {
    const userToken = localStorage.getItem('token');
    console.log('User Token:', userToken);
  }, []);

  // Check for both selected book and activeTab in the location state
  useEffect(() => {
    if (location.state) {
      // If there's a selected book, set it and switch to product tab
      if (location.state.selectedBook) {
        setSelectedBook(location.state.selectedBook);
        setActiveTab("product"); // Automatically switch to product tab
      }
      
      // If activeTab is specified, set it (will override the product tab if both are present)
      if (location.state.activeTab) {
        setActiveTab(location.state.activeTab);
        
        // If switching to a different tab, reset the selected book
        if (location.state.activeTab !== "product") {
          setSelectedBook(null);
        }
      }
    }
  }, [location.state]);

  // Handler for when user clicks back from StoresViewBooks
  const handleBackFromStores = () => {
    setSelectedBook(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Use the Header component */}
      <Header logo={toonzkartLogo} />

      {/* Tabs Section - Mobile layout */}
      <div className="flex justify-between bg-white shadow-sm py-2 overflow-x-auto md:hidden no-scrollbar">
        <button
          className={`flex-1 px-2 py-2 text-xs sm:text-sm font-medium flex flex-col items-center justify-center transition-all duration-300 ${
            activeTab === "school"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveTab("school");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          <span className="text-lg mb-1">🏫</span>
          <span className="whitespace-nowrap">School</span>
        </button>
        <button
          className={`flex-1 px-2 py-2 text-xs sm:text-sm font-medium flex flex-col items-center justify-center transition-all duration-300 ${
            activeTab === "product"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveTab("product");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          <span className="text-lg mb-1">🛍️</span>
          <span className="whitespace-nowrap">Product</span>
        </button>
        <button
          className={`relative flex-1 px-2 py-2 text-xs sm:text-sm font-medium flex flex-col items-center justify-center transition-all duration-300 ${
            activeTab === "demand"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-orange-600"
          } group`}
          onClick={() => {
            setActiveTab("demand");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          {/* Hot badge - mobile version */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 py-0.5 rounded-full animate-pulse">
            HOT
          </span>
          
          {/* Subtle glow effect */}
          <span className="absolute inset-0 bg-orange-100 opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-300"></span>
          
          {/* Icon with animation */}
          <span className="text-lg mb-1 transform group-hover:scale-110 transition-transform duration-300">🔥</span> 
          
          {/* Text */}
          <span className="whitespace-nowrap">Demand</span>
        </button>
      </div>

      {/* Tabs Section - Desktop layout (original design) */}
      <div className="hidden md:flex justify-center bg-white shadow-sm py-5">
        <button
          className={`px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "school"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveTab("school");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          🏫 Shop by School
        </button>
        <button
          className={`px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "product"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-gray-600"
          }`}
          onClick={() => {
            setActiveTab("product");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          🛍️ Shop by Product
        </button>
        <button
          className={`relative px-8 py-3 mx-3 text-xl font-semibold flex items-center transition-all duration-300 ${
            activeTab === "demand"
              ? "text-blue-600 border-b-4 border-blue-600"
              : "text-orange-600"
          } group`}
          onClick={() => {
            setActiveTab("demand");
            setSelectedBook(null); // Reset selected book when switching tabs
          }}
        >
          {/* Hot badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            HOT
          </span>
          
          {/* Subtle glow effect */}
          <span className="absolute inset-0 bg-orange-100 opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-300"></span>
          
          {/* Icon with animation */}
          <span className="mr-2 transform group-hover:scale-110 transition-transform duration-300">🔥</span> 
          
          {/* Text with USP indicator */}
          <span>Shop by Demand</span>
          
          {/* Highlight that this is our USP */}
          <span className="ml-2 text-xs font-bold bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
            OUR USP
          </span>
        </button>
      </div>

      {/* Content Section */}
      <div className="w-full mx-auto bg-white shadow-lg">
        {activeTab === "school" && <ShopBySchool />}
        {activeTab === "product" && (
          selectedBook ? (
            <StoresViewBooks selectedBook={selectedBook} onBack={handleBackFromStores} />
          ) : (
            <ShopByProduct onBookSelect={setSelectedBook} />
          )
        )}
        {activeTab === "demand" && (
          <>
            {/* Special banner above the demand component */}
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 p-2 sm:p-3 text-center">
              <p className="text-orange-800 text-xs sm:text-sm md:text-base font-medium">
                <span className="animate-bounce inline-block mr-1 sm:mr-2">🌟</span>
                {window.innerWidth < 768 
                  ? "Discover trending products in real-time!" 
                  : "Discover products based on real-time demand! Never miss out on trending items."}
                <span className="animate-bounce inline-block ml-1 sm:ml-2">🌟</span>
              </p>
            </div>
            <ShopByDemand />
          </>
        )}
      </div>
    </div>
  );
};

export default ShopPage;