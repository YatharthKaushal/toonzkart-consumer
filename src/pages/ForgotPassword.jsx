import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toonzkartLogo from "../assets/toonzkart_logo.png";
import { Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('https://backend-lzb7.onrender.com/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        setMessage('A password reset link has been sent to your email. Please check your inbox.');
        setError('');
      } else {
        // Error from server
        setError(data?.message || 'Failed to send reset link. Please try again.');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={toonzkartLogo} alt="ToonzKart Logo" className="h-16 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-gray-800">Forgot Password</h2>
          <p className="text-gray-600 mt-2">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleForgotPassword}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md
                         hover:bg-blue-700 focus:outline-none focus:ring-2
                         focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
