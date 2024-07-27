import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	
};

const headSlice = createSlice({
	name: 'head',
	initialState: initialState,
	reducers: {
		setLoading(state, value) {
			state.loading = value.payload;
		},
		
	},
});

export const { setLoading } = headSlice.actions;
export default headSlice.reducer;
