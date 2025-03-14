import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trash2, ShoppingBag, CreditCard, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const CartPage = ({ storedCartItems, storedQuantities }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Simulate loading cart items from localStorage or context
  useEffect(() => {
    // If props are provided, use them
    if (storedCartItems && storedCartItems.length > 0) {
      setCartItems(storedCartItems);
      if (storedQuantities) {
        setQuantities(storedQuantities);
      }
    } else {
      // Fallback to sample data for demonstration
      const sampleCartItems = [
        { id: 1, title: "Mathematics Grade 6", author: "NCERT Publication", price: 175, publisher: "NCERT", category: "School Books" },
        { id: 7, title: "Physics Grade 12", author: "HC Verma", price: 425, publisher: "Bharti Bhawan", category: "School Books" },
        { id: 13, title: "The Midnight Library", author: "Matt Haig", price: 350, publisher: "Penguin Random House", category: "Fiction" }
      ];
      
      const sampleQuantities = {
        1: 2,  // 2 copies of Mathematics Grade 6
        7: 1,  // 1 copy of Physics Grade 12
        13: 1  // 1 copy of The Midnight Library
      };
      
      setCartItems(sampleCartItems);
      setQuantities(sampleQuantities);
    }
  }, [storedCartItems, storedQuantities]);

  const updateQuantity = (itemId, change) => {
    const currentQty = quantities[itemId] || 0;
    const newQty = Math.max(1, currentQty + change);
    
    setQuantities({
      ...quantities,
      [itemId]: newQty
    });
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    
    const newQuantities = {...quantities};
    delete newQuantities[itemId];
    setQuantities(newQuantities);
  };

  const applyPromoCode = () => {
    if (promoCode.trim().toUpperCase() === 'DISCOUNT20') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * (quantities[item.id] || 0));
  }, 0);

  // Calculate discount
  const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
  
  // Calculate delivery charge
  const deliveryCharge = deliveryOption === 'express' ? 99 : (subtotal >= 499 ? 0 : 49);
  
  // Calculate total
  const total = subtotal - discount + deliveryCharge;

  return (
    <div className="w-full font-sans">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header logo={toonzkartLogo} />
      </div>

      <div className="max-w-6xl mx-auto p-4 font-sans">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <a href="#" onClick={(e) => {
              e.preventDefault();
              navigate('/shop');
            }} className="text-blue-600 flex items-center mr-4">
              <ChevronLeft size={20} />
              <span>Continue Shopping</span>
            </a>
            <h1 className="text-2xl font-bold">Your Cart ({cartItems.length} items)</h1>
          </div>
        </header>

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart items list and payment options */}
          <div className="md:w-2/3">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-4">Looks like you haven't added any books to your cart yet.</p>
                <a href="/shop" className="bg-blue-600 text-white px-6 py-2 rounded-md inline-block">
                  Browse Books
                </a>
              </div>
            ) : (
              <>
                {/* Cart items */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="border-b last:border-b-0 p-4">
                      <div className="flex items-start">
                        <div className="h-24 w-20 bg-gray-100 flex-shrink-0 flex items-center justify-center rounded overflow-hidden mr-4">
                          <div className="text-gray-400 text-center text-sm p-2">Book Cover</div>
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.author}</p>
                          <p className="text-xs text-gray-400">{item.publisher}</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <span className="font-bold mr-4">₹{item.price}</span>
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                  disabled={quantities[item.id] <= 1}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 border-l border-r border-gray-300">
                                  {quantities[item.id] || 0}
                                </span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Options - Moved below cart items */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <h3 className="font-semibold text-lg mb-3">Payment Options</h3>
                  <div className="space-y-3">
                    <div className="border rounded-md p-3 flex items-center hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="payment" 
                        id="card" 
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="mr-3" 
                      />
                      <label htmlFor="card" className="flex items-center flex-grow cursor-pointer">
                        <CreditCard size={18} className="mr-2 text-blue-600" />
                        <span>Credit/Debit Card</span>
                        <div className="ml-auto flex space-x-1">
                          <div className="w-8 h-5 bg-blue-500 rounded"></div>
                          <div className="w-8 h-5 bg-red-500 rounded"></div>
                          <div className="w-8 h-5 bg-green-500 rounded"></div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="border rounded-md p-3 flex items-center hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="payment" 
                        id="upi" 
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="mr-3" 
                      />
                      <label htmlFor="upi" className="flex items-center flex-grow cursor-pointer">
                        <div className="mr-2 text-green-600 font-bold text-sm">UPI</div>
                        <span>UPI Payment</span>
                        <div className="ml-auto flex space-x-1">
                          <div className="w-8 h-5 bg-green-500 rounded"></div>
                          <div className="w-8 h-5 bg-yellow-500 rounded"></div>
                        </div>
                      </label>
                    </div>
                    
                    <div className="border rounded-md p-3 flex items-center hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="payment" 
                        id="netbanking" 
                        checked={paymentMethod === 'netbanking'}
                        onChange={() => setPaymentMethod('netbanking')}
                        className="mr-3" 
                      />
                      <label htmlFor="netbanking" className="flex items-center flex-grow cursor-pointer">
                        <div className="mr-2 text-blue-600 font-bold text-sm">₹</div>
                        <span>Net Banking</span>
                      </label>
                    </div>
                    
                    <div className="border rounded-md p-3 flex items-center hover:bg-gray-50 cursor-pointer">
                      <input 
                        type="radio" 
                        name="payment" 
                        id="cod" 
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mr-3" 
                      />
                      <label htmlFor="cod" className="flex items-center flex-grow cursor-pointer">
                        <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs">₹</span>
                        </div>
                        <span>Cash on Delivery</span>
                        <span className="ml-auto text-sm text-gray-500">Additional ₹40 fee</span>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Order summary */}
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span>
                </div>
                
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="text-xs text-gray-500 text-right mt-1">
                    Including GST
                  </div>
                </div>
              </div>
              
              {/* Delivery options */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Delivery Option</h3>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="standard" 
                      checked={deliveryOption === 'standard'} 
                      onChange={() => setDeliveryOption('standard')}
                      className="mr-2"
                    />
                    <div>
                      <div className="font-medium">Standard Delivery</div>
                      <div className="text-sm text-gray-500">2-3 business days</div>
                    </div>
                    <div className="ml-auto">
                      {subtotal >= 499 ? 'Free' : '₹49'}
                    </div>
                  </label>
                  
                  <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="delivery" 
                      value="express" 
                      checked={deliveryOption === 'express'} 
                      onChange={() => setDeliveryOption('express')}
                      className="mr-2"
                    />
                    <div>
                      <div className="font-medium">Express Delivery</div>
                      <div className="text-sm text-gray-500">Next day delivery</div>
                    </div>
                    <div className="ml-auto">₹99</div>
                  </label>
                </div>
              </div>
              
              {/* Promo code */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Promo Code</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="border rounded-l-md p-2 flex-grow"
                    disabled={promoApplied}
                  />
                  <button 
                    onClick={applyPromoCode}
                    disabled={promoApplied}
                    className={`px-4 py-2 rounded-r-md ${
                      promoApplied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {promoApplied && (
                  <div className="text-green-600 text-sm mt-1">
                    20% discount applied successfully!
                  </div>
                )}
              </div>
              
              {/* Checkout button */}
              <button className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors flex items-center justify-center">
                <CreditCard size={18} className="mr-2" />
                Proceed to Checkout
              </button>
              
              {/* Delivery location */}
              <div className="mt-4 flex items-start text-sm text-gray-500">
                <MapPin size={18} className="mr-2 flex-shrink-0 text-gray-400" />
                <span>
                  Delivering to: MG Road, Central District, New Delhi - 110001
                  <a href="#" className="text-blue-600 block mt-1">Change</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;