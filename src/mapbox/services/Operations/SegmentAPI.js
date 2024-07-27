//pointAPI
import { apiConnector } from '../../../usermanagement/services/apiConnector';
import { segmentendpoints } from '../apis';
import { setLoading, setSegmentData } from '../../slices/segmentSlice';

export const getSegments = () => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		

		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				segmentendpoints.GET_SEGMENTS_BY_USER,
				null,
				{ authorization: token }
			);
			if (response.status === 200) {
				result = response?.data;
			}
			// dispatch(setSegmentStatus(response.status))

			dispatch(setSegmentData(response.data.result));
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		dispatch(setLoading(false));
		
	};
};

export const getSingleSegmentData = (chainage,roadName,roadNo) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		let result = [];
		try {
			// const response = await apiConnector(
			// 	'GET',
			// 	`${url}[${coordinates.join(',')}] `
			// );
			const response = await apiConnector(
				'GET',
				segmentendpoints.GET_SINGLE_SEGMENT_DATA,
				null,
				null,
				{ roadNo, roadName, chainnage: chainage }
			);


			result = response?.data;

		} catch (error) {
			console.error('Error in getting onclick point data', error);
		}
		dispatch(setLoading(false));
		return result;
	};
};
