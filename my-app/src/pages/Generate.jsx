import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchWithMultiSelect from "../components/SearchWithMultiSelect";
import pan from "../images/pan.png";
import chef from "../images/Chef.gif";
import Chatbox from "../components/Chatbox";

const Generate = () => {
  const selectedOptions = useSelector((state) => state.search.selectedOptions);
  const [predictedRecipe, setPredictedRecipe] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const apiBase = process.env.REACT_APP_API_URL;
  const handleGenerate = async () => {
    console.log("Selected Ingredients:", selectedOptions);

    const apiUrl = `${apiBase}/AI/generate`;

    const data = {
      ingredients: selectedOptions,
    };
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("res", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("API Response:", result.predictedRecipe);

      setPredictedRecipe(result.predictedRecipe);
    } catch (error) {
      console.error("Error sending data to API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Main Content */}
      <div className="flex-grow px-8 py-0 h-full overflow-y-scroll">
        <div className="flex w-full">
          <div className="flex bg-white flex-col items-center w-full min-h-screen">
            <div
              className={`${
                predictedRecipe || loading ? "mt-[-18%] w-[75%] " : " w-[75%]"
              }`}
            >
              <div
                className={`${
                  predictedRecipe || loading
                    ? "relative h-[46%]"
                    : "relative h-[65%]"
                }`}
              >
              
                <img
                  src={pan} 
                  alt="Pan with vegetables"
                  className={`${
                    predictedRecipe || loading
                      ? "w-full scale-50 relative -top-9"
                      : "w-full scale-75 relative -top-9"
                  }`}
                />
                <div
                  className={`${
                    predictedRecipe || loading
                      ? "absolute top-[49%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[100%] pb-2 font-bold text-5xl"
                      : "absolute top-[49%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[100%] pb-2 font-bold text-6xl"
                  }`}
                >
                  Generate Recipe!
                </div>
              </div>

              <div
                className={`${
                  predictedRecipe || loading
                    ? "flex relative -mt-8"
                    : "flex relative "
                }`}
              >
                <SearchWithMultiSelect disabled={loading} />
                <button
                  className="bg-purple-700 absolute  text-white py-2 top-0 right-[15%] px-6 rounded-full"
                  onClick={handleGenerate}
                  disabled={loading} 
                >
                  {loading ? "Generating..." : "Generate Now"}{" "}
                </button>
              </div>
              <p className="text-lg text-center text-purple-700 mt-4 mb-4">
                Here you can cook some amazing recipes!
              </p>

              {loading && (
                <div className="relative -top-24">
                 
                  <div className="loader mt-4"></div>{" "}
                  <img className="scale-50" src={chef} />
                </div>
              )}

              {/* Display the predicted recipe */}
              {predictedRecipe && !loading && (
                <>
                  <div className="bg-purple-100 rounded-lg w-[60%] m-auto shadow-lg transform transition-transform hover:scale-105 duration-300">
                    <div className="bg-purple-700 p-6 flex justify-between items-center font-semibold text-white rounded-t-lg">
                      <div>
                        <h1 className="text-2xl mb-1">
                          {predictedRecipe.RecipeName}
                        </h1>
                        <p className="text-sm text-purple-200">
                          {predictedRecipe.CookingTime}
                        </p>
                      </div>
                      <div className="bg-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                        {predictedRecipe.CuisineType}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <div className="flex justify-between items-center">
                          <h1 className="text-md font-bold text-purple-700">
                            Preparation Instructions:
                          </h1>
                          <p className="text-sm text-gray-600">
                            {predictedRecipe.ServingSize}
                          </p>
                        </div>
                        <div className="mt-2 space-y-2">
                          {predictedRecipe.Instructions.split(/\d+/)
                            .slice(1)
                            .map((instruction, index) => (
                              <ol
                                key={index}
                                className="list-disc list-inside text-gray-700"
                              >
                                <li>{instruction.slice(1)}</li>
                              </ol>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Right Sidebar */}
      <div className="w-1/3 bg-white p-5 border-l h-full">
        <Chatbox />
        
      </div>
    </div>
  );
};

export default Generate;
