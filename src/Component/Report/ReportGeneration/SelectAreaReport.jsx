import { Dialog } from '@mui/material';
import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import CloseButton from '../../Utils/CloseButton';
import { Toaster, toast } from 'react-hot-toast';

import '../../../CSS/Utils.css';
import { selectProfile } from '../../../usermanagement/slices/profileSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectTrip } from '../../../mapbox/slices/tripSlice';
import { getJusridictionReportData } from '../../../mapbox/services/Operations/JurisdictionAPI';
import TruncatedDropdown from '../../CompareTrips/Utils/TruncateText';
import { levelData } from '../Core/Source_Data_Report';

const SelectAreaReport = () => {
	const [loading,setLoading] = useState(false)
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { profileUserData } = useSelector(selectProfile);
	const { selectedButton, defaultRegionValue } = useSelector(selectTrip);
	const [open, setOpen] = React.useState(true);
	

	// dropdown usestate
	const [circleDropdownOpen, setCircleDropdownOpen] = useState(false);
	const [divisionDropdownOpen, setDivisionDropdownOpen] = useState(false);
	const [subdivisionDropdownOpen, setSubDivisionDropdownOpen] =
		useState(false);
	const [roadDropdownOpen, setRoadDropdownOpen] = useState(false);
	const [roadNumber, setRoadNumber] = useState(null);

	// values
	const [selectedRegion, setSelectedRegion] = useState(
		defaultRegionValue?.region
	);

	// submit button
	const [currentLevel, setCurrentLevel] = useState(
		levelData[profileUserData.officeLevel]
	);
	const [requiredLevel, setRequiredLevel] = useState(
		selectedButton != undefined ? selectedButton : 'road'
	);
	// dropdown options
	const [optionsData, setOptionsData] = useState([]);
	const [defaultData, setDefaultData] = useState({
		state: 'Maharashtra',
		region: defaultRegionValue?.region || '',
		circle: defaultRegionValue?.circle || '',
		division: defaultRegionValue?.division || '',
		subdivision: defaultRegionValue?.subdivision || '',
	});
	const [regionData, setRegionData] = useState({
		state: 'Maharashtra',
		region: defaultRegionValue?.region || '',
		circle: defaultRegionValue?.circle || '',
		division: defaultRegionValue?.division || '',
		subdivision: defaultRegionValue?.subdivision || '',
		road: defaultRegionValue?.road || '',
	});

	// api for dropdown

	const fetchDataFromApi = async (value) => {
		let query = {
			state: regionData.state,
			region: regionData.region,
			circle: regionData.circle,
			division: regionData.division,
			subdivision: regionData.subdivision,
			road: regionData.road,
		};

		// Clear circle, division, and subdivision when clicking on "circle"
		if (value === 'circle') {
			query.circle = '';
			query.division = '';
			query.subdivision = '';
			query.road = '';
		} else if (value === 'division') {
			query.division = '';
			query.subdivision = '';
			query.road = '';
		} else if (value === 'subdivision') {
			query.subdivision = '';
			query.road = '';
		} else if (value === 'road') {
			query.road = '';
		}

		try {
			setOptionsData([])
			setLoading(true)
			const result = await dispatch(getJusridictionReportData(query));
			setOptionsData(result?.data);

		} catch (error) {
			console.error('Error fetching dropdown data:', error);
		}
		setLoading(false)
	};

	// submit button
	const handleSubmit = (e) => {
		e.preventDefault();
		if (currentLevel == requiredLevel) {
			const officeLevels = {
				circle: { level: 'Circle', name: regionData.circle },
				division: { level: 'Division', name: regionData.division },
				subDivision: {
					level: 'Sub-division',
					name: regionData.subdivision,
				},
				road: {
					level: 'Road',
					name: regionData.road,
				},
			};
			const selectedOffice = officeLevels[selectedButton];

			if (selectedOffice) {
				navigate(`/downloadreport`, {
					state: {
						officeLevel: selectedOffice.level,
						officeName: selectedOffice.name,
						roadNumber: roadNumber,
					},
				});
			} else {
				console.error('Invalid selectedButton');
			}
		} else {
			toast.error('Please fill all region data fields!', {
				position: 'top-center',
				duration: 4000,
			});
		}
	};

	const handleCircleClick = (e, circleName) => {
		e.stopPropagation();
		setRegionData((prevData) => ({
			...prevData,
			circle: circleName,
		}));
		setCurrentLevel('circle');
		setCircleDropdownOpen(false);
	};

	const handleDivisionClick = (e, divisionName) => {
		e.stopPropagation();
		setCircleDropdownOpen(false);
		setSubDivisionDropdownOpen(false);
		setRegionData((prevData) => ({
			...prevData,
			division: divisionName,
		}));
		setCurrentLevel('division');
		setDivisionDropdownOpen(false);
	};

	const handleSubdivisionClick = (e, subdivisionName) => {
		e.stopPropagation();
		setRegionData((prevData) => ({
			...prevData,
			subdivision: subdivisionName,
		}));
		setCurrentLevel('subDivision');
		setSubDivisionDropdownOpen(false);
	};

	const handleRoadClick = (e, roadName) => {
		e.stopPropagation();
		setRegionData((prevData) => ({
			...prevData,
			road: roadName,
		}));
		setCurrentLevel('road');
		setRoadDropdownOpen(false);
	};

	const [messages, setMessages] = useState({});

	const handleRegionAccess = (e, value) => {
		if (!regionData?.[value]) {
			setMessages((prevMessages) => ({
				...prevMessages,
				[value]: `Please select the ${value} first!`,
			}));
			return false;
		}
		return true;
	};

	return (
		<>
			<Sidebar />
			<Dialog open={open}>
				<div className="fixed top-0 left-0 w-full  min-h-full  flex justify-center items-center my-5">
					<div className="bg-white rounded-2xl relative flex flex-col gap-y-1 p-12 px-50 py-10 h-[38rem]  smallshadow ">
						<div className="flex justify-between items-center gap-x-8">
							<div>
								<h2 className="mb-1 font-poppins text-left text-2xl font-bold ">
									Report Analysis
								</h2>
								<div className="font-normal text-[#86878B] text-sm font-poppins">
									Get a Report of your Trips
								</div>
							</div>
							<div onClick={() => navigate('/report')}>
								<CloseButton />
							</div>
						</div>

						<div className=" border-2 rounded-lg border-orange-300  p-14 w-[60rem] h-[30rem]  font-poppins  items-center    gap-y-10">
							<div
								className={`grid ${
									selectedButton === 'circle'
										? 'cols-1 w-[25rem] mx-auto h-[17rem]'
										: 'grid-cols-2 gap-x-20 gap-y-7 p-10 h-[20rem]'
								}`}>
								{/* region  box */}
								<div className="flex flex-col justify-start ">
									<p className="font-poppins text-start text-sm">
										Region{' '}
									</p>

									<div
										className={`w-full  mt-1 bg-gray-300 rounded  text-center gap-y-4 cursor-pointer 
									
									`}>
										<div className="flex justify-around items-center px-4 display  ">
											<span className="flex justify-center flex-1 py-2 select-none">
												{selectedRegion || 'N/A'}
											</span>
										</div>
									</div>
								</div>

								{/* circle dropdown */}

								{(selectedButton == 'circle' ||
									selectedButton == 'division' ||
									selectedButton == 'subDivision' ||
									selectedButton == 'road') && (
									<div className="flex flex-col justify-start ">
										<p className="font-poppins text-start text-sm">
											Circle
										</p>

										<div
											onClick={() => {
												setDivisionDropdownOpen(false);
												setSubDivisionDropdownOpen(
													false
												);
												setRoadDropdownOpen(false);
												setRegionData((prevData) => {
													const newData = {
														...prevData,
														division:
															defaultData.division
																? prevData.division
																: '',
														subdivision:
															defaultData.subdivision
																? prevData.subdivision
																: '',
													};

													return newData;
												});

												if (
													defaultRegionValue?.circle ===
													''
												) {
													fetchDataFromApi(
														'circle'
													).then(() => {
														setCircleDropdownOpen(
															(prev) => !prev
														);
													});
												}
											}}
											className={`w-full  mt-1 bg-gray-300  rounded text-center gap-y-4 relative `}>
											<TruncatedDropdown
												regionData={regionData}
												defaultRegionValue={
													defaultRegionValue
												}
												dropdownType="circle"
											/>

											<div
												className={`w-full h-30 overflow-y-scroll no-scrollbar py-4 px-2 justify-center flex flex-col gap-x-4 mx-auto mt-1 bg-white border-[1px]  border-gray-300 text-center gap-y-4 absolute z-10 ${
													!circleDropdownOpen &&
													'hidden'
												}`}>
												{optionsData?.map(
													(item, index) => {
														return (
															<button
																className=" w-3/4   mx-auto px-2 py-1 rounded-md mt-1 bg-orange-300 hover:bg-orange-600 transition-all text-white font-semibold gap-x-4 text-sm "
																onClick={(e) =>
																	handleCircleClick(
																		e,
																		item.name
																	)
																}
																key={index}>
																{item.name}
															</button>
														);
													}
												)}
											</div>
										</div>
									</div>
								)}

								{/* division dropdown */}

								{(selectedButton === 'division' ||
									selectedButton === 'subDivision' ||
									selectedButton == 'road') && (
									<div
										className={
											selectedButton === 'division'
												? 'col-span-2'
												: ''
										}>
										<div className="flex flex-col justify-start  ">
											<p className="font-poppins text-start text-sm  ">
												Division
											</p>

											<div
												onClick={(e) => {
													setCircleDropdownOpen(
														false
													);
													setSubDivisionDropdownOpen(
														false
													);
													setRoadDropdownOpen(false);
													setRegionData(
														(prevData) => ({
															...prevData,
															subdivision: '',
														})
													);
													const accessAllowed =
														handleRegionAccess(
															e,
															'circle'
														);

													if (accessAllowed) {
														if (
															!defaultRegionValue?.division
														) {
															fetchDataFromApi(
																'division'
															);
															setDivisionDropdownOpen(
																(prev) => !prev
															);
														}
													}
												}}
												className="w-full    mt-1 bg-gray-300 rounded text-center gap-y-4 relative">
												<TruncatedDropdown
													regionData={regionData}
													defaultRegionValue={
														defaultRegionValue
													}
													dropdownType="division"
												/>

												<div
													className={`w-full h-[10rem] overflow-y-scroll  pt-32 pb-8 no-scrollbar py-4 px-2 justify-center flex flex-col gap-x-4 mx-auto mt-2 bg-white border-[1px] border-gray-300  text-center gap-y-4 absolute z-10 ${
														!divisionDropdownOpen &&
														'hidden'
													}`}>
													{optionsData?.map(
														(item) => {
															return (
																<button
																	className=" w-3/4   mx-auto px-2 py-1 rounded-md mt-1 bg-orange-300 hover:bg-orange-600 transition-all text-white font-semibold gap-x-4 text-sm"
																	onClick={(
																		e
																	) =>
																		handleDivisionClick(
																			e,
																			item.name
																		)
																	}>
																	{item.name}
																</button>
															);
														}
													)}
												</div>
											</div>
											{!divisionDropdownOpen &&
												regionData?.circle === '' && (
													<p className="text-red-500">
														{messages['circle']}
													</p>
												)}
										</div>
									</div>
								)}

								{/* sub-division dropdown */}

								{(selectedButton === 'subDivision' ||
									selectedButton === 'road') && (
									<div className="flex flex-col text-start">
										<p className="font-poppins text-start text-sm">
											SubDivision
										</p>

										<div
											onClick={(e) => {
												setCircleDropdownOpen(false);
												setDivisionDropdownOpen(false);
												setRoadDropdownOpen(false);

												const accessAllowed =
													handleRegionAccess(
														e,
														'division'
													);

												if (accessAllowed) {
													if (
														!defaultRegionValue?.subdivision
													) {
														fetchDataFromApi(
															'subdivision'
														);
														setSubDivisionDropdownOpen(
															(prev) => !prev
														);
													}
												}
											}}
											className={`w-full box-border mt-1 bg-gray-300 rounded text-center gap-y-4 relative 
									`}>
											<TruncatedDropdown
												regionData={regionData}
												defaultRegionValue={
													defaultRegionValue
												}
												dropdownType="subdivision"
											/>
											<div
												className={`w-full h-28 overflow-y-scroll no-scrollbar pt-32 pb-8 px-2 justify-center flex flex-col gap-x-4 mx-auto mt-1 bg-white border-[1px] border-gray-300 overflow-scroll text-center gap-y-4 z-10 absolute ${
													!subdivisionDropdownOpen &&
													'hidden'
												}`}>
												{optionsData.map((item) => {
													return (
														<button
															className=" w-3/4   mx-auto px-2 py-1 rounded-md mt-1 bg-orange-300 hover:bg-orange-600 transition-all text-white font-semibold gap-x-4 text-sm "
															onClick={(e) =>
																handleSubdivisionClick(
																	e,
																	item.name
																)
															}>
															{item.name}
														</button>
													);
												})}
											</div>
										</div>
										{!subdivisionDropdownOpen &&
											(regionData?.circle === '' ||
												regionData?.division ===
													'') && (
												<p className="text-red-500">
													{messages['division']}
												</p>
											)}
									</div>
								)}

								{/* Road Wise Drop Down */}

								{selectedButton === 'road' && (
									<div className="flex flex-col text-start">
										<p className="font-poppins text-start text-sm">
											Road
										</p>

										<div
											onClick={(e) => {
												setCircleDropdownOpen(false);
												setDivisionDropdownOpen(false);
												setSubDivisionDropdownOpen(
													false
												);

												const accessAllowed =
													handleRegionAccess(
														e,
														'subdivision'
													);

												if (accessAllowed) {
													if (
														!defaultRegionValue?.road
													) {
														fetchDataFromApi(
															'road'
														);
														setRoadDropdownOpen(
															(prev) => !prev
														);
													}
												}
											}}
											className={`w-full box-border mt-1 bg-gray-300 rounded text-center gap-y-4 relative`}>
											<TruncatedDropdown
												regionData={regionData}
												defaultRegionValue={
													defaultRegionValue
												}
												dropdownType="road"
											/>
											<div style={{paddingTop:"10rem"}}
												className={`w-full h-28 overflow-y-scroll no-scrollbar pt-32 pb-8 px-2 justify-center flex flex-col gap-x-4 mx-auto mt-1 bg-white border-[1px] border-gray-300 overflow-scroll text-center gap-y-4 z-10 absolute ${
													!roadDropdownOpen &&
													'hidden'
												}`}>
												{optionsData?.length > 0 ? (
													optionsData.map((item) => (
														<button
															key={item.name}
															className="w-3/4 h-content mx-auto px-2 py-1 rounded-md mt-1 bg-orange-300 hover:bg-orange-600 transition-all text-white font-semibold gap-x-4 text-sm"
															onClick={(e) => {
																handleRoadClick(
																	e,
																	item.name
																);
																setRoadNumber(
																	item?.number
																);
															}}>
															{item.name}
														</button>
													))
												) : (
													<div className="w-full h-full flex justify-center items-center font-bold">
														{loading===true?"Road Name are Loading":"No Road to display"}
													</div>
												)}
											</div>
										</div>
										{!roadDropdownOpen &&
											(regionData?.circle === '' ||
												regionData?.division === '' ||
												regionData?.subdivision ===
													'') && (
												<p className="text-red-500">
													{messages['subdivision']}
												</p>
											)}
									</div>
								)}
							</div>

							{/* final submit */}

							<div className="w-full  mx-auto flex justify-center">
								<button
									className="px-5 py-2  rounded-md  bg-primary focus:outline-none hover:border-[1px] hover:border-black hover:bg-white hover:text-black text-white font-semibold gap-y-5 justify-center mx-auto transition-all 200 ease-in"
									onClick={handleSubmit}>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</Dialog>
			{/* New content below */}
		</>
	);
};

export default SelectAreaReport;

<Toaster position="bottom-center" reverseOrder={false} />;
