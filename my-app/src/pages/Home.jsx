// import React, { useEffect, useState } from "react";
// import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
// import ProfilePage from "../pages/ProfilePage";
// import Generate from "./Generate";
// import Signup from "../pages/Signup";
// import Login from "../pages/Login";
// import chef from "../images/chefG.png";
// import Explore from "./Explore";
// import UserProfile from "./UserProfile";
// import WorldMap from "./WorldMap";
// import Cuisines from "../pages/Cuisines";
// import CuisineDetail from "../components/CuisineDetail";
// import { useDispatch } from 'react-redux';
// import { login, logout } from '../redux/userSlice';
// import { useSelector } from 'react-redux';

// const Home = () => {
//   const [explore, setExplore] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.search.isLoggedIn);
//   const fetchUser = async () => {
//     const response = await fetch("http://localhost:3001/users/user", {
//       method: "GET",
//       credentials: "include",
//     });
//     const data = await response.json();
//     if (data && data._id) {
//       dispatch(login({ userId: data._id })); // Save only the user ID in Redux
//     }
    
//   };

//   useEffect(() => {
//     if (isAuthenticated){
//       fetchUser();
//     }
//   }, [isAuthenticated]);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login'); // Redirect to login if not authenticated
//     }
//   }, [isAuthenticated]);
//   // useEffect(() => {
//   //   const checkAuth = async () => {
//   //     try {
//   //       const response = await fetch('http://localhost:3001/auth/', {
//   //         method: 'GET',
//   //         credentials: 'include',
//   //       });
  
//   //       const data = await response.json();
//   //       if (response.ok && data.loggedIn) {
//   //         setIsLoggedIn(true);
//   //       } else {
//   //         // Handle session expiration
//   //         if (data.message === 'Session expired. Please log in again.') {
//   //           alert('Your session has expired. Please log in again.');
//   //         }
//   //         setIsLoggedIn(false);
//   //         navigate('/login');
//   //       }
//   //     } catch (error) {
//   //       console.error('Error checking authentication:', error);
//   //       setIsLoggedIn(false);
//   //     }
//   //   };
  
//   //   checkAuth();
//   // }, [navigate]);
  
//   const logoutHandler = async () => {
//     const apiUrl = 'http://localhost:3001/auth/logout';
//     const response = await fetch(apiUrl, { method: "GET", credentials: "include" });
//     if (response.ok) {
//       setIsLoggedIn(false);
//       dispatch(logout());
//       navigate('/login');  // Redirect to login
//     }
//   };

//   return (
//     <div className="flex h-screen bg-blue-50">
//       {/* Sidebar */}
//       {isAuthenticated ? (
//         <div className="w-64 bg-purple-700 text-white flex flex-col">
//           <div className="p-6">
//             <h1 className="text-3xl font-bold">SUCCESS</h1>
//           </div>

//           <nav className="mt-6 flex-1">
//             <ul>
//               {/* Use NavLink for highlighting active link with transition */}
//               <li className=" py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/profile"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300 ease-in-out"
//                       : "px-6 rounded-md block transition-colors duration-300 ease-in-out"
//                   }
//                   end
//                 >
//                   Profile
//                 </NavLink>
//               </li>
//               <li className=" py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/explore"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300 ease-in-out"
//                       : "px-6 rounded-md block transition-colors duration-300 ease-in-out"
//                   }
//                 >
//                   Explore
//                 </NavLink>
//               </li>
//               <li className=" py-3 transition-all duration-300 ease-in-out">
//                 <NavLink
//                   to="/generate"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300 ease-in-out"
//                       : "px-6  rounded-md block transition-colors duration-300 ease-in-out"
//                   }
//                 >
//                   Generate
//                 </NavLink>
//               </li>
//               <li className=" py-3 transition-all duration-300 ease-in-out">
//               <NavLink
//                   to="/chat"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300 ease-in-out"
//                       : "px-6 rounded-md block transition-colors duration-300 ease-in-out"
//                   }
//                 >
//                   Chat
//                 </NavLink>
//               </li>
//               <li className=" py-3 transition-all duration-300 ease-in-out">
//               <NavLink
//                   to="/subscribe"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300 ease-in-out"
//                       : "px-6 rounded-md block transition-colors duration-300 ease-in-out"
//                   }
//                 >
//                   Subscribe
//                 </NavLink>
//               </li>
//               <li className=" py-3 transition-all duration-300 ease-in-out">
//               <NavLink
//                   to="/WorldMap"
//                   className={({ isActive }) =>
//                     isActive
//                       ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300 ease-in-out"
//                       : "px-6 rounded-md block transition-colors duration-300 ease-in-out"
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
//           {/* Chef Image - Positioned for alignment */}
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
//         {/* Header */}
//         {explore ? '' : (
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl font-bold">Profile</h2>
//             <input
//               type="text"
//               placeholder="Я ищу ..."
//               className="border border-gray-300 rounded-full px-4 py-2"
//             />
//           </div>
//         )}

