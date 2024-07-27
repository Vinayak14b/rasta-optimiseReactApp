import { apiConnector } from '../../apiConnector';
import { reportendpoints } from '../../apis';

export const getOverviewReport = () => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// dispatch(setLoading(true));
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				reportendpoints.GET_OVERVIEW_REPORT_DETAILS,
				null,
				{ authorization: token }
			);

			result = response?.data;
		} catch (error) {
			console.error('Error in getting owner data', error);
		}
		// dispatch(setLoading(false));
		return result;
	};
};

export const getListOfAllRoad = (officeLevel, officeName, roadName, roadNo) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// dispatch(setLoading(true));
		let result = [];
		let params = {};

		if (officeLevel === 'Road') {
			params = {
				roadName,
				roadNo,
			};
		} else {
			params = {
				officeLevel,
				officeName,
			};
		}
		try {
			const response = await apiConnector(
				'GET',
				reportendpoints.GET_LIST_OF_ROADS,
				null,
				{ authorization: token },
				params
			);
			result = response?.data;
		} catch (error) {
			console.error('Error in getting owner data', error);
		}
		// dispatch(setLoading(false));
		return result;
	};
};

export const getDetailOfAllRoad = (
	officeLevel,
	officeName,
	roadName,
	roadNo
) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// dispatch(setLoading(true));
		let result = [];
		let params = {};

		if (officeLevel === 'Road') {
			params = {
				roadName,
				roadNo,
			};
		} else {
			params = {
				officeLevel,
				officeName,
			};
		}
		try {
			const response = await apiConnector(
				'GET',
				reportendpoints.GET_DETAIL_OF_EACH_ROAD,
				null,
				{ authorization: token },
				params
			);
			result = response?.data;
		} catch (error) {
			console.error('Error in getting owner data', error);
		}
		// dispatch(setLoading(false));
		return result;
	};
};

export const getDetailOfAllChainageForRoad = (
	officeLevel,
	officeName,
	roadName,
	roadNo
) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// dispatch(setLoading(true));
		let result = [];
		let params = {};

		if (officeLevel === 'Road') {
			params = {
				roadName,
				roadNo,
			};
		} else {
			params = {
				officeLevel,
				officeName,
			};
		}
		try {
			const response = await apiConnector(
				'GET',
				reportendpoints.GET_DETAIL_OF_CHAINAGE,
				null,
				{ authorization: token },
				params
			);
			result = response?.data;
		} catch (error) {
			console.error('Error in getting owner data', error);
		}
		// dispatch(setLoading(false));
		return result;
	};
};


export const getHigherAuthority = (
	officeLevel,
	officeName,
	roadName,
	roadNo
) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// dispatch(setLoading(true));
		let result = [];
		let params = {};

		if (officeLevel === 'Road') {
			params = {
				roadName,
				roadNo,
			};
		} else {
			params = {
				officeLevel,
				officeName,
			};
		}
		try {
			const response = await apiConnector(
				'GET',
				reportendpoints.GET_AUTHORITY,
				null,
				{ authorization: token },
				params
			);
			result = response?.data;
		} catch (error) {
			console.error('Error in getting owner data', error);
		}
		// dispatch(setLoading(false));
		return result;
	};
};
