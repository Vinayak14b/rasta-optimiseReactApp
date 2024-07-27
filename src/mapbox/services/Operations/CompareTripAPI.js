import { apiConnector } from '../../../usermanagement/services/apiConnector';
import { comparetripendpoints } from '../apis';

export const getSingleRoadTripHistory = (roadName, roadNo) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// const toastId = toast.loading('Loading..');
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				comparetripendpoints.GET_SINGLE_TRIP_HISTORY,
				null,
				{ authorization: token },
				{ roadName, roadNo }
			);

			if (response.status === 200) {
				result = response?.data?.result;
			}
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		return result;
	};
};

export const getDatesForOffice = (officeName, officeLevel) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// const toastId = toast.loading('Loading..');
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				comparetripendpoints.GET_SUREY_DATES_FOR_OFFICE,
				null,
				{ authorization: token },
				{ officeName, officeLevel }
			);

			if (response.status === 200) {
				result = response?.data?.result;
			}
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		return result;
	};
};

export const getOfficeDataMonthWise = (officeName, officeLevel, date) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// const toastId = toast.loading('Loading..');
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				comparetripendpoints.GET_OFFICE_DATE_MONTH_WISE,
				null,
				{ authorization: token },
				{ officeName, officeLevel, calender: date }
			);
			('response', response);

			if (response.status === 200) {
				result = response?.data;
			}
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		return result;
	};
};

export const getRoadDataByDate = (roadName, roadNo, date) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// const toastId = toast.loading('Loading..');
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				comparetripendpoints.GET_ROAD_DATA_DATE_WISE,
				null,
				{ authorization: token },
				{ roadName, roadNo, calender: date }
			);

			if (response.status === 200) {
				result = response?.data;
			}
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		return result;
	};
};
