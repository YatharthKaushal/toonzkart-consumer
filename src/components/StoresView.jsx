import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import ShopByDemand from "./ShopByDemand";
import DemandForm from "./DemandForm";

const API_BASE_URL = "https://backend-lzb7.onrender.com"; // Backend API URL

const StoresView = ({ selectedSchool, onBack }) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch stores based on school ID
  useEffect(() => {
    if (selectedSchool?._id) {
      fetchStoresBySchool(selectedSchool._id);
    }
  }, [selectedSchool]);

  const fetchStoresBySchool = async (schoolId) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/stores/school/${schoolId}`
      );
      setStores(response.data);
    } catch (err) {
      setError("Failed to fetch stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
        {selectedSchool?.name ? `Stores for ${selectedSchool.name}` : "Stores"}
      </h2>

      {/* Loading & Error Handling */}
      {loading && (
        <p className="text-gray-600 text-center">Loading stores...</p>
      )}
      {/* {error && <p className="text-red-500 text-center">{error}</p>} */}

      {/* Stores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stores.length > 0 ? (
          stores.map((store) => (
            <div
              key={store._id}
              className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
              onClick={() =>
                navigate(`/store/${store._id}?school=${selectedSchool._id}`)
              }
              // onClick={() => navigate(`/store/${store._id}`)}
            >
              <img
                src={store.image || "https://via.placeholder.com/150"}
                alt={store.storeName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-3 text-gray-800">
                {store.storeName}
              </h3>
              <p className="text-gray-600 flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" /> {store.address}
              </p>
            </div>
          ))
        ) : (
          <div className="w-full mx-auto bgwhite shadowlg col-span-full">
            {!loading && (
              <>
                <p className="text-gray-600 text-center p-4 w-2/3 m-auto">
                  No stores available. Simply list your demands here and relax.
                  No need to search through our entire catalog — our experts
                  will find it for you and call back within 1 hour!
                </p>
                <DemandForm />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresView;
