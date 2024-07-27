//backOfficeAPI
import { toast } from 'react-hot-toast';
import { apiConnector } from '../../../usermanagement/services/apiConnector';
import { setLoading } from '../../slices/pointSlice';
import { backOfficeendPoints, pointendpoints } from '../apis';

export const editLatLng = (lat, long, predImg) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));

		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				backOfficeendPoints.EDIT_LAT_LNG_IMAGE,
				null,
				{ authorization: token },
				{ lat, long, predImg }
			);

			if (response.status === 200) {
				result = response?.data;
			}

			return result;
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		dispatch(setLoading(false));
	};
};

export const saveLatLng = (lat, long, imageId) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		try {
			const response = await apiConnector(
				'GET',
				backOfficeendPoints.UPDATE_LAT_LNG,
				null,
				{ authorization: token },
				{ lat, long, imageId }
			);
			return response;
		} catch (error) {
			console.error(error);
		}
	};
};

// export const saveAnnotation=({roadName, roadNo, imageId, imageResponse })=>{
// 	return async (dispatch, getState) => {
// 		const { token } = getState().auth;
// 	try {
// 		const response = await apiConnector(
// 			'POST',
// 			backOfficeendPoints.SAVE_ANNOTATION,
// 			{
// 				roadName,roadNo,imageId,imageResponse
// 			},
// 			{ authorization: token }
// 		);
// 		// console.log("response is ",response);

// 	} catch (error) {

// 		console.error(error)
// 	}
// }
// }

export const saveAnnotation = (formData) => {
	return async (dispatch, getState) => {
		console.log('formData', formData);

		const { token } = getState().auth;

		try {
			const response = await apiConnector(
				'POST',
				backOfficeendPoints.SAVE_ANNOTATION,
				formData,
				{
					Authorization: token,
					'Content-Type': 'multipart/form-data',
				}
			);

			if (response?.status == 200) {
				toast.success('Updated the Image  and Saved Successfully ');
			}
			return response;
		} catch (error) {
			console.error('errir  saveAnnotation:', error);
			toast.error('Error while saving the updated image');
		}
	};
};

export const saveRoadInfo = ({ newRoadData, roadId }) => {
	console.log('newRoadData', newRoadData);

	return async (dispatch, getState) => {
		const { token } = getState().auth;
		try {
			const response = await apiConnector(
				'POST',
				backOfficeendPoints.SAVE_ROAD_INFO,
				{
					roadId: roadId,
					roadName: newRoadData?.roadName,
					roadNo: newRoadData?.roadNo,
					roadCategory: newRoadData?.roadCategory,
					roadType: newRoadData?.roadType,
					juniorExecutiveName: newRoadData?.JEName,
					Date: newRoadData?.Date,
				},
				{ Authorization: token } // Include Bearer token
			);

			if (response?.status == 200) {
				toast.success('Information Updated Successfully');
			}
		} catch (error) {
			toast.error('Information failed to save');
			console.error(error);
		}
		return token;
	};
};

export const editRoadInfo = ({ roadId }) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;

		try {
			const response = await apiConnector(
				'GET',
				backOfficeendPoints.EDIT_ROAD_INFO,
				null,
				{ authorization: token },
				{ roadId }
			);
			// console.log(response);

			if (response.status === 200) {
				return response?.data;
			}
		} catch (error) {
			console.error(error);
		}
	};
};

export const saveRechainage = ({
	roadId,
	startChainage,
	endChainage,
	isAscending,
}) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		try {
			const response = await apiConnector(
				'POST',
				backOfficeendPoints.SAVE_RECHAINAGE,
				{
					roadId: roadId,
					startChainage: startChainage,
					endChainage: endChainage,
					isAscending: isAscending,
				},
				{ Authorization: token }
			);

			if (response?.status == 200) {
				toast.success('Chainage Updated Sucessfully');
			}
		} catch (error) {
			console.error(error);
			toast.error('Rechainage Failed to Update ');
		}
		return token;
	};
};
