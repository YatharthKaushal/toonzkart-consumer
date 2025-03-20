import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-blue-50 to-purple-50 w-full">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-700">
          <span className="relative inline-block">
            About Us
            <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3C21.5 3.5 40 4 58.5 3.5C77 3 95.5 1.5 114 1C132.5 0.5 151 1 169.5 3C188 5 206.5 3.5 225 3.5" stroke="#FFA41B" strokeWidth="5" strokeLinecap="round"/>
            </svg>
          </span>
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200 rounded-full opacity-50"></div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 w-16 h-16 bg-green-200 rounded-full opacity-50"></div>
            
            {/* Pencil illustration */}
            <div className="absolute right-4 top-4 md:right-8 md:top-8 hidden md:block">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.4 7.34L16.66 4.6C16.1338 4.22815 15.4885 4.0111 14.825 4.0111C14.1615 4.0111 13.5162 4.22815 12.99 4.6L4 13.59V20H10.41L19.4 11.01C19.7719 10.4838 19.9889 9.83847 19.9889 9.175C19.9889 8.51153 19.7719 7.86625 19.4 7.34Z" fill="#FFD166"/>
                <path d="M14 6L18 10" stroke="#FF6B6B" strokeWidth="1" strokeLinecap="round"/>
                <path d="M4 13.59L14.29 3.29C14.68 2.9 15.31 2.9 15.7 3.29L20.7 8.29C21.09 8.68 21.09 9.31 20.7 9.7L10.41 20H4V13.59Z" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Content with improved layout */}
            <div className="relative z-10 md:pr-16">
              <p className="mb-5 text-lg leading-relaxed text-gray-700">
                <span className="font-bold text-indigo-600 text-xl">ToonzKart is India's fastest-growing online megastore</span>, dedicated to providing a one-stop solution for all learning essentials—from nursery to college. Whether it's products like books, stationery, school book sets, toys, and sports equipment or services such as online coaching, home tutoring, internships, extracurricular activities, and sports institutes, ToonzKart brings everything under one roof.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700">
                Our platform ensures that students and parents no longer have to deal with unrealistic pricing set by retailers. By promoting local businesses through the power of <span className="font-bold text-indigo-600">glocalization</span>, we make quality education resources accessible and affordable.
              </p>
            </div>
            
            {/* Fun stats with animations and kid-friendly icons */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="flex flex-col items-center p-4 bg-yellow-100 rounded-xl border-2 border-yellow-200 transform transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="bg-yellow-400 text-white w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2L18 2C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6C2 3.79086 3.79086 2 6 2Z" stroke="white" strokeWidth="2"/>
                    <path d="M16 14L8 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 10L8 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 18L8 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="text-yellow-600 text-2xl font-bold mb-1">500+</div>
                <div className="text-sm text-center font-medium">Fun Products</div>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-green-100 rounded-xl border-2 border-green-200 transform transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="bg-green-400 text-white w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="text-green-600 text-2xl font-bold mb-1">100+</div>
                <div className="text-sm text-center font-medium">Local Partners</div>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-purple-100 rounded-xl border-2 border-purple-200 transform transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="bg-purple-400 text-white w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2"/>
                    <path d="M12 10L12 16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 7L12 7.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 14L12 16L15 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="text-purple-600 text-2xl font-bold mb-1">50+</div>
                <div className="text-sm text-center font-medium">Amazing Cities</div>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-red-100 rounded-xl border-2 border-red-200 transform transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="bg-red-400 text-white w-12 h-12 rounded-full flex items-center justify-center mb-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="text-red-600 text-2xl font-bold mb-1">1000+</div>
                <div className="text-sm text-center font-medium">Happy Students</div>
              </div>
            </div>
            
            {/* Colorful bottom decoration */}
            <div className="mt-8 w-full h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full opacity-70"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;