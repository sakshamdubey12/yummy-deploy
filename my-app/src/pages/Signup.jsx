import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, logout } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


// Import avatars
import avatar1 from "../images/avatars/avatar1.png";
import avatar2 from "../images/avatars/avatar2.png";
import avatar3 from "../images/avatars/avatar3.png";
import avatar4 from "../images/avatars/avatar4.png";

const Signup = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  console.log("log", isLoggedIn)

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

    // List of available avatars
    const avatars = [avatar1, avatar2, avatar3,avatar4];
  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    // Handle avatar selection
    const handleAvatarSelect = (avatar) => {
      setFormData({
        ...formData,
        avatar  // Set the selected avatar
      });
    };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!formData.name) newErrors.username = 'name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.avatar) newErrors.avatar = 'Please select an avatar';

    if (Object.keys(newErrors).length === 0) {
      console.log('Form Data:', formData);
      const apiUrl = 'http://localhost:3001/auth/signup'
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // If login is successful, redirect to the home page
        dispatch(login({ isLoggedIn: true }));
        navigate('/login');
      }else {
        // If login fails, display error message
        setErrors(data.message);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        
        <form onSubmit={handleSubmit}>
          {/* name  */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.name ? 'border-red-500' : 'border-gray-300 focus:ring-purple-700'
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring ${
                errors.username ? 'border-red-500' : 'border-gray-300 focus:ring-purple-700'
              }`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

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

             {/* Avatar Selection */}
             <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Choose an Avatar</label>
            <div className="flex justify-between">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`w-16 h-16 rounded-full cursor-pointer ${
                    formData.avatar === avatar ? 'border-4 border-purple-700' : ''
                  }`}
                />
              ))}
            </div>
            {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-purple-700 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
