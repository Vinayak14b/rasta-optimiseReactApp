import { Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TempHeader from './TempHeader';
import '../CSS/Utils.css';
import { useDispatch, useSelector } from 'react-redux';

// am charts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import '@amcharts/amcharts4/core.js';
import '@amcharts/amcharts4/charts.js';
import '@amcharts/amcharts4/themes/animated.js';

import { getOverviewReport } from '../usermanagement/services/Operations/CoreAPIs/reportAPI';
import { buttonToShow } from './Report/Core/Source_Data_Report';
import { selectProfile } from '../usermanagement/slices/profileSlice';
import {
	setSelectedButton,
	setDefaultRegionValue,
	setSelectedOfficeLevel,
	setSelectedOfficeName,
} from '../mapbox/slices/tripSlice';
import { getDefaultRegionValues } from '../mapbox/services/Operations/JurisdictionAPI';

const ConditionCol = ({ conditionalData }) => {
	const conditions = conditionalData.map((value) => value.litres);

	const total = conditions.reduce((acc, value) => acc + value, 0);

	let offset = 0;

	return (
		<div
			className="flex flex-col items-center w-full font-poppins font-semibold"
			style={{ cursor: 'pointer' }}>
			<div className="flex justify-evenly w-full">
				{conditions.map((value, index) => {
					return (
						<div
							className="flex justify-center items-center w-full"
							key={index}>
							<div
								style={{
									width: '8px',
									height: '8px',
									borderRadius: '50%',
									backgroundColor:
										index === 0
											? '#5EC45C'
											: index === 1
											? '#FF8A00'
											: '#FF2222',
									marginRight: '5px',
								}}></div>
							<div>{((value / total) * 100).toFixed(2)}%</div>
						</div>
					);
				})}
			</div>
			<div
				style={{ width: '100%', height: '15px', position: 'relative' }}>
				{conditions.map((value, index) => {
					const percentage = (value / total) * 100;
					const backgroundColor =
						index === 0
							? '#5EC45C'
							: index === 1
							? '#FF8A00'
							: '#FF2222';

					const style = {
						width: `${percentage}%`,
						height: '100%',
						backgroundColor,
						position: 'absolute',
						left: `${offset}%`,
					};

					offset += percentage;

					return <div key={index} style={style}></div>;
				})}
			</div>
		</div>
	);
};

const Report = () => {
	const navigate = useNavigate();
	const [selectedOption, setSelectedOption] = useState(null);
	const dispatch = useDispatch();
	const [showDiolog, setShowDialog] = useState(false);
	const [activePage, setActivePage] = useState('report');
	const [isOpen, setIsOpen] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [goodCount, setGoodCount] = useState(0);
	const [averageCount, setAverageCount] = useState(0);
	const [poorCount, setPoorCount] = useState(0);
	const { profileUserData } = useSelector(selectProfile);
	const officeLevel = profileUserData?.officeLevel;
	const [reportData, setReportData] = useState({});
	const { officeName: selectedOfficeName, officeLevel: selectedOfficeLevel } =
		profileUserData || {};

	const chartData = [
		{
			country: 'Good',
			litres: goodCount * 10,
			color: '#5EC35C',
		},
		{
			country: 'Average',
			litres: averageCount * 10,
			color: '#FF8A00',
		},
		{
			country: 'Bad',
			litres: poorCount * 10,
			color: '#FF2222',
		},
	];

	const handleOptionChange = (option) => {
		setSelectedOption(option);
		// Additional functionality based on the selected option
	};

	useEffect(() => {
		// This effect will run when the component is unmounted

		return () => {
			setSelectedOption(null);
		};
	}, []);

	const handleButtonClick = (selectedOption) => {
		if (selectedOption === 'Detailed Road Report') navigate('/viewdetail');
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const data = await dispatch(getOverviewReport());
				setReportData(data);
				setGoodCount(data?.percentage?.Good);
				setAverageCount(data?.percentage?.Average);
				setPoorCount(data?.percentage?.Poor);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchData();
	}, []);

	const fetchDefaultRegionData = async () => {
		try {
			const result = await dispatch(getDefaultRegionValues());
			const data = {
				state: 'Maharashtra',
				region: result?.regionName ? result.regionName : '',
				circle: result?.circleName ? result.circleName : '',
				division: result?.divisionName ? result.divisionName : '',
				subdivision: result?.subDivisionName
					? result.subDivisionName
					: '',
			};
			dispatch(setDefaultRegionValue(data));
		} catch (error) {
			console.error('Error fetching default data:', error);
		}
	};

	useEffect(() => {
		if (
			profileUserData?.officeLevel !== 'Region' &&
			profileUserData?.officeLevel === 'Sub-division'
		) {
			dispatch(setSelectedOfficeLevel(profileUserData?.officeLevel));
			dispatch(setSelectedOfficeName(profileUserData?.officeName));
			fetchDefaultRegionData();
		} else if (profileUserData?.officeLevel !== 'Region') {
			dispatch(setSelectedOfficeLevel(profileUserData?.officeLevel));
			dispatch(setSelectedOfficeName(profileUserData?.officeName));
			fetchDefaultRegionData();
		} else {
			const data = {
				state: 'Maharashtra',
				region: profileUserData?.officeName || '',
				circle: '',
				division: '',
				subdivision: '',
			};
			dispatch(setDefaultRegionValue(data));
		}
	}, [dispatch, profileUserData]);

	const handleClose = () => {
		setOpen(false);
		setShowDialog(false);
		setSelectedOption(null); // Reset selectedOption when closing the dialog
	};

	useEffect(() => {
		let chart = am4core.create('chartdiv', am4charts.PieChart3D);
		chart.data = chartData;
		let pieSeries = chart.series.push(new am4charts.PieSeries3D());
		pieSeries.dataFields.value = 'litres';
		pieSeries.dataFields.category = 'country';
		pieSeries.ticks.template.disabled = false;
		pieSeries.labels.template.disabled = true;
		pieSeries.colors.list = [
			am4core.color('#5EC35C'),
			am4core.color('#FF8A00'),
			am4core.color('#FF2222'),
		];

		chart.exporting.menu = new am4core.ExportMenu();
		chart.exporting.enabled = false;
		chart.logo.disabled = true;

		return () => {
			chart.dispose();
		};
	}, [goodCount, averageCount, poorCount]);

	const navigateToRoute = (route, state) => {
		handleOptionChange();
		dispatch(setSelectedButton(state.buttonValue));
		if (`${route}` === '/downloadreport') {
			navigate(`${route}`, {
				state: {
					officeLevel: selectedOfficeLevel,
					officeName: selectedOfficeName,
				},
			});
		} else {
			navigate(`${route}`);
		}
	};

	const renderButton = (message, index, buttonValue, route) => (
		<div className="mx-auto" key={index}>
			<button
				className="w-44 h-10 flex justify-center items-center p-3 my-auto text-center rounded-md bg-primary focus:outline-none hover:bg-white hover:border-[1px] hover:border-black text-white hover:text-black transition-all 400 ease-in"
				onClick={() => navigateToRoute(route, { buttonValue })}>
				{message}
			</button>
		</div>
	);

	return (
		<>
			<div className=" ">
				<div className=" ">
					<Sidebar activePage="Report" />
				</div>

				<div className="ml-20 ">
					<TempHeader />
					<div className="flex justify-center">
						<div className="w-full  mb-20">
							<h1 className="font-poppins text-[30px] font-semibold leading-9 text-center mt-4">
								Generated Report
							</h1>
							<div
								id="chartdiv"
								style={{
									width: '100%',
									height: '338px',
								}}></div>

							<h1 className="font-poppins text-4xl font-semibold leading-9 text-center mt-12">
								Network Summary
							</h1>
							<div className="mt-10 mb-10 text-white mx-auto shadow-md w-[150px] px-3 py-2  rounded-md flex justify-center items-center font-poppins text-18 font-semibold leading-36  bg-green-500 ">
								<p className="text-[18px]">
									{reportData?.networkSummary}
								</p>
							</div>
							<div className="w-[235px] h-[60px] mx-auto border-2 border-orange-400 bg-[#FFDDC7] rounded-md box-content p-4 flex-col justify-center items-center">
								<div className="flex items-center justify-between box-content">
									<span className="flex-1 w-[20px] items-end text-center">
										<span className="font-poppins text-15 font-semibold leading-23  ml-6 ">
											Total Km :
										</span>
									</span>

									<div className="flex-1 text-left ">
										<span className="font-poppins text-15 font-semibold leading-23 mb-1">
											{reportData?.totalDistance > 0
												? `${parseFloat(
														reportData?.totalDistance
												  ).toFixed(1)} Km`
												: '0 Km'}
										</span>
									</div>
								</div>

								<div className="flex items-center justify-between box-border">
									<span className="flex-1 w-[20px] items-end text-center">
										<span className="font-poppins text-15 font-semibold leading-23">
											Total Roads :
										</span>
									</span>

									<div className="flex-1 text-left">
										<span className="font-poppins text-15 font-semibold leading-23 mb-1">
											{reportData?.totalCount}
										</span>
									</div>
								</div>
							</div>
							<button className="rounded-md bg-[#FE6100] px-4 py-2 flex justify-center items-center mt-12 mx-auto" onClick={()=>{navigate("/detailed-report")}}>
								<p
									className=" font-poppins text-[18px]  text-white font-medium   tracking-0 text-center "
									style={{ fontStyle: 'bold' }}
									// onClick={handleViewDetailSummaryClick}
								>
									View Detailed Summary
								</p>
							</button>
						</div>

						{/* second box */}
						<div className="w-full p-6 relative">
							{/* Content for the second column goes here */}

							<div
								className=" border-2 rounded-xl p-8  h-96   border-orange-300  font-poppins  flex flex-col justify-evenly    items-center 
			  					lg:h-80 lg:p-3 xl:px-3 xl:h-[23rem] 2xl:h-[30rem]   ">
								<h1 className="text-2xl font-semibold   xl:mt-5  2xl:text-3xl ">
									Select the Jurisdiction
								</h1>
								<div
									className={`grid ${
										officeLevel === 'Circle'
											? 'grid-cols-3 gap-y-5'
											: 'grid-cols-2'
									} gap-x-10 gap-y-10 p-12 w-full lg:p-6 lg:gap-y-12 2xl:mb-12`}>
									{officeLevel &&
										buttonToShow[officeLevel].message.map(
											(message, index) => {
												const buttonValue =
													buttonToShow[officeLevel]
														.buttons[index];
												const accessLevel =
													buttonToShow[officeLevel]
														.access[buttonValue];
												const route = accessLevel
													? buttonToShow[officeLevel]
															.reportroute
													: buttonToShow[officeLevel]
															.dropdownroute;

												return renderButton(
													message,
													index,
													buttonValue,
													route
												);
											}
										)}
								</div>
							</div>

							<div className="mt-10">
								{/* <img className="w-[766px] mt-12" src="icons/indicator.png" /> */}
								<ConditionCol conditionalData={chartData} />

								<h1 className="mt-4 font-poppins text-2xl font-semibold leading-6 tracking-tight text-center ">
									Road Network Health Indicator
								</h1>
							</div>
						</div>
						<Dialog open={open} onClose={handleClose}>
							<div className="fixed top-0 left-0 w-full  h-full flex justify-center items-center">
								<div className="bg-white   relative flex flex-col  justify-evenly ">
									{/* Close button inside the dialog */}
									<div
										className="close-btn absolute top-[3.5rem] right-[3.5rem]"
										onClick={handleClose}></div>
									{/* Dialog content */}
									<div className="w-screen h-screen mt-2 flex flex-col justify-evenly left-585  p-4 font-poppins text-white">
										<h1
											style={{
												fontFamily: 'Poppins',
												fontSize: '32px',
												fontWeight: 600,
												lineHeight: '48px',
												letterSpacing: '0em',
												textAlign: 'center',
											}}
											className="text-black text-2xl text-center font-bold mb-4 ">
											Select The Report
										</h1>
										<div
											className="flex justify-evenly items-center"
											style={{
												fontFamily: 'Poppins',
												fontSize: '16px',
												fontWeight: 700,
												lineHeight: '24px',
												letterSpacing: '0em',
												textAlign: 'center',
											}}>
											{/* First Row */}
											<button
												onClick={() =>
													handleButtonClick(
														'Budget Report'
													)
												}
												className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white">
												Budget Report
											</button>
											<button
												onClick={() =>
													handleButtonClick(
														'Estimate Report'
													)
												}
												className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white">
												Estimate Report
											</button>
										</div>
										<div
											className="flex justify-evenly items-center"
											style={{
												fontFamily: 'Poppins',
												fontSize: '16px',
												fontWeight: 700,
												lineHeight: '24px',
												letterSpacing: '0em',
												textAlign: 'center',
											}}>
											{/* Second Row */}
											<button
												onClick={() =>
													handleButtonClick(
														'Road Roughness Report'
													)
												}
												className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white">
												Road Roughness Report
											</button>
											<button
												onClick={() =>
													handleButtonClick(
														'Comparison Report'
													)
												}
												className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white">
												Comparison Report
											</button>
										</div>{' '}
										<div
											className="flex justify-evenly items-center"
											style={{
												fontFamily: 'Poppins',
												fontSize: '16px',
												fontWeight: 700,
												lineHeight: '24px',
												letterSpacing: '0em',
												textAlign: 'center',
											}}>
											{/* Second Row */}
											<button
												onClick={() =>
													handleButtonClick(
														'Detailed Road Report'
													)
												}
												className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white">
												Detailed Road Report
											</button>
											<button
												onClick={() =>
													handleButtonClick(
														'Arboriculture Report'
													)
												}
												className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white">
												Arboriculture Report
											</button>
										</div>
										{/* New content below */}
									</div>
								</div>
							</div>
						</Dialog>

						{/* New content below */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Report;