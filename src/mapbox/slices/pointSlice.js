import { createSlice } from '@reduxjs/toolkit';

// initial state

const initialState = {
	loading: null,
	pointsLoaded: null,
	pointsData: null,
	dataLoaded:null,
	pointStatus:null,
	// removeMarker:null,
 
	
};

const pointSlice = createSlice({
	name: 'point',
	initialState: initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setPointsData(state, action) {
			state.pointsData = action.payload;
			state.pointsLoaded = true;
		}, 
		setPointStatus(state, action) {
			state.pointStatus = action.payload;
		},
		// setRemoveMarker(state, action) {
		// 	state.removeMarker = action.payload;
		// },
	


		 
	},
});

export const { setLoading, setPointsData ,setPointStatus,setRemoveMarker } = pointSlice.actions;
export const selectPoint = (state) => state.point;
export default pointSlice.reducer;
