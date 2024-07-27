import { setPermissions} from '../slices/userSlice'

export const setUserPermissions = (dispatch, userType) => {
	const permissionsMapping = {
		Head: ['VIEW_OFFICE', 'SELECT_LIST_VIEW_REGION', 'SHOW_USERTYPE','OFFICE','MANAGE_USERS','VIEWBUDGETMODAL', 'SURVEY_HISTORY'],
		Admin: [
			'ADD_MEMBER',
			'VIEW',
			'DELETE_OFFICE_REQ',
			'DELETE_ADMIN',
			'VIEW_USERNAME',
			'VIEW_OFFICE',
			// 'SELECT_LIST_VIEW_REGION',
			'SHOW_USERTYPE',
			'VIEWBUDGETMODAL',
			'MANAGE_USERS',
			'DASHBORAD',
			'USER_VERIFICATION',
			'TRIPAPPROVAL',
			'OFFICE',
			'SURVEY_HISTORY',
			'VIEW_PLAN',
			'DELETE_VERIFY_USER',
			'DELETE_PROFILE'
		],
		Member: [
			'VIEW',
			'DELETE_MEMBER',
			'VIEW_OFFICE',
			// 'SELECT_LIST_VIEW_REGION',
			'SHOW_USERTYPE',
			'VIEWBUDGETMODAL',
			'MANAGE_USERS',
			'DASHBORAD',
			// 'USER_VERIFICATION',
			'TRIPAPPROVAL',
			'OFFICE',
			'SURVEY_HISTORY',
			'VIEW_PLAN',
		],
		Owner: [
			'DELETE_OFFICE',
			'DELETE_MEMBER',
			'VIEW_USERNAME',
			'DELETE',
			'CREATE_OFFICE',
			'VIEW_OFFICE',
			// 'SELECT_LIST_VIEW_REGION',
			'SHOW_USERTYPE',
			// 'VIEWBUDGETMODAL',
			'MANAGE_USERS',
			'DASHBORAD',
			'USER_VERIFICATION',
			'TRIPAPPROVAL',
			'OFFICE',
			// 'SURVEY_HISTORY',
			'DELETE_VERIFY_USER',
			'DELETE_ADMIN_BY_OWNER',
			'DELETE_HEAD_BY_OWNER',
			'DELETE_PROFILE'
		],
		JE: ['SHOW_USERNAME', 'VIEW_PLAN'],
	};

	const userPermissions = permissionsMapping[userType];


	if (userPermissions) {
		dispatch(setPermissions(userPermissions));
	}
};
