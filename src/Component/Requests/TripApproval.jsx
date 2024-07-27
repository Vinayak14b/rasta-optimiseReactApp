import React,{ useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios';
import InnerSideBar from '../InnerSideBar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuList from '@mui/material/MenuList';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import { tripapprovalendpoints } from '../../usermanagement/services/apis';
import InputLabel from '@mui/material/InputLabel';
import { Spinner } from '../../utils/Spinner';
import { getTripApprovalList } from '../../usermanagement/services/Operations/requestAPI';
import NoRequestFoundPage from '../NoRequestFoundPage';

const TripApproval = () => {
	const dispatch = useDispatch();
	const [filterStatus, setFilterStatus] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [openMenu, setOpenMenu] = useState(null);
	const [highlightedRow, setHighlightedRow] = useState(null);
	const [activePage, setActivePage] = useState('tripapproval');
	const [tripApprovalsData, setTripApprovalsData] = useState([]);
	const [filtertripApprovalsData, filtersetTripApprovalsData] = useState([]);
	const [trigger, setTrigger] = useState(false);
	const anchorRef = React.useRef(null);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [limit, setLimit] = useState(10);
	const [skip, setSkip] = useState(0);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPagesCount, setTotalPagesCount] = useState(0);
	const [apiCallCount, setApiCallCount] = useState(0);
	const [tripStatus, setTripStatus] = useState(false);
	// use effect for api call
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			
			try {
				const result = await dispatch(
					getTripApprovalList(limit, skip, searchQuery, filterStatus)
				);
				setTripApprovalsData(result?.profile);
				calculateTotalPages(result?.count);
				filtersetTripApprovalsData(result);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
			setLoading(false);
		};

		fetchData();
	}, [
		trigger,
		limit,
		skip,
		searchQuery,
		filterStatus,
		apiCallCount,
		tripStatus,
	]);

	// limit changes
	useEffect(() => {
		setCurrentPage(1);
		setSkip(0);
		setApiCallCount(0);
	}, [limit, searchQuery, filterStatus]);


	const calculateTotalPages = (count) => {
		setTotalPagesCount(Math.ceil(count / limit));
	};

	const handleLimitChange = (event) => {
		setLimit(event.target.value);
	};

	const handlePrevPageChange = (event) => {
		if (currentPage > 1) {
			setSkip(limit * (currentPage - 2));
			setCurrentPage(currentPage - 1);
			setApiCallCount(apiCallCount + 1);
		}
	};

	const handleNextPageChange = (event) => {
		if (currentPage < totalPagesCount) {
			setSkip(limit * currentPage);
			setCurrentPage(currentPage + 1);
			setApiCallCount(apiCallCount + 1);
		}
	};

	const customFontStyle = {
		fontFamily: 'Poppins',
		paddingTop: '20px',
		width: '400px',
	};

	const handleMenuClose = () => {
		setOpenMenu(null);
	};

	const handleFilterStatusChange = (status) => {
		setFilterStatus(status);
		handleMenuClose();
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleListKeyDown = (event) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	// trip approval api
	const makeApiCall = async (userEmail, username, id) => {
		// const toastId = toast.loading('Trip Status Updating...');
		try {
			const url = `${tripapprovalendpoints.APPROVE_STATUS}`;
			const apiUrl = url;
			const method = 'PUT';

			const requestData = {
				Status: 'Pending',
				// Username: loginUserName,
				_id: id,
			};

			const response = await axios({
				method: method,
				url: apiUrl,
				data: requestData,
			});

			// Assuming the API response contains data
			if (response.status === 200) {
				setTrigger(true);
				// Live update the status in the table
				setTripApprovalsData((prevData) => {
					const updatedData = prevData.map((item) => {
						if (item.userEmail === userEmail) {
							return { ...item, status: 'Approved' };
						}
						return item;
					});
					return updatedData;
				});
			}

			return response.status;
		} catch (error) {
			console.error("error in the api",error);
			throw new Error(`API call failed: ${error.message}`);
		}
		// toast.dismiss(toastId);
	};

	const onChangeFilter = async (newValue, row) => {

		if (newValue === null) {
			const newState = tripApprovalsData.map((item) => {
				if (item.id === row.id) {
					return { ...item, status: null };
				}
				return item;
			});
			setTripApprovalsData(newState);
		} else {
			const newState = tripApprovalsData.map((item) => {
				if (item.id === row.id) {
					return { ...item, status: newValue.label };
				}
				return item;
			});
			setTripApprovalsData(newState);

			if (newValue === 'Approved') {
				try {
					toast.success('Trip Approved Successfully');
					setTripStatus(true);
					const apiResponse = await makeApiCall(
						row.userEmail,
						row.userName,
						row._id
					);

					// Check if the API call was successful, then update the status
					if (apiResponse === 200) {
						// Live update the status in the table
						const updatedState = tripApprovalsData.map((item) => {
							if (item.userEmail === row.userEmail) {
								return { ...item, status: 'Approved' };
							}
							return item;
						});
						setTripApprovalsData(updatedState);

						// Update the Autocomplete component value
						const updatedRow = { ...row, status: 'Approved' };
						onChangeFilter(updatedRow, row);
					} else {
						console.error(
							'API call failed with status code:',
							apiResponse.status
						);
					}
				} catch (error) {
					// toast.error('Failed to Approve Trip ');
					// toast.error('Something Went Wrong ');
					console.error('Error making API call:', error.message);
				}
			}
		}
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleFilterChange = (selectedFilter) => {
		setFilterStatus(selectedFilter);
	};

	return (
		<>
			<InnerSideBar
				setActivePage={handlePageChange}
				activePage={activePage}
			/>
			<div
				style={{
					maxWidth: '100%',
					marginLeft: '80px',
					'&::-webkit-scrollbar': {
						display: 'none', // Hide the scrollbar for Webkit browsers
					},
					scrollbarWidth: 'none', // Hide the scrollbar for Firefox
					msOverflowStyle: 'none',
				}}>
				{/* title */}
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4 mt-2 leading-60 tracking-normal font-poppins">
						Trip Approval
					</h1>
					<hr className="border-1 border-black w-[280px] mx-auto mb-4" />
				</div>

				{/* descritption */}

				<h3 className="font-poppins text-base font-normal leading-6 text-center text-gray-400 mb-6">
					View all Updates received from the Rasta.ai Application
				</h3>

				<div className="flex items-center justify-center mb-2">
					{/* search box */}
					<div className="relative mr-4">
						<input
							type="text"
							placeholder="Search..."
							className="border p-2 pr-8 rounded bg-gray-200 text-gray-700 font-poppins text-base font-medium leading-6 w-[320px]"
							value={searchQuery}
							onChange={(e) => {
								const inputValue = e.target.value
									.trim()
									.toLowerCase(); // Convert input to lowercase for case-insensitive search
								setSearchQuery(inputValue);

								let filteredData = tripApprovalsData;
								if (inputValue !== '') {
									// If there is a search query, filter the data based on whether the road number contains the query
									filteredData = tripApprovalsData.filter(
										(item) => {
											const roadNoMatch = item.roadNo
												.toLowerCase()
												.includes(inputValue);
											const roadNameMatch = item.roadName
												.toLowerCase()
												.includes(inputValue);
											const userNameMatch = item.userEmail
												.toLowerCase()
												.includes(inputValue);
											// Add additional fields if needed

											// Return true if any of the fields match the inputValue
											return (
												roadNoMatch ||
												roadNameMatch ||
												userNameMatch
											);
											return item.roadNo
												.toLowerCase()
												.includes(inputValue);
										}
									);
								}


								// Update the displayed data with the filtered data or all data if the search is empty
								filtersetTripApprovalsData(
									inputValue !== ''
										? filteredData
										: tripApprovalsData
								);
							}}
						/>

						{/* search icon */}
						<div className="absolute top-0 right-0 mt-2 mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								className="w-6 h-6 text-gray-500">
								<path d="M21 21l-6-6"></path>
								<circle cx="10" cy="10" r="7"></circle>
							</svg>
						</div>
					</div>

					{/* filter */}
					<div className="relative">
						<div className="filter-button-container">
							<div className="relative">
								<Button
									ref={anchorRef}
									id="filter-dropdown-button"
									aria-controls={
										open
											? 'filter-dropdown-menu'
											: undefined
									}
									aria-expanded={open ? 'true' : undefined}
									aria-haspopup="true"
									onClick={handleToggle}
									style={{
										backgroundColor: '#FE6100',
										color: 'white',
										textTransform: 'none',
										display: 'flex',
										alignItems: 'center',
										width: '150px',
										padding: '8px',
									}}>
									<img
										src="icons/AddUser.png"
										alt="Filter Icon"
										style={{
											width: '20px',
											height: '20px',
											marginRight: '8px',
										}}
									/>
									{filterStatus || 'Filter Requests'}
								</Button>
								<Popper
									open={open}
									anchorEl={anchorRef.current}
									role={undefined}
									placement="bottom-start"
									transition
									disablePortal>
									{({ TransitionProps, placement }) => (
										<Grow
											{...TransitionProps}
											style={{
												transformOrigin:
													placement === 'bottom-start'
														? 'left top'
														: 'left bottom',
											}}>
											<Paper>
												<ClickAwayListener
													onClickAway={handleClose}>
													<MenuList
														autoFocusItem={open}
														id="filter-dropdown-menu"
														aria-labelledby="filter-dropdown-button"
														onKeyDown={
															handleListKeyDown
														}>
														<MenuItem
															onClick={() =>
																handleFilterChange(
																	'All'
																)
															}
															style={{
																fontSize:
																	'16px',
																minWidth:
																	'150px',
															}}>
															All
														</MenuItem>
														<MenuItem
															onClick={() =>
																handleFilterChange(
																	'Pending'
																)
															}
															style={{
																fontSize:
																	'16px',
																minWidth:
																	'150px',
															}}>
															Pending
														</MenuItem>
														{/* <MenuItem
															onClick={() =>
																handleFilterChange(
																	'Reject'
																)
															}
															style={{
																fontSize:
																	'16px',
																minWidth:
																	'150px',
															}}>
															Reject
														</MenuItem> */}
														<MenuItem
															onClick={() =>
																handleFilterChange(
																	'Approved'
																)
															}
															style={{
																fontSize:
																	'16px',
																minWidth:
																	'150px',
															}}>
															Approved
														</MenuItem>
													</MenuList>
												</ClickAwayListener>
											</Paper>
										</Grow>
									)}
								</Popper>
							</div>
						</div>
					</div>

					{/* limit */}
					<div className="relative ml-30">
						<Box
							sx={{
								minWidth: 120,
								// borderColor: 'orange',
								// borderWidth: 2,
								// borderStyle: 'solid',
							}}>
							<FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
								<InputLabel
									id="demo-simple-select-label"
									sx={{
										backgroundColor: 'white',
										paddingLeft: 2,
									}}>
									Limit
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={limit}
									label="Limit"
									onChange={handleLimitChange}
									sx={{ backgroundColor: 'white' }}>
									<MenuItem
										value={10}
										sx={{ backgroundColor: 'white' }}>
										10
									</MenuItem>
									<MenuItem
										value={20}
										sx={{ backgroundColor: 'white' }}>
										20
									</MenuItem>
									<MenuItem
										value={50}
										sx={{ backgroundColor: 'white' }}>
										50
									</MenuItem>
									<MenuItem
										value={100}
										sx={{ backgroundColor: 'white' }}>
										100
									</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>
				</div>

				{/* table */}
				<div
					style={{
						overflowX: 'scroll',
						maxWidth: '100%',
						marginBottom: '65px',
					}}>
					<table className="h-fit ml-4 bg-white shadow-md rounded my-6 w-[95%] mx-auto ">
						<thead className="text-center font-poppins">
							<tr>
								<th
									className="bg-primary text-white p-4 "
									style={{
										width: '60%',
									}}>
									User Email
								</th>
								<th
									className="bg-primary text-white p-4"
									style={{
										width: '50%',
									}}>
									Road No{' '}
								</th>
								<th
									className="bg-primary text-white p-4"
									style={{
										width: '50%',
									}}>
									Road Name
								</th>
								<th
									className="bg-primary text-white p-4"
									style={{
										width: '50%',
										paddingRight: '10px',
									}}>
									Road Category
								</th>
								<th
									className="bg-primary text-white p-4 "
									style={{
										width: '50%',
										paddingRight: '10px',
									}}>
									Road Type
								</th>
								<th
									className="bg-primary text-white p-4"
									style={{ width: '50%' }}>
									Start Chainage
								</th>
								<th
									className="bg-primary text-white p-4"
									style={{ width: '50%' }}>
									Distance
								</th>
								<th
									className="bg-primary text-white p-4 w-40"
									style={{ width: '70%' }}>
									{' '}
									<span className="text-primary invisible">
										.......
									</span>
									Date
									<span className="text-primary invisible">
										.......
									</span>
								</th>
								<th
									className="bg-primary text-white p-4"
									style={{ width: '50%' }}>
									Status
								</th>{' '}
								<th
									className="bg-primary text-white p-4"
									style={{ width: '50%' }}>
									StatusSelected
								</th>
								<th
									className="bg-primary text-white p-4"
									style={{ width: '50%' }}>
									Updated By
								</th>
							</tr>
						</thead>

						<tbody className="bg-D9D9D9 text-center justify-center">
							{loading ? (
								<tr>
									<td colSpan="12">
										<Spinner />
									</td>
								</tr>
							) : tripApprovalsData?.length === 0 ||
							  tripApprovalsData === undefined ? (
								<tr>
									<td
										colSpan="12"
										className="font-poppins h-14 font-bold text-xl">
										<NoRequestFoundPage />
									</td>
								</tr>
							) : (
								tripApprovalsData.map((row, index) => (
									<tr
										key={index}
										style={{
											backgroundColor:
												index === highlightedRow
													? 'lightblue'
													: 'white',
										}}>
										<td
											className="bg-D9D9D9 text-black p-10 shadow-md"
											style={customFontStyle}>
											{row.userEmail}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.roadNo}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.roadName}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.roadCategory}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.roadType}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.startChainage}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.distance}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.Date.split('-')
												.reverse()
												.join('-')}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.Status === 'Approved' ? (
												<Autocomplete
													size="small"
													value={row.Status}
													options={['Approved']} // Only include 'Approved' as the option
													disabled // Disable the Autocomplete when status is 'Approved'
													sx={{ width: 200 }}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Status"
														/>
													)}
												/>
											) : (
												<Autocomplete
													size="small"
													value={row.Status}
													options={[
														'Pending',
														'Approved',
													]}
													onChange={(
														event,
														newValue
													) =>
														onChangeFilter(
															newValue,
															row
														)
													}
													sx={{ width: 200 }}
													renderInput={(params) => (
														<TextField
															{...params}
															label="Status"
														/>
													)}
												/>
											)}
										</td>

										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.Status === 'Approved' ? (
												<CheckCircleOutlineIcon
													fontSize="small"
													style={{ color: 'green' }}
												/>
											) : (
												<CancelIcon
													fontSize="small"
													style={{ color: 'red' }}
												/>
											)}
										</td>
										<td
											className="bg-D9D9D9 text-black p-4 shadow-md"
											style={customFontStyle}>
											{row.updatedBy}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{tripApprovalsData?.length === 0 ||
				tripApprovalsData === undefined ? null : (
					<div className="fixed bottom-0 w-[100%] z-10  bg-[#6d44fc] text-white  border-t-[1.5px] border-t-gray-500">
						<div className="flex items-center gap-x-3 w-full  mx-auto bg-slate-100 py-1 justify-evenly">
							<div className="flex-1">
								<button
									onClick={() => handlePrevPageChange()}
									className={`h-[2.2rem] w-[6rem] border-2 font-poppins bg-[#FE6100] text-sm border-gray-300 py-1 px-4 rounded-md ml-[10px] ${
										currentPage > 1 ? '' : 'invisible'
									}`}>
									Previous
								</button>
							</div>
							<p className="flex-1 text-black text-center font-poppins text-sm font-semibold  mr-[80px]">
								Page {currentPage} of{' '}
								{loading ? (
									<span>Loading...</span>
								) : (
									totalPagesCount
								)}
							</p>
							<div className="flex-1 text-right">
								<button
									onClick={() => handleNextPageChange()}
									className={`h-[2.2rem] w-[96px] border-2 font-poppins bg-[#FE6100] text-sm border-gray-300 py-1 px-4 rounded-md mr-[95px] ${
										currentPage < totalPagesCount
											? ''
											: 'invisible'
									}`}>
									Next
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default TripApproval;