//         <Routes>
//           <Route path="/" element={<ProfilePage />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/generate" element={<Generate />} />
//           <Route path="/signup" element={<Signup />} /> 
//           <Route path="/login" element={<Login />} /> 
//           <Route path="/explore" element={<Explore />} />
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


import React, { useEffect, useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import Generate from "./Generate";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import chef from "../images/chefG.png";
import Explore from "./Explore";
import UserProfile from "../components/UserProfile";
import WorldMap from "./WorldMap";
import Cuisines from "../pages/Cuisines";
import CuisineDetail from "../components/CuisineDetail";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userSlice";
import { Chat } from "./Chat";

const Home = () => {
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated); // Whether explore view is active
  const navigate = useNavigate();
  // const [loggedInUser, setLoggedInUser] = useState(useSelector((state) => state.user.userId))

  const dispatch = useDispatch();
   // Using Redux state
  console.log(isAuthenticated)

  // Fetch user data if authenticated
  const fetchUser = async () => {
    const response = await fetch("http://localhost:3001/users/user", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (data && data._id) {
      dispatch(login({ userId: data._id })); // Dispatch login action
    }
  };


  useEffect(() => {
    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);


  useEffect(() => {
        const checkAuth = async () => {
          try {
            const response = await fetch('http://localhost:3001/auth/', {
              method: 'GET',
              credentials: 'include',
            });
      
            const data = await response.json();
            if (response.ok && data.loggedIn) {
              setIsLoggedIn(true);
            } else {
              // Handle session expiration
              if (data.message === 'Session expired. Please log in again.') {
                alert('Your session has expired. Please log in again.');
              }
              setIsLoggedIn(false);
              const currentPath = window.location.pathname;
    
            // Redirect only if the user is not authenticated and is not on login/signup routes
            if ( !['/login', '/signup'].includes(currentPath)) {
              navigate("/login");
            }
            }
          } catch (error) {
            console.error('Error checking authentication:', error);
            setIsLoggedIn(false);
          }
        };
      
        checkAuth();
      }, [navigate]);

  // Logout handler
  const logoutHandler = async () => {
    const apiUrl = "http://localhost:3001/auth/logout";
    const response = await fetch(apiUrl, { method: "GET", credentials: "include" });
    if (response.ok) {
      dispatch(logout({ userId: null, isLoggedIn:false })); // Logout action in Redux
      navigate("/login"); // Redirect to login
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      {isLoggedIn ? (
        <div className="w-64 bg-purple-700 text-white flex flex-col">
          <div className="p-6">
            <h1 className="text-3xl font-bold">SUCCESS</h1>
          </div>

          <nav className="mt-6 flex-1">
            <ul>
              <li className="py-3 transition-all duration-300 ease-in-out">
                <NavLink to="/profile" className={({ isActive }) =>
                    isActive
                      ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
                      : "px-6 rounded-md block transition-colors duration-300"}>
                  Profile
                </NavLink>
              </li>
              <li className="py-3 transition-all duration-300 ease-in-out">
                <NavLink to="/explore" className={({ isActive }) =>
                    isActive
                      ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
                      : "px-6 rounded-md block transition-colors duration-300"}>
                  Explore
                </NavLink>
              </li>
              <li className="py-3 transition-all duration-300 ease-in-out">
                <NavLink to="/generate" className={({ isActive }) =>
                    isActive
                      ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
                      : "px-6 rounded-md block transition-colors duration-300"}>
                  Generate
                </NavLink>
              </li>
              <li className="py-3 transition-all duration-300 ease-in-out">
                <NavLink to="/chat" className={({ isActive }) =>
                    isActive
                      ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
                      : "px-6 rounded-md block transition-colors duration-300"}>
                  Chat
                </NavLink>
              </li>
              <li className="py-3 transition-all duration-300 ease-in-out">
                <NavLink to="/subscribe" className={({ isActive }) =>
                    isActive
                      ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
                      : "px-6 rounded-md block transition-colors duration-300"}>
                  Subscribe
                </NavLink>
              </li>
              <li className="py-3 transition-all duration-300 ease-in-out">
                <NavLink to="/WorldMap" className={({ isActive }) =>
                    isActive
                      ? "bg-purple-800 px-6 py-3 rounded-md block transition-colors duration-300"
                      : "px-6 rounded-md block transition-colors duration-300"}>
                  Cuisine Tour
                </NavLink>
              </li>
            </ul>
          </nav>
          <button className="px-6 py-3 flex gap-1 items-center" onClick={logoutHandler}>
            <svg
              className="h-5 w-5 text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
              <path d="M7 12h14l-3 -3m0 6l3 -3" />
            </svg>
            Logout
          </button>
        </div>
      ) : (
        <div className="relative w-64 bg-purple-700 text-white flex flex-col justify-center">
          <img
            className="absolute -left-[-3.8%]" // Adjust positioning
            style={{ top: "20%", transform: "scale(1.3)" }} // Adjust scale and position
            src={chef}
            alt="Chef"
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/WorldMap" element={<WorldMap />} />
          <Route path="/cuisines/:country" element={<Cuisines />} />
          <Route path="/cuisine/:cuisine" element={<CuisineDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
