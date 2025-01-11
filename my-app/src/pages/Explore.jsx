import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Chatbox from '../components/Chatbox';

const Explore = ({loggedInUserId}) => {
  const navigate = useNavigate();
  const apiBase = process.env.REACT_APP_API_URL;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchFollowedPosts = async () => {
      
      try {
        const response = await fetch(
          `${apiBase}/post/followed`, 
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (response.ok) {
          const followedPosts = await response.json();
          setPosts(followedPosts);
          
        } else {
          console.error('Failed to fetch posts from followed users');
        }
      } catch (error) {
        console.error('Error during fetching posts:', error);
      }
    };

    fetchFollowedPosts();
  }, []);

  const handleViewProfile = async (userId) => {
    navigate(`/users/${userId}`);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${apiBase}/users/search?q=${searchTerm}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
        setShowDropdown(true);
      } else {
        console.error('Failed to search users');
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setShowDropdown(false); 
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Left Sidebar */}
      <div className="w-1/5 bg-white p-5 border-r h-full">
        <div className="flex flex-col items-center">
          <img
            className="w-16 h-16 rounded-full mb-4"
            src="https://via.placeholder.com/100"
            alt="User Avatar"
          />
          <h2 className="text-lg font-semibold">John Doe</h2>
          <button className="mt-3 bg-purple-700 text-white py-2 px-4 rounded-lg">
            Become a Pro
          </button>
        </div>
        <div className="mt-8">
          <h3 className="text-gray-700 font-semibold mb-3">Bookmarks</h3>
          <ul>
            <li className="text-gray-600">Pad Thai</li>
            <li className="text-gray-600">Pasta Carbonara</li>
            <li className="text-gray-600">Mango Salsa</li>
          </ul>
        </div>
        <div className='mt-4'>

        <div className="mt-8">
          <h3 className="text-gray-700 font-semibold mb-4">Sponsor</h3>
          <div className="bg-gray-200 p-4 rounded-lg">
            <h4 className="text-gray-800 font-semibold">InVision Studio</h4>
            <p className="text-gray-600 mt-1">
              The world's most powerful screen design tool.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-gray-700 font-semibold mb-4">Suggestions</h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-gray-600">
              <span>Matthew Kane</span>
              <button className="text-purple-700 hover:text-purple-800">Add</button>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Sarah Lee</span>
              <button className="text-purple-700 hover:text-purple-800">Add</button>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>James Cook</span>
              <button className="text-purple-700 hover:text-purple-800">Add</button>
            </li>
          </ul>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow px-8 py-6 h-full overflow-y-scroll">
        {/* Search Bar */}
        <div className="relative flex items-center bg-white p-3 rounded-lg shadow-md mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="flex-grow bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            className="ml-3 bg-purple-700 text-white py-2 px-4 rounded-lg"
            onClick={handleSearch}
          >
            Search
          </button>

          {/* Search Results Dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute left-0 top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul>
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowDropdown(false)}
                  >
                    <div className="flex justify-between">
                      <div className="ml-3 flex items-center">
                      <img
                        src={user.avatar || 'https://via.placeholder.com/50'}
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                      />
                        <div className='ml-3 font-semibold'>
                        <p className="font-semibold text-gray-800">
                          {user.username}
                        </p>
                        <p className="text-md text-gray-500">{user.name}</p>
                        </div>
                      </div>
                        <button
                          onClick={() => handleViewProfile(user._id)}
                          className="ml-5 text-xs text-purple-700 border-0 py-1 px-3 rounded-lg  hover:text-purple-900"
                        >
                          View Profile
                        </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Posts from Followed Users */}
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <RecipeCard loggedInUserId={loggedInUserId} post={post} />
            ))
          ) : (
            <p className="text-gray-600">No posts available from followed users.</p>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/3 bg-white p-5 border-l h-full">
        <Chatbox />
      </div>
    </div>
  );
};

export default Explore;
