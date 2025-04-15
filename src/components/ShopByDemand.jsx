import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaTrash,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaBolt,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";
import axios from "axios";
import DemandForm from "./DemandForm";

const API_BASE_URL = "https://backend-lzb7.onrender.com";

const ShopByDemand = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="w-full">
        {/* Hero/Intro Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 md:p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-3">
              <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full mr-3 shadow-md animate-pulse">
                <FaBolt className="inline mr-1" /> DIRECT REQUEST
              </span>
              <span className="text-white/80 text-sm">
                Skip the search hassle
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Get Exactly What You Need
            </h1>
            <p className="text-lg opacity-90 mb-6 md:w-4/5">
              Simply list your demands here and relax. No need to search through
              our entire catalog — our experts will find it for you and call
              back within 1 hour!
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="flex items-center bg-white text-indigo-700 px-3 py-1 rounded-full font-semibold shadow-md">
                <FaClock className="mr-1" /> 1-Hour Response Guarantee
              </span>
              <span className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                <FaWhatsapp className="mr-1" /> WhatsApp Support
              </span>
              <span className="items-center bg-white/20 px-3 py-1 rounded-full hidden md:flex">
                <FaPhone className="mr-1" /> Direct Callback
              </span>
            </div>
          </div>
        </div>

        <DemandForm />
      </div>
    </div>
  );
};

export default ShopByDemand;
