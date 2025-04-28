import React, { useRef, useState, useEffect } from "react";
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
import { MdCancel } from "react-icons/md";

const API_BASE_URL = "https://backend-lzb7.onrender.com";
// const API_BASE_URL = "http://localhost:8080";

const DemandForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [demandList, setDemandList] = useState([]);
  const [whatsapp, setWhatsapp] = useState("");
  const [schoolName, setSchoolName] = useState(""); // New state for school name
  const [studentName, setStudentName] = useState(""); // New state for student name
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedClass, setSelectedClass] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload an image or PDF only.");
      return;
    }

    setFile(selectedFile);
    // Reset the file input so the same file can be selected again if needed
    e.target.value = null;
  };

  useEffect(() => {
    console.log(demandList);
  }, [demandList]);
  // Add a product to demand list
  const addToDemandList = (items) => {
    // if (searchQuery.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: items,
      added: new Date().toLocaleString(),
    };
    // console.log(items.split("\n"));

    setDemandList([newItem]);
    // setDemandList([...demandList, newItem]);
    setSearchQuery("");
  };

  // Remove a product from demand list
  const removeFromDemandList = (id) => {
    setDemandList(demandList.filter((item) => item.id !== id));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasText = demandList.length > 0;
    const hasFile = !!file;

    if (!hasText && !hasFile) {
      alert("Please add at least one product to your demand list");
      return;
    }

    if (!whatsapp) {
      alert("Please provide your WhatsApp number for us to contact you");
      return;
    }

    if (!selectedClass) {
      alert("Please select Class");
      return;
    }

    // Format the data according to API requirements
    // const requestData = {
    //   books: demandList.map((item) => ({
    //     title: item.name,
    //     author: "", // We don't collect author info in the UI, so sending an empty string
    //   })),
    //   phoneNumber: whatsapp, // Using the WhatsApp number as the primary phone number
    //   schoolName, // Include the school name in the request
    //   studentName, // Include the student name in the request
    // };

    const formData = new FormData();

    // Append full book list
    formData.append(
      "books",
      JSON.stringify(
        demandList.map((item) => ({
          title: item.name,
          author: "", // or collect from user if needed
        }))
      )
    );

    formData.append("phoneNumber", whatsapp);
    formData.append("schoolName", schoolName);
    formData.append("studentName", studentName);
    formData.append("studentClass", selectedClass);

    if (file) formData.append("file", file);

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Make the API call without token authentication
      // await axios.post(`${API_BASE_URL}/api/book-requests`, requestData, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      await axios.post(`${API_BASE_URL}/api/book-requests`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(formData);

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
    <>
      {/* Demand List & Contact Information */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {/* Demand List Section */}
        <div className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-6 w-full md:w-1/2 max-h-[580px]">
          <h2 className="text-xl font-semibold text-gray-800 mb4 flex items-center">
            Your Demand List{" "}
            {demandList.length > 0 && (
              <span className="ml-2 text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {demandList.length} item{demandList.length !== 1 ? "s" : ""}
              </span>
            )}
          </h2>
          {file && (
            <div className="relative inline-block mt-3 border w-fit">
              {/* Remove Icon */}
              <MdCancel
                onClick={() => setFile(null)}
                className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full cursor-pointer text-xl shadow-sm"
                title="Remove file"
              />

              {/* Preview */}
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-40 h-auto border border-gray-300 rounded-md"
                />
              ) : (
                <div className="p-3 border border-gray-300 rounded-md bg-gray-100 max-w-xs">
                  <p className="text-sm font-medium text-gray-700">
                    PDF Selected:{" "}
                    <span className="font-normal">{file.name}</span>
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="flex-grow overflow-y-auto">
            {/* {demandList.length !== 0 ? (
                <div className="py-10 text-center text-gray-500">
                  <p>
                    Your demand list is empty. Add products you couldn't find on
                    our website.
                  </p>
                </div>
              ) : ( */}
            <ul className="divide-y max-h-[400px] overflow-y-auto h-full">
              {/* {demandList.map((item) => (
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
                  ))} */}
              <TextareaWithLineNumbers addToDemandList={addToDemandList} />
            </ul>
            {/* )} */}
          </div>

          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          <div className="flex flex-col bg-zinc-100 rounded-lg w-full">
            <span className="px-0.5 pt-0.25 text-xs text-zinc-600 text-center">
              — OR UPLOAD BOOK LIST FROM GALLERY —
            </span>
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold p-2 px-4 rounded-md shadow-md"
            >
              UPLAOD
            </button>
          </div>
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
              <label htmlFor="schoolName" className="block text-gray-700 mb-1">
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
              <label htmlFor="classname" className="block text-gray-700 mb-1">
                Class
              </label>
              <select
                id="classname"
                type="text"
                // value={schoolName}
                defaultValue={""}
                onChange={(e) => setSelectedClass(e.target.value)}
                placeholder="Enter your school name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="" disabled>
                  select class
                </option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <div>
              <label htmlFor="studentName" className="block text-gray-700 mb-1">
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
              disabled={
                // demandList.length === 0
                // ||
                isSubmitting
              }
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
    </>
  );
};

export default DemandForm;

function TextareaWithLineNumbers({ addToDemandList }) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [lines, setLines] = useState(["1"]);

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleChange = (event) => {
    const newLines = event.target.value
      .split("\n")
      .map((_, index) => index + 1);
    setLines(newLines);
    addToDemandList(event.target.value);
    // setSearchQuery(event.target.value);
    // console.log(event.target.value);
  };

  useEffect(() => {
    handleScroll(); // Initial scroll sync
  }, []);

  useEffect(() => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop; // Keep scroll in sync on line changes
    }
  }, [lines]);

  return (
    <div className="flex flex-gwow h-full">
      <div
        ref={lineNumbersRef}
        className="text-lg rounded-l-md border border-zinc-200"
        style={{
          width: "30px",
          backgroundColor: "#f0f0f0",
          padding: "5px",
          textAlign: "right",
          // fontSize: "0.8em",
          overflowY: "hidden",
        }}
      >
        {lines.map((lineNumber) => (
          <div key={lineNumber}>{lineNumber}</div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="text-lg bg-zinc-100 rounded-r-md outline-none h-full border border-zinc-200"
        onChange={handleChange}
        onScroll={handleScroll}
        // onChange={(e) => setSearchQuery(e.target.value)}
        // onKeyDown={(e) => e.key === "Enter" && addToDemandList()}
        style={{
          flexGrow: 1,
          padding: "5px",
          fontFamily: "monospace",
          // fontSize: "0.8em",
        }}
      />
    </div>
  );
}
