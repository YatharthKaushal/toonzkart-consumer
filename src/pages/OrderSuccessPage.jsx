import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, ArrowRight, Calendar, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    // Get order ID from location state
    const orderIdFromState = location.state?.orderId;
    
    if (orderIdFromState) {
      setOrderId(orderIdFromState);
    } else {
      // Fallback to a random order ID if none is provided
      const randomId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
      setOrderId(randomId);
    }

    // Calculate estimated delivery date (3-5 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3));
    
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', options));
  }, [location.state]);

  // Redirect to home if user navigates directly to this page without completing an order
  useEffect(() => {
    const hasCompletedCheckout = localStorage.getItem('lastCompletedOrder');
    
    if (!location.state?.orderId && !hasCompletedCheckout) {
      // If user landed here without coming from checkout
      // Consider redirecting to home or another appropriate page
      // navigate('/');
    }
  }, [navigate, location.state]);

  return (
    <div className="w-full font-sans min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header logo={toonzkartLogo} />
      </div>

      <div className="max-w-3xl mx-auto p-4 py-8">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Top Success Banner */}
          <div className="bg-green-600 text-white p-6 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="grid grid-cols-10 grid-rows-10 w-full h-full">
                {Array.from({ length: 100 }).map((_, index) => (
                  <div key={index} className="border border-white border-opacity-10"></div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-white text-green-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} />
              </div>
              <h1 className="text-3xl font-bold mb-1">Order Confirmed!</h1>
              <p className="text-green-100">Thank you for your purchase</p>
            </div>
          </div>
          
          {/* Order Details */}
          <div className="p-6">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Order Number</p>
                  <p className="font-bold text-lg">{orderId}</p>
                </div>
                <button 
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50"
                >
                  Print Receipt
                </button>
              </div>
            </div>
            
            {/* Order Status Steps */}
            <div className="py-4 mb-6">
              <h3 className="font-semibold text-lg mb-4">Order Status</h3>
              <div className="flex items-center mb-6 relative">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 z-10">
                  <CheckCircle size={20} />
                </div>
                <div className="flex-grow h-1 bg-green-600 mx-2 relative z-0"></div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 z-10">
                  <Package size={20} />
                </div>
                <div className="flex-grow h-1 bg-gray-200 mx-2 relative z-0"></div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-400 z-10">
                  <Truck size={20} />
                </div>
              </div>
              
              <div className="flex justify-between text-sm px-2">
                <div className="text-center w-20">
                  <p className="font-medium text-green-600">Confirmed</p>
                  <p className="text-gray-500 text-xs">Just now</p>
                </div>
                <div className="text-center w-20">
                  <p className="font-medium text-blue-600">Processing</p>
                  <p className="text-gray-500 text-xs">In progress</p>
                </div>
                <div className="text-center w-20">
                  <p className="font-medium text-gray-400">Shipped</p>
                  <p className="text-gray-500 text-xs">Soon</p>
                </div>
              </div>
            </div>
            
            {/* Delivery Information */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-start">
                <div className="mr-3 text-blue-500 mt-1">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Estimated Delivery</h4>
                  <p className="text-sm text-gray-600">{estimatedDelivery}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Your order will be delivered to your shipping address. We'll send you
                    tracking information once your order ships.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Next Steps */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-lg">What's Next?</h3>
              <p className="text-sm text-gray-600">
                We'll send you a confirmation email with your order details and
                tracking information once your package ships. You can also check your
                order status in your account dashboard.
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => navigate('/shop')}
                className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
              >
                <ShoppingBag size={18} className="mr-2" />
                Continue Shopping
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="flex-1 flex items-center justify-center border border-gray-300 bg-white hover:bg-gray-50 py-3 px-4 rounded-md font-medium transition-colors"
              >
                View Order History 
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Customer Support */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help with your order? <a href="#" className="text-blue-600 hover:underline">Contact our support team</a></p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;