import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

const AddRecipe = ({ onClose, onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", measurement: "", unit: "" }]);
  const [instructions, setInstructions] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null); 
  const apiBase = process.env.REACT_APP_API_URL;
  const units = ["g", "kg", "lb", "oz", "ml", "l", "tsp", "tbsp", "cups", "fl oz", "pints", "quarts", "gallons", "pieces", "slices", "units"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("ingredients", JSON.stringify(ingredients));  
    formData.append("instructions", instructions);
    formData.append("hashtags", JSON.stringify(hashtags.split(" ").filter(tag => tag)));
    if (image) {
      formData.append("image", image);
    }

    const apiUrl = `${apiBase}/post/addPost`;
    
    const response =fetch(apiUrl, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "success") {
          onPostAdded(); 
          onClose();  
        } else {
          setError("Failed to submit recipe");  
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError("An error occurred during submission.");
      });
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", measurement: "", unit: "" }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white h-[70%] max-h-[80%] w-full max-w-md mx-4 rounded-lg shadow-lg overflow-y-scroll">
        {/* Header */}
        <div className="sticky top-0 bg-purple-700 text-white z-10 flex justify-between items-center p-6 border-b border-gray-300">
          <h2 className="text-2xl font-bold">Add New Recipe</h2>
          <button type="button" onClick={onClose} className="text-white rotate-180 scale-150">
            <IoMdArrowBack />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                minLength={4}
                maxLength={12}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={description}
                minLength={15}
                maxLength={40}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                rows="3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ingredients</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                    placeholder="Ingredient Name"
                    className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                    required
                  />
                  <input
                    type="text"
                    value={ingredient.measurement}
                    onChange={(e) => handleIngredientChange(index, "measurement", e.target.value)}
                    placeholder="Measurement"
                    className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                    required
                  />
                  <select
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                    className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                    required
                  >
                    <option value="">Unit</option>
                    {units.map((unit, i) => (
                      <option key={i} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              ))}
              <button type="button" onClick={handleAddIngredient} className="text-purple-700">
                + Add another ingredient
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Instructions</label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
                rows="3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Hashtags</label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="e.g., #vegan #easyrecipe"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-purple-700"
              />
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded">
                Post Recipe
              </button>
            </div>

            {error && <div className="text-red-500 mt-4">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
