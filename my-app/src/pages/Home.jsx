// import React, { useEffect, useState } from "react";
// import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
// import ProfilePage from "../pages/ProfilePage";
// import Generate from "./Generate";
// import Signup from "../pages/Signup";
// import Login from "../pages/Login";
// import chef from "../images/chefG.png";
// import Explore from "./Explore";
// import UserProfile from "../components/UserProfile";
// import WorldMap from "./WorldMap";
// import Cuisines from "../pages/Cuisines";
// import CuisineDetail from "../components/CuisineDetail";
// import { useDispatch, useSelector } from "react-redux";
// import { login, logout } from "../redux/userSlice";
// import { Chat } from "./Chat";

// const Home = () => {
//   const apiBase = process.env.REACT_APP_API_URL;
  
//   const navigate = useNavigate();
//   const fetchUser = async () => {
//     const response = await fetch(`${apiBase}/users/user`, {
//       method: "GET",
//       credentials: "include",
//     });
//     const data = await response.json();
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await fetch(`${apiBase}/auth/`, {
//           method: "GET",
//           credentials: "include",
//         });

//         const data = await response.json();
//         if (response.ok && data.loggedIn) {
//           setIsLoggedIn(true);
//         } else {
//           // Handle session expiration
//           if (data.message === "Session expired. Please log in again.") {
//             alert("Your session has expired. Please log in again.");
//           }
//           setIsLoggedIn(false);
//           const currentPath = window.location.pathname;

//           // Redirect only if the user is not authenticated and is not on login/signup routes
//           if (!["/login", "/signup"].includes(currentPath)) {
//             navigate("/login");
//           }
//         }
//       } catch (error) {
//         console.error("Error checking authentication:", error);
//         setIsLoggedIn(false);
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   // Logout handler
//   const logoutHandler = async () => {
//     const apiUrl = `${apiBase}/auth/logout`;
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       credentials: "include",
//     });
//     if (response.ok) {
//       // dispatch(logout({ userId: null, isLoggedIn:false })); // Logout action in Redux
//       navigate("/login"); // Redirect to login
//     }
//   };

//   return (
//     <div className="flex h-screen bg-blue-50">
//       {/* Sidebar */}
//       {isLoggedIn ? (
//         <div className="w-64 bg-purple-700 text-white flex flex-col">
//           <div className="p-6">
//             <h1 className="text-3xl font-bold">SUCCESS</h1>
//           </div>

//           <nav className="mt-6 flex-1">
//             <ul>
//               <li className="py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/profile"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
//                       : "px-6 rounded-md block transition-colors duration-300"
//                   }
//                 >
//                   Profile
//                 </NavLink>
//               </li>
//               <li className="py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/explore"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
//                       : "px-6 rounded-md block transition-colors duration-300"
//                   }
//                 >
//                   Explore
//                 </NavLink>
//               </li>
//               <li className="py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/generate"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
//                       : "px-6 rounded-md block transition-colors duration-300"
//                   }
//                 >
//                   Generate
//                 </NavLink>
//               </li>
//               <li className="py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/chat"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
//                       : "px-6 rounded-md block transition-colors duration-300"
//                   }
//                 >
//                   Chat
//                 </NavLink>
//               </li>
//               <li className="py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/subscribe"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
//                       : "px-6 rounded-md block transition-colors duration-300"
//                   }
//                 >
//                   Subscribe
//                 </NavLink>
//               </li>
//               <li className="py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/WorldMap"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
//                       : "px-6 rounded-md block transition-colors duration-300"
//                   }
//                 >
//                   Cuisine Tour
//                 </NavLink>
//               </li>
//             </ul>
//           </nav>
//           <button
//             className="px-6 py-3 flex gap-1 items-center"
//             onClick={logoutHandler}
//           >
//             <svg
//               className="h-5 w-5 text-white"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               strokeWidth="2"
//               stroke="currentColor"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path stroke="none" d="M0 0h24v24H0z" />
//               <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
//               <path d="M7 12h14l-3 -3m0 6l3 -3" />
//             </svg>
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div className="relative w-64 bg-purple-700 text-white flex flex-col justify-center">
//           <img
//             className="absolute -left-[-3.8%]" // Adjust positioning
//             style={{ top: "20%", transform: "scale(1.3)" }} // Adjust scale and position
//             src={chef}
//             alt="Chef"
//           />
//         </div>
//       )}

//       {/* Main content */}
//       <div className="flex-1 p-6">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/generate" element={<Generate />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/explore" element={<Explore />} />
//           <Route path="/chat" element={<Chat />} />
//           <Route path="/users/:id" element={<UserProfile />} />
//           <Route path="/WorldMap" element={<WorldMap />} />
//           <Route path="/cuisines/:country" element={<Cuisines />} />
//           <Route path="/cuisine/:cuisine" element={<CuisineDetail />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from 'react'

export const Home = () => {
  return (
    <div>Home</div>
  )
}
