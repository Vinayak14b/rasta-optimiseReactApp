import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	profileUserData: null,
	// budgetFlag: false,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState: initialState,
	reducers: {
		setLoading(state, value) {
			state.loading = value.payload;
		},
		setProfileUserData(state, value) {
			state.profileUserData = value.payload;
		},
		// setBudgetFlag: (state, value) => {
		// 	state.budgetFlag = value.payload;
		// },
	},
});

export const { setLoading, setProfileUserData } =
	profileSlice.actions;
export const selectProfile = (state) => state.profile;
export default profileSlice.reducer;
