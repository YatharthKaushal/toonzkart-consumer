import React from "react";
import toonzKartLogo from "../assets/toonzkart_logo.png"; // Ensure the path is correct

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & About */}
          <div className="flex flex-col items-start">
            <img src={toonzKartLogo} alt="ToonzKart Logo" className="h-20 mb-3" />
            <p className="text-gray-400 text-sm">
              Your one-stop solution for all educational resources, school essentials, 
              and curated learning materials. Shop smart, study better!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-gray-200">Home</a></li>
              <li><a href="#" className="hover:text-gray-200">Shop</a></li>
              <li><a href="#" className="hover:text-gray-200">About Us</a></li>
              <li><a href="#" className="hover:text-gray-200">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Customer Service</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-gray-200">FAQs</a></li>
              <li><a href="#" className="hover:text-gray-200">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-gray-200">Return Policy</a></li>
              <li><a href="#" className="hover:text-gray-200">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <ul className="text-gray-400 space-y-2">
              <li>Email: <a href="mailto:support@toonzkart.com" className="hover:text-gray-200">support@toonzkart.com</a></li>
              <li>Phone: <a href="tel:+919876543210" className="hover:text-gray-200">+91 98765 43210</a></li>
              <li>Address: Indore, Madhya Pradesh, India</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-700" />

        {/* Social Media & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2025 ToonzKart. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-200"><i className="fab fa-facebook text-lg"></i></a>
            <a href="#" className="hover:text-gray-200"><i className="fab fa-instagram text-lg"></i></a>
            <a href="#" className="hover:text-gray-200"><i className="fab fa-twitter text-lg"></i></a>
            <a href="#" className="hover:text-gray-200"><i className="fab fa-linkedin text-lg"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
