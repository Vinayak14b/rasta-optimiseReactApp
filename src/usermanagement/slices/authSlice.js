import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: null,
	isAuthenticated: false,
	userType: null,
	token: null,
	name: null,
	username: null,
	office_name: null,
	office_level: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setLoading(state, value) {
			state.loading = value.payload;
		},
		setToken(state, value) {
			state.token = value.payload;
		},
		setUserType(state, action) {
			state.userType = action.payload.role;
			state.name = action.payload.name;
			// state.username = action.payload.username;
			state.office_level = action.payload.office_level
			state.office_name = action.payload.office_name;
		},
		setUsername(state, action) {
			state.username = action.payload;
		},
		loginUser: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload;
		},
		logoutUser: (state, action) => {
			state.isAuthenticated = false;
			state.token = null;
			state.name = null;
			state.username = null;
			state.userType = null;
		},
	},
});

export const { setLoading, setToken, setUserType, setUsername, loginUser, logoutUser } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
