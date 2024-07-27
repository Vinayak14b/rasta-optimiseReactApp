// login api called from the login page
import {
	setLoading,
	setToken,
	setUserType,
	loginUser,
	setUsername,
} from '../../slices/authSlice';
import { setUserPermissions } from '../../accesscontrol/UserPermissions';
import { apiConnector } from '../apiConnector';
import { authendpoints } from '../apis';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';
import { setProfileUserData } from '../../slices/profileSlice';

export function login(username, password, navigate) {
	return async (dispatch) => {
		dispatch(setLoading(true));

		try {
			const response = await apiConnector('POST', authendpoints.LOGIN, {
				username,
				password,
			});

			const token = response.data.result;
			const decodedToken = jwtDecode(token);

			if (response.status === 200) {
				dispatch(setToken(token));
				dispatch(loginUser(token));
				dispatch(setUserType(decodedToken));
				dispatch(setUsername(username));
				setUserPermissions(dispatch, decodedToken.role);
				dispatch(setProfileUserData(response?.data?.userDetails));

				const loginTimeStamp = new Date().getTime();
				localStorage.setItem('loginTimeStamp', loginTimeStamp);
			}

			navigate('/home');
			toast.success('Successfully Login to Dashboard!!');
		} catch (error) {
			console.error('error in login function auth api', error);
			toast.error('Invalid username or password!!', {
				className: 'font-poppins text-red-500',
				bodyClassName: 'font-poppins',
			});
		}
		dispatch(setLoading(false));
	};
}

// export function ownerlogin(username, password, navigate) {
// 	return async (dispatch) => {
// 		const toastId = toast.loading('Loading..');
// 		dispatch(setLoading(true));
// 		try {
// 			const response = await apiConnector('POST', ownerendpoints.SIGNUP, {
// 				username,
// 				password,
// 			});
// 			// if (!response.data.success) {
// 			// 	throw new Error(response.data.message);
// 			// }
// 			dispatch(setToken(response.data.token));
// 			localStorage.setItem('token', JSON.stringify(response.data.token));
// 			navigate('/rasta');
// 			toast.success('Login Successfull');
// 		} catch (error) {
// 			toast.error('Login Failed');
// 		}
// 		dispatch(setLoading(false));
// 		toast.dismiss(toastId);
// 	};

export function logout(navigate) {
	return (dispatch) => {
		dispatch(setToken(null));
		localStorage.removeItem('token');
		// toast.success('Logout Successfull');
		navigate('/login1');
	};
}
