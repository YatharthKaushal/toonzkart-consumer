import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Phone, Star, Filter, 
  Clock, BookOpen, ChevronRight, X, Store
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StoresPage = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatus, setActiveStatus] = useState('all');
  // const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://backend-lzb7.onrender.com/api/public/stores');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setStores(data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch stores: ${err.message}`);
        setLoading(false);
      }
    };
    
    fetchStores();
  }, []);
  
  // Filter stores based on active filters and search query
  const filteredStores = stores.filter(store => {
    // Filter by status
    if (activeStatus !== 'all' && store.status !== activeStatus) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        store.storeName.toLowerCase().includes(query) ||
        (store.address && store.address.toLowerCase().includes(query)) ||
        (store.managerName && store.managerName.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Get unique statuses for filter
  const statuses = ['all', ...new Set(stores.map(store => store.status).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header />
      </div>
      
      {/* Search and Filter Section */}
      <section className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-3">Find Bookstores</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search by store name, address, or manager..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search 
                size={20} 
                className="absolute left-4 top-3.5 text-gray-500" 
              />
            </div>
            {/* <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button> */}
          </div>
          
          {/* Filters */}
          {/* {showFilters && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold">Filter Stores</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={activeStatus}
                  onChange={(e) => setActiveStatus(e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status === 'all' ? 'All Statuses' : status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )} */}
          
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {stores.length} Bookstores
            </span>
            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              {stores.filter(store => store.status === "Active").length} Active Stores
            </span>
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Results Summary */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold">
              {filteredStores.length} {filteredStores.length === 1 ? 'Bookstore' : 'Bookstores'} Found
              {activeStatus !== 'all' && ` with ${activeStatus} status`}
            </h2>
          </div>
          
          {/* Store Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map(store => (
              <div 
                key={store._id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 h-full cursor-pointer transform hover:-translate-y-1"
                onClick={() => navigate(`/store/${store._id}`)}>
                {/* Store Image */}
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Store size={48} />
                  </div>
                  {/* Status Tag */}
                  <div className="absolute top-3 right-3 flex flex-wrap gap-2">
                    <span className={`text-white text-xs px-2 py-1 rounded-full ${
                      store.status === 'Active' ? 'bg-green-600' : 
                      store.status === 'Inactive' ? 'bg-red-600' : 
                      'bg-yellow-600'
                    }`}>
                      {store.status}
                    </span>
                  </div>
                </div>
                
                {/* Store Details */}
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-3">{store.storeName}</h3>
                  
                  {store.address && (
                    <div className="flex items-start mb-3">
                      <MapPin size={18} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm">{store.address}</p>
                    </div>
                  )}
                  
                  {store.storeHours && (
                    <div className="flex items-center mb-3">
                      <Clock size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">{store.storeHours}</p>
                    </div>
                  )}
                  
                  {store.description && (
                    <div className="mb-4">
                      <p className="text-gray-600 text-sm line-clamp-2">{store.description}</p>
                    </div>
                  )}
                  
                  {store.inventory && store.inventory.length > 0 && (
                    <div className="mt-3">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                        {store.inventory.length} {store.inventory.length === 1 ? 'Book' : 'Books'} in Stock
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredStores.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold mb-2">No bookstores found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button 
                onClick={() => {
                  setActiveFilter('all');
                  setActiveStatus('all');
                  setSearchQuery('');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Join as Partner CTA */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Own a Bookstore?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our growing network of bookstores across India. Get access to new customers, powerful inventory management tools, and a supportive community.
          </p>
          <button 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Become a Partner
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StoresPage;