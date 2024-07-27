import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { iconMap } from '../../assets/IconArray';
import Typography from '@mui/material/Typography';
import { BsThreeDots } from 'react-icons/bs';
import '../../CSS/Utils.css';
import UserVerifyModal from '../Utils/UserVerifyModal';
import JSZip from 'jszip';
import { Tooltip } from 'react-tooltip';

// types of document

const DOCUMENT_TYPES = {
	AADHAR_CARD: '1',
	GOVT_ID: '2',
	TRANSFER_LETTER: '3',
};

const PostingVerification = () => {
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

	useEffect(() => {
		setFrontAadhar(iconMap.frontImg);
		setBackAadhar(iconMap.backImg);
		setGovtFrontImg(iconMap.frontGovt);
		setGovtBackImg(iconMap.backGovt);
	}, []);

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
			zipFileName = 'Aadhar_Images.zip';
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
			{/* modal */}

			<div className="flex max-h-screen">
				<div className="ml-20">
					<Sidebar />
				</div>

				<section className="flex flex-1 flex-col max-h-[100vh] justify-evenly items-center  gap-y-2">
					{/* main heading */}
					<div className="font-bold text-[30px] font-poppins mt-1 mb-1">
						<h1 className="border-b-2 mt-3">
							Authority/ Posting Verification
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
									<p className="font-roboto font-semibold text-xs">
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
									<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1">
										Rahul
									</p>
								</div>
							</div>
							<div>
								<Typography
									variant="subtitle1"
									gutterBottom
									className="">
									<p className="font-roboto font-semibold text-xs">
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
									<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1">
										Rahul
									</p>
								</div>
							</div>
							<div>
								<Typography
									variant="subtitle1"
									gutterBottom
									className="">
									<p className="font-roboto font-semibold text-xs">
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
									<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1">
										Admin
									</p>
								</div>
							</div>
							<div>
								<Typography
									variant="subtitle1"
									gutterBottom
									className="">
									<p className="font-roboto font-semibold text-xs">
										Authority
									</p>
								</Typography>

								<div className="flex justify-center items-center p-3 rounded-md border-[2px] border-[rgba(17, 17, 19, 0.20)] gap-x-4 w-60 h-6 mt-[-4px]">
									<Typography
										variant="body1"
										className="w-23">
										<img
											src={iconMap.badge}
											alt="icon"
											className="h-4 w-4"
										/>
									</Typography>
									<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1">
										NH
									</p>
								</div>
							</div>
							<div>
								<Typography
									variant="subtitle1"
									gutterBottom
									className="">
									<p className="font-roboto font-semibold text-xs">
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
									<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1">
										State
									</p>
								</div>
							</div>
							<div>
								<Typography
									variant="subtitle1"
									gutterBottom
									className="">
									<p className="font-roboto font-semibold text-xs">
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
									<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1">
										Region Level
									</p>
								</div>
							</div>
							<div>
								<Typography
									variant="subtitle1"
									gutterBottom
									className="">
									<p className="font-roboto font-semibold text-xs">
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
									<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1">
										Kolhapur
									</p>
								</div>
							</div>
							<div>
								<Typography
									variant="subtitle1"
									gutterBottom
									className="">
									<p className="font-roboto font-semibold text-xs">
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
									<p className="text-slate-500 font-roboto  text-xs leading-140 flex-1">
										Chief Engineer
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className=" flex flex-col w-full">
						<h1 className="font-inter font-semibold text-2xl ml-32 mt-2">
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
										<p className="font-semibold">
											Aadhar Card
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

							<div className="border-[1px]  border-[#FE6100] max-w-70 min-h-40 rounded-lg p-4 font-inter gap-x-3   ">
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
										<p className="font-semibold">
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
							</div>

							{/* Transfer letter */}
							<div className="border-[1px]  border-[#FE6100] max-w-70 min-h-40 rounded-lg p-4 font-inter gap-x-3   ">
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
							</div>
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
														href={frontAadhar}
														download>
														<img
															src={frontAadhar}
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
															src={govtFrontImg}
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

									{govtIdFrontCheck && govtIdBackCheck && (
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
															src={govtBackImg}
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
									{!govtFrontImg && !govtBackImg && (
										<p className="text-2xl font-bold font-inter">
											No Images Found
										</p>
									)}
								</div>
							</div>
						</UserVerifyModal>
					)}

					{/* last button verify */}
					<div>
						<button className="w-36 h-12  font-semibold rounded-md bg-primary focus:outline-none focus:bg-primary text-white hover:text-black font-poppins text-md shadow-xl mb-4">
							Verify User
						</button>
					</div>
				</section>
			</div>
		</>
	);
};

export default PostingVerification;
