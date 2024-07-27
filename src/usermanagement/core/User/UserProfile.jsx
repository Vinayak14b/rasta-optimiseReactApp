import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from '../../../utils/Spinner';
import '../../../CSS/Utils.css';
import { UserProfileData } from './UserProfileData';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../slices/authSlice';
import { selectProfile } from '../../slices/profileSlice';
import { OwnerProfileData } from './OwnerProfileData';
import { JEProfileData } from './JEProfileData';

export const UserProfile = () => {
	const navigate = useNavigate();
	const { loading, userType } = useSelector(selectAuth);
	const { profileUserData } = useSelector(selectProfile);
	
	// sidebar activity

	return (
		<div>
			{loading ? (
				<div className="h-screen mx-auto w-full">
					<Spinner />
				</div>
			) : (
				<>
					{(userType === 'Admin' ||
						userType === 'Head' ||
						userType === 'Member') && (
						<UserProfileData profileData={profileUserData} />
					)}
					{userType === 'Owner' && (
						<OwnerProfileData profileData={profileUserData} />
					)}
					{userType === 'JE' && (
						<JEProfileData profileUserData={profileUserData} />
					)}
				</>
			)}
		</div>
	);
};
