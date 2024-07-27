//mapSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: null,
  mapData: null,
  searchQuery:null
};
const mapSlice = createSlice({
	name: 'map',
	initialState: initialState,
	reducers: {
		setMap(state, action) {
			state.mapData = action.payload;

			// return produce(state, (draftState) => {
			// 	draftState.mapData = action.payload;
			// });
		},
		setSearchQueryMap(state, action) {
			
      state.searchQuery = action.payload;
		
		},
	},
});
export const { setMap,setSearchQueryMap } = mapSlice.actions;
export const selectMap = (state) => state.map;
export default mapSlice.reducer;
