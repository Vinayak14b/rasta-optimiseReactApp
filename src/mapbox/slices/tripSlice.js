//tripSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: null,
	selectedButton: null,
	defaultRegionValue: null,
	selectedTrips: null,
	selectedCompareOffices: null,
	dateAvailable: null,
	selectedOfficeLevel: null,
	selectedOfficeName: null,
};
const tripSlice = createSlice({
	name: 'trip',
	initialState: initialState,
	reducers: {
		setSelectedButton(state, action) {
			state.selectedButton = action.payload;
		},
		setDefaultRegionValue(state, action) {
			state.defaultRegionValue = action.payload;
		},
		setSelectedTripSlice(state, action) {
			state.selectedTrips = action.payload;
		},
		setselectedCompareOffices(state, action) {
			state.selectedCompareOffices = action.payload;
		},
		setDateAvailable(state, action) {
			state.dateAvailable = action.payload;
		},
		setSelectedOfficeLevel(state, action) {
			state.selectedOfficeLevel = action.payload;
		},
		setSelectedOfficeName(state, action) {
			state.selectedOfficeName = action.payload;
		}

	},
});
export const {
	setSelectedButton,
	setDefaultRegionValue,
	setSelectedTripSlice,
	setselectedCompareOffices,
	setDateAvailable,
	setSelectedOfficeLevel,
    setSelectedOfficeName,
} = tripSlice.actions;
export const selectTrip = (state) => state.trip;
export default tripSlice.reducer;
