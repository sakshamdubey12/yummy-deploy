import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

const RecipeCard = ({ post}) => {
  // console.log(post)
  const ingredients = JSON.parse(post.ingredients);
  const currentUserId = useSelector((state) => state.user.userId);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nutritionData, setNutritionData] = useState(null); // State to store nutrition data
  const [loading, setLoading] = useState(false); // Loading state

  const formatPostDate = (createdAt) => {
    const postDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate - postDate;

    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference >= 1) {
      return postDate.toLocaleDateString();
    } else if (hoursDifference >= 1) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
    } else if (minutesDifference >= 1) {
      return `${minutesDifference} minute${minutesDifference !== 1 ? "s" : ""} ago`;
    } else {
      return `${secondsDifference} second${secondsDifference !== 1 ? "s" : ""} ago`;
    }
  };

  useEffect(() => {
    if (post.likes.includes(currentUserId)) {
      setIsLiked(true);
    }
  }, [post.likes, currentUserId]);

  const likeHandle = async () => {
    try {
      const url = `https://yummy-deploy-1z7n.onrender.com/post/${post._id}/${isLiked ? "unlike" : "like"}`;
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
      });

      if (response.ok) {
        const updatedPost = await response.json();
        post.likes = updatedPost.likes; // Update the likes in the UI
        setIsLiked(!isLiked);
      } else {
        console.error(isLiked ? "Failed to unlike post" : "Failed to like post");
      }
    } catch (error) {
      console.error("Error while toggling like/unlike:", error);
    }
  };

  const handleViewRecipe = async () => {
    setIsModalOpen(true); // Open the modal
    setLoading(true); // Start loading when analyzing

    // Call the Spoonacular API to get nutrition data
    try {
      console.log(ingredients)
      const response = await fetch(
        `https://api.spoonacular.com/recipes/parseIngredients?apiKey=570c1c05c2d548de9c8550e884affad7`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredientList: ingredients.map(i => `${i.name} ${i.measurement} ${i.unit}`).join("\n"),
            servings: 1,
          }),
        }
      );

      const data = await response.json();
      console.log(data)
      setNutritionData(data); // Store the fetched nutrition data
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    }

    setLoading(false); // Stop loading once data is fetched
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setNutritionData(null); // Clear nutrition data when modal is closed
  };

  return (
    <div className="max-w-2xl mt-4 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-50">
        <img className="w-full object-contain h-96" src={post.image} alt={post.title} />
        <div className="absolute w-full top-0 p-2 flex items-center text-black bg-purple-700">
          <img
            className="h-10 w-10 rounded-full object-cover mr-2"
            src={post.user.avatar || "https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png"}
            alt={'image'}
          />
          <div>
            <h1 className="font-semibold text-white">{post.user.name}</h1>
            <p className="text-sm text-white">{formatPostDate(post.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">{post.title}</h1>
        <p className="py-2 text-gray-700">{post.description}</p>

        <div className="flex items-center mt-4">
          {JSON.parse(post.hashtags).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-200 text-gray-800 text-sm font-medium rounded-full mr-2"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center text-gray-700">
            <button
              onClick={likeHandle}
              className={`p-2 rounded-full`}
            >
              {isLiked ? (
                <FaHeart className="text-red-500" size={20} />
              ) : (
                <FiHeart className="text-gray-700" size={20} />
              )}
            </button>
            <span>{post.likes.length} Likes</span>
          </div>
          <div className="text-purple-700 text-sm mt-2 flex items-center cursor-pointer" onClick={handleViewRecipe}>
            <svg className="h-5 w-5 text-purple-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
              <path stroke="none" d="M0 0h24v24H0z"/>  
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />  
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  
              <line x1="9" y1="9" x2="10" y2="9" />  
              <line x1="9" y1="13" x2="15" y2="13" />  
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            <span className="ml-1">Analyze Recipe</span>
          </div>
        </div>
      </div>

      {/* Modal for Recipe Details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <img className="w-full h-48 object-cover mb-4" src={post.image} alt={post.title} />
            <h4>{post.description}</h4>
            <p>{ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name} {ingredient.measurement} {ingredient.unit}</li>
            ))}</p>
            <p>{post.instructions}</p>

            {/* Display Nutrition Data */}
            {loading ? (
              <p>Loading nutrition information...</p>
            ) : (
              nutritionData && (
                <div className="mt-4">
                  <h4 className="font-bold">Nutrition Facts:</h4>
                  <p>Calories: {nutritionData.calories}</p>
                  <p>Fat: {nutritionData.fat}g</p>
                  <p>Carbohydrates: {nutritionData.carbs}g</p>
                  <p>Protein: {nutritionData.protein}g</p>
                </div>
              )
            )}

            <button 
              onClick={closeModal} 
              className="mt-4 bg-purple-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
