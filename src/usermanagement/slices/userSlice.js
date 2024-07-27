// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null, // You can store user details here (e.g., ID, name, email)
	permissions: null,
	isLocation: false,
	latlng: [],
	
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setPermissions: (state, action) => {
			state.permissions = action.payload;
		},
		setIsLocation: (state, action) => {
			state.isLocation = action.payload;
		},
		setLatLng: (state, action) => {
			state.latlng = action.payload;
		},

		
	},
});

export const { setUser, setPermissions, setIsLocation, setLatLng, selectGeoLocation } =
	userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectPermissions = (state) => state.user.permissions;
export const selectLatLng = (state) => state.user;
export default userSlice.reducer;
