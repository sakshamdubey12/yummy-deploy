import React from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { FaHeart } from "react-icons/fa"; // Import filled heart icon
import { FiHeart } from "react-icons/fi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";

const FoodCard = ({ post, loggedInUser ,onDelete, user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const currentUserId = user._id;
  
  useEffect(() => {
    // Check if the post is liked by the current user when the component mounts
    if (post.likes.includes(loggedInUser.id)) {
      console.log(post.likes,currentUserId)
      setIsLiked(true);
    }
  }, [post.likes, currentUserId]);

  const likeHandle = async () => {
    try {
      const url = `http://localhost:3001/post/${post._id}/${
        isLiked ? "unlike" : "like"
      }`;
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include", // For sending cookies
      });
      console.log(response)
      if (response.ok) {
        const updatedPost = await response.json();
        // console.log(updatedPost);
        post.likes = updatedPost.likes; // Update the likes in the UI

        // Toggle the like state
        setIsLiked(!isLiked);
      } else {
        console.error(
          isLiked ? "Failed to unlike post" : "Failed to like post"
        );
      }
    } catch (error) {
      console.error("Error while toggling like/unlike:", error);
    }
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/post/${post._id}`, {
        method: "DELETE",
        credentials: "include", // For sending cookies
      });

      if (response.ok) {
        onDelete(post._id); // Call the onDelete prop to remove the post from the UI
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="bg-white shadow-2xl mt-4 rounded-2xl p-5 w-52  max-w-xs relative overflow-visible">
      <div className="absolute -top-6 w-[62%] transform left-1/2 -translate-x-1/2">
        <img
          className="w-32 h-32 object-cover rounded-full"
          src={post.image}
          alt={post.title}
        />
      </div>
      <div className="pt-16 mt-6 text-left">
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
          {post.title}
        </h2>
          <p className=" text-gray-600 h-16 text-sm mb-4 text-center ">
            {post.description}
          </p>

        <div className="flex mt-6 justify-between items-center">
          <p className="text-sm font-bold">{
            post.likes.length===0?0:post.likes.length+' Likes'
            }</p>
          <div className="flex space-x-2" ref={dropdownRef}>
            <button
              onClick={likeHandle}
              className={`p-2 rounded-full border-gray-200 border-2 bg-gray-200`}
            >
              {isLiked ? (
                <FaHeart className="text-red-500" size={20} /> // Filled heart when liked
              ) : (
                <FiHeart className="text-gray-700" size={20} /> // Outlined heart when not liked
              )}
            </button>
            <button
              onClick={handleClick}
              className="bg-black text-white p-3 rounded-full"
            >
              <BsThreeDotsVertical />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <ul className="py-2">
                  <li className="flex items-center px-4 py-2 text-gray-700 cursor-pointer hover:bg-purple-200">
                    <FaDownload className="mr-2" /> Download
                  </li>

                  <li
                    className={`flex items-center px-4 py-2 text-gray-700 cursor-pointer ${loggedInUser._id===user._id ? '' : 'hidden' }  hover:bg-purple-200`}
                    onClick={handleDelete} // Call handleDelete when Delete is clicked
                  >
                    <FaTrash className="mr-2" /> Delete
                  </li>
                  <li
                    className={`flex items-center px-4 py-2 text-gray-700 cursor-pointer ${loggedInUser._id===user._id ? '' : 'hidden' } hover:bg-purple-200`}
                     // Call handleDelete when Delete is clicked
                  >
                    <MdOutlineModeEditOutline className="mr-2" /> Edit
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center overflow-hidden mt-4">
            {JSON.parse(post.hashtags).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-200 text-gray-800 text-sm font-medium rounded-full mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
