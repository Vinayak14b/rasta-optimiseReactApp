import React,{ useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Sidebar from '../../Sidebar';
import '../../../CSS/Utils.css';
import { buttonToShow } from './Source_Data';
import { selectProfile } from '../../../usermanagement/slices/profileSlice';
import {
	setDefaultRegionValue,
	setSelectedButton,
	setSelectedOfficeLevel,
	setSelectedOfficeName,
} from '../../../mapbox/slices/tripSlice';
import { getDefaultRegionValues } from '../../../mapbox/services/Operations/JurisdictionAPI';

const SelectChoice = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { profileUserData } = useSelector(selectProfile);
	const officeLevel = profileUserData?.officeLevel;
	const fetchDefaultRegionData = async () => {
		try {
			const result = await dispatch(getDefaultRegionValues());
			const data = {
				state: 'Maharashtra',
				region: result?.regionName ? result.regionName : '',
				circle: result?.circleName ? result.circleName : '',
				division: result?.divisionName ? result.divisionName : '',
				subdivision: '',
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
			navigate('/listview');
		} else if (profileUserData?.officeLevel !== 'Region') {
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

	const navigateToRoute = (route, state) => {
		dispatch(setSelectedButton(state));
		if (
			profileUserData.officeLevel &&
			profileUserData.officeLevel.toLowerCase() === state.buttonValue
		) {
			navigate(
				`${route}/office/${profileUserData.officeName}/${profileUserData.officeLevel}`,{state:{showChainage:false}}
			);
		} else {
			navigate(`${route}`);
		}

		// navigate(route,{{ state:{}}});
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
		<div className="flex h-screen  backdrop-filter backdrop-blur-[4px] ">
			<div className="w-20 ">
				<Sidebar />
			</div>
			<div className=" flex  justify-center items-center flex-1    ">
				{/* most outer container */}
				<div className="flex flex-col h-[40rem] w-[60rem]lg:h-[30rem] lg:w-[50rem]  xl:h-[30rem] xl:w-[55rem] 2xl:h-[32rem] 2xl:w-[70rem] bg-white  p-6 rounded-2xl  gap-y-8 xl:gap-y-3 2xl:p-7 box-content smallShadow ">
					{/* top container */}
					<div className="flex  justify-between items-center">
						<div className="flex flex-col">
							<h2 className="mb-1 font-poppins text-left text-2xl font-bold">
								Comparison Analysis
							</h2>
							<div className="font-semibold text-[#86878B] text-base font-poppins">
								Get a Comparison of your Trips
							</div>
						</div>
					</div>

					{/* dropdown box */}
					<div
						className=" border-2 rounded-xl p-8  h-96   border-orange-300  font-poppins  flex flex-col justify-evenly    items-center 
			  lg:h-80 lg:p-3 xl:px-3 xl:h-[23rem] 2xl:h-[30rem]   ">
						<h1 className="text-2xl font-semibold   xl:mt-5  2xl:text-3xl ">
							Compare Trips
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
											buttonToShow[officeLevel].buttons[
												index
											];
										const accessLevel =
											buttonToShow[officeLevel].access[
												buttonValue
											];
										const route = accessLevel
											? buttonToShow[officeLevel].maproute
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
				</div>
			</div>
		</div>
	);
};

export default SelectChoice;
