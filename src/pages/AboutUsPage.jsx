import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";
import { 
  Book, Users, TrendingUp, Map, Award, Globe, Shield, Truck, 
  Star, Heart, MessageCircle, ChevronRight, Check
} from 'lucide-react';
import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header logo={toonzkartLogo} />
      </div>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming How India Discovers and Buys Books
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Connecting readers with bookstores across the country through a simple, seamless digital experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore Our Bookstores
              </Link>
              <a 
                href="#our-story" 
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4000+</div>
              <div className="text-gray-600">Bookstores</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">35+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1.2M+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5M+</div>
              <div className="text-gray-600">Books Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How a simple idea to connect local bookstores with digital customers transformed into India's largest book marketplace.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span>Founder Image</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">From Passion to Platform</h3>
              <p className="text-gray-700 mb-4">
                ToonzKart began in 2020 when our founder, Rahul Sharma, a book enthusiast, noticed local bookstores struggling to compete with online giants despite having better curation and personalized service.
              </p>
              <p className="text-gray-700 mb-4">
                With a vision to bridge the gap between traditional bookstores and the digital world, Rahul started by connecting just 10 bookstores in Indore with customers through a simple website.
              </p>
              <p className="text-gray-700 mb-6">
                What started as a small initiative quickly grew as both bookstore owners and customers embraced the platform that preserved the essence of local bookstores while adding the convenience of online shopping.
              </p>
              <div className="flex items-center text-gray-500">
                <div className="mr-4 text-2xl font-bold text-blue-600">"</div>
                <blockquote className="italic">
                  We're not just selling books; we're preserving the culture and community that local bookstores create.
                </blockquote>
              </div>
              <div className="mt-2 font-medium">— Rahul Sharma, Founder & CEO</div>
            </div>
          </div>

          {/* Timeline - Shortened */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-center">Our Journey</h3>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="font-bold text-3xl text-blue-600">2020</div>
                  <div className="text-xl font-medium">The Beginning</div>
                </div>
                <div className="md:w-2/3 md:pl-6 md:border-l border-gray-300">
                  <p className="text-gray-700">
                    ToonzKart launched in Indore with 10 bookstores, focusing on school and college textbooks. Within 6 months, we expanded to 50 stores and introduced same-day delivery.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="font-bold text-3xl text-blue-600">2022</div>
                  <div className="text-xl font-medium">National Presence</div>
                </div>
                <div className="md:w-2/3 md:pl-6 md:border-l border-gray-300">
                  <p className="text-gray-700">
                    Reached 25 cities and 2,000+ bookstores across India. Introduced the ToonzKart Partner Program to help bookstores digitize inventory and manage online sales. Crossed 500,000 users and 1 million book deliveries.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="font-bold text-3xl text-blue-600">2024-25</div>
                  <div className="text-xl font-medium">Going Beyond</div>
                </div>
                <div className="md:w-2/3 md:pl-6 md:border-l border-gray-300">
                  <p className="text-gray-700">
                    Expanded to 35+ cities with 4,000+ bookstores. Introduced ToonzKart for Publishers to streamline the distribution process. Launched book exchange and second-hand book marketplace features. Reached the milestone of 5 million books delivered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values - Shortened */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Values</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're guided by our commitment to support local businesses, promote literacy, and provide value to customers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-blue-600" />
              </div>
              <h4 className="font-bold mb-2">Integrity</h4>
              <p className="text-gray-600 text-sm">
                Honest and transparent in all our dealings with customers and partners.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-blue-600" />
              </div>
              <h4 className="font-bold mb-2">Empathy</h4>
              <p className="text-gray-600 text-sm">
                Understanding the needs of bookstores and readers to create better solutions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={24} className="text-blue-600" />
              </div>
              <h4 className="font-bold mb-2">Innovation</h4>
              <p className="text-gray-600 text-sm">
                Continuously improving our platform and services through creativity and technology.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-blue-600" />
              </div>
              <h4 className="font-bold mb-2">Community</h4>
              <p className="text-gray-600 text-sm">
                Fostering connections between bookstores, readers, and the broader community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Shortened */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals driving our mission forward
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span>Team Member Photo</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Rahul Sharma</h3>
              <p className="text-blue-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm mb-3">
                Former consultant with a passion for books and technology. Graduated from IIT Delhi with an MBA from IIM Ahmedabad.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span>Team Member Photo</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Priya Patel</h3>
              <p className="text-blue-600 mb-2">COO & Co-founder</p>
              <p className="text-gray-600 text-sm mb-3">
                15 years experience in retail operations. Previously led expansion for a major bookstore chain across South India.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span>Team Member Photo</span>
                </div>
              </div>
              <h3 className="text-xl font-bold">Arjun Mehta</h3>
              <p className="text-blue-600 mb-2">CTO</p>
              <p className="text-gray-600 text-sm mb-3">
                Tech visionary who previously built scalable platforms at Amazon. Computer Science graduate from BITS Pilani.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us / CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the ToonzKart Family</h2>
          <p className="text-xl opacity-80 max-w-3xl mx-auto mb-8">
            Whether you're a bookstore owner looking to grow your business or a book lover seeking a better way to discover and purchase books, we'd love to have you join us.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">For Bookstores</h3>
              <p className="opacity-80 mb-6">
                Join 4,000+ bookstores across India that are growing their business with ToonzKart. Get access to new customers, powerful inventory management tools, and a supportive community.
              </p>
              <Link 
                to="/partner-with-us" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Become a Partner
              </Link>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">For Readers</h3>
              <p className="opacity-80 mb-6">
                Discover new books, support local bookstores, and enjoy convenient delivery. Sign up today to access exclusive deals and personalized recommendations.
              </p>
              <Link 
                to="/signup" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;