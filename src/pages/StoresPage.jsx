import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toonzkartLogo from "../assets/toonzkart_logo.png";
import { 
  Search, MapPin, Phone, Star, Filter, 
  Clock, BookOpen, ChevronRight, X
} from 'lucide-react';

const StoresPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCity, setActiveCity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock data for stores
  const stores = [
    {
      id: 1,
      name: "Bookworm Haven",
      city: "Delhi",
      address: "M-12, Khan Market, New Delhi",
      phone: "+91 9876543210",
      rating: 4.8,
      reviews: 156,
      specialties: ["Fiction", "Non-Fiction", "Children's Books"],
      hours: "10:00 AM - 8:00 PM",
      image: null, // Would be actual image path in real implementation
      features: ["Delivery", "Pickup", "Cafe"]
    },
    {
      id: 2,
      name: "Page Turner Books",
      city: "Mumbai",
      address: "Shop 7, Bandra West, Mumbai",
      phone: "+91 9876543211",
      rating: 4.7,
      reviews: 128,
      specialties: ["Academic", "Fiction", "Rare Books"],
      hours: "9:30 AM - 9:00 PM",
      image: null,
      features: ["Delivery", "Pickup"]
    },
    {
      id: 3,
      name: "Literary Treasures",
      city: "Bangalore",
      address: "42, MG Road, Bangalore",
      phone: "+91 9876543212",
      rating: 4.9,
      reviews: 203,
      specialties: ["Fiction", "Comics", "Poetry"],
      hours: "10:00 AM - 9:30 PM",
      image: null,
      features: ["Delivery", "Reading Room", "Events"]
    },
    {
      id: 4,
      name: "Knowledge Corner",
      city: "Delhi",
      address: "C-22, Connaught Place, New Delhi",
      phone: "+91 9876543213",
      rating: 4.6,
      reviews: 112,
      specialties: ["Academic", "Textbooks", "Study Materials"],
      hours: "9:00 AM - 7:00 PM",
      image: null,
      features: ["Delivery", "Student Discounts"]
    },
    {
      id: 5,
      name: "Reader's Paradise",
      city: "Chennai",
      address: "15, Anna Salai, Chennai",
      phone: "+91 9876543214",
      rating: 4.7,
      reviews: 145,
      specialties: ["Tamil Literature", "Fiction", "Non-Fiction"],
      hours: "10:00 AM - 8:30 PM",
      image: null,
      features: ["Delivery", "Languages", "Cafe"]
    },
    {
      id: 6,
      name: "Book Bazaar",
      city: "Kolkata",
      address: "7B, College Street, Kolkata",
      phone: "+91 9876543215",
      rating: 4.8,
      reviews: 187,
      specialties: ["Bengali Literature", "Fiction", "Academic"],
      hours: "10:30 AM - 8:00 PM",
      image: null,
      features: ["Delivery", "Rare Books"]
    },
    {
      id: 7,
      name: "Textbook Hub",
      city: "Pune",
      address: "Near Fergusson College, FC Road, Pune",
      phone: "+91 9876543216",
      rating: 4.5,
      reviews: 98,
      specialties: ["Textbooks", "Competitive Exams", "Reference"],
      hours: "9:00 AM - 9:00 PM",
      image: null,
      features: ["Delivery", "Student Discounts", "Buyback"]
    },
    {
      id: 8,
      name: "Classic Bookstore",
      city: "Hyderabad",
      address: "12-1-298/99, Banjara Hills, Hyderabad",
      phone: "+91 9876543217",
      rating: 4.6,
      reviews: 132,
      specialties: ["Fiction", "Non-Fiction", "Telugu Literature"],
      hours: "10:00 AM - 8:00 PM",
      image: null,
      features: ["Delivery", "Events"]
    }
  ];
  
  // Filter stores based on active filters and search query
  const filteredStores = stores.filter(store => {
    // Filter by city
    if (activeCity !== 'all' && store.city !== activeCity) {
      return false;
    }
    
    // Filter by specialty
    if (activeFilter !== 'all' && !store.specialties.includes(activeFilter)) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        store.name.toLowerCase().includes(query) ||
        store.city.toLowerCase().includes(query) ||
        store.address.toLowerCase().includes(query) ||
        store.specialties.some(specialty => specialty.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Get unique cities for filter
  const cities = ['all', ...new Set(stores.map(store => store.city))];
  
  // Get unique specialties for filter
  const specialties = ['all', ...new Set(stores.flatMap(store => store.specialties))];
  
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header logo={toonzkartLogo} />
      </div>

      {/* Search and Filter Section */}
      <section className="bg-white shadow-sm py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Find Bookstores</h1>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Search by store name, city, or specialty..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search 
                size={20} 
                className="absolute left-4 top-3.5 text-gray-500" 
              />
            </div>
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6 animate-fadeIn">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold">Filter Stores</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X size={20} className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={activeCity}
                    onChange={(e) => setActiveCity(e.target.value)}
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city === 'all' ? 'All Cities' : city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Specialty</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                  >
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>
                        {specialty === 'all' ? 'All Specialties' : specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              4000+ Bookstores
            </span>
            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              35+ Cities
            </span>
            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
              Fast Delivery
            </span>
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Results Summary */}
          <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold">
              {filteredStores.length} {filteredStores.length === 1 ? 'Bookstore' : 'Bookstores'} Found
              {activeCity !== 'all' && ` in ${activeCity}`}
              {activeFilter !== 'all' && ` specializing in ${activeFilter}`}
            </h2>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Sort by:
              </div>
              <select className="border rounded-md p-2">
                <option>Rating: High to Low</option>
                <option>Name: A to Z</option>
                <option>Most Popular</option>
              </select>
            </div>
          </div>
          
          {/* Store Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStores.map(store => (
              <Link to={`/store/${store.id}`} className="block" key={store.id}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full">
                  {/* Store Image */}
                  <div className="h-48 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <BookOpen size={48} />
                    </div>
                    {/* Featured Tags */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {store.features.includes('Delivery') && (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          Fast Delivery
                        </span>
                      )}
                      {store.features.includes('Cafe') && (
                        <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                          Cafe
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Store Details */}
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-xl">{store.name}</h3>
                      <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        <Star size={16} fill="currentColor" className="mr-1" />
                        <span className="font-medium">{store.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start mb-2">
                      <MapPin size={18} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-sm">{store.address}</p>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Clock size={18} className="text-gray-500 mr-2 flex-shrink-0" />
                      <p className="text-gray-600 text-sm">{store.hours}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-1">Specialties:</h4>
                      <div className="flex flex-wrap gap-2">
                        {store.specialties.map(specialty => (
                          <span 
                            key={specialty} 
                            className="text-sm bg-gray-100 px-2 py-1 rounded"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        <a 
                          href={`tel:${store.phone}`} 
                          className="text-blue-600 text-sm font-medium flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone size={16} className="mr-1" />
                          Call Store
                        </a>
                      </div>
                      <div>
                        <span className="text-blue-600 font-medium flex items-center hover:text-blue-800">
                          View Store
                          <ChevronRight size={18} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
                  setActiveCity('all');
                  setSearchQuery('');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredStores.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  &laquo;
                </button>
                <button className="w-10 h-10 rounded-md bg-blue-600 text-white flex items-center justify-center">
                  1
                </button>
                <button className="w-10 h-10 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  2
                </button>
                <button className="w-10 h-10 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  3
                </button>
                <button className="w-10 h-10 rounded-md border flex items-center justify-center text-gray-600 hover:bg-gray-100">
                  &raquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Join as Partner CTA */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Own a Bookstore?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 4,000+ bookstores across India that are growing their business with ToonzKart. Get access to new customers, powerful inventory management tools, and a supportive community.
          </p>
          <Link 
            to="/partner-with-us" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Become a Partner
          </Link>
        </div>
      </section>
      


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StoresPage;