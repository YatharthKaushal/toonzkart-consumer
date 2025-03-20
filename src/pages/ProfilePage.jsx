import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  User, ShoppingBag, CreditCard, MapPin, BookOpen, Heart, 
  Calendar, Mail, Phone, Edit, Camera, LogOut, Save, X, ChevronRight, Clock
} from 'lucide-react';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const API_BASE_URL = "https://backend-lzb7.onrender.com";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [orders, setOrders] = useState([]);
  
  // User details state
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    createdAt: '',
    addresses: [],
    orderHistory: [],
    wishlist: []
  });
  
  const [formData, setFormData] = useState({...userDetails});
  
  // Address management state
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressFormData, setAddressFormData] = useState({
    label: '',
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  
  // Fetch user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError('');
      
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUserDetails(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load profile. Please try again.');
        
        // If unauthorized, redirect to login
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('token');
          localStorage.removeItem('isLoggedIn');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate]);
  
  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');
    
    if (!isLoggedIn || !token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab === 'orders') {
        setOrdersLoading(true);
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('No authentication token found');
          
          const response = await axios.get(`${API_BASE_URL}/api/orders`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setOrders(response.data);
        } catch (err) {
          console.error('Error fetching orders:', err);
          setOrdersError('Failed to load orders. Please try again.');
          
          if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
          }
        } finally {
          setOrdersLoading(false);
        }
      }
    };
    
    fetchOrders();
  }, [activeTab, navigate]);

  const calculateTotalItems = (books) => {
    if (!books || !Array.isArray(books)) return 0;
    return books.reduce((total, item) => total + (item.quantity || 1), 0);
  };
  
  const getUniqueOrders = (orders) => {
    if (!orders || !Array.isArray(orders)) return [];
    
    const uniqueOrdersMap = new Map();
    [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .forEach(order => {
        if (!uniqueOrdersMap.has(order.orderId)) {
          uniqueOrdersMap.set(order.orderId, order);
        }
      });
    return Array.from(uniqueOrdersMap.values());
  };
  
  // Handle profile form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle profile edit toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes to API
      updateUserProfile();
    } else {
      // Start editing
      setFormData({...userDetails});
    }
    setIsEditing(!isEditing);
  };
  
  // Update user profile
  const updateUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      // Only send fields that are editable
      const updatedData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || ''
      };
      
      await axios.put(`${API_BASE_URL}/api/users/profile`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Update local state with new data
      setUserDetails({
        ...userDetails,
        ...updatedData
      });
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setFormData({...userDetails});
    setIsEditing(false);
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };
  
  // Reset address form
  const resetAddressForm = () => {
    setAddressFormData({
      label: '',
      fullName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      isDefault: false
    });
    setEditingAddress(null);
    setShowAddressForm(false);
  };
  
  // Handle address form input change
  const handleAddressInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle address form submission
  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setAddressLoading(true);
    setAddressError('');
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      let response;
      
      if (editingAddress) {
        // Update existing address
        response = await axios.put(
          `${API_BASE_URL}/api/users/addresses/${editingAddress._id}`,
          addressFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        // Add new address
        response = await axios.post(
          `${API_BASE_URL}/api/users/addresses`,
          addressFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }
      
      // Refresh user data to get updated addresses
      const userResponse = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUserDetails(userResponse.data);
      resetAddressForm();
      
    } catch (err) {
      console.error('Error saving address:', err);
      setAddressError('Failed to save address. Please try again.');
    } finally {
      setAddressLoading(false);
    }
  };
  
  // Edit address
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressFormData({
      label: address.label || '',
      fullName: address.fullName || '',
      addressLine1: address.addressLine1 || '',
      addressLine2: address.addressLine2 || '',
      city: address.city || '',
      state: address.state || '',
      zipCode: address.zipCode || '',
      country: address.country || '',
      phone: address.phone || '',
      isDefault: address.isDefault || false
    });
    setShowAddressForm(true);
  };
  
  // Delete address
  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }
    
    setAddressLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      await axios.delete(`${API_BASE_URL}/api/users/addresses/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Refresh user data to get updated addresses
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUserDetails(response.data);
      
    } catch (err) {
      console.error('Error deleting address:', err);
      setAddressError('Failed to delete address. Please try again.');
    } finally {
      setAddressLoading(false);
    }
  };
  
  // Set address as default
  const handleSetDefaultAddress = async (addressId) => {
    setAddressLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      await axios.put(
        `${API_BASE_URL}/api/users/addresses/${addressId}`,
        { isDefault: true },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Refresh user data to get updated addresses
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUserDetails(response.data);
      
    } catch (err) {
      console.error('Error setting default address:', err);
      setAddressError('Failed to set default address. Please try again.');
    } finally {
      setAddressLoading(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Get member since date
  const getMemberSince = () => {
    if (!userDetails.createdAt) return '';
    const date = new Date(userDetails.createdAt);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  };
  
  // Address form component
  const AddressForm = () => (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">
          {editingAddress ? 'Edit Address' : 'Add New Address'}
        </h3>
        <button 
          onClick={resetAddressForm}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      </div>
      
      {addressError && (
        <div className="mb-4 text-red-500 text-sm p-2 bg-red-50 rounded">
          {addressError}
        </div>
      )}
      
      <form onSubmit={handleAddressSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Address Label</label>
            <select
              name="label"
              value={addressFormData.label}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a label</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={addressFormData.fullName}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Address Line 1</label>
            <input
              type="text"
              name="addressLine1"
              value={addressFormData.addressLine1}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Address Line 2 (Optional)</label>
            <input
              type="text"
              name="addressLine2"
              value={addressFormData.addressLine2}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={addressFormData.city}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={addressFormData.state}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={addressFormData.zipCode}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={addressFormData.country}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={addressFormData.phone}
              onChange={handleAddressInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={addressFormData.isDefault}
              onChange={handleAddressInputChange}
              className="mr-2"
            />
            <span className="text-sm">Set as default address</span>
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetAddressForm}
            className="mr-2 px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            disabled={addressLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={addressLoading}
          >
            {addressLoading ? (
              <div className="flex items-center">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Saving...
              </div>
            ) : (
              editingAddress ? 'Update Address' : 'Save Address'
            )}
          </button>
        </div>
      </form>
    </div>
  );
  
  // Render functions for each tab
  const renderProfileTab = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-red-500 text-center">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    
    return (
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
            <p className="text-sm text-gray-400">Member since {getMemberSince()}</p>
            
            {userDetails.status && (
              <div className="mt-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  userDetails.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {userDetails.status}
                </span>
              </div>
            )}
            
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
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="font-medium">{userDetails.phone || 'Not provided'}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm text-gray-500">Role</label>
                <p className="font-medium capitalize">{userDetails.role || 'User'}</p>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm text-gray-500">Account Created</label>
                <p className="font-medium">{formatDate(userDetails.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderOrdersTab = () => {
    if (ordersLoading || loading) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    if (ordersError) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-red-500 text-center">
            <p>{ordersError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    
    return (
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
            {getUniqueOrders(orders).map(order => (
              <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="font-semibold">{order.orderId}</h3>
                      <span className="mx-2 text-gray-400">|</span>
                      <span className="text-sm text-gray-500">{formatDate(order.orderDate)}</span>
                    </div>
                    
                    <div className="mb-3">
                      {order.books && order.books.map((item, index) => (
                        <div key={index} className="text-sm">
                          {item.quantity} × {item.book && item.book.title}
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <span className="flex items-center">
                        <CreditCard size={14} className="mr-1" /> 
                        {order.paymentMethod}
                      </span>
                      <span className="flex items-center mt-1">
                        <MapPin size={14} className="mr-1" /> 
                        Shipping to: {order.shippingAddress ? order.shippingAddress.split(',')[0] : 'Address not specified'}
                      </span>
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
                    <span className="font-bold mt-2">₹{order.totalAmount}</span>
                    <span className="text-xs text-gray-500 mt-1">
                      {calculateTotalItems(order.books)} items
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between border-t pt-3">
                  <button 
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
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
  };
  
  const renderAddressesTab = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    const addresses = userDetails.addresses || [];
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Saved Addresses</h2>
          {!showAddressForm && (
            <button 
              onClick={() => setShowAddressForm(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
            >
              + Add New Address
            </button>
          )}
        </div>
        
        {addressLoading && !showAddressForm && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {addressError && !showAddressForm && (
          <div className="mb-4 text-red-500 text-sm p-2 bg-red-50 rounded">
            {addressError}
          </div>
        )}
        
        {/* Address Form */}
        {showAddressForm && <AddressForm />}
        
        {/* Addresses List */}
        {addresses.length === 0 && !showAddressForm ? (
          <div className="text-center py-8">
            <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No addresses saved</h3>
            <p className="text-gray-500 mb-4">Add a new address for faster checkout.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address._id} className={`border rounded-lg p-4 relative ${address.isDefault ? 'border-blue-500 bg-blue-50' : ''}`}>
                {address.isDefault && (
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
                
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">{address.label}</span>
                  {!address.isDefault && (
                    <button 
                      onClick={() => handleSetDefaultAddress(address._id)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="font-medium">{address.fullName}</div>
                  <div>{address.addressLine1}</div>
                  {address.addressLine2 && <div>{address.addressLine2}</div>}
                  <div>{address.city}, {address.state}</div>
                  <div>{address.zipCode}{address.country ? `, ${address.country}` : ''}</div>
                  <div className="mt-1">Phone: {address.phone}</div>
                </div>
                
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => handleEditAddress(address)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteAddress(address._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  const renderWishlistTab = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    const wishlist = userDetails.wishlist || [];
    
    return (
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
              <div key={item._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow relative">
                <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <Heart size={18} fill="currentColor" />
                </button>
                
                <div className="flex mb-3">
                  <div className="w-20 h-24 bg-gray-100 flex items-center justify-center rounded overflow-hidden mr-3">
                    {item.image ? (
                      <img 
                        src={`${API_BASE_URL}${item.image}`} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150x200?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-center text-xs p-2">Book Cover</div>
                    )}
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
  };
  
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
                  <span>Joined {getMemberSince()}</span>
                </div>
                <div className="flex items-center text-sm">
                  <ShoppingBag size={16} className="mr-2 text-gray-400" />
                  <span>{getUniqueOrders(orders).length || 0} orders placed</span>
                </div>
                <div className="flex items-center text-sm">
                  <Heart size={16} className="mr-2 text-gray-400" />
                  <span>{userDetails.wishlist?.length || 0} items in wishlist</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin size={16} className="mr-2 text-gray-400" />
                  <span>{userDetails.addresses?.length || 0} saved addresses</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock size={16} className="mr-2 text-gray-400" />
                  <span>Last order: {orders.length > 0 ? formatDate(orders[0].orderDate) : 'Never'}</span>
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