import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  selectedOptions: [],
  isLoggedIn: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    toggleOption: (state, action) => {
      if (state.selectedOptions.includes(action.payload)) {
        state.selectedOptions = state.selectedOptions.filter(
          item => item !== action.payload
        );
      } else {
        state.selectedOptions.push(action.payload);
      }
    },
    removeOption: (state, action) => {
      state.selectedOptions = state.selectedOptions.filter(
        item => item !== action.payload
      );
    },
    clearSearchTerm: (state) => {
      state.searchTerm = '';
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  }
});



export const { setSearchTerm, toggleOption, removeOption, clearSearchTerm,setIsLoggedIn } = searchSlice.actions;

export default searchSlice.reducer;
