import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, ShoppingBag, CreditCard, MapPin, BookOpen, Heart, 
  Calendar, Mail, Phone, Edit, Camera, LogOut, Save, X, ChevronRight, Clock
} from 'lucide-react';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // User details state
  const [userDetails, setUserDetails] = useState({
    name: localStorage.getItem('userName') || 'John Doe',
    email: localStorage.getItem('userEmail') || 'john.doe@example.com',
    phone: '+91 98765 43210',
    dob: '1990-05-15',
    gender: 'Male',
    occupation: 'Software Engineer',
    joinedOn: 'January 2023'
  });
  
  const [formData, setFormData] = useState({...userDetails});
  
  // Sample orders data
  const orders = [
    {
      id: 'ORD-12345',
      date: 'March 10, 2025',
      items: [
        { id: 1, title: 'Mathematics Grade 6', price: 175, quantity: 2 },
        { id: 7, title: 'Physics Grade 12', price: 425, quantity: 1 }
      ],
      status: 'Delivered',
      total: 775
    },
    {
      id: 'ORD-12344',
      date: 'February 28, 2025',
      items: [
        { id: 13, title: 'The Midnight Library', price: 350, quantity: 1 },
        { id: 18, title: 'Sapiens: A Brief History of Humankind', price: 499, quantity: 1 }
      ],
      status: 'Delivered',
      total: 849
    },
    {
      id: 'ORD-12343',
      date: 'February 15, 2025',
      items: [
        { id: 14, title: 'A Court of Thorns and Roses', price: 420, quantity: 1 }
      ],
      status: 'Delivered',
      total: 420
    }
  ];
  
  // Sample addresses
  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      locality: 'Green Park',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      address: 'TechPark Building, 4th Floor',
      locality: 'Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      phone: '+91 98765 43210',
      isDefault: false
    }
  ];
  
  // Sample wishlist
  const wishlist = [
    { id: 15, title: 'The Silent Patient', author: 'Alex Michaelides', price: 380, publisher: 'Celadon Books', category: 'Fiction' },
    { id: 17, title: 'Atomic Habits', author: 'James Clear', price: 340, publisher: 'Penguin Random House', category: 'Non-Fiction' },
    { id: 20, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', price: 399, publisher: 'Bloomsbury', category: 'Children\'s Books' }
  ];
  
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUserDetails({...formData});
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userEmail', formData.email);
    } else {
      // Start editing
      setFormData({...userDetails});
    }
    setIsEditing(!isEditing);
  };
  
  const handleCancelEdit = () => {
    setFormData({...userDetails});
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };
  
  // Render functions for each tab
  const renderProfileTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        {isEditing ? (
          <div className="flex space-x-2">
            <button 
              onClick={handleCancelEdit}
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <X size={18} className="mr-1" />
              Cancel
            </button>
            <button 
              onClick={handleEditToggle}
              className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
              <Save size={18} className="mr-1" />
              Save Changes
            </button>
          </div>
        ) : (
          <button 
            onClick={handleEditToggle}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} className="mr-1" />
            Edit Profile
          </button>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <User size={64} className="text-gray-400" />
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <Camera size={16} />
              </button>
            )}
          </div>
          <h3 className="text-xl font-bold">{userDetails.name}</h3>
          <p className="text-gray-500">{userDetails.email}</p>
          <p className="text-sm text-gray-400">Member since {userDetails.joinedOn}</p>
          
          <button 
            onClick={handleLogout}
            className="mt-6 flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
        
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="font-medium">{userDetails.name}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="font-medium">{userDetails.email}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="font-medium">{userDetails.phone}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="font-medium">{new Date(userDetails.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">Gender</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <p className="font-medium">{userDetails.gender}</p>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm text-gray-500">Occupation</label>
              {isEditing ? (
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="font-medium">{userDetails.occupation}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderOrdersTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-4">Looks like you haven't placed any orders yet.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="font-semibold">{order.id}</h3>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </div>
                  
                  <div className="mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        {item.quantity} × {item.title}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className={`px-2 py-1 rounded-full text-xs 
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-gray-100 text-gray-700'}`}
                  >
                    {order.status}
                  </span>
                  <span className="font-bold mt-2">₹{order.total}</span>
                </div>
              </div>
              
              <div className="flex justify-between border-t pt-3">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Order Details
                </button>
                {order.status === 'Delivered' && (
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Download Invoice
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  const renderAddressesTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm">
          + Add New Address
        </button>
      </div>
      
      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
          <p className="text-gray-500 mb-4">Add a new address for faster checkout.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(address => (
            <div key={address.id} className={`border rounded-lg p-4 relative ${address.isDefault ? 'border-blue-500 bg-blue-50' : ''}`}>
              {address.isDefault && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Default
                </span>
              )}
              
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{address.type}</span>
                {!address.isDefault && (
                  <button className="text-xs text-blue-600 hover:text-blue-800">
                    Set as Default
                  </button>
                )}
              </div>
              
              <div className="mb-3">
                <div className="font-medium">{address.name}</div>
                <div>{address.address}</div>
                <div>{address.locality}, {address.city}</div>
                <div>{address.state} - {address.pincode}</div>
                <div className="mt-1">Phone: {address.phone}</div>
              </div>
              
              <div className="flex space-x-2 mt-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  const renderWishlistTab = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-8">
          <Heart size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-4">Save your favorite books for later.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Explore Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map(item => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow relative">
              <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                <Heart size={18} fill="currentColor" />
              </button>
              
              <div className="flex mb-3">
                <div className="w-20 h-24 bg-gray-100 flex items-center justify-center rounded overflow-hidden mr-3">
                  <div className="text-gray-400 text-center text-xs p-2">Book Cover</div>
                </div>
                
                <div>
                  <h3 className="font-medium line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.author}</p>
                  <p className="text-xs text-gray-400">{item.publisher}</p>
                  <p className="font-bold mt-1">₹{item.price}</p>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  // Main component render
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header logo={toonzkartLogo} />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <nav>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full py-3 px-4 text-left flex items-center justify-between border-b ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  <span className="flex items-center">
                    <User size={18} className="mr-2" />
                    Profile
                  </span>
                  <ChevronRight size={16} className={activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'} />
                </button>
                
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full py-3 px-4 text-left flex items-center justify-between border-b ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  <span className="flex items-center">
                    <ShoppingBag size={18} className="mr-2" />
                    Orders
                  </span>
                  <ChevronRight size={16} className={activeTab === 'orders' ? 'text-blue-600' : 'text-gray-400'} />
                </button>
                
                <button 
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full py-3 px-4 text-left flex items-center justify-between border-b ${activeTab === 'addresses' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  <span className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    Addresses
                  </span>
                  <ChevronRight size={16} className={activeTab === 'addresses' ? 'text-blue-600' : 'text-gray-400'} />
                </button>
                
                <button 
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full py-3 px-4 text-left flex items-center justify-between ${activeTab === 'wishlist' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                >
                  <span className="flex items-center">
                    <Heart size={18} className="mr-2" />
                    Wishlist
                  </span>
                  <ChevronRight size={16} className={activeTab === 'wishlist' ? 'text-blue-600' : 'text-gray-400'} />
                </button>
              </nav>
              
              <div className="p-4 bg-gray-50 border-t">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center text-red-600 hover:text-red-800 py-2"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
            
            {/* Account Summary Card */}
            <div className="bg-white rounded-lg shadow-sm p-4 mt-4 hidden md:block">
              <h3 className="font-semibold text-gray-700 mb-3">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar size={16} className="mr-2 text-gray-400" />
                  <span>Joined {userDetails.joinedOn}</span>
                </div>
                <div className="flex items-center text-sm">
                  <ShoppingBag size={16} className="mr-2 text-gray-400" />
                  <span>{orders.length} orders placed</span>
                </div>
                <div className="flex items-center text-sm">
                  <BookOpen size={16} className="mr-2 text-gray-400" />
                  <span>5 books purchased</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  <span>Last login: Today, 10:30 AM</span>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Main Content Area */}
          <div className="md:w-3/4">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'orders' && renderOrdersTab()}
            {activeTab === 'addresses' && renderAddressesTab()}
            {activeTab === 'wishlist' && renderWishlistTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;