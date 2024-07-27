import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { selectAuth } from '../../slices/authSlice';
import { selectProfile } from '../../slices/profileSlice';

function PrivateRoute({ children, allowedUserTypes, adminAtSubdivisionLevel }) {
	const { profileUserData } = useSelector(selectProfile);
	const { userType, isAuthenticated } = useSelector(selectAuth);
	// If user is not authenticated, redirect to login
	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	// Check if the user is admin at the subdivision level
	const isAdminAtSubdivisionLevel =
		userType === 'Owner' ||
		(userType === 'Admin' &&
			profileUserData?.officeLevel === 'Sub-division');

	// Check if the user meets all conditions to access the route
	if (
		allowedUserTypes.includes(userType) &&
		(!adminAtSubdivisionLevel || isAdminAtSubdivisionLevel)
	) {
		return children;
	} else {
		toast.error('You are not an authorized user..Please login again.');
		return <Navigate to="/login" />;
	}
}

export default PrivateRoute;
