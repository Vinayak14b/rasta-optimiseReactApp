import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	asset: {},
	defect: {},
};

const imageResponseSlice = createSlice({
	name: 'imageResponse2',
	initialState,
	reducers: {
		setAsset(state, action) {
			state.asset = { ...state.asset, ...action.payload };
		},
		removeAsset(state, action) {
			const { [action.payload]: _, ...rest } = state.asset;
			state.asset = rest;
		},
		emptyAsset(state) {
			state.asset = {};
		},
		setDefect(state, action) {
			state.defect = { ...state.defect, ...action.payload };
		},
		removeDefect(state, action) {
			const { [action.payload]: _, ...rest } = state.defect;
			state.defect = rest;
		},
		resetState(state) {
			return initialState;
		},
		emptyDefect(state) {
			state.defect = {};
		},
	},
});

export const {
	emptyAsset,
	emptyDefect,
	setAsset,
	removeAsset,
	setDefect,
	removeDefect,
	resetState,
} = imageResponseSlice.actions;
export const selectImageResponse2 = (state) => state.imageResponse2;

export default imageResponseSlice.reducer;
