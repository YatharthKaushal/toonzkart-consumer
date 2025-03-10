import React, { useState } from 'react';
import { Search, MapPin, Info, Phone, Navigation, Share, Star, Clock, FileText, Menu as MenuIcon, Image, Book, ShoppingCart, ChevronDown, Filter } from 'lucide-react';

const StoreDetails = () => {
  const [activeTab, setActiveTab] = useState('Browse Books');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('School Books');
  const [activeSubject, setActiveSubject] = useState(null);
  const [showSchools, setShowSchools] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  // Sample book data 
  const bookData = {
    "School Books": [
      { id: 1, title: "Mathematics Grade 6", author: "NCERT Publication", price: 175, image: "/api/placeholder/180/240", publisher: "NCERT", category: "School Books", schools: ["Delhi Public School", "St. Mary's School"] },
      { id: 2, title: "Science Grade 8", author: "NCERT Publication", price: 195, image: "/api/placeholder/180/240", publisher: "NCERT", category: "School Books", schools: ["Delhi Public School", "Ryan International"] },
      { id: 3, title: "English Literature Grade 7", author: "Oxford Publications", price: 225, image: "/api/placeholder/180/240", publisher: "Oxford", category: "School Books", schools: ["St. Mary's School", "Modern School"] },
      { id: 4, title: "Social Studies Grade 9", author: "NCERT Publication", price: 210, image: "/api/placeholder/180/240", publisher: "NCERT", category: "School Books", schools: ["Delhi Public School", "DAV Public School"] },
      { id: 5, title: "Hindi Vyakaran Grade 6", author: "Bharti Bhawan", price: 150, image: "/api/placeholder/180/240", publisher: "Bharti Publications", category: "School Books", schools: ["DAV Public School", "Kendriya Vidyalaya"] },
      { id: 6, title: "Computer Science Grade 10", author: "Sumita Arora", price: 350, image: "/api/placeholder/180/240", publisher: "Dhanpat Rai", category: "School Books", schools: ["Delhi Public School", "Ryan International"] },
      { id: 7, title: "Physics Grade 12", author: "HC Verma", price: 425, image: "/api/placeholder/180/240", publisher: "Bharti Bhawan", category: "School Books", schools: ["Delhi Public School", "Modern School"] },
      { id: 8, title: "Chemistry Grade 11", author: "NCERT Publication", price: 300, image: "/api/placeholder/180/240", publisher: "NCERT", category: "School Books", schools: ["St. Mary's School", "DAV Public School"] }
    ],
    "College Textbooks": [
      { id: 9, title: "Fundamentals of Database Systems", author: "Elmasri & Navathe", price: 750, image: "/api/placeholder/180/240", publisher: "Pearson", category: "College Textbooks" },
      { id: 10, title: "Engineering Physics", author: "B.K. Pandey", price: 560, image: "/api/placeholder/180/240", publisher: "Cengage Learning", category: "College Textbooks" },
      { id: 11, title: "Financial Accounting", author: "T.S. Grewal", price: 480, image: "/api/placeholder/180/240", publisher: "Sultan Chand & Sons", category: "College Textbooks" },
      { id: 12, title: "Principles of Economics", author: "N. Gregory Mankiw", price: 890, image: "/api/placeholder/180/240", publisher: "Cengage Learning", category: "College Textbooks" }
    ],
    "Fiction": [
      { id: 13, title: "The Midnight Library", author: "Matt Haig", price: 350, image: "/api/placeholder/180/240", publisher: "Penguin Random House", category: "Fiction" },
      { id: 14, title: "A Court of Thorns and Roses", author: "Sarah J. Maas", price: 420, image: "/api/placeholder/180/240", publisher: "Bloomsbury", category: "Fiction" },
      { id: 15, title: "The Silent Patient", author: "Alex Michaelides", price: 380, image: "/api/placeholder/180/240", publisher: "Celadon Books", category: "Fiction" },
      { id: 16, title: "The Invisible Life of Addie LaRue", author: "V.E. Schwab", price: 450, image: "/api/placeholder/180/240", publisher: "Tor Books", category: "Fiction" }
    ],
    "Non-Fiction": [
      { id: 17, title: "Atomic Habits", author: "James Clear", price: 340, image: "/api/placeholder/180/240", publisher: "Penguin Random House", category: "Non-Fiction" },
      { id: 18, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", price: 499, image: "/api/placeholder/180/240", publisher: "Harper", category: "Non-Fiction" },
      { id: 19, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 550, image: "/api/placeholder/180/240", publisher: "Farrar, Straus and Giroux", category: "Non-Fiction" }
    ],
    "Children's Books": [
      { id: 20, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: 399, image: "/api/placeholder/180/240", publisher: "Bloomsbury", category: "Children's Books" },
      { id: 21, title: "The Very Hungry Caterpillar", author: "Eric Carle", price: 250, image: "/api/placeholder/180/240", publisher: "Penguin Random House", category: "Children's Books" },
      { id: 22, title: "Percy Jackson & The Lightning Thief", author: "Rick Riordan", price: 350, image: "/api/placeholder/180/240", publisher: "Disney-Hyperion", category: "Children's Books" }
    ]
  };

  const tabs = ['Overview', 'Browse Books', 'Reviews', 'Photos', 'Special Offers', 'Book an Appointment'];
  
  const bookCategories = [
    { name: 'School Books', count: 8, active: activeCategory === 'School Books' },
    { name: 'College Textbooks', count: 4, active: activeCategory === 'College Textbooks' },
    { name: 'Fiction', count: 4, active: activeCategory === 'Fiction' },
    { name: 'Non-Fiction', count: 3, active: activeCategory === 'Non-Fiction' },
    { name: 'Children\'s Books', count: 3, active: activeCategory === 'Children\'s Books' },
    { name: 'Stationery', count: 0, active: activeCategory === 'Stationery' },
    { name: 'Exam Preparation', count: 0, active: activeCategory === 'Exam Preparation' },
  ];

  const subjects = [
    { name: 'Mathematics', count: 2, active: activeSubject === 'Mathematics' },
    { name: 'Science', count: 3, active: activeSubject === 'Science' },
    { name: 'Literature', count: 2, active: activeSubject === 'Literature' },
    { name: 'Computer Science', count: 1, active: activeSubject === 'Computer Science' },
    { name: 'History', count: 1, active: activeSubject === 'History' },
  ];

  const schools = [
    { name: 'Delhi Public School', count: 5 },
    { name: 'St. Mary\'s School', count: 3 },
    { name: 'Ryan International', count: 2 },
    { name: 'Modern School', count: 2 },
    { name: 'DAV Public School', count: 3 },
    { name: 'Kendriya Vidyalaya', count: 1 },
  ];

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === 'School Books') {
      setShowSchools(true);
    } else {
      setShowSchools(false);
    }
  };

  const handleSubjectClick = (subject) => {
    setActiveSubject(subject === activeSubject ? null : subject);
  };

  const addToCart = (book) => {
    setCartItems([...cartItems, book]);
    alert(`Added "${book.title}" to cart!`);
  };

  const displayedBooks = bookData[activeCategory] || [];

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold text-blue-800">ToonzKart</div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md p-2 bg-white shadow-sm">
            <MapPin size={20} className="text-blue-600 mr-2" />
            <span className="text-gray-700 mr-1">MG Road, Central District</span>
            <span className="text-gray-500">▼</span>
          </div>
          
          <div className="flex items-center border rounded-md p-2 bg-white shadow-sm flex-1 min-w-64">
            <Search size={20} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search for books, authors, or genres"
              className="outline-none w-full text-gray-700"
            />
          </div>
          
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-blue-600">Log in</button>
            <button className="text-gray-700 hover:text-blue-600">Sign up</button>
          </div>

          <div className="relative">
            <button className="p-2 bg-blue-600 rounded-full text-white relative">
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="flex text-sm text-gray-500 mb-4">
        <span className="hover:text-blue-600 cursor-pointer">Home</span>
        <span className="mx-1">/</span>
        <span className="hover:text-blue-600 cursor-pointer">Bookstores</span>
        <span className="mx-1">/</span>
        <span className="hover:text-blue-600 cursor-pointer">Central District</span>
        <span className="mx-1">/</span>
        <span className="hover:text-blue-600 cursor-pointer">Wisdom Books</span>
        <span className="mx-1">/</span>
        <span className="hover:text-blue-600 cursor-pointer">Browse Books</span>
      </div>

      {/* Bookstore Info */}
      <div className="mb-4 relative">
        <h1 className="text-3xl font-bold mb-1">Wisdom Books</h1>
        <p className="text-gray-600 mb-1">School Books, College Textbooks, Fiction, Stationery</p>
        <p className="text-gray-500 mb-3">MG Road, Central District</p>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Clock size={16} className="text-gray-400 mr-1" />
            <span className="text-gray-500 mr-1">Open now -</span>
            <span className="text-gray-700">9am – 8:30pm (Today)</span>
            <Info size={16} className="text-gray-400 ml-1" />
          </div>
          <span className="mx-3 text-gray-300">|</span>
          <div className="flex items-center">
            <Phone size={16} className="text-gray-400 mr-1" />
            <span className="text-blue-600 hover:underline cursor-pointer">+919876543210</span>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-6">
          <button className="flex items-center px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors">
            <Navigation size={16} className="mr-1 text-blue-600" />
            <span>Direction</span>
          </button>
          <button className="flex items-center px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors">
            <Share size={16} className="mr-1 text-blue-600" />
            <span>Share</span>
          </button>
          <button className="flex items-center px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors">
            <FileText size={16} className="mr-1 text-blue-600" />
            <span>Reviews</span>
          </button>
          <button className="flex items-center px-4 py-2 border rounded-md hover:bg-blue-50 transition-colors">
            <Book size={16} className="mr-1 text-blue-600" />
            <span>Book an Appointment</span>
          </button>
        </div>

        {/* Ratings Section - Fixed alignment */}
        <div className="absolute top-0 right-0 flex space-x-4">
          <div className="bg-blue-600 text-white p-2 rounded flex items-center">
            <span className="font-bold mr-1">4.2</span>
            <Star size={16} fill="white" />
            <div className="ml-2 text-xs">
              <div>235</div>
              <div>Store Ratings</div>
            </div>
          </div>
          <div className="bg-green-600 text-white p-2 rounded flex items-center">
            <span className="font-bold mr-1">4.5</span>
            <Star size={16} fill="white" />
            <div className="ml-2 text-xs">
              <div>1.2K</div>
              <div>Delivery Ratings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bookstore Gallery */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="col-span-2 row-span-2 relative">
          <img src="/api/placeholder/500/400" alt="Bookstore Interior" className="h-full w-full object-cover rounded-md" />
        </div>
        <div className="col-span-1 relative">
          <img src="/api/placeholder/250/200" alt="Books Display" className="h-full w-full object-cover rounded-md" />
        </div>
        <div className="col-span-1 relative">
          <img src="/api/placeholder/250/200" alt="Reading Area" className="h-full w-full object-cover rounded-md" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-md cursor-pointer hover:bg-opacity-60">
            <div className="text-center">
              <Image size={24} className="mx-auto mb-1" />
              <span>View Gallery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-4">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 hover:text-blue-600 transition-colors ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Browse Books Section */}
      <div className="flex">
        {/* Book Categories */}
        <div className="w-64 mr-6">
          <h3 className="font-semibold text-gray-800 mb-2 px-3">Categories</h3>
          <ul className="mb-6">
            {bookCategories.map(category => (
              <li 
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${category.active ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
              >
                {category.name} ({category.count})
              </li>
            ))}
          </ul>

          <h3 className="font-semibold text-gray-800 mb-2 px-3">Subjects</h3>
          <ul className="mb-6">
            {subjects.map(subject => (
              <li 
                key={subject.name}
                onClick={() => handleSubjectClick(subject.name)}
                className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors ${subject.active ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-600' : 'text-gray-700'}`}
              >
                {subject.name} ({subject.count})
              </li>
            ))}
          </ul>

          {/* School list for School Books category */}
          {showSchools && (
            <>
              <h3 className="font-semibold text-gray-800 mb-2 px-3">Schools</h3>
              <ul>
                {schools.map(school => (
                  <li 
                    key={school.name}
                    className="p-3 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700"
                  >
                    {school.name} ({school.count})
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        
        {/* Book Listings */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{activeCategory}</h2>
            <div className="flex items-center space-x-2">
              <button className="flex items-center border px-3 py-1 rounded-md hover:bg-gray-50">
                <Filter size={16} className="mr-1" />
                <span>Filters</span>
              </button>
              <select className="border px-3 py-1 rounded-md bg-white">
                <option>Sort by: Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="flex items-center text-gray-500 mb-6">
            <div className="flex items-center mr-4">
              <ShoppingCart size={16} className="mr-1" />
              <span>Free delivery on orders above ₹499</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>Delivery in 24-48 hrs</span>
            </div>
            
            <div className="ml-auto">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search within store"
                  className="pl-10 pr-4 py-2 border rounded-md w-64"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* School information for School Books category */}
          {activeCategory === 'School Books' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-md">
              <h3 className="font-bold text-blue-800 mb-2">Available School Books</h3>
              <p className="text-gray-700 mb-2">We stock books for the following schools:</p>
              <div className="flex flex-wrap gap-2">
                {schools.map(school => (
                  <span key={school.name} className="bg-white px-3 py-1 rounded-full text-sm border border-blue-200">
                    {school.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Book Grid */}
          <div className="grid grid-cols-4 gap-4">
            {displayedBooks.map(book => (
              <div key={book.id} className="border rounded-md p-3 hover:shadow-md transition-shadow">
                <div className="h-40 mb-2 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                  <img src={book.image} alt={book.title} className="h-full object-cover" />
                </div>
                <h4 className="font-medium text-gray-800 line-clamp-2">{book.title}</h4>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-xs text-gray-400">{book.publisher}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">₹{book.price}</span>
                  <button 
                    onClick={() => addToCart(book)}
                    className="bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile App Banner */}
      <div className="fixed bottom-0 right-0 bg-gray-900 text-white p-4 w-64 rounded-tl-md">
        <p className="mb-2">Get exclusive offers on the mobile app</p>
        <button className="bg-white text-gray-900 w-full py-2 rounded-md font-bold hover:bg-gray-100 transition-colors">
          Download the App
        </button>
      </div>
    </div>
  );
};

export default StoreDetails;