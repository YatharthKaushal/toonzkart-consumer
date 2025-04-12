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

const API_BASE_URL = "https://backend-lzb7.onrender.com";

const ShopByDemand = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [demandList, setDemandList] = useState([]);
  const [whatsapp, setWhatsapp] = useState("");
  const [schoolName, setSchoolName] = useState(""); // New state for school name
  const [studentName, setStudentName] = useState(""); // New state for student name
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Add a product to demand list
  const addToDemandList = () => {
    if (searchQuery.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: searchQuery.trim(),
      added: new Date().toLocaleString(),
    };

    setDemandList([...demandList, newItem]);
    setSearchQuery("");
  };

  // Remove a product from demand list
  const removeFromDemandList = (id) => {
    setDemandList(demandList.filter((item) => item.id !== id));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (demandList.length === 0) {
      alert("Please add at least one product to your demand list");
      return;
    }

    if (!whatsapp) {
      alert("Please provide your WhatsApp number for us to contact you");
      return;
    }

    // Format the data according to API requirements
    const requestData = {
      books: demandList.map((item) => ({
        title: item.name,
        author: "", // We don't collect author info in the UI, so sending an empty string
      })),
      phoneNumber: whatsapp, // Using the WhatsApp number as the primary phone number
      schoolName, // Include the school name in the request
      studentName, // Include the student name in the request
    };

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Make the API call without token authentication
      await axios.post(`${API_BASE_URL}/api/book-requests`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle successful submission
      setSubmissionStatus("success");

      // Reset form after successful submission
      setTimeout(() => {
        setDemandList([]);
        setWhatsapp("");
        setSchoolName("");
        setStudentName("");
        setSubmissionStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error submitting demand list:", error);
      setSubmissionStatus("error");

      // Extract error message
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to submit your request. Please try again later."
      );

      // Reset error status after some time
      setTimeout(() => {
        setSubmissionStatus(null);
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Display success message
  if (submissionStatus === "success") {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-green-500 mx-auto w-16 h-16 flex items-center justify-center bg-green-50 rounded-full mb-4">
            <FaCheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Request Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer executive will contact you within{" "}
            <span className="font-semibold">1 working hour</span> about your
            requested products.
          </p>
          <div className="flex items-center justify-center text-gray-500 mb-6">
            <FaClock className="mr-2" /> Expected response time: 1 hour
          </div>
          <button
            onClick={() => setSubmissionStatus(null)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Make Another Request
          </button>
        </div>
      </div>
    );
  }

  // Display error message
  if (submissionStatus === "error") {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-gray-50 p-8">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 mx-auto w-16 h-16 flex items-center justify-center bg-red-50 rounded-full mb-4">
            <FaTimes size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Request Failed
          </h2>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <button
            onClick={() => setSubmissionStatus(null)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8 px-4 md:px-8 rounded-lg">
      <div className="w-full">
        {/* Hero/Intro Section */}

        {/* Search and Add Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <div className="relative flex-grow">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter product name, book title, author, etc."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addToDemandList()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button
              onClick={addToDemandList}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-5 py-3 flex items-center justify-center transition-colors"
            >
              <FaPlus className="mr-2" /> Add to List
            </button>
          </div>
        </div>

        {/* Demand List & Contact Information */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Demand List Section */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              Your Demand List{" "}
              {demandList.length > 0 && (
                <span className="ml-2 text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {demandList.length} item{demandList.length !== 1 ? "s" : ""}
                </span>
              )}
            </h2>
            {demandList.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                <p>
                  Your demand list is empty. Add products you couldn't find on
                  our website.
                </p>
              </div>
            ) : (
              <ul className="divide-y max-h-[400px] overflow-y-auto">
                {demandList.map((item) => (
                  <li
                    key={item.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Added: {item.added}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromDemandList(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Information Section */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              How Should We Contact You?
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="whatsapp" className="block text-gray-700 mb-1">
                  WhatsApp Phone Number
                </label>
                <input
                  id="whatsapp"
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Your WhatsApp number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="schoolName"
                  className="block text-gray-700 mb-1"
                >
                  School Name
                </label>
                <input
                  id="schoolName"
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Enter your school name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="studentName"
                  className="block text-gray-700 mb-1"
                >
                  Student Name
                </label>
                <input
                  id="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={demandList.length === 0 || isSubmitting}
                className={`w-full py-3 rounded-lg font-medium text-white ${
                  demandList.length === 0 || isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } transition-colors flex items-center justify-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
              <p className="text-center text-sm text-gray-500 mt-2">
                Our customer executive will contact you within 1 working hour
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopByDemand;
