import { createSlice } from '@reduxjs/toolkit';

// initial state

const initialState = {
	loading: null,
	segmentsLoaded: null,
	segmentData: null,
	segmentStatus:null,
};

const segmentSlice = createSlice({
	name: 'segment',
	initialState: initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setSegmentData(state, action) {
			state.segmentData = action.payload;
			state.segmentsLoaded = true;
		},
		setSegmentStatus(state, action) {
			state.segmentStatus = action.payload;
		},
	},
});

export const { setLoading, setSegmentData,setSegmentStatus } = segmentSlice.actions;
export const selectSegment = (state) => state.segment;
export default segmentSlice.reducer;
