import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	
};

const officeSlice = createSlice({
	name: 'office',
	initialState: initialState,
	reducers: {
		setLoading(state, value) {
			state.loading = value.payload;
		},
		setOffices(state, value) {
			state.officesData = value.payload;
		},

		
	},
});

// const officeDetailSlice = createSlice({
// 	name: 'officeDetail',
// 	initialState: initialState,
// 	reducers: {
// 		setLoading(state, value) {
// 			state.loading = value.payload;
// 		},
// 		setOfficeDetails(state, value) {
// 			state.officeDetail = value.payload;
// 		},
// 	},
// });


export const { setLoading, setOffices } =
	officeSlice.actions;
export default officeSlice.reducer;
