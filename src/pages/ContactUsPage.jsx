import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";
import { 
  Phone, Mail, MapPin, MessageCircle, Clock, 
  HelpCircle, Users, BookOpen, ChevronRight 
} from 'lucide-react';
import Footer from '../components/Footer';

const ContactUsPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header logo={toonzkartLogo} />
      </div>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              We're here to help with any questions about ToonzKart.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact-form" 
                className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Us
              </a>
              <Link 
                to="/faq" 
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                View FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Headquarters</h3>
              <p className="text-gray-600">
                ToonzKart Campus<br />
                Plot 42, Sector 18<br />
                Gurugram, Haryana 122001<br />
                India
              </p>
            </div>
            
            <div className="text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-gray-600 mb-3">
                Contact No.: <span className="font-medium">+919165106000</span><br />
              </p>
              <div className="flex items-center justify-center text-gray-500 text-sm">
                <Clock size={14} className="mr-1" />
                <span>Mon-Sat: 9AM to 8PM IST</span>
              </div>
            </div>
            
            <div className="text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-gray-600 mb-2">
                General Inquiries:<br />
                <a href="mailto:info@toonzkart.com" className="text-blue-600 hover:underline">
                  info@toonzkart.com
                </a>
              </p>
              <p className="text-gray-600 mb-2">
                Partner Support:<br />
                <a href="mailto:partners@toonzkart.com" className="text-blue-600 hover:underline">
                  partners@toonzkart.com
                </a>
              </p>
              <p className="text-gray-600">
                Customer Support:<br />
                <a href="mailto:support@toonzkart.com" className="text-blue-600 hover:underline">
                  support@toonzkart.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Send Us a Message</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
            <form>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+919165106000"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select 
                  id="subject" 
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Please select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Customer Support</option>
                  <option value="partner">Partnership Opportunities</option>
                  <option value="orders">Order Issues</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
              
              <div className="mb-6">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="mt-1 mr-2"
                    required 
                  />
                  <label htmlFor="privacy" className="text-gray-600 text-sm">
                    I agree that my submitted data is being collected and stored. For more information, please refer to our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full md:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 border rounded-lg">
              <div className="flex items-start mb-3">
                <HelpCircle size={24} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <h3 className="font-bold text-lg">How do I track my order?</h3>
              </div>
              <p className="text-gray-600 pl-9">
                You can track your order by logging into your ToonzKart account and visiting the "My Orders" section, or using the tracking link sent to your email after your order is shipped.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <div className="flex items-start mb-3">
                <HelpCircle size={24} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <h3 className="font-bold text-lg">What is your return policy?</h3>
              </div>
              <p className="text-gray-600 pl-9">
                We accept returns within 7 days of delivery if the book is in its original condition. For more details, please visit our Return Policy page.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <div className="flex items-start mb-3">
                <HelpCircle size={24} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <h3 className="font-bold text-lg">How can a bookstore join ToonzKart?</h3>
              </div>
              <p className="text-gray-600 pl-9">
                Bookstores can join our platform by visiting the "Partner With Us" page and filling out the application form. Our team will reach out within 48 hours.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg">
              <div className="flex items-start mb-3">
                <HelpCircle size={24} className="text-blue-600 mr-3 flex-shrink-0 mt-1" />
                <h3 className="font-bold text-lg">Do you ship internationally?</h3>
              </div>
              <p className="text-gray-600 pl-9">
                Currently, we ship across all major cities in India. International shipping is available for select countries. Check our Shipping Policy for more information.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/faq" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
              View All FAQs
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Categories */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help You?</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach out to our specialized teams for assistance
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customer Support</h3>
              <p className="text-gray-600 mb-4">
                For questions about your orders, returns, or general customer inquiries.
              </p>
              <a 
                href="mailto:support@toonzkart.com" 
                className="text-blue-600 font-medium hover:underline"
              >
                support@toonzkart.com
              </a>
              <p className="text-gray-500 text-sm mt-2">
                Response time: Within 24 hours
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Bookstore Partners</h3>
              <p className="text-gray-600 mb-4">
                For existing and prospective bookstore partners looking to join our platform.
              </p>
              <a 
                href="mailto:partners@toonzkart.com" 
                className="text-blue-600 font-medium hover:underline"
              >
                partners@toonzkart.com
              </a>
              <p className="text-gray-500 text-sm mt-2">
                Response time: Within 48 hours
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={30} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Corporate Inquiries</h3>
              <p className="text-gray-600 mb-4">
                For media, partnerships, investments, and other business opportunities.
              </p>
              <a 
                href="mailto:info@toonzkart.com" 
                className="text-blue-600 font-medium hover:underline"
              >
                info@toonzkart.com
              </a>
              <p className="text-gray-500 text-sm mt-2">
                Response time: Within 72 hours
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Us</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit our headquarters in Gurugram
            </p>
          </div>
          
          <div className="bg-gray-200 h-96 rounded-lg overflow-hidden">
            {/* This would be replaced with an actual map component */}
            <div className="h-full w-full flex items-center justify-center text-gray-500">
              <p>Map Integration Would Go Here</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-bold text-xl mb-3">Directions</h3>
            <p className="text-gray-600 mb-4">
              ToonzKart Campus is located in Sector 18, Gurugram, close to the Rapid Metro Station.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <p className="text-gray-600">
                  From Delhi: Take NH-48 towards Gurugram and exit at IFFCO Chowk. Continue towards Sector 18.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <p className="text-gray-600">
                  By Metro: Take the Yellow Line to HUDA City Centre, then switch to Rapid Metro to Sector 53-54 station.
                </p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3 flex-shrink-0">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <p className="text-gray-600">
                  From Airport: IGI Airport is approximately 20 km away. Taxis and cab services are readily available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect With Us on Social Media</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
            Follow us for the latest updates, book recommendations, and special offers.
          </p>
          
          <div className="flex justify-center space-x-6 mb-10">
            <a 
              href="#" 
              className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <span className="text-2xl">f</span>
            </a>
            <a 
              href="#" 
              className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <span className="text-2xl">t</span>
            </a>
            <a 
              href="#" 
              className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <span className="text-2xl">i</span>
            </a>
            <a 
              href="#" 
              className="w-14 h-14 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
            >
              <span className="text-2xl">y</span>
            </a>
          </div>
          
          <div className="max-w-md mx-auto">
            <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-l-lg border-0"
              />
              <button className="bg-blue-800 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-blue-900 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUsPage;