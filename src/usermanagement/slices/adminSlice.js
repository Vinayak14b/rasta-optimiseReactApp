import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
};

const adminSlice = createSlice({
	name: 'admin',
	initialState: initialState,
	reducers: {
		setLoading(state, value) {
			state.loading = value.payload;
		},
	},
});

export const { setLoading } = adminSlice.actions;
export default adminSlice.reducer;
