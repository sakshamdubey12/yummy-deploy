import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { login, logout } from '../redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  // console.log(isAuthenticated)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  console.log()
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const apiUrl = 'http://localhost:3001/auth/login';
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: 'include',  // This includes cookies in the request
        });
        
        const data = await response.json();
        
        if (response.ok) {
          dispatch(login({ isLoggedIn: true }));
          // console.log(useSelector((state) => state.user.isLoggedIn))
          navigate('/');
        } else {
          // Display error returned from backend
          setErrors({ general: data.message });
        }
      } catch (error) {
        setErrors({ general: 'An error occurred while logging in. Please try again later.' });
      }
    } else {
      setErrors(newErrors);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Log In to Your Account</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.email ? 'border-red-500' : 'border-gray-300 focus:ring-purple-700'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.password ? 'border-red-500' : 'border-gray-300 focus:ring-purple-700'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-purple-700 hover:underline">
            Sign Up
          </a>
        </p>

        {/* Forgot Password Link */}
        <p className="text-center text-gray-600 mt-2">
          <a href="/forgot-password" className="text-purple-700 hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
