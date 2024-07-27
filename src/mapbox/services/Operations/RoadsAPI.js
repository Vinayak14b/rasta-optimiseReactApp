import { roadendpoints } from '../apis';
import { apiConnector } from '../../../usermanagement/services/apiConnector';
import { setLoading } from '../../slices/pointSlice';

export const getSurveyedRoadData = (setLoading,queryObject) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		setLoading(true);
		// const toastId = toast.loading('Loading..');
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				roadendpoints.GET_ALL_SURVEYED_ROAD,
				null,
				{ authorization: token },
				queryObject
			);

			if (response.status === 200) {
				result = response.data.roadList;
			}
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		setLoading(false);
		// toast.dismiss(toastId);

		return result;
	};
};

export const getSingleRoadPointData = (queryObject,chainage) => {
 
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		dispatch(setLoading(true));
		// const toastId = toast.loading('Loading..');
		let result = [];
		if (chainage) {
            queryObject.chainage = chainage;
        }
	 
		try {
			const response = await apiConnector(
				'GET',
				roadendpoints.GET_SINGLE_ROAD_COORDINATES,
				null,
				{ authorization: token },
				queryObject
			);

			if (response.status === 200) {
				result = response?.data;
			}
		} catch (error) {
			console.error('Error in getting Single Road Coordinates', error);
		}
		dispatch(setLoading(false));
		// toast.dismiss(toastId);

		return result;
	};
};

export const getRoadListInDropDown = (subdivisionName) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		setLoading(true);
		// const toastId = toast.loading('Loading..');
		let result = [];
		let query = null;
		if (subdivisionName) {
			query = subdivisionName;
		}

		try {
			const response = await apiConnector(
				'GET',
				roadendpoints.GET_BUDGET_ROAD_LIST_DROPDOWN,
				null,
				{ authorization: token },
				{ subdivisionName: query }
			);
			if (response.status === 200) {
				result = response.data.profile;
			}
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		setLoading(false);
		// toast.dismiss(toastId);

		return result;
	};
};

export const getSingleRoadBudgetData = (roadName, roadNo) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		// setLoading(true);
		// const toastId = toast.loading('Loading..');
		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				roadendpoints.GET_SINGLE_ROAD_BUDGET_DATA,
				null,
				{ authorization: token },
				{ roadName, roadNo }
			);
			if (response.status === 200) {
				result = response.data.roadData;
			}
		} catch (error) {
			console.error('Error in getting Points', error);
		}
		// setLoading(false);
		// toast.dismiss(toastId);

		return result;
	};
};

export const getAllChainges = (roadName, roadNo)=>{
    return async (dispatch, getState) => {
        const { token } = getState().auth;
         
        let result = [];
        try {
            const response = await apiConnector(
                'GET',
                roadendpoints.GET_ALL_CHAINAGE_LIST,
                null,
                { authorization: token },
                { roadName, roadNo }
            );
            if (response.status === 200) {
                result = response?.data;
            }
           
         
        } catch (error) {
            console.error('Error in getting Points', error);
        }
         
        return result;
    };
}

export const getAssetsDefectsOfRoad = (setLoading, roadName, roadNo) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        setLoading(true);
         
        let result = [];
        try {
            const response = await apiConnector(
                'GET',
                roadendpoints.GET_ASSETS_DEFECTS_OF_ROAD,
                null,
                { authorization: token },
                { roadName, roadNo }
            );
            if (response.status === 200) {
                result = response?.data;
            }
           
         
        } catch (error) {
            console.error('Error in getting asset/defect details of road!', error);
        }
         
        setLoading(false);
        return result;
    };
}

