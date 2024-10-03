import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import FoodCard from "./FoodCard"; // Assume this component is used for rendering posts

const UserProfile = () => {
  const { id } = useParams(); // Extract the user ID from the URL
  const [isFollowing, setIsFollowing] = useState(false); // To track the follow status
  const [posts, setPosts] = useState([]); // Posts of the user
  const [user, setUser] = useState(null); // Profile user data
  const [loading, setLoading] = useState(true); // Loading state
  const [loggedInUser, setLoggedInUser] = useState(null); // Current logged-in user
  const apiBase = process.env.REACT_APP_API_URL;
  // Fetch profile user details and follow status
  useEffect(() => {
    
    const fetchUserDetails = async () => {
      try {
        // Fetch the profile user details
        const response = await fetch(`${apiBase}/users/public/${id}`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          // console.log('s',user)
          // Check if logged-in user is following the profile user
          const loggedInResponse = await fetch(`${apiBase}/users/user`, {
            method: "GET",
            credentials: "include",
          });
          const loggedInData = await loggedInResponse.json();
          setLoggedInUser(loggedInData);
          console.log(loggedInUser,id)
          // Check if the logged-in user is following the profile user
          if (data.followers.includes(loggedInUser._id)) {
            setIsFollowing(true);
          }
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  // Handle follow/unfollow logic
  const handleFollow = async () => {
    try {
      // console.log('j')
      const response = await fetch(
        `${apiBase}/users/${id}/follow`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      if (response.ok) {
        const updatedUser = await response.json();
        setIsFollowing(!isFollowing); // Toggle follow state
      } else {
        console.error("Failed to follow/unfollow user");
      }
    } catch (error) {
      console.error("Error during follow/unfollow:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const handleDel = ()=>{
    console.log('none')
  }


  return (
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
              <p>Bio: {user.bio || "No bio available"}</p>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end mr-10">
            <div className="flex gap-8">
              <div>
                <p className="text-center font-semibold">{user.posts?.length || 0}</p>
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
              onClick={handleFollow}
            >
              {isFollowing ? 'Unfollow' : '+ Follow'}
            </button>
          </div>
        </div>
      </div>

      {/* My-Post Section */}
      <div className="bg-purple-900 p-6 rounded-lg shadow-md">
        {user.posts?.length  === 0 ? (
          <p>No posts available</p>
        ) : (
          //  <div>hello</div>
          <div className="grid grid-cols-5 gap-8">
            {user.posts?.map((post) => (
              <FoodCard key={post._id} post={post} loggedInUser={loggedInUser} user={user} onDelete={handleDel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
