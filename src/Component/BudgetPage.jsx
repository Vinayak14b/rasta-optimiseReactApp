//BudgetPage.js
import React,{ useState, useEffect } from 'react';
import lock from '../assets/img/lock_crown.png';

//import { Checkbox } from '@mui/material';
import {
	Checkbox,
	Select,
	MenuItem,
} from '@mui/material';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getRoadListInDropDown,
	getSingleRoadBudgetData,
} from '../mapbox/services/Operations/RoadsAPI';
import { selectProfile } from '../usermanagement/slices/profileSlice';
import { selectAuth } from '../usermanagement/slices/authSlice';

const BudgetPage = ({ closeCalculatorDialog }) => {
	const [roadListArray, setRoadListArrray] = useState([]);
	const [pricePlan, setPricePlan] = useState(true);
	const [selectedItems, setSelectedItems] = useState([]);
	// const itemsForSecondaryDropDown = ["Road 1", "Road 2", "Road 3"];
	const [calculateClicked, setCalculateClicked] = useState(false);
	const [totalCost, setTotalCost] = useState(0);
	const [selectedRoad, setSelectedRoad] = useState('All Roads');
	// const [subdivionValue, setSubdivisionValue] = useState('');
	const [selectedRoadData, setSelectedRoadData] = useState([]);
	// const [itemsForSecondaryDropDown, setItemsForSecondaryDropDown] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [reportSelectionDialogOpen, setReportSelectionDialogOpen] =
		useState(false);

	const dispatch = useDispatch();
	const { userType } = useSelector(selectAuth);
	const { profileUserData } = useSelector(selectProfile);
	const location = useLocation();

	// if (userType !== 'JE') {
	const { subdivision_name } = location.state || {};
	// setSubdivisionValue(subdivision_name);
	// }

	// api for dropdown list
	useEffect(() => {
		// localStorage.setItem('fromRasta', 'true');
		const fetchData = async () => {
			let subdivisionName = '';
			try {
				if (userType === 'JE') {
					subdivisionName = null;
				} else if (
					userType === 'Admin' &&
					profileUserData?.officeLevel === 'Sub-division'
				) {
					subdivisionName = profileUserData?.officeName;
				} else {
					subdivisionName = subdivision_name;
				}
				const result = await dispatch(
					getRoadListInDropDown(subdivisionName)
				);
				if (result) {
					setRoadListArrray(
						result.map(
							(road) => `${road.roadNo} - ${road.roadName}`
						)
					);
				}
			} catch (error) {
				console.error('Error fetching road data:', error);
			}
		};

		fetchData();
	}, []);
	useEffect(() => {
		handleCalculate();
	}, [selectedItems, tableData]);

	const getSingleRoadPointData = async (value) => {
		const [roadNo, roadName] = value.split(' - ');

		try {
			const result = await dispatch(
				getSingleRoadBudgetData(roadName, roadNo)
			);
			if (result[0]) {
				setSelectedRoadData(result[0]);
			}
		} catch (error) {
			console.error('Error fetching road data:', error);
		}
	};

	useEffect(() => {
		if (selectedRoadData && selectedRoadData.total_detected) {
			const updatedTableData = Object.keys(
				selectedRoadData.total_detected
			).map((defect, index) => {
				const cost = getCostForDefect(defect);
				// const cost =1000
				const found = selectedRoadData.total_detected[defect] || 0;
				const total = cost * found;

				return {
					id: index + 1,
					// defect: defect,
					defect: defect.charAt(0).toUpperCase() + defect.slice(1), // Capitalize the first letter of the defect name
					cost: cost, // Assign the cost calculated earlier
					found: found,
					total: total,
				};
			});
			setTableData(updatedTableData);
		}
	}, [selectedRoadData]);

	// Define a function to get the cost for each defect
	const getCostForDefect = (defect) => {
		defect = defect.toUpperCase();
		switch (defect) {
			// Convert the defect to uppercase before comparing
			case 'MANHOLE':
				return 1000; // Set the cost for Manhole
			case 'POTHOLE':
				return 2000; // Set the cost for Pothole
			case 'SPEED BREAKER':
				return 1500;
			case 'HOTSPOT':
				return 2000;
			case 'ROADPATCH':
				return 2000;
			case 'MINOR-POTHOLE':
				return 1500;
			case 'MAJOR-POTHOLE':
				return 2500;
			case 'SPEEDBREAKER':
				return 3000;

			default:
				return 0; // Default cost if the defect is not found
		}
	};

	// const [quantityValues, setQuantityValues] = useState(
	// 	tableData.reduce((acc, item) => {
	// 		acc[item.id] = 0; // Set default quantity to 1
	// 		return acc;
	// 	}, {})
	// );

	const handleCheckboxChange = (itemId) => {
		const updatedSelectedItems = [...selectedItems];
		const index = updatedSelectedItems.indexOf(itemId);

		if (index === -1) {
			updatedSelectedItems.push(itemId);
		} else {
			updatedSelectedItems.splice(index, 1);
		}

		setSelectedItems(updatedSelectedItems);
	};

	const handleCostChange = (itemId, value) => {
		handleCalculate();
		const updatedTableData = tableData.map((item) =>
			item.id === itemId ? { ...item, cost: parseInt(value) || 0 } : item
		);

		setTableData(updatedTableData);
	};

	// const totalCost = tableData.reduce((acc, item) => {
	//   if (selectedItems.includes(item.id)) {
	//     const itemTotal = item.cost * item.found;
	//     item.total = itemTotal;
	//     return acc + itemTotal;
	//   }
	//   return acc;
	// }, 0);

	const handleCalculate = () => {
		// Set the state to indicate that the "Calculate" button has been clicked
		setCalculateClicked(true);

		// Perform the calculation logic here
		const calculatedTotalCost = tableData.reduce((acc, item) => {
			if (selectedItems.includes(item.id)) {
				const itemTotal = item.cost * item.found;
				item.total = itemTotal;
				return acc + itemTotal;
			}

			return acc;
		}, 0);

		// Update the totalCost state
		setTotalCost(calculatedTotalCost);
	};

	const onClickCloseModal = () => {
		setReportSelectionDialogOpen(false);
		// navigate(-1); // This will navigate back to the previous page
	};

	const paided = true;

	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		// checkboxes null
		setSelectedItems([]);
		setTotalCost(0);

		if (event.target.value && event.target.value !== 'All Roads') {
			setSelectedRoad(event.target.value);
			getSingleRoadPointData(event.target.value);
		}
	};

	// (e) => {
	// const value = e.target.value;
	// selectedRoad(value);
	// setSelectedCircle(value);
	// setSelectedItems([]);

	// const theme = createTheme({
	// 	palette: {
	// 		primary: {
	// 			// main: '#FE6100',
	// 			// borderColor: '#FE6100', // Change the primary color here
	// 		},
	// 	},
	// });

	return (
		<>
			<div>
				{/* report after the budget page  */}
				{/* {reportSelectionDialogOpen && <BudgetReportModal onClickCloseModal={onClickCloseModal} />} */}

				<div
					className="mx-auto  mt-8  relative"
					style={{
						width: '80vw',
						height: '80vh',
						backgroundColor: 'white',
						fontFamily: 'Poppins',
					}}>
					<h2 className="mb-2 ml-6 text-left text-2xl font-bold font-family-Poppins">
						Budget Estimator
					</h2>
					<div
						className="mb-2 font-poppins ml-6"
						style={{
							fontSize: '16px',
							fontWeight: 400,
							lineHeight: '24px',
							letterSpacing: '0em',
							color: '#86878B',
						}}>
						Get a Calculated estimated Budget cost
					</div>

					{/* <ThemeProvider theme={theme}> */}
					<div className="flex">
						<div className="relative w-2/3 p-4">
							{/* checkboxes  */}
							<div className="flex">
								<div className="flex ">
									<div
										className="w-1/2  p-0 mr-6 "
										style={{
											// background: "#FE6100",
											width: '290px',
											height: '80px',
											// border: '2px solid #FE6100',
											borderRadius: '16px',
											border: 'none',
											outline: 'none',
										}}>
										<div className="">
											<Select
												value={selectedRoad}
												onChange={handleChange}
												className="w-full font-poppins"
												sx={{
													width: '100%',

													height: '100%',
													border: '2px solid #FE6100',
													borderRadius: '16px',

													cursor: 'pointer',
													'&:focus': {
														outline: 'none',
														boxShadow: 'none',
													},
												}}>
												<MenuItem
													value="All Roads"
													style={{ outline: 'none' }}>
													Select Roads
												</MenuItem>
												{roadListArray.map(
													(item, index) => (
														<MenuItem
															style={{
																outline: 'none',
															}}
															key={index}
															value={item}>
															{item}
														</MenuItem>
													)
												)}
											</Select>
										</div>
									</div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'left',
											alignItems: 'center',
											padding: '10px',
											background: '#FFF',
											width: '290px',
											height: '58px',
											borderRadius: '16px',
											border: '2px solid #FE6100',
										}}>
										<div className="flex items-center justify-center gap-x-5  items-left">
											<h4 className="text-lg font-bold text-left">
												Total Length :
											</h4>
											<p className="text-gray-600 text-left">
												{selectedRoadData.distance > 0
													? `${parseFloat(
															selectedRoadData.distance
													  ).toFixed(1)} Km`
													: '0 Km'}
											</p>
										</div>
									</div>

									{/* </div>
    <div class="w-1/2 p-0">
          <h4 class="text-xs font-semibold mb-1">Select Division</h4>
          <DropDownComponent bgColor="bg-gray-300" items={itemsForSecondaryDropDown} />

    </div>
  </div>  <div className='flex mt-6'>
  <div class="w-1/2 p-0">
          <h4 class="text-xs font-semibold mb-1">Select Sub-Division</h4>
          <DropDownComponent bgColor="bg-gray-300" items={itemsForSecondaryDropDown} />

    </div>
    <div class="w-1/2 p-0">
          <h4 class="text-xs font-semibold mb-1">Road to Repair</h4>
          <DropDownComponent bgColor="bg-gray-300" items={itemsForSecondaryDropDown} /> */}
								</div>
							</div>

							{/* table body */}

							<div className="mt-4 ">
								<table className="w-[648px] text-center rounded-xl shadow-lg">
									<thead>
										<tr
											className="bg-ffddc7 text-center justify-center items-center  border-2 border-orange-500 rounded-lg overflow-hidden"
											style={{
												background: 'white',
												borderTopLeftRadius: '8px',
												borderTopRightRadius: '8px',
											}}>
											<th className="px-6 py-2 font-poppins text-base font-semibold leading-6 text-left tracking-tight ">
												DEFECTS
											</th>
											<th className="px-4 py-2 font-poppins text-center text-base font-semibold leading-6 tracking-tight ">
												COST
											</th>
											<th className="px-4 py-2 font-poppins text-base font-semibold leading-6 tracking-tight text-center">
												FOUND
											</th>
											<th className="px-4 py-2 font-poppins text-base font-semibold leading-6 tracking-tight text-center">
												TOTAL
											</th>
										</tr>
									</thead>
									<tbody>
										{tableData.length !== 0 ? (
											tableData.map((item, index) => (
												<tr
													key={item.id}
													className={
														index !== 0
															? 'mt-4'
															: ''
													}>
													<td className="px-4 py-3 font-poppins text-base font-medium leading-6 tracking-tight text-left border-b">
														<Checkbox
															className="mx-2"
															onChange={() =>
																handleCheckboxChange(
																	item.id
																)
															}
															checked={selectedItems.includes(
																item.id
															)}
															style={{
																color: selectedItems.includes(
																	item.id
																)
																	? '#ff6100'
																	: '',
															}}
														/>
														<span className="mx-2">
															{item.defect}
														</span>
													</td>
													<td className="px-4 py-3 font-poppins text-base font-medium leading-6 tracking-tight text-center border-b">
														<div className="relative">
															<span
																style={{
																	position:
																		'absolute',
																	left: '5px',
																	top: '50%',
																	transform:
																		'translateY(-50%)',
																	color: '#000',
																}}>
																₹
															</span>
															<input
																type="text"
																value={
																	item.cost
																}
																onChange={(e) =>
																	handleCostChange(
																		item.id,
																		e.target
																			.value
																	)
																}
																placeholder="Enter"
																className="w-20 px-2 py-1 pl-8 rounded border-2 border-grey-500"
																style={{
																	background:
																		'white',
																	paddingLeft:
																		'20px',
																}}
															/>
														</div>
													</td>
													<td className="px-4 py-3 font-poppins text-base font-medium leading-6 tracking-tight text-center border-b">
														{pricePlan ? (
															// Render the item.found value if it's truthy
															item.found
														) : (
															// Render an image (replace 'your_image_path' with the actual path)
															<img
																src={lock}
																alt="Locked"
																style={{
																	width: 40,
																	height: 40,
																}}
															/>
														)}
													</td>
													<td className="px-4 py-3 font-poppins text-base font-medium leading-6 tracking-tight text-center border-b">
														{pricePlan ? (
															// Render the item.found value if it's truthy
															item.cost *
															item.found
														) : (
															// Render an image (replace 'your_image_path' with the actual path)
															<img
																className="ml-5"
																src={lock}
																alt="Locked"
																style={{
																	width: 40,
																	height: 40,
																}}
															/>
														)}
													</td>
												</tr>
											))
										) : (
											// Render "No data available" message if data is not available
											<tr>
												<td
													colSpan="4"
													className="px-4 py-3 font-poppins text-base font-medium leading-6 tracking-tight text-center border-b">
													No data available
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
					{/* </ThemeProvider> */}

					<div
						className="absolute  w-1/3 p-4 top-0 right-0 mt-4 flex flex-col items-center justify-center mx-auto my-auto border border-solid shadow-lg rounded-xl"
						style={{
							boxShadow: '0px 4px 27.5px 0px rgba(0, 0, 0, 0.25)',
						}}>
						<div className="flex justify-center mb-6">
							<img
								src="icons/budget.png"
								alt=""
								className="w-[220px] h-[200px]"
							/>
						</div>

						<div className="flex flex-col items-center justify-center mb-12">
							<p className="font-poppins text-lg font-semibold">
								Total Estimated Budget
							</p>
							<p className="text-xs">
								Get a Calculated estimated Budget cost
							</p>
						</div>
						<div className="p-4 rounded-lg w-[250px] h-[70px] bottom-4 text-white text-center justify-center border border-solid border-orange-500 mb-10">
							<p
								className="text-2xl font-bold leading-9"
								style={{ color: '#000' }}>{`₹ ${totalCost}`}</p>
						</div>
						{/* <div
            className="flex items-center justify-center font-poppins rounded-lg bg-orange-600 p-4 text-center text-2xl font-bold leading-9 w-[280px] h-[49px] text-white mt-6"
            onClick={handleCalculate}
          >
            Calculate
          </div> */}

						{/* <div
              className="flex items-center justify-center flex-none mb-12 w-[280px] cursor-pointer border border-black text-white rounded-lg py-4"
              onClick={() => {
                setReportSelectionDialogOpen(true);
              }}
              style={{
                backgroundColor: "#fe6100",
              }}
            >
              <button className="text-lg">
                Download Detail Estimate
              </button>
            </div> */}

						{/* <div
							className="flex items-center justify-center flex-none mb-12 w-[150px] cursor-pointer border border-black text-white rounded-lg py-4"
							onClick={handleCalculate}
							style={{
								backgroundColor: '#fe6100',
							}}>
							<button className="text-lg">Calculate</button>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default BudgetPage;
