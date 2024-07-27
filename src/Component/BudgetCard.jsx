//BudgetCard.js

import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CloseButton from './Utils/CloseButton';
import { ShowForPermission } from '../usermanagement/accesscontrol/ShowPermissionComponent';
import {
	getJusridictionData,
	getDefaultRegionValues,
} from '../mapbox/services/Operations/JurisdictionAPI';
import { selectProfile } from '../usermanagement/slices/profileSlice';

const BudgetCard = ({ closeCalculatorDialog }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// // dropdown
	const [regionObject, setRegionObject] = useState({
		id: '',
		name: '',
	});
	const [circleObject, setCircleObject] = useState({
		id: '',
		name: '',
	});
	const [divisionObject, setDivisionObject] = useState({
		id: '',
		name: '',
	});
	const [subDivisionObject, setSubDivisionObject] = useState({
		id: '',
		name: '',
	});

	// // new budget
	const [isLoading, setIsLoading] = useState(true);
	const { profileUserData } = useSelector(selectProfile);
	const [isDialogOpen, setIsDialogOpen] = useState(true);

	// data
	const [optionsData, setOptionsData] = useState([]);
	const [defaultData, setDefaultData] = useState({
		state: 'Maharashtra',
		region: '',
		circle: '',
		division: '',
		subdivision: '',
	});
	const [regionData, setRegionData] = useState({
		state: 'Maharashtra',
		region: '',
		circle: '',
		division: '',
		subdivision: '',
	});

	useEffect(() => {
		if (profileUserData?.officeLevel === 'Region') {
			setDefaultData((prevData) => ({
				...prevData,
				region: profileUserData?.officeName,
			}));
			setRegionData((prevData) => ({
				...prevData,
				region: profileUserData?.officeName,
			}));
			setRegionObject({ id: 1, name: profileUserData?.officeName });
		}
	}, [profileUserData]);

	const fetchDefaultRegionData = async () => {
		try {
			const result = await dispatch(getDefaultRegionValues());
			setDefaultData((prevData) => ({
				...prevData,
				region: result?.regionName ? result.regionName : '',
				circle: result?.circleName ? result.circleName : '',
				division: result?.divisionName ? result.divisionName : '',
			}));
			setRegionData((prevData) => ({
				...prevData,
				region: result?.regionName ? result.regionName : '',
				circle: result?.circleName ? result.circleName : '',
				division: result?.divisionName ? result.divisionName : '',
			}));
			if (result?.regionName) {
				setRegionObject({ id: 1, name: result.regionName });
			}
			if (result?.circleName) {
				setCircleObject({ id: 1, name: result.circleName });
			}
			if (result?.divisionName) {
				setDivisionObject({ id: 1, name: result.divisionName });
			}
		} catch (error) {
			console.error('Error fetching default data:', error);
		}
	};

	const fetchDropdownData = async (data) => {
		
		try {
			const result = await dispatch(getJusridictionData(data));
			setOptionsData(result.data);
		} catch (error) {
			console.error('Error fetching dropdown data:', error);
		} finally {
			setIsLoading(false); // Update loading state when data fetching is done
		}
	};

	useEffect(() => {
		if (profileUserData?.officeLevel !== 'Region') {
			fetchDefaultRegionData();
		}
	}, [dispatch, profileUserData]);


	const fetchDataFromApi = (value) => {
		let query = {
			state: '',
			region: '',
			circle: '',
			division: '',
		};

		if (value === 'circle' && regionObject.name) {
			query.state = regionData.state;
			query.region = regionData.region;
			fetchDropdownData(query);
		} else if (value === 'division' && circleObject.name) {
			query.state = regionData.state;
			query.region = regionData.region;
			query.circle = regionData.circle;
			fetchDropdownData(query);
		} else if (value === 'subdivision' && divisionObject.name) {
			query.state = regionData.state;
			query.region = regionData.region;
			query.circle = regionData.circle;
			query.division = regionData.division;
			fetchDropdownData(query);
		}
	};

	const closeDialog = () => {
		// dispatch(setBudgetFlag(false));
		setIsDialogOpen(false);
		closeCalculatorDialog();
	};

	const handleSubmit = () => {
		if (
			circleObject.name.length === 0 ||
			divisionObject.name.length === 0 ||
			subDivisionObject.name.length === 0
		) {
			alert('Kindly Select All Fields');
		} else if (
			circleObject.name.length > 0 &&
			divisionObject.name.length > 0 &&
			subDivisionObject.name.length > 0
		) {
			navigate('/budget', {
				state: { subdivision_name: subDivisionObject.name },
			});
			closeDialog();
		}
	};

	const onChangeRegion = (event, value, label) => {
		setOptionsData([]);
		if (label === 'circle') {
			if (value === null) {
				setCircleObject({ id: '', name: '' });
				setDivisionObject({ id: '', name: '' });
				setSubDivisionObject({ id: '', name: '' });
			} else {
				setRegionData((prevData) => ({
					...prevData,
					// region: result?.regionName ? result.regionName : '',
					circle: value?.name ? value?.name : 'N/A',
					// division: result?.divisionName ? result.divisionName : '',
				}));
				setCircleObject(value);
				setDivisionObject({ id: '', name: '' });
				setSubDivisionObject({ id: '', name: '' });
			}
		} else if (label === 'division') {
			if (value === null) {
				setDivisionObject({ id: '', name: '' });
				setSubDivisionObject({ id: '', name: '' });
			} else {
				setRegionData((prevData) => ({
					...prevData,
					division: value?.name ? value?.name : 'N/A',
				}));
				setDivisionObject(value);
				setSubDivisionObject({ id: '', name: '' });
			}
		} else if (label === 'subdivision') {
			if (value === null) {
				setSubDivisionObject({ id: '', name: '' });
			} else {
				setRegionData((prevData) => ({
					...prevData,
					subdivision: value?.name ? value?.name : 'N/A',
				}));
				setSubDivisionObject(value);
			}
		}
	};

	return (
		<>
			<ShowForPermission permission="VIEWBUDGETMODAL">
				<Modal
					isOpen={isDialogOpen}
					onRequestClose={closeDialog}
					contentLabel="Budget Calculator Dialog"
					style={{
						overlay: {
							backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the overlay background color and opacity
							backdropFilter: 'blur(4px)',
							zIndex: 100,
						},
						content: {
							width: '63vw',
							// maxHeight: '60vh',
							margin: 'auto',
							overflow: 'hidden', // Ensure the modal itself doesn't have scrolling
							borderRadius: '25px',
							transition: 'all 0.3s ease-in-out'
						},
					}}>
					<div
						className="mx-auto mt-8 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative transition-all duration-300"
						style={{
							width: '60vw',
							height: '75vh',
							backgroundColor: 'white',
						}}>
						<div className="absolute mt-[-40px] right-[-5px] w-8 h-8 flex items-center justify-center">
							<div
								className=" cursor-pointer"
								onClick={closeCalculatorDialog}>
								<CloseButton />
							</div>
						</div>
						<div className="flex justify-between">
							<div>
								<h2 className="mb-2 font-poppins text-left text-2xl font-bold ml-6">
									Calculate Budget
								</h2>
								<p
									className="mb-4 font-poppins ml-6 text-sm"
									style={{ color: '#86878B' }}>
									Get a Calculated estimated Budget cost
								</p>
							</div>
							{/* <div
							className="mb-4 font-poppins ml-6"
							style={{
								fontSize: '16px',
								fontWeight: 400,
								lineHeight: '24px',
								letterSpacing: '0em',
								color: '#86878B',
							}}>
							Get a Calculated estimated Budget cost
						</div> */}
							{/* <LoginStatus/> */}
						</div>

						{/* pl-20 pt-10 pb-20 flex flex-col font-poppins mt-7 border-2 border-orange-500 rounded-lg */}
						<div className="flex flex-col font-poppins mt-10 border-2 border-orange-500 rounded-lg w-90[vw] h-[71%]">
							<div className="h-10"></div>
							<div
								className="ml-10 mt-15 mb-10 pt-6 text-left"
								style={{
									fontSize: '24px',
									fontWeight: 700,
									lineHeight: '24px',
									letterSpacing: '0em',
									color: '#00000',
								}}>
								Enter your details
							</div>

							{/* new budget */}

							{/* new budget modal */}
							<div className="grid grid-cols-2 gap-4 justify-center items-center">
								<div className="flex justify-center items-center mb-7">
									{/* <Autocomplete
										size="small"
										// onChange={onChangeCircle}
										id="country-select-demo"
										// sx = {{width: "90%"}}
										sx={{
											'&.Mui-focused .MuiOutlinedInput-notchedOutline':
												{
													borderColor: 'black',
												},
											width: '75%',
											color: 'black',
											cursor: 'pointer',
										}}
										options={[]}
										value={regionObject}
										autoHighlight
										disableTextInput
										// disabled={defaultData?.region !== ''}
										getOptionLabel={(option) => option.name}
										renderOption={(props, option) => (
											<Box
												component="li"
												sx={{
													'& > img': {
														mr: 2,
														flexShrink: 0,
														margin: 0,
													},
												}}
												{...props}>
												{option.name}
											</Box>
										)}
										renderInput={(params) => ( */}
									<TextField
										size="small"
										// label=""
										// {...params}
										sx={{
											color: 'black',
											cursor: 'pointer',

											'&.Mui-focused .MuiOutlinedInput-notchedOutline':
												{
													borderColor: 'black',
												},
											width: '75%',
										}}
										value={regionObject.name}
										label={
											defaultData?.region !== ''
												? 'Region'
												: 'Select Region Name'
										}
										disabled={defaultData?.region !== ''}
										InputProps={{
											readOnly: true,
										}}
										InputLabelProps={{
											shrink: true,
										}}
									/>
									{/* )}
									/> */}
								</div>

								<div className="flex justify-center items-center mb-7">
									<Autocomplete
										size="small"
										onChange={(event, value) =>
											onChangeRegion(
												event,
												value,
												'circle'
											)
										}
										id="country-select-demo"
										sx={{ width: '75%' }}
										options={
											regionObject.name ? optionsData : []
										}
										value={circleObject}
										autoHighlight
										disableTextInput
										onOpen={() =>
											fetchDataFromApi('circle')
										}
										disabled={defaultData?.circle !== ''}
										getOptionLabel={(option) => option.name}
										renderOption={(props, option) => (
											<Box
												component="li"
												sx={{
													'& > img': {
														mr: 2,
														flexShrink: 0,
														margin: 0,
													},
												}}
												{...props}>
												{option.name}
											</Box>
										)}
										renderInput={(params) => (
											<TextField
												{...params}
												label={
													defaultData?.circle !== ''
														? 'Circle'
														: 'Select Circle Name'
												}
												InputProps={{
													...params.InputProps,
													readOnly: true,
												}}
											/>
										)}
									/>
								</div>

								<div className="flex justify-center items-center mb-7">
									<Autocomplete
										size="small"
										onChange={(event, value) =>
											onChangeRegion(
												event,
												value,
												'division'
											)
										}
										id="country-select-demo"
										sx={{ width: '75%' }}
										options={
											circleObject.name ? optionsData : []
										}
										value={divisionObject}
										autoHighlight
										disableTextInput
										onOpen={() =>
											fetchDataFromApi('division')
										}
										disabled={defaultData?.division !== ''}
										getOptionLabel={(option) => option.name}
										renderOption={(props, option) => (
											<Box
												component="li"
												sx={{
													'& > img': {
														mr: 2,
														flexShrink: 0,
														margin: 0,
													},
												}}
												{...props}>
												{option.name}
											</Box>
										)}
										renderInput={(params) => (
											<TextField
												{...params}
												label={
													defaultData?.division !==
														'' ||
													regionData?.division !== ''
														? 'Division'
														: 'Select Division Name'
												}
											/>
										)}
									/>
								</div>

								<div className="flex justify-center items-center mb-7">
									<Autocomplete
										size="small"
										onChange={(event, value) =>
											onChangeRegion(
												event,
												value,
												'subdivision'
											)
										}
										id="country-select-demo"
										sx={{
											width: '75%',
											borderColor: 'none',
											outline: 'none',
										}}
										options={
											divisionObject.name
												? optionsData
												: []
										}
										value={subDivisionObject}
										autoHighlight
										disableTextInput
										onOpen={() =>
											fetchDataFromApi('subdivision')
										}
										// disabled={
										// 	defaultData?.subdivision !== ''
										// }
										getOptionLabel={(option) => option.name}
										renderOption={(props, option) => (
											<Box
												component="li"
												sx={{
													'& > img': {
														mr: 2,
														flexShrink: 0,
														margin: 0,
														borderColor: 'none',
														outline: 'none',
													},
												}}
												{...props}>
												{option.name}
											</Box>
										)}
										renderInput={(params) => (
											<TextField
												{...params}
												label={
													defaultData?.subdivision !==
														'' ||
													regionData?.subdivision !==
														''
														? 'Sub-division'
														: 'Select Sub-Division Name'
												}
											/>
										)}
									/>
								</div>
							</div>

							<div
								className="mb-20 mt-10 d-flex justify-content-center  "
								style={{
									marginLeft: 'auto',
									marginRight: 'auto',
									width: '205.87px',
								}}>
								<Button
									type="submit"
									onClick={handleSubmit}
									style={{
										width: '205px',
										height: '47px',
										backgroundColor: '#ff6100',
										borderRadius: '4px',
										color: '#FFF',
										textAlign: 'center',
									}}>
									Submit
								</Button>
							</div>
						</div>
					</div>
				</Modal>
			</ShowForPermission>
		</>
	);
};

export default BudgetCard;
