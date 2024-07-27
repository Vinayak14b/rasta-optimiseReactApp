//pointAPI
import { apiConnector } from '../../../usermanagement/services/apiConnector';
import { pointendpoints } from '../apis';
import { setLoading, setPointsData } from '../../slices/pointSlice';

export const getPoints = () => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		// const toastId = toast.loading('Loading..');
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				pointendpoints.GET_POINTS_BY_USER,
				null,
				{ authorization: token }
			);
  
			if (response.status === 200) {
				result = response?.data;
			}

			// dispatch(setPointStatus(response.status))
			dispatch(setPointsData(response.data.result));
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		dispatch(setLoading(false));
		// toast.dismiss(toastId);
	};
};

export const getSinglePointData = (imgData) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		let result = [];
		let query={}

		Object.keys(imgData).forEach((key) => {
			// Check if the value is not an empty string
			if (imgData[key] !== '') {
				query[key] = imgData[key];
			}
		});
		try {
			const response = await apiConnector(
				'GET',
				pointendpoints.GET_IMAGE_BY_LAT_LONG,
				null,
				{ Authorization: token },
				// { lat: query.lat, long: query.long }
				query
			);

			result = response?.data.data;

		} catch (error) {
			console.error('Error in getting onclick point data', error);
		}
		dispatch(setLoading(false));
		return result;
	};
};



