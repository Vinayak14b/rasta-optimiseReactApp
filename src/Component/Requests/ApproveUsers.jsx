import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { iconMap } from '../../assets/IconArray';
import Typography from '@mui/material/Typography';
import { BsThreeDots } from 'react-icons/bs';
import '../../CSS/Utils.css';
import UserVerifyModal from '../Utils/UserVerifyModal';
import JSZip from 'jszip';
import { Tooltip } from 'react-tooltip';
import { Spinner } from '../../utils/Spinner';
import { BackButton } from '../Utils/BackButton';
import {
	getUnverifiedJERequest,
	verifyJEProfileRequest,
} from '../../usermanagement/services/Operations/requestAPI';
import { toast } from 'react-hot-toast';

// types of document

const DOCUMENT_TYPES = {
	AADHAR_CARD: '1',
	GOVT_ID: '2',
	TRANSFER_LETTER: '3',
};

const ApproveUsers = ({ username, onClose }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [showDialog, setShowDialog] = useState(false);
	const [userData, setUserData] = useState(null);
	// const [reload, setReload] = useState(null);

	// get only one user data
	useEffect(() => {
		const fetchData = async () => {
			try {
				const requestData = await dispatch(
					getUnverifiedJERequest(username)
				);
				setUserData(requestData);
				setImageData();
			} catch (error) {
				console.error('Error in Getting User Data', error);
			}
		};

		fetchData();
	}, []);

	// verify user request
	const onClickVerifyUser = async () => {
		toast
			.promise(dispatch(verifyJEProfileRequest(username)), {
				loading: 'Verifying user...',
				success: 'User Verified Successfully',
				error: 'Failed to verify user',
			})
			.then(() => {
				onClose(); // Call onClose if the promise resolves successfully
			})
			.catch((error) => {
				console.error('Error verifying user:', error);
			});
	};

	// handle delete user
	const handleDeleteUser = () => {
		setIsDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		setIsDialogOpen(false);
	};

	const handleCloseDialog = () => {
		setShowDialog(false);
		setIsDialogOpen(false);
	};

	const handleBack = () => {

		navigate(-1);
	};

	// modal styles
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
	};
	// checkbox token
	const [aadharFrontImg, setFrontImg] = useState(false);
	const [aadharBackImg, setBackImg] = useState(false);
	const [govtIdFrontCheck, setGovtFrontCheck] = useState(false);
	const [govtIdBackCheck, setGovtIdBackCheck] = useState(false);
	// view button check
	const [showAadharImages, setAadharImages] = useState(false);
	const [showIdImages, setIdImages] = useState(false);
	// modal trigger
	const [openModal, setOpenModal] = useState(false);


	// actual image
	const [frontAadhar, setFrontAadhar] = useState(null);
	const [backAadhar, setBackAadhar] = useState(null);
	const [govtFrontImg, setGovtFrontImg] = useState(null);
	const [govtBackImg, setGovtBackImg] = useState(null);

	const [activePage, setActivePage] = useState('user');

	const setImageData = () => {
		if (userData?.FrontId) {
			setFrontAadhar(userData.FrontId);
		}
		if (userData?.BackId) {
			setBackAadhar(userData.BackId);
		}
		// setGovtFrontImg(iconMap.frontGovt);
		// setGovtBackImg(iconMap.backGovt);
	};

	const handlePageChange = (page) => {
		setActivePage(page);
	};

	const handleFrontChange = (inputVal) => {
	
		if (inputVal === '1') {
			// uncheck before selected
			setGovtFrontCheck(false);
			setGovtIdBackCheck(false);
			setFrontImg(!aadharFrontImg);
		} else if (inputVal === '2') {
			setFrontImg(false);
			setBackImg(false);
			setGovtFrontCheck(!govtIdFrontCheck);
		}
	};

	const handleBackChange = (inputVal) => {
		
		if (inputVal === '1') {
			// uncheck all tokens
			setGovtFrontCheck(false);
			setGovtIdBackCheck(false);
			setBackImg(!aadharBackImg);
		} else if (inputVal === '2') {
			setFrontImg(false);
			setBackImg(false);
			setGovtIdBackCheck(!govtIdBackCheck);
		}
	};

	const handleViewBtnClick = (id) => {
		
		if (id === '1') {
			setAadharImages(!showAadharImages);
			setIdImages(false);
			setOpenModal(true);
		} else if (id === '2') {
			setIdImages(!showIdImages);
			setAadharImages(false);
			setOpenModal(true);
		}
	};

	const closeModal = () => {
		setOpenModal(false);
		// close the modal
	};

	const openImageInNewTab = (imageUrl) => {
		window.open(imageUrl, '_blank');
	};

	// download pdf logic
	const downloadPdf = (id) => {
		const zip = new JSZip();

		let frontImage, backImage, zipFileName;

		if (id === '1') {
			frontImage = frontAadhar;
			backImage = backAadhar;
			zipFileName = 'Document.zip';
		} else if (id === '2') {
			frontImage = govtFrontImg;
			backImage = govtBackImg;
			zipFileName = 'Govt_ID.zip';
		}

		if (frontImage) {
			zip.file(
				'FrontImage.jpg',
				fetch(frontImage).then((response) => response.blob())
			);
		}
		if (backImage) {
			zip.file(
				'BackImage.jpg',
				fetch(backImage).then((response) => response.blob())
			);
		}

		zip.generateAsync({ type: 'blob' }).then((blob) => {
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = zipFileName;
			link.click();
		});
	};

	return (
		<>
			{/* <Toaster/> */}
			{userData ? (
				<div className="flex max-h-screen">
					{/* <div className="">
						<InnerSideBar
							setActivePage={handlePageChange}
							activePage={activePage}
						/>
					</div> */}

					<section className="flex flex-1 flex-col max-h-[100vh] justify-evenly items-center  gap-y-2 ml-20">
						{/* main heading */}
						<div className=" flex font-bold text-[30px] font-poppins mt-1 mb-1 items-center ">
							<div
								onClick={onClose}
								className="mt-3 w-20 absolute left-[7rem]">
								<BackButton />
							</div>
							<h1 className="border-b-2 mt-3 flex-1">
								User Verification
							</h1>
						</div>

						{/* second box */}
						<div className="border-2 border-[#FF6923] rounded-xl w-[90%] min-h-68 flex justify-around gap-x-2 mx-16 p-4 box-border">
							<h3 className="font-inter text-2xl font-semibold my-auto w-60 text-center pl-3">
								Request:
							</h3>
							<div className="grid grid-cols-2 gap-x-4	 gap-y-3 p-2 flex-1 ">
								<div>
									<Typography
										variant="subtitle1"
										gutterBottom
										className="">
										<p className="font-roboto font-semibold text-xs text-start">
											First Name
										</p>
									</Typography>

									<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px]">
										<Typography
											variant="body1"
											className="w-23">
											<img
												src={iconMap.firstName}
												alt="icon"
												className="h-3 w-3"
											/>
										</Typography>
										<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1 text-start ">
											{userData?.FirstName
												? userData.FirstName
												: 'N/A'}
										</p>
									</div>
								</div>
								<div>
									<Typography
										variant="subtitle1"
										gutterBottom
										className="">
										<p className="font-roboto font-semibold text-xs text-start">
											Last Name
										</p>
									</Typography>

									<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px]">
										<Typography
											variant="body1"
											className="w-23">
											<img
												src={iconMap.firstName}
												alt="icon"
												className="h-3 w-3"
											/>
										</Typography>
										<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1 text-start">
											{userData?.LastName
												? userData.LastName
												: 'N/A'}
										</p>
									</div>
								</div>
								<div>
									<Typography
										variant="subtitle1"
										gutterBottom
										className="">
										<p className="font-roboto font-semibold text-xs text-start">
											Type of User
										</p>
									</Typography>

									<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px]">
										<Typography
											variant="body1"
											className="w-23">
											<img
												src={iconMap.person}
												alt="icon"
												className="h-4 w-4"
											/>
										</Typography>
										<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1 text-start">
											{userData?.TypeOfUser
												? userData.TypeOfUser
												: 'N/A'}
										</p>
									</div>
								</div>
								<div>
									<Typography
										variant="subtitle1"
										gutterBottom
										className="">
										<p className="font-roboto font-semibold text-xs text-start">
											Authority
										</p>
									</Typography>

									<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px] ">
										<Typography
											variant="body1"
											className="w-23">
											<img
												src={iconMap.badge}
												alt="icon"
												className="h-4 w-4"
											/>
										</Typography>
										<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1 text-start">
											{userData?.Authority
												? userData.Authority
												: 'N/A'}
										</p>
									</div>
								</div>
								<div>
									<Typography
										variant="subtitle1"
										gutterBottom
										className="">
										<p className="font-roboto font-semibold text-xs text-start">
											State
										</p>
									</Typography>

									<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px]">
										<Typography
											variant="body1"
											className="w-23">
											<img
												src={iconMap.soureenv}
												alt="icon"
												className="h-4 w-4"
											/>
										</Typography>
										<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1 text-start">
											{userData?.StateList
												? userData.StateList
												: 'N/A'}
										</p>
									</div>
								</div>
								<div>
									<Typography
										variant="subtitle1"
										gutterBottom
										className="">
										<p className="font-roboto font-semibold text-xs text-start">
											Jurisdiction
										</p>
									</Typography>

									<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px]">
										<Typography
											variant="body1"
											className="w-23">
											<img
												src={iconMap.approval}
												alt="icon"
												className="h-4 w-4"
											/>
										</Typography>
										<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1 text-start">
											{userData?.Jurisdiction !== null &&
											userData?.Jurisdiction !== 'null'
												? userData.Jurisdiction
												: 'N/A'}
										</p>
									</div>
								</div>
								<div>
									<Typography
										variant="subtitle1"
										gutterBottom
										className="">
										<p className="font-roboto font-semibold text-xs text-start">
											Posting
										</p>
									</Typography>

									<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px]">
										<Typography
											variant="body1"
											className="w-23">
											<img
												src={iconMap.firstName}
												alt="icon"
												className="h-4 w-4"
											/>
										</Typography>
										<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1 text-start">
											{userData?.Posting
												? userData.Posting
												: 'N/A'}
										</p>
									</div>
								</div>
								<div>
									<Typography
										variant="subtitle1"
										gutterBottom
										className="">
										<p className="font-roboto font-semibold text-xs text-start">
											Designation
										</p>
									</Typography>

									<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px]">
										<Typography
											variant="body1"
											className="w-23">
											<img
												src={iconMap.designation}
												alt="icon"
												className="h-4 w-4"
											/>
										</Typography>
										<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1 text-start">
											{userData?.Designation
												? userData.Designation
												: 'N/A'}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className=" flex flex-col w-full">
							<h1 className="font-inter font-semibold text-2xl ml-32 mt-2 text-start">
								Documents Submitted:
							</h1>

							<div className="flex items-center gap-x-5 justify-center p-2">
								{/* aadhar div */}
								<div className="border-[1px]  border-[#FE6100] w-76 min-h-40 rounded-md p-4 font-inter gap-x-3   ">
									<div className="">
										<div className="flex justify-between items-center mb-1">
											<div>
												<img
													src={iconMap.folder}
													alt="Folder "
													className="h-6 w-6"
												/>
											</div>

											<div
												onClick={() =>
													downloadPdf(
														DOCUMENT_TYPES.AADHAR_CARD
													)
												}
												data-tooltip-id="my-tooltip"
												data-tooltip-content="Download"
												className=" cursor-pointer">
												<BsThreeDots />
												<Tooltip id="my-tooltip" />
											</div>
										</div>
										<div>
											<p className="font-semibold text-start">
												Aadhar Card
											</p>
											{/* <div className="font-semibold flex text-xs gap-x-4">
												<p>17 Mar 2024</p>
												<p>13 MB</p>
											</div> */}
										</div>
										<div className="flex my-1">
											<div className="flex flex-1 gap-x-2">
												<input
													type="checkbox"
													checked={aadharFrontImg}
													onChange={() =>
														handleFrontChange(
															DOCUMENT_TYPES.AADHAR_CARD
														)
													}
												/>
												<p className="text-sm">Front</p>
											</div>
											<div className="flex flex-1 gap-x-2">
												<input
													type="checkbox"
													checked={aadharBackImg}
													onChange={() =>
														handleBackChange(
															DOCUMENT_TYPES.AADHAR_CARD
														)
													}
												/>

												<p className="text-sm">Back</p>
											</div>
										</div>
										<div className=" right-0 ">
											<button
												className="w-16 h-6 bg-[#FF6100] rounded-xl text-white relative ml-28  z-0"
												onClick={() =>
													handleViewBtnClick(
														DOCUMENT_TYPES.AADHAR_CARD
													)
												}>
												<p className="font-inter text-sm">
													View
												</p>
											</button>
										</div>
									</div>
								</div>

								{/* govt id */}

								{/* <div className="border-[1px]  border-[#FE6100] max-w-70 min-h-40 rounded-lg p-4 font-inter gap-x-3   ">
									<div className="">
										<div className="flex justify-between mb-1">
											<div>
												<img
													src={iconMap.folder}
													alt="Folder "
													className="h-6 w-6"
												/>
											</div>
											<div
												onClick={() =>
													downloadPdf(
														DOCUMENT_TYPES.GOVT_ID
													)
												}
												data-tooltip-id="my-tooltip"
												data-tooltip-content="Download"
												className=" cursor-pointer">
												<BsThreeDots />
												<Tooltip id="my-tooltip" />
											</div>
										</div>
										<div>
											<p className="font-semibold text-start">
												Govt. ID.
											</p>
											<div className="font-semibold flex text-xs gap-x-4">
												<p>17 Mar 2024</p>
												<p>13 MB</p>
											</div>
										</div>
										<div className="flex my-1">
											<div className="flex flex-1 gap-x-2">
												<input
													type="checkbox"
													checked={govtIdFrontCheck}
													onChange={() =>
														handleFrontChange(
															DOCUMENT_TYPES.GOVT_ID
														)
													}
												/>
												<p className="text-sm font-inter">
													Front
												</p>
											</div>
											<div className="flex flex-1 gap-x-2">
												<input
													type="checkbox"
													checked={govtIdBackCheck}
													onChange={() =>
														handleBackChange(
															DOCUMENT_TYPES.GOVT_ID
														)
													}
												/>
												<p className="text-sm font-inter">
													Back
												</p>
											</div>
										</div>
										<div className=" right-0">
											<button
												className="w-16 h-6 bg-[#FF6100] rounded-xl text-white relative ml-28 "
												onClick={() =>
													handleViewBtnClick(
														DOCUMENT_TYPES.GOVT_ID
													)
												}>
												<p className="font-inter text-sm">
													View
												</p>
											</button>
										</div>
									</div>
								</div> */}

								{/* Transfer letter */}
								{/* <div className="border-[1px]  border-[#FE6100] max-w-70 min-h-40 rounded-lg p-4 font-inter gap-x-3   ">
								<div className="">
									<div className="flex justify-between mb-1">
										<div>
											<img
												src={iconMap.folder}
												alt="Folder "
												className="h-6 w-6"
											/>
										</div>
										<div className="mouse-pointer">
											<BsThreeDots />
										</div>
									</div>
									<div>
										<p className="font-semibold">
											Transfer Letter
										</p>
										<div className="font-semibold flex text-xs gap-x-4 font-inter">
											<p>17 Mar 2024</p>
											<p>13 MB</p>
										</div>
									</div>

									<div className=" right-0">
										<button
											className="w-16 h-6 mt-7 bg-[#FF6100] rounded-xl text-white relative ml-28 "
											onClick={handleViewBtnClick}>
											<p className="font-inter text-sm ">
												View
											</p>
										</button>
									</div>
								</div>
							</div> */}
							</div>
						</div>

						{/* modal screens */}

						{/* aadhar modal */}
						{openModal && showAadharImages && (
							<UserVerifyModal
								isOpen={handleViewBtnClick}
								onClose={closeModal}>
								<div className="flex justify-center items-center h-full ">
									<div className="flex justify-center items-center gap-x-5">
										{aadharFrontImg && (
											<div className="flex flex-col gap-y-3 font-inter font-semibold ">
												{frontAadhar ? (
													<>
														<p>Front Image</p>
														<a
															href="{frontAadhar}"
															download>
															<img
																src={
																	frontAadhar
																}
																alt="Front"
																className="h-60 hover:cursor-pointer"
																onClick={() =>
																	openImageInNewTab(
																		frontAadhar
																	)
																}
															/>
														</a>
													</>
												) : (
													<p className="text-2xl font-bold font-inter">
														Front Image Unavailable
													</p>
												)}
											</div>
										)}

										{aadharFrontImg && aadharBackImg && (
											<div className="border-dotted border-2 h-80"></div>
										)}

										{aadharBackImg && (
											<div className="flex flex-col gap-y-3 font-inter font-semibold">
												{backAadhar ? (
													<>
														{' '}
														<p>Back Image</p>
														<a
															href={backAadhar}
															download>
															<img
																src={backAadhar}
																alt="Back"
																className="h-60"
																onClick={() =>
																	openImageInNewTab(
																		backAadhar
																	)
																}
															/>
														</a>
													</>
												) : (
													<p className="text-2xl font-bold font-inter">
														Back Image Unavailable
													</p>
												)}
											</div>
										)}
									</div>
									<div className=" ">
										{!aadharFrontImg && !aadharBackImg && (
											<p className="text-2xl font-bold font-inter">
												No Images Found
											</p>
										)}
									</div>
								</div>
							</UserVerifyModal>
						)}

						{/* govt id modal */}
						{openModal && showIdImages && (
							<UserVerifyModal
								isOpen={handleViewBtnClick}
								onClose={closeModal}>
								<div className="flex justify-center items-center h-full ">
									<div className="flex justify-center items-center gap-x-5">
										{govtIdFrontCheck && (
											<div className="flex flex-col gap-y-3 font-inter font-semibold ">
												{govtFrontImg ? (
													<>
														<p>Front Image</p>
														<a
															href={govtFrontImg}
															download>
															<img
																src={
																	govtFrontImg
																}
																download
																alt="Front"
																className="h-60 hover:cursor-pointer"
																onClick={() =>
																	openImageInNewTab(
																		govtFrontImg
																	)
																}
															/>
														</a>
													</>
												) : (
													<p className="text-2xl font-bold font-inter">
														Front Image Unavailable
													</p>
												)}
											</div>
										)}

										{govtIdFrontCheck &&
											govtIdBackCheck && (
												<div className="border-dotted border-2 h-80"></div>
											)}

										{govtIdBackCheck && (
											<div className="flex flex-col gap-y-3 font-inter font-semibold">
												{govtBackImg ? (
													<>
														{' '}
														<p>Back Image</p>
														<a
															href={govtBackImg}
															download>
															<img
																src={
																	govtBackImg
																}
																alt="Back"
																className="h-60"
																onClick={() =>
																	openImageInNewTab(
																		{
																			govtBackImg,
																		}
																	)
																}
															/>
														</a>
													</>
												) : (
													<p className="text-2xl font-bold font-inter">
														Back Image Unavailable
													</p>
												)}
											</div>
										)}
									</div>
									<div className=" ">
										{!govtIdFrontCheck &&
											!govtIdBackCheck && (
												<p className="text-2xl font-bold font-inter">
													No Images Found
												</p>
											)}
									</div>
								</div>
							</UserVerifyModal>
						)}

						{/* last button verify */}
						<div className="flex gap-x-5">
							<div>
								<button
									className="w-36 h-12  font-semibold rounded-md bg-primary focus:outline-none focus:bg-primary text-white hover:text-black font-poppins text-md shadow-xl mb-4"
									onClick={onClickVerifyUser}>
									Verify User
								</button>
							</div>
							{/* <div>
								<button
									className="w-36 h-12  font-semibold rounded-md bg-primary focus:outline-none focus:bg-primary text-white hover:text-black font-poppins text-md shadow-xl mb-4"
									onClick={handleDeleteUser}>
									Delete Request
								</button>
							</div> */}
						</div>
						{isDialogOpen && (
							<div style={modalOverlayStyle}>
								<div
									style={modalContentStyle}
									className="gap-y-5 font-poppins flex-col justify-center items-center">
									<h2
										className="font-poppins texsbase
									">
										Are you sure you want to delete this
										user?
									</h2>
									<div className="flex gap-x-5 mx-auto mt-4 justify-center items-center">
										<button
											onClick={handleConfirmDelete}
											style={{
												...buttonStyle,
												backgroundColor: '#FE6100',
												color: 'white',
											}}
											className="font-poppins">
											Yes
										</button>
										<button
											onClick={handleCloseDialog}
											style={{
												...buttonStyle,
												backgroundColor: '#FE6100',
												color: 'white',
											}}
											className="font-poppins">
											No
										</button>
									</div>
								</div>
							</div>
						)}
					</section>
				</div>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default ApproveUsers;
