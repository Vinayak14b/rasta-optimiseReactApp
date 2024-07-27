import { setLoading } from '../../slices/profileSlice';
import { apiConnector } from '../apiConnector';
import { memberendpoints,profileendpoints } from '../apis';
import { toast } from 'react-hot-toast';

import { setProfileUserData } from '../../slices/profileSlice';
//implementation redux
export function ChangePasswordApi(
	currentPassword,
	email,
	newPassword,
	confirmPassword
) {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		try {
			const response = await apiConnector(
				'POST',
				memberendpoints.CHANGE_PASS,
				{
					currentPassword,
					email,
					newPassword,
					confirmPassword,
				},
				{ authorization: token }
			);
			if (response.status === 200) {
				toast.success('Password Changed Successfully');
			}
		} catch (error) {
			toast.error('Error in changing password');
		}
	};
}

export const getUserDataByUsername = (username) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		try {
			const response = await apiConnector(
				'GET',
				profileendpoints.GET_USER_DATA_BY_USERNAME,
				null,
				{ authorization: token },
				{ Username: username }
			);

			if (response.status === 200) {
				dispatch(setProfileUserData(response?.data?.userDetails));
			}
		} catch (error) {
			console.error('Error in getting owner data', error);
		}
	};
};

export const getAllVerifiedUserData = (limit, skip, searchQuery) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		let result = [];
		const queryParams = {};
		if (limit) {
			queryParams.limit = limit;
		}

		if (skip) {
			queryParams.skip = skip;
		}

		if (searchQuery) {
			queryParams.searchQuery = searchQuery;
		}
		try {
			const response = await apiConnector(
				'GET',
				profileendpoints.GET_ALL_VERIFIED_PROFILES,
				null,
				{ authorization: token },
				queryParams
			);
			result = response?.data;
		} catch (error) {
			console.error('Error in getting owner data', error);
		}
		dispatch(setLoading(false));
		return result;
	};
};

export const getJEProfileUnderAdminOwner = (username) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				profileendpoints.GET_JE_DATA_UNDER_ADMIN_OWNER,
				null,
				{ authorization: token },
				{ username }
			);

			result = response?.data?.userDetails;
		} catch (error) {
			console.error('Error in getting owner data', error);
		}
		dispatch(setLoading(false));
		return result;
	};
};

export function deleteVerifedUser(username) {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// dispatch(setLoading(true));
		try {
			const response = await apiConnector(
				'POST',
				profileendpoints.DELETE_VERIFIED_USER,
				{
					Username: username,
				},
				{ authorization: token }
			);
			if (response.status === 200) {
				toast.success('User Deleted Successfully');
			}
		} catch (error) {
			console.error('Error in Deleting the User  ', error);
			
			return false;
		}
		return true;
	};
}
