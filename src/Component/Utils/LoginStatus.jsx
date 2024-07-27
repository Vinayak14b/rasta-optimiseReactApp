import avatar from '../../assets/markers/avatar.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShowForPermission } from '../../usermanagement/accesscontrol/ShowPermissionComponent';

export const LoginStatus = () => {
	const navigate = useNavigate()
	const { name, userType, username } = useSelector((state) => state.auth);
	// const decodedToken = jwtDecode(token);
	// const username=decodedToken.username



	// currently only for admin later add switch case for all users
	const navigateToProfile = (userName, firstName, lastName) => {
		// const profilename = `${firstName.toLowerCase()}${lastName.toLowerCase()}`;
		// navigate(`/usermanagement/profile/${profilename}`
		navigate(`/usermanagement/profile/${username}`, {
			state: { username },
		});
	};
	return (
		<div
			className="flex items-center gap-x-3 cursor-pointer"
			onClick={() => navigateToProfile(username)}>
			
			<img src={avatar} alt="avatar" className="h-[42px]" />
			<div className="text-[#FE6100] text-base font-poppins font-semibold flex-col">
				<p className="mt-2">{name}</p>
				<ShowForPermission permission="SHOW_USERNAME">
					<p className="text-right text-xs">{username}</p>
				</ShowForPermission>
				{/* <ShowForPermission permission="SHOW_USERTYPE"> */}
				<p className="text-right text-xs">{userType}</p>
				{/* </ShowForPermission> */}
			</div>
		</div>
	);
};
