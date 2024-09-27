import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, toggleOption, removeOption, clearSearchTerm } from '../redux/searchSlice';

const SearchWithMultiSelect = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const selectedOptions = useSelector((state) => state.search.selectedOptions);

  const options = [
    "Chicken",
    "Butter",
    "Cream",
    "Tomato Puree",
    "Garam Masala",
    "Ginger",
    "Garlic",
    "Potatoes",
    "Cauliflower",
    "Turmeric",
    "Cumin Seeds",
    "Coriander",
    "Green Chilies",
    "Rice",
    "Urad Dal",
    "Fenugreek Seeds",
    "Salt",
    "Water",
    "Spinach",
    "Paneer",
    "Onion",
    "Tomatoes",
    "Basmati Rice",
    "Yogurt",
    "Biryani Masala",
    "Saffron",
    "Ghee",
    "Tamarind",
    "Toor Dal",
    "Mustard Seeds",
    "Curry Leaves",
    "Rasam Powder",
    "Chickpeas",
    "Flour",
    "Chole Masala",
    "Masoor Dal",
    "Green Chilies",
    "Green Peas",
    "Pav Bhaji Masala",
    "Sambar Powder",
    "Drumsticks",
    "Carrots",
    "Mutton",
    "Rogan Josh Masala",
    "Bell Peppers",
    "Semolina",
    "Red Chili Powder",
    "Ginger-Garlic Paste",
    "Puri",
    "Mint",
    "Black Chickpeas",
    "Chaat Masala",
    "Black Lentils",
    "Kidney Beans",
    "Eno",
    "Cashews",
    "Okra",
    "Wheat Flour",
    "Green Gram",
    "Eggplant",
    "Mustard Oil",
    "Sugar",
    "Cardamom",
    "Wheat",
    "Meat",
    "Fish",
    "Coconut Milk",
    "Milk",
    "Khoya",
    "Rose Water",
    "Dry Fruits"
  ];
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    dispatch(toggleOption(option));
    dispatch(clearSearchTerm()); // Clear search term after selection
  };

  const handleRemoveTag = (option) => {
    dispatch(removeOption(option));
  };

  return (
    <div className="w-[100%]">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search and select..."
        className="border focus:outline-none focus:border-purple-700 border-gray-700 w-[70%] rounded-full px-4 py-2"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        required
      />

      {/* Filtered Options */}
      {searchTerm && (
        <ul className=" max-h-28 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`px-4 py-2 cursor-pointer ${
                  selectedOptions.includes(option) ? 'bg-purple-100' : 'hover:bg-purple-100'
                }`}
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}

      {/* Selected Items (Tags) */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        {selectedOptions.map(option => (
          <div key={option} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full flex items-center">
            <span>{option}</span>
            <button
              onClick={() => handleRemoveTag(option)}
              className="ml-2 text-purple-600 hover:text-purple-800"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchWithMultiSelect;
