import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Chatbox from "../components/Chatbox";

const Cuisines = () => {
  const { country } = useParams();
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const response = await fetch(
          `https://yummy-deploy-1z7n.onrender.com/cuisines/country/${country}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCuisines(data);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
        setError("Failed to load cuisines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCuisines();
  }, [country]);

  const handleCuisineClick = (cuisine, description) => {
    navigate(`/cuisine/${cuisine}`, { state: { description } });
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Main Content */}
      <div className="flex-grow px-8 py-6 overflow-y-auto">
        <div className="mx-auto w-full p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            {country} Cuisines
          </h1>

          {loading && (
            <p className="text-center text-gray-500">Loading cuisines...</p>
          )}

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          <ul className="space-y-4">
            {cuisines.map((item) => (
              <li
                key={item._id}
                className="p-4 bg-gray-50 rounded-lg transition-shadow hover:shadow-lg cursor-pointer"
                onClick={() =>
                  handleCuisineClick(item.cuisine, item.description)
                }
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  {item.cuisine}
                </h2>
                <p className="text-gray-600">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-1/3 bg-white p-5 border-l h-full">
        <Chatbox />
      </div>
    </div>
  );
};

export default Cuisines;
