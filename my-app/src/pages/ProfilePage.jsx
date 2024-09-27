import React, { useEffect, useState } from "react";
import AddRecipe from "../components/AddRecipe";
import FoodCard from "../components/FoodCard";

const ProfilePage = () => {
  const [isAddRecipeOpen, setIsAddRecipeOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState('')

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/post/posts", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setPosts(data);  // Update posts in state
      // console.log('posts',posts)
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data); // Store user data in state
      
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Fetch posts when the component is mounted
  useEffect(() => {
    fetchPosts();
    fetchUser();
    // console.log('logged in user: ', user)
  }, []);

  const handleDeletePost = (postId) => {
    // Remove the post from the posts array
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts); // Update the state to trigger UI re-render
  };

  const handlePostAdded = (newPost) => {
    setIsAddRecipeOpen(false);  // Close the modal
    fetchPosts(); // Fetch the latest posts after adding a new one
  };
  
  const handleUpdate = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  return (
    <div>
      <div>
        {/* Profile Section */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <img
                src={user.avatar || "https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p>{user.email}</p>
                <p>Bio: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, dolorem.</p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end mr-10">
              <div className="flex gap-8">
                <div>
                  <p className="text-center font-semibold">{posts.length || 0}</p>
                  <h1>Posts</h1>
                </div>
                <div>
                  <p className="text-center font-semibold">{user.followers?.length || 0}</p>
                  <h1>Followers</h1>
                </div>
                <div>
                  <p className="text-center font-semibold">{user.following?.length || 0}</p>
                  <h1>Followings</h1>
                </div>
              </div>
              <button
                className="text-purple-700 font-semibold flex items-center gap-1"
                onClick={() => setIsAddRecipeOpen(true)}
              >
                <svg
                  className="h-5 w-5 text-purple-700"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Recipe
              </button>
            </div>
          </div>
        </div>

        {/* My-Post Section */}
        <div className="bg-purple-900 p-6 rounded-lg shadow-md flex">
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            <div className="grid grid-cols-5 gap-8 h-[50%]">
              {posts.map((post) => (
                <FoodCard key={post._id} post={post} loggedInUser={user} user={user} onDelete={handleDeletePost} onUpdate={handleUpdate} />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Add Recipe Modal */}
      {isAddRecipeOpen && <AddRecipe onPostAdded={handlePostAdded} onClose={() => setIsAddRecipeOpen(false)} />}
    </div>
  );
};

export default ProfilePage;
