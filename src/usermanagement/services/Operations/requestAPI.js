import { setLoading } from '../../slices/profileSlice';
import { apiConnector } from '../apiConnector';
import { profileendpoints, tripapprovalendpoints } from '../apis';

export const getUnverifiedDataList = () => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				profileendpoints.GET_ALL_UNVERFIED_USERS,
				null,
				{ authorization: token }
			);

			if (response.status === 200) {
				result = response?.data?.unverifiedUsers;
			}
		} catch (error) {
			console.error('Error in getting Unverifed Users data', error);
		}
		dispatch(setLoading(false));
		return result;
	};
};

export const getUnverifiedJERequest = (username) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		let result = [];
		const url = `${profileendpoints.GET_SINGLE_UNIVERIFIED_REQUEST_DATA}/${username}`;
		try {
			const response = await apiConnector('GET', url, null, {
				authorization: token,
			});

			if (response.status === 200) {
				result = response?.data?.user;
			}
		} catch (error) {
			console.error('Error in getting Unverifed Users data', error);
		}
		dispatch(setLoading(false));
		return result;
	};
};
export const verifyJEProfileRequest = (username) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		try {
			const response = await apiConnector(
				'POST',
				profileendpoints.VERIFY_SINGLE_USER,
				null,
				{
					authorization: token,
				},
				{
					Username: username,
				}
			);

			if (response.status === 200) {
				// Resolve the promise if API call is successful
				return Promise.resolve(response.data); // Resolve with response data if needed
			} else {
				// Reject the promise if API call is not successful
				return Promise.reject(new Error('Failed to verify user'));
			}
		} catch (error) {
			console.error('in error',error);
			// Reject the promise if there's an error in the API call
			return Promise.reject(error);
		}
	};
};

export const getTripApprovalList = (limit, skip, searchQuery, filterQuery) => {
	return async (dispatch, getState) => {
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

		if (filterQuery !== 'All' && filterQuery) {
			queryParams.filterQuery = filterQuery;
		}

		try {
			const response = await apiConnector(
				'GET',
				tripapprovalendpoints.GET_TRIP_DATA,
				null,
				null,
				queryParams
			);

			if (response.status === 200) {
				result = response?.data;
			}
		} catch (error) {
			console.error('Error in getting Unverifed Users data', error);
		}
		// dispatch(setLoading(false));
		return result;
	};
};
