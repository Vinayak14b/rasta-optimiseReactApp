import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useEffect, useState } from 'react';
import '../CSS/postverification.css';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import mobileConfig from '../api-request/MobileConfigFile';
import axios from 'axios';

import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import InnerSideBar from './InnerSideBar';

const modalOverlayStyle = {
	position: 'fixed',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%',
	background: 'rgba(255, 255, 255, 0.8)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};
const modalContentStyle = {
	background: 'white',
	padding: '40px',
	borderRadius: '8px',
	textAlign: 'center',
	boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
};

const buttonStyle = {
	width: '100px',
	padding: '12px',
	fontSize: '16px',
	borderRadius: '8px',
	fontWeight: 'bold',
	margin: '0 10px',
};

function Posting() {
	const [profileImage, setProfileImage] = useState('');
	const navigate = useNavigate();
	const [isImageModalOpen, setImageModalOpen] = useState(false);
	const [documentName, setDocumentName] = useState('');
	const [frontImageSource, setFrontImageSource] = useState('');
	const [backImageSource, setBackImageSource] = useState('');
	const [isFrontChecked, setIsFrontChecked] = useState(false);
	const [isBackChecked, setIsBackChecked] = useState(false);

	const [data, setData] = useState([]);
	const [activePage, setActivePage] = useState('user');

	const { user } = useParams(); // Extracting email from URL params

	const [isProfileChecked, setIsProfileChecked] = useState(false); // State for profile checkboxes

	const handlePageChange = (page) => {
		setActivePage(page);
	};

	const handleViewButtonClick = (docName, frontImage, backImage) => {
		// Dynamically set image sources based on document name
		if (docName === 'Govt.ID') {
			setDocumentName('Id');

			setFrontImageSource(profileImage.frontImage);
			setBackImageSource(profileImage.backImage);
		} else if (docName === 'Transfer Letter') {
			setDocumentName('Profile');

			setFrontImageSource(profileImage.profile);

			// setFrontImageSource(`icons/tlfront.jpeg`);
		}

		setImageModalOpen(true);
	};

	const handleModalClose = () => {
		setImageModalOpen(false);
	};

	const handleCheckboxChange = (checkboxType) => {
		if (checkboxType === 'front') {
			setIsFrontChecked(!isFrontChecked);
			// If "Front" checkbox is selected, uncheck "Profile" checkbox
			setIsProfileChecked(false);
		} else if (checkboxType === 'back') {
			setIsBackChecked(!isBackChecked);
			// If "Back" checkbox is selected, uncheck "Profile" checkbox
			setIsProfileChecked(false);
		} else if (checkboxType === 'profile') {
			setIsProfileChecked(!isProfileChecked);
			// If "Profile" checkbox is selected, uncheck both "Front" and "Back" checkboxes
			setIsFrontChecked(false);
			setIsBackChecked(false);
		}
	};

	const onClickBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${mobileConfig.API_DOMAIN_URL}/v1/getVerifiedProfile/${user}`
				);
				setData(response.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchProfileImage = async () => {
			try {
				const response = await axios.get(
					`${mobileConfig.API_DOMAIN_URL}/v1/utilitydashboard/owner@gmail.com`,
					{
						responseType: 'json',
					}
				);
				const { front_base64Data, back_base64Data } = response.data;

				// Handle frontId and BackId as needed
				const frontImage = `data:image/png;base64,${front_base64Data}`;
				const backImage = `data:image/png;base64,${back_base64Data}`;

				return { frontImage, backImage };
			} catch (error) {
				console.error('Error fetching image:', error);
				return { frontImage: '', backImage: '' }; // Return empty strings if there's an error
			}
		};

		fetchProfileImage()
			.then(({ frontImage, backImage }) => {
				setProfileImage({ frontImage, backImage });
			})
			.catch((error) => {
				console.error('Error fetching profile image:', error);
			});
	}, []);

	const verifyUser = async (userData) => {
		try {
			// Make a POST request to the API endpoint with the user data in the request body
			const response = await axios.post(
				`${mobileConfig.API_DOMAIN_URL}/v1/verifyUser`,
				userData
			);
			// Handle the response as needed
			navigate('/userverification');
			// Optionally, you can perform additional actions after successful verification
		} catch (error) {
			// Handle errors from the API request
			console.error('Error verifying user:', error);
		}
	};

	return (
		<>
			<InnerSideBar
				setActivePage={handlePageChange}
				activePage={activePage}
			/>
			<div className="text-center mt-8 total-font-family position-fix w-[100%]">
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'flex-start',
						marginLeft: '119px',
					}}>
					<ArrowBackIosNewIcon
						onClick={onClickBack}
						sx={{
							cursor: 'pointer',
							backgroundColor: '#FE6100',
							padding: '6px',
							borderRadius: '500px',
							marginTop: '20px',
						}}
					/>
				</Box>
				<h1 className="text-4xl font-bold post-heading">
					Authority/Posting Verifications
				</h1>

				<div className="grid grid-cols-2 grid-rows-1 gap-4 mt-10 pl-[130px] w-[100%] post-verification">
					{/* Left side for Authority/Posting Verifications */}
					<div className="col-span-1 w-[50%]">
						<div className="grid grid-rows-3 gap-4">
							<div className="row-span-1 bg-gray-200 p-1 w-[450px] item-container">
								<p className="text-name">First Name</p>
								<p className="colon-class">:</p>
								<p className="colon-class">{data.FirstName}</p>
							</div>

							<div className="row-span-1 bg-gray-200 p-1 w-[450px] item-container ">
								<p className="text-name">Last Name</p>
								<p className="colon-class">:</p>
								<p className="colon-class">{data.LastName}</p>
							</div>

							<div className="row-span-1 bg-gray-200 p-1 w-[450px] item-container ">
								<p className="text-name">Type of User</p>
								<p className="colon-class">:</p>
								<p className="colon-class">{data.TypeOfUser}</p>
							</div>

							<div className="row-span-1 bg-gray-200 p-1 w-[450px] item-container">
								<p className="text-name">Authority</p>
								<p className="colon-class">:</p>
								<p className="colon-class">{data.Authority}</p>
							</div>

							<div className="row-span-1 bg-gray-200 p-1 w-[450px] item-container">
								<p className="text-name">State</p>
								<p className="colon-class">:</p>
								<p className="colon-class">{data.StateList}</p>
							</div>

							<div className="row-span-1 bg-gray-200 p-1 w-[450px] item-container ">
								<p className="text-name">Juridiction</p>
								<p className="colon-class">:</p>
								<p className="colon-class">
									{data.Jurisdiction}
								</p>
							</div>

							{/* Checkbox for Posting */}
							<div className="row-span-1 bg-gray-200 p-1 w-[450px] item-container ">
								<p className="text-name">Posting</p>
								<p className="colon-class">:</p>
								<p className="colon-class">{data.Posting}</p>
							</div>

							{/* Checkbox for Designation */}
							<div className="row-span-1 bg-gray-200 p-2 w-[450px] item-container">
								<p className="text-name">Designation</p>
								<p className="colon-class">:</p>
								<p className="colon-class">
									{data.Designation}
								</p>
							</div>
						</div>
					</div>

					{/* Right side for Documents Submitted */}
					<div className="col-span-1">
						<div className="right-side-container">
							<h2 className=" font-bold mb-4">
								Document Submitted
							</h2>

							<div className="document-box">
								<div
									style={{
										fontSize: '14px',
										color: 'black',
										width: '420px',
										backgroundColor: '#FFCAA7',
										padding: '18px 20px',
										borderRadius: '8px',
										fontSize: '14px',
										fontWeight: '500',
										height: '56px',
									}}>
									Transfer Letter
								</div>
								<div
									className="checkbox-group"
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										width: '100%',
										marginTop: '7%',
									}}>
									<div>
										<label>
											<input
												type="checkbox"
												id="govtIdFrontCheckbox"
												onChange={() =>
													handleCheckboxChange(
														'front'
													)
												}
												checked={isFrontChecked}
												style={{ marginRight: '14px' }}
											/>
											Front
										</label>
										<label>
											<input
												type="checkbox"
												id="govtIdBackCheckbox"
												onChange={() =>
													handleCheckboxChange('back')
												}
												checked={isBackChecked}
												style={{
													marginRight: '14px',
													marginLeft: '30px',
												}}
											/>
											Back
										</label>
									</div>
									<button
										onClick={() =>
											handleViewButtonClick('Govt.ID')
										}
										className="view-button"
										style={{
											width: '100px',
											padding: '8px',
											fontSize: '14px',
											backgroundColor: '#FE6100',
											borderRadius: '8px',
											color: 'white',
											fontWeight: 'bold',
										}}>
										View
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Modal */}
				{isImageModalOpen && (
					<div style={modalOverlayStyle}>
						<div style={modalContentStyle}>
							<h2>{documentName}</h2>
							{isFrontChecked && (
								<img
									src={frontImageSource}
									alt={``}
									style={{
										width: '300px',
										height: '200px',
										marginRight: '10px',
										marginTop: '10px',
									}}
								/>
							)}
							{isBackChecked && (
								<img
									src={backImageSource}
									alt={``}
									style={{
										width: '300px',
										height: '200px',
										marginRight: '10px',
									}}
								/>
							)}
							<button
								style={{
									...buttonStyle,
									backgroundColor: '#FE6100',
									color: 'white',
									marginTop: '10px',
								}}
								onClick={handleModalClose}>
								Close
							</button>
						</div>
					</div>
				)}
				{/* Verify User Button */}
				<button
					style={{
						width: '150px',
						padding: '12px',
						fontSize: '16px',
						backgroundColor: '#FE6100',
						marginTop: '5%',
						borderRadius: '8px',
						color: 'white',
						fontWeight: 'bold',
					}}
					// onClick={handleVerifyUserClick} // Call handleVerifyUserClick when the button is clicked
				>
					Verify User
				</button>
			</div>
		</>
	);
}

export default Posting;
