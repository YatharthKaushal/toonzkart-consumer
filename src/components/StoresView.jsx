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
      if (response.data < 0 || response.data.length == 1) {
        // fetchStores();

      setStores([
        {
          _id: "67f53589d83d0be7fe501ecd",
          storeName: "Toonzkart",
          address: "Indore",
          phoneNumber: "",
          email: "info@toonzkart.com",
          managerName: "",
          status: "Pending",
          website: "",
          storeHours: "",
          image:
            "https://res.cloudinary.com/dco22xvey/image/upload/v1744277199/mern_uploads/qnkose8hgwpy2nmawlu4.jpg",
          description: "",
          commissionRate: 10,
          paymentTerms: "Net 30",
          schools: [
            "67e096d40f7896ba37ce7fe8",
            "67e096d40f7896ba37ce7fe9",
            "67e096d40f7896ba37ce7fea",
            "67e096d40f7896ba37ce7feb",
            "67e096d40f7896ba37ce7fec",
            "67e096d40f7896ba37ce7fed",
            "67e096d40f7896ba37ce7fee",
            "67e096d40f7896ba37ce7fef",
            "67e096d40f7896ba37ce7ff0",
            "67e096d40f7896ba37ce7ff1",
            "67e096d40f7896ba37ce7ff2",
            "67e096d40f7896ba37ce7ff3",
            "67e096d40f7896ba37ce7ff4",
            "67e096d40f7896ba37ce7ff5",
            "67e096d40f7896ba37ce7ff6",
            "67e096d40f7896ba37ce7ff7",
            "67e096d40f7896ba37ce7ff8",
            "67e096d40f7896ba37ce7ff9",
            "67e096d40f7896ba37ce7ffc",
            "67e096d40f7896ba37ce7ffd",
            "67e096d40f7896ba37ce7ffe",
            "67e096d40f7896ba37ce7fff",
            "67e096d40f7896ba37ce8000",
            "67e096d40f7896ba37ce8001",
            "67e096d40f7896ba37ce8002",
            "67e096d40f7896ba37ce8003",
            "67e096d40f7896ba37ce8004",
            "67e096d40f7896ba37ce8005",
            "67e096d40f7896ba37ce8007",
            "67e096d40f7896ba37ce8008",
            "67e096d40f7896ba37ce8009",
            "67e096d40f7896ba37ce800a",
            "67e096d40f7896ba37ce800b",
            "67e096d40f7896ba37ce800c",
            "67e096d40f7896ba37ce800d",
            "67e096d40f7896ba37ce800e",
            "67e096d40f7896ba37ce800f",
            "67e096d40f7896ba37ce8010",
            "67e096d40f7896ba37ce8011",
            "67e096d40f7896ba37ce8012",
            "67e096d40f7896ba37ce8013",
            "67e096d40f7896ba37ce8014",
            "67e096d40f7896ba37ce8015",
            "67e096d40f7896ba37ce8016",
            "67e096d40f7896ba37ce8017",
            "67e096d40f7896ba37ce8018",
            "67e096d40f7896ba37ce8019",
            "67e096d40f7896ba37ce801a",
            "67e096d40f7896ba37ce801b",
            "67e096d40f7896ba37ce801c",
            "67e096d40f7896ba37ce801d",
            "67e096d40f7896ba37ce801e",
            "67e096d40f7896ba37ce801f",
            "67e096d40f7896ba37ce8020",
            "67e096d40f7896ba37ce8021",
            "67e096d40f7896ba37ce8022",
            "67e096d40f7896ba37ce8023",
            "67e096d40f7896ba37ce8024",
            "67e096d40f7896ba37ce8025",
            "67e096d40f7896ba37ce8026",
            "67e096d40f7896ba37ce8027",
            "67e096d40f7896ba37ce8028",
            "67e096d40f7896ba37ce8029",
            "67e096d40f7896ba37ce802a",
            "67e096d40f7896ba37ce802b",
            "67e096d40f7896ba37ce802c",
            "67e096d40f7896ba37ce802d",
            "67e096d40f7896ba37ce802e",
            "67e096d40f7896ba37ce802f",
            "67e096d40f7896ba37ce8030",
            "67e096d40f7896ba37ce8031",
            "67e096d40f7896ba37ce8032",
            "67e096d40f7896ba37ce8033",
            "67e096d40f7896ba37ce8034",
            "67e096d40f7896ba37ce8035",
            "67e096d40f7896ba37ce8036",
            "67e096d40f7896ba37ce8037",
            "67e096d40f7896ba37ce8038",
            "67e096d40f7896ba37ce8039",
            "67e096d40f7896ba37ce803a",
            "67e096d40f7896ba37ce803b",
            "67e096d40f7896ba37ce803c",
            "67e096d40f7896ba37ce803d",
            "67e096d40f7896ba37ce803e",
            "67e096d40f7896ba37ce803f",
            "67e096d40f7896ba37ce8040",
            "67e096d40f7896ba37ce8041",
            "67e096d40f7896ba37ce8042",
            "67e096d40f7896ba37ce8043",
            "67e096d40f7896ba37ce8044",
            "67e096d40f7896ba37ce8045",
            "67e096d40f7896ba37ce8046",
            "67e096d40f7896ba37ce8047",
            "67e096d40f7896ba37ce8048",
            "67e096d40f7896ba37ce8049",
            "67e096d40f7896ba37ce804a",
            "67e096d40f7896ba37ce804b",
            "67e096d40f7896ba37ce804c",
            "67e096d40f7896ba37ce804d",
            "67e096d40f7896ba37ce804e",
            "67e096d40f7896ba37ce804f",
            "67e096d40f7896ba37ce8050",
            "67e096d40f7896ba37ce8051",
            "67e096d40f7896ba37ce8052",
            "67e096d40f7896ba37ce8053",
            "67e096d40f7896ba37ce8054",
            "67e096d40f7896ba37ce8055",
            "67e096d40f7896ba37ce8056",
            "67e096d40f7896ba37ce8057",
            "67e096d40f7896ba37ce8058",
            "67e096d40f7896ba37ce8059",
            "67e096d40f7896ba37ce805a",
            "67e096d40f7896ba37ce805b",
            "67e096d40f7896ba37ce805c",
            "67e096d40f7896ba37ce805d",
            "67e096d40f7896ba37ce805e",
            "67e096d40f7896ba37ce805f",
            "67e096d40f7896ba37ce8060",
            "67e096d40f7896ba37ce8061",
            "67e096d40f7896ba37ce8062",
            "67e096d40f7896ba37ce8063",
            "67e096d40f7896ba37ce8064",
            "67e096d40f7896ba37ce8065",
            "67e096d40f7896ba37ce8066",
            "67e096d40f7896ba37ce8067",
            "67e096d40f7896ba37ce8068",
            "67e096d40f7896ba37ce8069",
            "67e096d40f7896ba37ce806a",
            "67e096d40f7896ba37ce806b",
            "67e096d40f7896ba37ce806c",
            "67e096d40f7896ba37ce806d",
            "67e096d40f7896ba37ce806e",
            "67e096d40f7896ba37ce806f",
            "67e096d40f7896ba37ce8070",
            "67e096d40f7896ba37ce8071",
            "67e096d40f7896ba37ce8072",
            "67e096d40f7896ba37ce8073",
            "67e096d40f7896ba37ce8074",
            "67e096d40f7896ba37ce8075",
            "67e096d40f7896ba37ce8076",
            "67e096d40f7896ba37ce8077",
            "67e096d40f7896ba37ce8078",
            "67e096d40f7896ba37ce8079",
            "67e096d40f7896ba37ce807a",
            "67e096d40f7896ba37ce807b",
            "67e096d40f7896ba37ce807c",
            "67d6ba80550965fff1faff26",
            "67d6bb79550965fff1faff2b",
            "67d6bbd7550965fff1faff30",
            "67d6bd4e550965fff1faff3b",
            "67d6bdcd550965fff1faff47",
            "67f38426af52a48935fb3b9e",
          ],
          inventory: [
            {
              book: "67f5768aa170d106aa5d659d",
              price: 199,
              quantity: 1,
              _id: "67f5768aa170d106aa5d65a0",
            },
          ],
          createdAt: "2025-04-08T14:41:13.200Z",
          __v: 2,
        },
        {
          _id: "67f53560d83d0be7fe501e93",
          storeName: "Viraj Books",
          address: "Indore",
          phoneNumber: "",
          email: "viraj.books@gmail.com",
          managerName: "",
          status: "Pending",
          website: "",
          storeHours: "",
          image:
            "https://res.cloudinary.com/dco22xvey/image/upload/v1744277419/mern_uploads/hhzktuybko4sir7daqqu.jpg",
          description: "",
          commissionRate: 10,
          paymentTerms: "Net 30",
          schools: [],
          inventory: [],
          createdAt: "2025-04-08T14:40:32.651Z",
          __v: 0,
        },
        {
          _id: "67f5353dd83d0be7fe501e59",
          storeName: "Indore Book Depo",
          address: "Indore",
          phoneNumber: "",
          email: "indore.books@gmail.com",
          managerName: "",
          status: "Pending",
          website: "",
          storeHours: "",
          image:
            "https://res.cloudinary.com/dco22xvey/image/upload/v1744277845/mern_uploads/mqxnqprafc2behvzrcjk.jpg",
          description: "",
          commissionRate: 10,
          paymentTerms: "Net 30",
          schools: [
            "67e096d40f7896ba37ce7fe8",
            "67e096d40f7896ba37ce7fe9",
            "67e096d40f7896ba37ce8004",
            "67e096d40f7896ba37ce7ff0",
          ],
          inventory: [],
          createdAt: "2025-04-08T14:39:57.938Z",
          __v: 0,
        },
        {
          _id: "67f5351ad83d0be7fe501e1f",
          storeName: "Jain Shree Stores",
          address: "Indore",
          phoneNumber: "",
          email: "jain.stores@gmail.com",
          managerName: "",
          status: "Pending",
          website: "",
          storeHours: "",
          image:
            "https://res.cloudinary.com/dco22xvey/image/upload/v1744277929/mern_uploads/uqsxqcsjvyahx2hdmsto.jpg",
          description: "",
          commissionRate: 10,
          paymentTerms: "Net 30",
          schools: [],
          inventory: [],
          createdAt: "2025-04-08T14:39:22.435Z",
          __v: 0,
        },
        {
          _id: "67f534f7d83d0be7fe501de5",
          storeName: "Triveni Stores ",
          address: "Indore",
          phoneNumber: "",
          email: "triveni@gmail.com",
          managerName: "",
          status: "Pending",
          website: "",
          storeHours: "",
          image:
            "https://res.cloudinary.com/dco22xvey/image/upload/v1744277769/mern_uploads/nxg1rm1y7ug5yfywxxpp.jpg",
          description: "",
          commissionRate: 10,
          paymentTerms: "Net 30",
          schools: ["67e096d40f7896ba37ce7ffc"],
          inventory: [],
          createdAt: "2025-04-08T14:38:47.120Z",
          __v: 0,
        },
      ]);
        
        return;
      }
      setStores(response.data);
    } catch (err) {
      setError("Failed to fetch stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://backend-lzb7.onrender.com/api/public/stores"
      );

      setStores(response.data); // setStores(response.data.slice(0, 5));
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch stores: ${err.message}`);
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
        {stores.map((store) => (
          <div
            key={store._id}
            className="border bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate(`/store/${store._id}`)}
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
        ))}
      </div>
      <div className="w-full mx-auto bgwhite shadowlg col-span-full">
        {!loading && (
          <>
            <p className="text-gray-600 text-center p-4 w-2/3 m-auto">
              Simply list your demands here and relax. No need to search through
              our entire catalog — our experts will find it for you and call
              back within 1 hour!
            </p>
            <DemandForm />
          </>
        )}
      </div>
    </div>
  );
};

export default StoresView;
