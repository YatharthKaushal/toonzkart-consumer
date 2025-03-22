import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShopByStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch real data from API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('https://backend-lzb7.onrender.com/api/public/stores');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const filteredStores = stores.filter(store => 
    store.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">Find Books at Partner Stores</h1>
      <p className="text-gray-600 mb-6 text-center">Browse our network of partner bookstores to find exactly what you need</p>
      
      {/* Search */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search stores..."
            className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Stores List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div 
              key={store._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative">
                <img 
                  src={store.image || 'https://via.placeholder.com/400x200?text=No+Image'} 
                  alt={store.storeName} 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                  }}
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{store.storeName}</h2>
                </div>
                
                <div className="flex items-center text-gray-500 mb-2">
                  <span className="mr-2">📍</span>
                  <span className="text-sm">{store.address}</span>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-700">
                    {store.inventory && store.inventory.length > 0 
                      ? `${store.inventory.length} book${store.inventory.length !== 1 ? 's' : ''} available` 
                      : 'No books listed yet'}
                  </span>
                </div>
                
                <Link
                  to={`/store/${store._id}`}
                  className="w-full py-2 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  View Store
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* No Results */}
      {!loading && filteredStores.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No stores found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
          <button 
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setSearchTerm('')}
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopByStores;