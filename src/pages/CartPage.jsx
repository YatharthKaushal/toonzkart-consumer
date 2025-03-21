import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trash2, ShoppingBag, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import toonzkartLogo from "../assets/toonzkart_logo.png";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState('MG Road, Central District, New Delhi - 110001');

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        
        // Get the token from localStorage or wherever you store it
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('Authentication required. Please log in.');
        }

        const response = await fetch('https://backend-lzb7.onrender.com/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response);

        if (!response.ok) {
          throw new Error(`Error fetching cart: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Transform the cart data to match the component's expected format
        const transformedCartItems = data.items.map(item => ({
          id: item.productId._id,
          itemId: item._id,  // Store the cart item's ID for API calls
          title: item.productId.name,
          brand: item.productId.brand,
          price: item.productId.price,
          category: item.productId.category,
          image: item.productId.image,
          originalPrice: item.productId.price + (item.productId.discount > 0 ? Math.round(item.productId.price * item.productId.discount / 100) : 0),
          discount: item.productId.discount,
          stock: item.productId.stock,
          status: item.productId.status
        }));

        // Create quantities object from the API response
        const newQuantities = {};
        data.items.forEach(item => {
          newQuantities[item.productId._id] = item.quantity;
        });

        setCartItems(transformedCartItems);
        setQuantities(newQuantities);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch cart items:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (productId, change) => {
    try {
      const currentQty = quantities[productId] || 0;
      const newQty = Math.max(1, currentQty + change);
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      // Find the cart item that contains this product
      const cartItem = cartItems.find(item => item.id === productId);
      if (!cartItem) {
        throw new Error("Item not found in cart");
      }

      // Update quantity on the server with the cart item's ID
      const response = await fetch(`https://backend-lzb7.onrender.com/api/cart/${cartItem.itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantity: newQty
        })
      });

      if (!response.ok) {
        throw new Error(`Error updating quantity: ${response.statusText}`);
      }

      // Update local state if server update is successful
      setQuantities({
        ...quantities,
        [productId]: newQty
      });
    } catch (err) {
      console.error('Failed to update quantity:', err);
      setError(err.message);
    }
  };

  const removeItem = async (productId) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      // Find the cart item that contains this product
      const cartItem = cartItems.find(item => item.id === productId);
      if (!cartItem) {
        throw new Error("Item not found in cart");
      }

      // Remove item from the server using the cart item's ID
      const response = await fetch(`https://backend-lzb7.onrender.com/api/cart/${cartItem.itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error removing item: ${response.statusText}`);
      }

      // Update local state if server update is successful
      setCartItems(cartItems.filter(item => item.id !== productId));
      
      const newQuantities = {...quantities};
      delete newQuantities[productId];
      setQuantities(newQuantities);
    } catch (err) {
      console.error('Failed to remove item:', err);
      setError(err.message);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.trim().toUpperCase() === 'DISCOUNT20') {
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  // Generate a random order ID
  const generateOrderId = () => {
    const prefix = 'ORD-';
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNumber}`;
  };

  // Get payment method mapping
  const getPaymentMethodCode = () => {
    switch(paymentMethod) {
      case 'card': return 'CARD';
      case 'upi': return 'UPI';
      case 'netbanking': return 'NET_BANKING';
      case 'cod': return 'COD';
      default: return 'CARD';
    }
  };

  // Handle checkout process
  const handleCheckout = async () => {
    try {
      setOrderProcessing(true);
      setOrderError(null);
      
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      // Get user ID from token or localStorage
      const userId = localStorage.getItem('userId') || 'CUST-' + Math.floor(1000 + Math.random() * 9000);

      // List of stationery categories
      const stationeryCategories = ["Pens", "Pencils", "Notebooks", "Erasers", "Markers", "Files & Folders", "Other"];
      
      // Prepare order items
      const orderItems = cartItems.map(item => ({
        // Use "Stationery" if the product category is in the stationery list, otherwise use "Books"
        category: stationeryCategories.includes(item.category) ? "Stationery" : "Book",
        productId: item.id,
        quantity: quantities[item.id] || 1,
        price: item.price
      }));

      // Calculate final amounts
      const subtotal = cartItems.reduce((total, item) => {
        return total + (item.price * (quantities[item.id] || 0));
      }, 0);

      const discount = promoApplied ? Math.round(subtotal * 0.2) : 0;
      const deliveryCharge = deliveryOption === 'express' ? 99 : (subtotal >= 499 ? 0 : 49);
      const codFee = paymentMethod === 'cod' ? 40 : 0;
      const total = subtotal - discount + deliveryCharge + codFee;

      // Prepare order request
      const orderRequest = {
        orderId: generateOrderId(),
        paymentMethod: getPaymentMethodCode(),
        customerId: userId,
        shippingAddress: shippingAddress,
        totalAmount: total,
        items: orderItems
      };

      console.log('Placing order:', orderRequest);

      // Make API call to create order
      const response = await fetch('https://backend-lzb7.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderRequest)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error placing order: ${response.statusText}`);
      }

      const orderData = await response.json();
      console.log('Order placed successfully:', orderData);
      
      // Set success state
      setOrderSuccess(true);
      
      // Clear cart after successful order
      // You may want to do this through an API call as well
      setCartItems([]);
      setQuantities({});
      
      // Redirect to order confirmation page after a short delay
      setTimeout(() => {
        navigate('/order-success', { state: { orderId: orderRequest.orderId } });
      }, 2000);
      
    } catch (err) {
      console.error('Failed to place order:', err);
      setOrderError(err.message);
    } finally {
      setOrderProcessing(false);
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
  
  // Calculate COD fee if applicable
  const codFee = paymentMethod === 'cod' ? 40 : 0;
  
  // Calculate total
  const total = subtotal - discount + deliveryCharge + codFee;

  // Display loading state
  if (loading) {
    return (
      <div className="w-full font-sans">
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <Header logo={toonzkartLogo} />
        </div>
        <div className="max-w-6xl mx-auto p-4 font-sans">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your cart...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="w-full font-sans">
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <Header logo={toonzkartLogo} />
        </div>
        <div className="max-w-6xl mx-auto p-4 font-sans">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display success state
  if (orderSuccess) {
    return (
      <div className="w-full font-sans">
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <Header logo={toonzkartLogo} />
        </div>
        <div className="max-w-6xl mx-auto p-4 font-sans">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded relative text-center" role="alert">
            <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="mb-4">Your order has been received and is being processed.</p>
            <p className="text-sm mb-6">You will be redirected to the order confirmation page...</p>
            <div className="w-16 h-1 bg-green-500 mx-auto">
              <div className="h-1 bg-green-700 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

        {/* Order Error Alert */}
        {orderError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Order Error: </strong>
            <span className="block sm:inline">{orderError}</span>
            <button 
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setOrderError(null)}
            >
              <span className="text-xl">&times;</span>
            </button>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart items list and payment options */}
          <div className="md:w-2/3">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-4">Looks like you haven't added any products to your cart yet.</p>
                <a href="/shop" className="bg-blue-600 text-white px-6 py-2 rounded-md inline-block">
                  Browse Products
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
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="object-cover h-full w-full" />
                          ) : (
                            <div className="text-gray-400 text-center text-sm p-2">Product Image</div>
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="text-xs text-gray-400">{item.category}</p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <span className="font-bold mr-2">₹{item.price}</span>
                              {item.originalPrice && item.price < item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through mr-2">₹{item.originalPrice}</span>
                              )}
                              {item.discount > 0 && (
                                <span className="text-xs text-green-600">{item.discount}% off</span>
                              )}
                              <div className="flex items-center border border-gray-300 rounded-md ml-4">
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
                
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between text-gray-600">
                    <span>COD Fee</span>
                    <span>₹{codFee}</span>
                  </div>
                )}
                
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
              <button 
                className={`w-full ${orderProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-md font-bold transition-colors flex items-center justify-center`}
                onClick={handleCheckout}
                disabled={orderProcessing || cartItems.length === 0}
              >
                {orderProcessing ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={18} className="mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </button>
              
              {/* Delivery location */}
              <div className="mt-4 flex items-start text-sm text-gray-500">
                <MapPin size={18} className="mr-2 flex-shrink-0 text-gray-400" />
                <span>
                  Delivering to: {shippingAddress}
                  <a href="#" className="text-blue-600 block mt-1" onClick={(e) => {
                    e.preventDefault();
                    const newAddress = prompt("Enter your shipping address:", shippingAddress);
                    if (newAddress) setShippingAddress(newAddress);
                  }}>Change</a>
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