import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	
};

const ownerSlice = createSlice({
	name: 'owner',
	initialState: initialState,
	reducers: {
		setLoading(state, value) {
			state.loading = value.payload;
		},
		
	},
});

export const { setLoading } = ownerSlice.actions;
export default ownerSlice.reducer;
