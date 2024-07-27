import React,{ useEffect, useState } from 'react';
import {
	FormControlLabel,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import '../CSS/Utils.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import increaseIcon from '../assets/markers/increaseIcon.png';
import decreaseIcon from '../assets/markers/decreaseIcon.png';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { row, dropdowndata } from './ListView/constants';
import ConditionCol from './ConditionCol';
import { extractAllRoads } from '../utils/utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSurveyedRoadData } from '../mapbox/services/Operations/RoadsAPI';
import { ShowForPermission } from '../usermanagement/accesscontrol/ShowPermissionComponent';
import { useSidebar } from './Context/SidebarContext';
import { Spinner } from '../utils/Spinner';
import { selectTrip } from '../mapbox/slices/tripSlice';
import { BackButton } from './Utils/BackButton';
import { FaRegEdit } from 'react-icons/fa';

const TypeCol = ({ params }) => {

	if (params.id % 2 == 0) {
		return (
			<div
				className="flex justify-between items-center w-full"
				style={{ cursor: 'pointer' }}>
				<div>{row.isAscending}</div>
				<FormControlLabel
					control={
						<IconButton
							color="secondary"
							aria-label="add an alarm"
							// onClick={handleEditClick}
						>
							<img src={decreaseIcon} alt="increaseIcon" />
						</IconButton>
					}
				/>
			</div>
		);
	}

	return (
		<div
			className="flex justify-between items-center w-full"
			style={{ cursor: 'pointer' }}>
			<div>{row.isAscending}</div>
			<FormControlLabel
				control={
					<IconButton
						color="secondary"
						aria-label="add an alarm"
						// onClick={handleEditClick}
					>
						<img src={increaseIcon} alt="increaseIcon" />
					</IconButton>
				}
			/>
		</div>
	);
};

// Add more sample data as needed

const ListView = () => {
	const [loading, setLoading] = useState(null);
	const [roadList, setRoadList] = useState([]);
	const { selectedOfficeName, selectedOfficeLevel } = useSelector(selectTrip);
	const searchQuery = {
		officeLevel: selectedOfficeLevel,
		officeName: selectedOfficeName,
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setListViewOpen(false);

			try {
				const result = await dispatch(
					getSurveyedRoadData(setLoading, searchQuery)
				);
				setRoadList(result);
			} catch (error) {
				console.error('Error fetching road data:', error);
			}
			setLoading(false);
		};

		fetchData();
	}, [selectedOfficeName, selectedOfficeLevel]);

	const { userType } = useSelector((state) => state.auth);
	const [selectedRegion, setSelectedRegion] = useState(null);
	const [selectedCircle, setSelectedCircle] = useState(null);
	const [selectedDivision, setSelectedDivision] = useState(null);
	const [selectedSubDivision, setSelectedSubDivision] = useState(null);
	const [openRegion, setOpenRegion] = React.useState(false);
	const [openCircle, setOpenCircle] = React.useState(false);
	const [openDivision, setOpenDivision] = React.useState(false);
	const [openSubDivision, setOpenSubDivision] = React.useState(false);
	const dispatch = useDispatch();
	const getInfo = (road_no) => {};
	const { listViewOpen, setListViewOpen } = useSidebar();

	const columns = [
		{
			field: 'Date',
			headerName: 'Date',
			width: 150,
			renderCell: (roadList) => (
				<p onClick={() => getInfo(roadList.Date)}>{roadList.Date}</p>
			),
		},
		{
			field: 'road_no',
			headerName: 'Road Number',
			width: 150,
			renderCell: (row) => (
				<p onClick={() => getInfo(roadList.roadNo)}>
					{roadList.roadNo}
				</p>
			),
		},
		{
			field: 'road_name',
			headerName: 'Road Name',
			width: 200,
		},
		{ field: 'start_chainage', headerName: 'Start Chainage', width: 150 },
		{ field: 'end_chainage', headerName: 'End Chainage', width: 150 },
		{ field: 'distance', headerName: 'Distance', width: 150 },
		{
			field: 'juniorExecutiveName',
			headerName: 'Engineer Name',
			width: 150,
		},
		{
			field: 'type',
			headerName: 'Type',
			width: 200,
			sortable: false,
			disableClickEventBubbling: true,
			renderCell: (row) => <TypeCol row={row} />,
		},
		...(userType == 'Owner'
			? [
					{
						field: 'Region',
						headerName: 'Region',
						width: 150,
					},
					{
						field: 'Circle',
						headerName: 'Circle',
						width: 150,
					},
					{
						field: 'Divison',
						headerName: 'Division',
						width: 150,
					},
					{
						field: 'Sub-Division',
						headerName: 'Sub-Division',
						width: 150,
					},
					{
						field: 'edit',
						headerName: 'Edit',
						width: 75,
					},{}
			  ]
			: []),
		{
			field: 'condition',
			headerName: 'Condition',
			width: 500,
			sortable: false,
			disableClickEventBubbling: true,
			renderCell: (row) => <ConditionCol params={row} />,
		},
	];
	const columnsWithoutCondition = columns.slice(0, -1);

	// Handlers for dropdowns
	const handleRegionChange = (RegionId) => {
		const region = dropdowndata.find(
			(item) => item.id === parseInt(RegionId, 10)
		);
		if (region) setSelectedRegion(region);
		else setSelectedRegion('');
		setSelectedCircle(null);
		setSelectedDivision(null);
		setSelectedSubDivision(null);
	};
	const handleCircleChange = (CircleId) => {
		const Circle = selectedRegion.circle.find(
			(item) => item.id === parseInt(CircleId, 10)
		);
		setSelectedCircle(Circle);
		setSelectedDivision(null);
		setSelectedSubDivision(null);
	};
	const handleDivisionChange = (DivisionId) => {
		const Division = selectedCircle.division.find(
			(item) => item.id === parseInt(DivisionId, 10)
		);
		setSelectedDivision(Division);
		setSelectedSubDivision(null);
	};
	const handleSubDivisionChange = (SubDivisionId) => {
		const SubDivision = selectedDivision.subdivisions.find(
			(item) => item.id === parseInt(SubDivisionId, 10)
		);
		setSelectedSubDivision(SubDivision);
	};
	const handleCloseDrop = (val) => {
		switch (val) {
			case 'Select Region':
				setOpenRegion(false);
				break;
			case 'Select Circle':
				setOpenCircle(false);
				break;
			case 'Select Division':
				setOpenDivision(false);
				break;
			case 'Select SubDivision':
				setOpenSubDivision(false);
				break;
			default:
				break;
		}
	};
	const handleOpenDrop = (val) => {
		switch (val) {
			case 'Select Region':
				setOpenRegion(true);
				break;
			case 'Select Circle':
				setOpenCircle(true);
				break;
			case 'Select Division':
				setOpenDivision(true);
				break;
			case 'Select SubDivision':
				setOpenSubDivision(true);
				break;
			default:
				break;
		}
	};

	const renderDropdown = (items, onSelect, placeholder) => {
		if (placeholder === 'Select Region') {
			return (
				<>
					<FormControl sx={{ m: 2, minWidth: 200 }}>
						<InputLabel
							id="demo-controlled-open-select-label"
							style={{ color: '#FE6100' }}>
							{placeholder}
						</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={openRegion}
							onClose={() => handleCloseDrop(placeholder)}
							onOpen={() => handleOpenDrop(placeholder)}
							label={placeholder}
							onChange={(e) => onSelect(e.target.value)}
							value={items ? items.id : ''}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{items &&
								items.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</>
			);
		} else if (placeholder === 'Select Circle') {
			return (
				<>
					<FormControl sx={{ m: 2, minWidth: 200 }}>
						<InputLabel id="demo-controlled-open-select-label">
							{placeholder}
						</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={openCircle}
							onClose={() => handleCloseDrop(placeholder)}
							onOpen={() => handleOpenDrop(placeholder)}
							label={placeholder}
							onChange={(e) => onSelect(e.target.value)}
							value={items ? items.id : ''}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{items &&
								items.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</>
			);
		} else if (placeholder === 'Select Division') {
			return (
				<>
					<FormControl sx={{ m: 2, minWidth: 200 }}>
						<InputLabel id="demo-controlled-open-select-label">
							{placeholder}
						</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={openDivision}
							onClose={() => handleCloseDrop(placeholder)}
							onOpen={() => handleOpenDrop(placeholder)}
							label={placeholder}
							onChange={(e) => onSelect(e.target.value)}
							value={items ? items.id : ''}>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{items &&
								items.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</>
			);
		} else if (placeholder === 'Select SubDivision') {
			return (
				<>
					<FormControl sx={{ m: 2, minWidth: 200 }}>
						<InputLabel id="demo-controlled-open-select-label">
							{placeholder}
						</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="demo-controlled-open-select"
							open={openSubDivision}
							onClose={() => handleCloseDrop(placeholder)}
							onOpen={() => handleOpenDrop(placeholder)}
							label={placeholder}
							onChange={(e) => onSelect(e.target.value)}
							value={items ? items.id : ''}>
							<MenuItem value={''}>
								<em>None</em>
							</MenuItem>
							{items &&
								items.map((item) => (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</>
			);
		}
	};

	const [filteredData, setFilteredData] = useState([]);

	const submitData = (RegionId, CircleId, DivisionId, SubDivisionId) => {
		const filteredRows = row.filter((row) => {
			const hasMatchingRegion =
				RegionId === null || row.RegionId === RegionId;
			const hasMatchingCircle =
				CircleId === null || row.CircleId === CircleId;
			const hasMatchingDivision =
				DivisionId === null || row.DivisionId === DivisionId;
			const hasMatchingSubDivision =
				SubDivisionId === null || row.SubDivisionId === SubDivisionId;

			return (
				hasMatchingRegion &&
				hasMatchingCircle &&
				hasMatchingDivision &&
				hasMatchingSubDivision
			);
		});

		const extractedRoads = extractAllRoads(
			selectedSubDivision ||
				selectedDivision ||
				selectedCircle ||
				selectedRegion
		);

		// Update the Circle with the filtered data
		setFilteredData(extractedRoads);
	};

	const reverseAndFormatDate = (dateString) => {
		const [year, month, day] = dateString.split('-');
		return `${day}-${month}-${year}`;
	};

	let row = [];

	return (
		<div className="flex ">
			<div className="flex">
				<Sidebar />
				{listViewOpen && (
					<div className="bg-white w-[320px] ">demo divv</div>
				)}
				{/* Render your dropdowns */}
			</div>

			{/* div list view */}
			<div className="flex-col ml-20 flex-1  h-screen ">
				<div>
					<ShowForPermission permission="SELECT_LIST_VIEW_REGION">
						<div className="flex items-center">
							{renderDropdown(
								dropdowndata,
								handleRegionChange,
								'Select Region'
							)}
							{selectedRegion &&
								renderDropdown(
									selectedRegion.circle,
									handleCircleChange,
									'Select Circle'
								)}
							{selectedCircle &&
								renderDropdown(
									selectedCircle.division,
									handleDivisionChange,
									'Select Division'
								)}
							{selectedDivision &&
								renderDropdown(
									selectedDivision.subdivisions,
									handleSubDivisionChange,
									'Select SubDivision'
								)}

							<button
								className="bg-orange-500 text-white px-4 py-2 rounded-md ml-4 h-[80%]"
								onClick={() =>
									submitData(
										selectedRegion?.id,
										selectedCircle?.id,
										selectedDivision?.id,
										selectedSubDivision?.id
									)
								}>
								Submit Data
							</button>
						</div>
					</ShowForPermission>
				</div>

				{/* heading and table */}
				<div className="">
					<div className="mb-[2rem] mt-10 p-y-3 flex">
						<div className="flex justify-center items-center ml-8 mt-2">
							<BackButton direct={-1} />
						</div>
						<h1 className="font-poppins font-bold text-4xl ml-10">
							List of Trips
						</h1>
					</div>

					<div className="w-[85vw] h-[70vh] ml-[60px] font-poppins ">
						<TableContainer
							style={{
								boxShadow: '-1px 2px 7px 1px rgba(0,0,0,0.75)',
								borderRadius: '8px',

								// overflow: 'hidden'
							}}
							className="overflow-x-auto ">
							{loading ? (
								<div className=" flex justify-center items-center  h-[50vh] w-full hide-scrollbar ">
									<Spinner />
								</div>
							) : (
								<Table stickyHeader aria-label="sticky table">
									<TableHead
										style={{
											border: '1px solid #FE6100',
											zIndex: -5,
										}}>
										<TableRow>
											{columnsWithoutCondition.map(
												(column) => (
													<TableCell
														key={column.field}
														//   align={column.align}
														style={{
															minWidth:
																column.width,
															backgroundColor:
																'white',
															color: 'black',
															// zIndex: -10,
															fontWeight: 600,
															fontFamily:
																'poppins',
														}}>
														{column.headerName}
													</TableCell>
												)
											)}
										</TableRow>
									</TableHead>

									<TableBody>
										{roadList.length > 0 ? (
											roadList.map((row, index) => (
												<TableRow
													key={index}
													hover
													role="checkbox"
													tabIndex={-1}
													style={{
														fontFamily: 'poppins',
													}}>
													<TableCell>
														{/* {row.Date} */}
														{reverseAndFormatDate(
															row.Date
														)}
													</TableCell>
													<TableCell>
														{row.roadNo}
													</TableCell>
													<TableCell>
														<Link
															to={`/displaymap/road/${encodeURIComponent(
																row.roadName
															)}/${encodeURIComponent(
																row.roadNo
															)}-date-${encodeURIComponent(
																reverseAndFormatDate(
																	row.Date
																)
															)}`}
															className="text-blue-800">
															{row.roadName}
														</Link>
													</TableCell>
													<TableCell>
														{row.startChainage}
													</TableCell>
													<TableCell>
														{row.endChainage}
													</TableCell>
													<TableCell>
														{row.distance} km
													</TableCell>
													<TableCell>
														{
															row.juniorExecutiveName
														}
													</TableCell>
													<TableCell>
														{row.isAscending ===
														'1' ? (
															<span>
																Ascending
																<IconButton
																	color="secondary"
																	aria-label="ascending">
																	<img
																		src={
																			increaseIcon
																		}
																		alt="increaseIcon"
																	/>
																</IconButton>
															</span>
														) : row.isAscending ===
														  '0' ? (
															<span>
																Descending
																<IconButton
																	color="secondary"
																	aria-label="descending">
																	<img
																		src={
																			decreaseIcon
																		}
																		alt="decreaseIcon"
																	/>
																</IconButton>
															</span>
														) : null}
													</TableCell>
													{userType == 'Owner' && (
														<>
															<TableCell>
																{row.region}
															</TableCell>
															<TableCell>
																{row.circle}
															</TableCell>
															<TableCell>
																{row.division}
															</TableCell>
															<TableCell>
																{
																	row.subDivision
																}
															</TableCell>
															<TableCell className="hover:scale-110">
																<Link
																	to={`/editRoadInfo/${row.roadId}`}
																	// state={{ roadData: row }}
																>
																	<FaRegEdit className="text-primary w-5 h-5 " />
																</Link>
															</TableCell>
														</>
													)}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell
													colSpan={7}
													align="center">
													<div className="flex justify-center items-center text-lg font-poppins font-normal gap-x-1">
														<span>
															No Data Available
															for{' '}
														</span>
														<span className="font-semibold">
															{selectedOfficeName}
														</span>
														<span>
															{' '}
															in jurisdiction{' '}
														</span>
														<span className="font-semibold">
															{
																selectedOfficeLevel
															}
															.
														</span>
													</div>
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							)}
						</TableContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListView;