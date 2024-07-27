import { apiConnector } from '../../../usermanagement/services/apiConnector';
import { jurisdictionendpoints } from '../apis';

// get jusridiction data
export const getJusridictionData = (requestingField) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		let result = [];
		let query = {};
		const keysToCheck = ['state', 'region', 'circle', 'division'];

		Object.keys(requestingField).forEach((key) => {
			// Check if the value is not an empty string
			if (requestingField[key] !== '') {
				query[key] = requestingField[key];
			}
		});

		try {
			const response = await apiConnector(
				'GET',
				jurisdictionendpoints.GET_ALL_ACCESIBLE_DROPDOWN,
				null,
				{ authorization: token },
				query
			);

			if (response.status === 200) {
				result = response.data;
			}
		} catch (error) {
			console.error('Error in getting Jurisdiction Data', error);
		}

		return result;
	};
};


export const getJusridictionReportData = (requestingField) => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;
		let result = [];
		let query = {};

		Object.keys(requestingField).forEach((key) => {
			// Check if the value is not an empty string
			if (requestingField[key] !== '') {
				query[key] = requestingField[key];
			}
		});

		try {
			const response = await apiConnector(
				'GET',
				jurisdictionendpoints.GET_ALL_ACCESIBLE_REPORT_DROPDOWN,
				null,
				{ authorization: token },
				query
			);

			if (response.status === 200) {
				result = response.data;
			}
		} catch (error) {
			console.error('Error in getting Jurisdiction Data', error);
		}

		return result;
	};
};

// defautl dropdown values

export const getDefaultRegionValues = () => {
	return async (dispatch, getState) => {
		const { token } = getState().auth;

		let result = [];
		try {
			const response = await apiConnector(
				'GET',
				jurisdictionendpoints.GET_DEFAULT_REGION_VALUES,
				null,
				{ authorization: token }
			);

			if (response.status === 200) {
				result = response.data;
			}
		} catch (error) {
			console.error('Error in getting Default Region  Data', error);
		}

		return result;
	};
};
