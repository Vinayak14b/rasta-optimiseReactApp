import { Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { innerSidebarIcons } from '../assets/IconArray';
import { useSelector } from 'react-redux';
import '../CSS/insidebar.css';
import SettingsDialog from './Settings';
import { ShowForPermission } from '../usermanagement/accesscontrol/ShowPermissionComponent';
import { selectProfile } from '../usermanagement/slices/profileSlice';

const InnerSideBar = ({ setActivePage, activePage }) => {
	const { userType } = useSelector((state) => state.auth);
	const [hoveredButton, setHoveredButton] = useState(null);
	const navigate = useNavigate();
	const { profileUserData } = useSelector(selectProfile);
	const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
	const handleSettingsClick = () => {
		setSettingsDialogOpen(true);
	};

	const closeSettingsDialog = () => {
		setSettingsDialogOpen(false);
	};

	const handleHomeClick = (page) => {
		navigate(`/home`);
	};
	const handleUserClick = (page) => {
		if (activePage === 'user') {
			// If the current page is already 'user', navigate back
			// navigate(-1);
		} else {
			// Otherwise, navigate to the 'user' page
			navigate(`/userverification`);
		}
	};
	const handleLocationClick = (page) => {
		if (activePage === 'tripapproval') {
			// If the current page is already 'location', navigate back
			// navigate(-1);
		} else {
			// Otherwise, navigate to the 'location' page
			navigate(`/tripapproval`);
		}
	};

	const handleDashboardClick = (page) => {
		if (activePage === 'dashboard') {
			// If the current page is already 'dashboard', navigate back
			// navigate(-1);
		} else {
			// Otherwise, navigate to the 'dashboard' page
			navigate(`/utilitiesdashboard`);
		}
	};
	const handleRoadClick = (page) => {
		if (activePage === 'road') {
			// If the current page is already 'road', navigate back
			// navigate(-1);
		} else {
			// Otherwise, navigate to the 'road' page
			navigate(`/roadclassification`);
		}
	};

	const handleNavigate = () => {
		if (userType === 'Owner' && activePage !== 'office') {
			navigate(`/office`);
		} else if (
			(userType === 'Admin' ||
				userType === 'Head' ||
				userType === 'Member') &&
			activePage !== 'office'
		) {
			navigate(`/office/user/member`);
		} 
	};

	return (
		<div className="fixed  top-0 bg-white shadow-md h-full w-20 flex flex-col items-center">
			{/* Logo */}
			<div className="my-5" onClick={() => handleHomeClick('home')}>
				<img
					src={innerSidebarIcons.rastaLogo}
					alt="Your Logo"
					className="mt-4 w-8 h-13 object-cover"
				/>
			</div>

			{/* Icons */}

			<Tooltip title="Home">
				<div
					className={`cursor-pointer icon mt-1 ${
						activePage === 'home' ? 'bg-primary p-2' : ''
					} hover:bg-orange-500 p-[1.2rem]`}
					onClick={() => handleHomeClick('home')}
					onMouseEnter={() => {
						setHoveredButton('home');
					}}
					onMouseLeave={() => {
						setHoveredButton(null);
					}}
					style={{
						transition: 'background-color 0.5s',
					}}>
					<img
						src={
							hoveredButton === 'home' || activePage === 'home'
								? `${innerSidebarIcons.home}`
								: `${innerSidebarIcons.activeHome}`
						}
						alt="Home"
						className="w-8 h-8 object-cover"
					/>
				</div>
			</Tooltip>

			<ShowForPermission permission="DASHBORAD">
				<Tooltip title="Dashboard">
					<div
						className={`cursor-pointer icon mt-1 ${
							activePage === 'dashboard' ? 'bg-primary p-2' : ''
						} hover:bg-orange-500 p-[1.2rem]`}
						onClick={() =>
							handleDashboardClick('utilitiesdashboardmain')
						}
						onMouseEnter={() => {
							setHoveredButton('dashboard');
						}}
						onMouseLeave={() => {
							setHoveredButton(null);
						}}
						style={{
							transition: 'background-color 0.5s',
						}}>
						<img
							src={
								hoveredButton === 'dashboard' ||
								activePage === 'dashboard'
									? `${innerSidebarIcons.dash}`
									: `${innerSidebarIcons.activeDash}`
							}
							alt="Dashboard"
							className="w-8 h-8 object-cover"
						/>
					</div>
				</Tooltip>
			</ShowForPermission>

			<ShowForPermission permission="USER_VERIFICATION">
				{((userType === 'Admin' &&
					profileUserData.officeLevel === 'Sub-division') ||
					userType === 'Owner') && (
					<Tooltip title="User Verification">
						<div
							className={`cursor-pointer icon mt-1 ${
								activePage === 'user' ? 'bg-primary p-2' : ''
							} hover:bg-orange-500 p-[1.2rem]`}
							onClick={() => handleUserClick('user')}
							onMouseEnter={() => {
								setHoveredButton('user');
							}}
							onMouseLeave={() => {
								setHoveredButton(null);
							}}
							style={{
								transition: 'background-color 0.5s',
							}}>
							<img
								src={
									hoveredButton === 'user' ||
									activePage === 'user'
										? `${innerSidebarIcons.user}`
										: `${innerSidebarIcons.activeUser}`
								}
								alt="User"
								className="w-8 h-8 object-cover"
							/>
						</div>
					</Tooltip>
				)}
			</ShowForPermission>

			{/* <ShowForPermission permission="USER_VERIFICATION"> */}

			<ShowForPermission permission="TRIPAPPROVAL">
				{((userType === 'Admin' &&
					profileUserData.officeLevel === 'Sub-division') ||
					userType === 'Owner') && (
					<Tooltip title="Trip Approval">
						<div
							className={`cursor-pointer icon mt-1 ${
								activePage === 'tripapproval'
									? 'bg-primary p-2'
									: ''
							} hover:bg-orange-500 p-[1.2rem]`}
							onClick={() => handleLocationClick('tripapproval')}
							onMouseEnter={() => {
								setHoveredButton('tripapproval');
							}}
							onMouseLeave={() => {
								setHoveredButton(null);
							}}
							style={{
								transition: 'background-color 0.5s',
							}}>
							<img
								src={
									hoveredButton === 'tripapproval' ||
									activePage === 'tripapproval'
										? `${innerSidebarIcons.tripApproval}`
										: `${innerSidebarIcons.activeTrip}`
								}
								alt="Location"
								className="w-8 h-8 object-cover"
							/>
						</div>
					</Tooltip>
				)}
			</ShowForPermission>

			<ShowForPermission permission="OFFICE">
				<Tooltip title="Office">
					<div
						className={`cursor-pointer icon mt-1 ${
							activePage === 'office' ? 'bg-primary p-2' : ''
						} hover:bg-orange-500 p-[1.2rem]`}
						onClick={() => handleNavigate('office')}
						onMouseEnter={() => {
							setHoveredButton('office');
						}}
						onMouseLeave={() => {
							setHoveredButton(null);
						}}
						style={{
							transition: 'background-color 0.5s',
						}}>
						<img
							src={
								hoveredButton === 'office' ||
								activePage === 'office'
									? `${innerSidebarIcons.activeOffice}`
									: `${innerSidebarIcons.office}`
							}
							alt="Office"
							className="w-8 h-8 object-cover"
						/>
					</div>
				</Tooltip>
			</ShowForPermission>

			<Tooltip title="Road Classification">
				<div
					className={`cursor-pointer icon mt-1 ${
						activePage === 'road' ? 'bg-primary p-2' : ''
					} hover:bg-orange-500 p-[1.2rem]`}
					onClick={() => handleRoadClick('road')}
					onMouseEnter={() => {
						setHoveredButton('road');
					}}
					onMouseLeave={() => {
						setHoveredButton(null);
					}}
					style={{
						transition: 'background-color 0.5s',
					}}>
					<img
						src={
							hoveredButton === 'road' || activePage === 'road'
								? `${innerSidebarIcons.roadWhite}`
								: `${innerSidebarIcons.road}`
						}
						alt="Road"
						className="w-8 h-8 object-cover"
					/>
				</div>
			</Tooltip>

			<Tooltip title="Settings">
				<div
					className={`cursor-pointer icon mt-1 ${
						activePage === 'settings' ? 'bg-primary p-2' : ''
					} hover:bg-orange-500 p-[1.2rem]`}
					onClick={() => handleSettingsClick()}
					onMouseEnter={() => {
						setHoveredButton('settings');
					}}
					onMouseLeave={() => {
						setHoveredButton(null);
					}}
					style={{
						transition: 'background-color 0.5s',
					}}>
					<img
						src={
							hoveredButton === 'settings' ||
							activePage === 'settings'
								? `${innerSidebarIcons.setting}`
								: `${innerSidebarIcons.activeSetting}`
						}
						alt="Settings"
						className="w-8 h-8 object-cover"
					/>
				</div>
			</Tooltip>

			{/* Settings Dialog */}
			{isSettingsDialogOpen && (
				<SettingsDialog closeSettingDialog={closeSettingsDialog} />
			)}
		</div>
	);
};

export default InnerSideBar;
