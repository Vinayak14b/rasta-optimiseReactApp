import React,{ useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import './../../../CSS/DropdownCheckbox.css';
import mapboxgl from 'mapbox-gl';
import './../../../CSS/mapexport.css';
import { LoginStatus } from '../../Utils/LoginStatus';
import { selectTrip } from '../../../mapbox/slices/tripSlice';
import {
	getOfficeDataMonthWise,
	getRoadDataByDate,
} from '../../../mapbox/services/Operations/CompareTripAPI';
import RoadCondition from '../DialogBox/RoadCondition';
// ui component
import { Spinner } from '../../../utils/Spinner';
import { BackButton } from '../../Utils/BackButton';
import { ListViewModal } from '../../ListView/ListViewModal';
import Map1 from '../SyncCompare/Map1';
import Map2 from '../SyncCompare/Map2';
import { plotMultipleAssets } from '../../../mapbox/assets/plotMultipleAssets';
import { plotPoints } from '../../../mapbox/points/Core/plotPoints';
import { CompareDropdown } from '../Utils/CompareDropdown';

const Comparison = () => {
	const dispatch = useDispatch();
	const { selectedCompareOffices, selectedTrips, dateAvailable } =
		useSelector(selectTrip);
	const officeName = selectedCompareOffices?.officeName || '';
	const officeLevel = selectedCompareOffices?.officeLevel || '';
	const { flag } = useParams();
	const roadName = flag === 'road' ? selectedTrips[0]?.roadName : '';
	const roadNumber = flag === 'road' ? selectedTrips[0]?.roadNo : '';
	const [beforeDate, setBeforeDate] = useState(
		flag === 'road' && selectedTrips?.length === 2
			? selectedTrips[0].Date
			: flag === 'office' && dateAvailable?.length >= 2
			? dateAvailable[0]
			: 'Not Available'
	);

	const [afterDate, setAfterDate] = useState(
		flag === 'road' && selectedTrips?.length >= 2
			? selectedTrips[1].Date
			: flag === 'office' && dateAvailable?.length >= 2
			? dateAvailable[1]
			: 'Not Available'
	);

	const [beforePointsData, setbeforePointsData] = useState([]);
	const [afterPointsData, setAfterPointsData] = useState([]);
	const [firstsummary, setFirstSummary] = useState([]);
	const [secondSummary, setSecondSummary] = useState([]);
	const [beforeDistanceData, setBeforeDistanceData] = useState(0);
	const [afterDistanceData, setAfterDistanceData] = useState(0);
	const [beforeLoading, setBeforeLoading] = useState(false);
	const [afterLoading, setAfterLoading] = useState(false);

	// map data
	const mapContainer1 = useRef('');
	const mapContainer2 = useRef('');
	const map1 = useRef('');
	const map2 = useRef('');
	const isMapUpdating = useRef(false);
	useEffect(() => {
		if (!map1 || !map2) return;

		// Function to initialize map
		const initializeMap = (container, style, center, zoom) => {
			return new Promise((resolve, reject) => {
				const newMap = new mapboxgl.Map({
					container,
					style,
					center,
					zoom,
					attributionControl: false,
					accessToken:
						'pk.eyJ1IjoicmFzdGEtYWkiLCJhIjoiY2xwNnc4NzhvMGR3NDJrb2lmeG9jcjE2ZyJ9.KeN3jW2_wBNQaSPvJwmYxQ',
				});
				newMap.on('load', () => resolve(newMap));
			});
		};

		let map1Instance, map2Instance;

		Promise.all([
			initializeMap(
				mapContainer1.current,
				'mapbox://styles/rasta-ai/clseaafee016601qq8t0lgl4z',
				[73.71285, 18.59587],
				12
			),
			initializeMap(
				mapContainer2.current,
				'mapbox://styles/rasta-ai/clseae8tw01sr01qy3c4ufduv',
				[73.71285, 18.59587],
				12
			),
		])
			.then(([initializedMap1, initializedMap2]) => {
				map1Instance = initializedMap1;
				map2Instance = initializedMap2;

				map1.current = map1Instance;
				map2.current = map2Instance;

				if (beforePointsData) {
					plotPoints(map1.current, beforePointsData);
					// plotMultipleAssets(map1.current, beforePointsData);
				}

				if (afterPointsData) {
					plotPoints(map2.current, afterPointsData);
					// plotMultipleAssets(map2.current, afterPointsData);
				}

				map1.current.flyTo({
					center: [beforePointsData[0].long, beforePointsData[0].lat],
					zoom: 14,
					speed: 1.2,
					curve: 1,
					essential: true,
				});

				const syncMaps = (map, otherMap) => {
					if (map && otherMap) {
						map.on('move', () => {
							if (!isMapUpdating.current) {
								isMapUpdating.current = true;

								try {
									const { lng, lat } = map.getCenter();
									const zoom = map.getZoom();
									otherMap.jumpTo({
										center: [lng, lat],
										zoom,
									});
								} catch (error) {
									console.error('Error syncing maps:', error);
								} finally {
									isMapUpdating.current = false;
								}
							}
						});
					}
				};

				syncMaps(map1.current, map2.current);
				syncMaps(map2.current, map1.current);
			})
			.catch((error) => {
				console.error('Error initializing maps:', error);
			});

		return () => {
			if (map1Instance) {
				map1Instance.remove();
			}
			if (map2Instance) {
				map2Instance.remove();
			}
		};
	}, [map1, map2, beforePointsData, afterPointsData]);

	const fetchData = async (apiCall, ...args) => {
		try {
			const result = await dispatch(apiCall(...args));
			return result;
		} catch (error) {
			console.error('Error fetching data:', error);
			return null;
		}
	};

	// api for before data
	const beforeFetchData = async () => {
		setBeforeLoading(true);
		let result;
		if (flag === 'office') {
			result = await fetchData(
				getOfficeDataMonthWise,
				selectedCompareOffices.officeName,
				selectedCompareOffices.officeLevel,
				beforeDate
			);
		} else if (flag === 'road') {
			result = await fetchData(
				getRoadDataByDate,
				selectedTrips[0]?.roadName,
				selectedTrips[0]?.roadNo,
				beforeDate
			);
		}
		if (result) {
			setBeforeDistanceData(result?.totalDistance);
			setbeforePointsData(result?.result);
			setSecondSummary(result?.percentage);
		}
		setBeforeLoading(false);
	};

	// api function for the after call
	const afterFetchData = async () => {
		setAfterLoading(true);
		let result;
		if (flag === 'office') {
			result = await fetchData(
				getOfficeDataMonthWise,
				selectedCompareOffices.officeName,
				selectedCompareOffices.officeLevel,
				afterDate
			);
		} else if (flag === 'road') {
			result = await fetchData(
				getRoadDataByDate,
				selectedTrips[0]?.roadName,
				selectedTrips[0]?.roadNo,
				afterDate
			);
		}
		if (result) {
			setAfterDistanceData(result?.totalDistance);
			setAfterPointsData(result?.result);
			setFirstSummary(result?.percentage);
		}
		setAfterLoading(false);
	};

	useEffect(() => {
		beforeFetchData();
	}, [beforeDate]);

	useEffect(() => {
		afterFetchData();
	}, [afterDate]);

	const handleBeforeDate = (value) => {
		setBeforeDate(value);
	};
	const handleAfterDate = (value) => {
		setAfterDate(value);
	};

	return (
		<div className="flex flex-row overflow-x-hidden">
			<Sidebar />

			{beforeLoading && afterLoading ? (
				<div className="h-screen w-full">
					<Spinner />
				</div>
			) : (
				<>
					{dateAvailable?.length <= 1 ? (
						<ListViewModal
							isOpen={true}
							// setIsOpen={setCheckComparison}
							text={'No Comparison Available for This Survey'}
							flag={'survey'}
						/>
					) : (
						<div className=" flex-1 flex flex-col ml-20 h-screen">
							<div className="h-24 flex flex-row items-center justify-between gap-x-8 px-8  box-border">
								<div className="flex justify-center items-center ">
									<div>
										<BackButton direct={-1} />
									</div>
									<div className="flex gap-x-5 ">
										<div className="ml-5 font-poppins">
											<h3 className="font-bold text-2xl">
												{officeName || roadName}
											</h3>
											<h2 className="text-base font-semibold">
												{officeLevel || roadNumber}
											</h2>
										</div>
									</div>
								</div>

								<div className=" mt-4 h-full ">
									<LoginStatus />
								</div>
							</div>

							{/* Comparision Section */}
							<div className="flex w-full flex-1 h-full  justify-around gap-x-1 mb-2   px-3">
								{/* first map */}
								<div className="flex-col  items-center h-[39rem] flex-1  xl:h-[32rem] 2xl:h-[39rem] px-5 py-2 gap-y-10 border-2 border-orange-600 rounded-lg ">
									{/* date bar */}
									<div className="flex font-poppins justify-between   p-2 items-center w-full ">
										<h3 className="text-xl font-semibold">
											Before
										</h3>
										<div className="flex gap-x-4">
											<p className="font-semibold font-poppins ">
												Distance :
											</p>
											<h3 className="font-semibold font-poppins">
												{beforeDistanceData
													? `${beforeDistanceData} KM`
													: 'Loading...'}{' '}
											</h3>
										</div>
										<div className=" justify-center text-right z-50">
											<CompareDropdown
												label={beforeDate}
												dismissOnClick={true}
												dateAvailable={dateAvailable}
												onDateSelect={handleBeforeDate}
											/>
										</div>
									</div>

									{/* map */}
									<div
										className="flex rounded-xl h-96 w-full -z-50 sm:h-80 sm:w-full md:h-96 md:w-full lg:h-[30rem] lg:w-full xl:h-[24rem] xl:w-[34rem] 2xl:h-[30rem] 2xl:w-[41rem] mx-auto mt-2"
										style={{ zIndex: -2 }}>
										<Map1 mapRef={mapContainer1} />
									</div>

									<div className="w-full mt-3 mb-4">
										<RoadCondition summary={firstsummary} />
									</div>
								</div>

								{/* second map */}
								<div className="flex-col  items-center h-[39rem] flex-1  xl:h-[32rem] 2xl:h-[39rem] px-5 py-2 gap-y-10 border-2 border-orange-600 rounded-lg ">
									{/* date bar */}
									<div className="flex  font-poppins justify-between p-2 items-center w-full">
										<h3 className="text-xl font-semibold">
											After
										</h3>
										<div className="flex gap-x-4">
											<p className="font-semibold font-poppins ">
												Distance :
											</p>
											<h3 className="font-semibold font-poppins">
												{afterDistanceData
													? `${afterDistanceData} KM`
													: 'Loading...'}{' '}
											</h3>
										</div>
										<div className=" justify-center text-right z-50">
											<CompareDropdown
												label={afterDate}
												dismissOnClick={true}
												dateAvailable={dateAvailable}
												onDateSelect={handleAfterDate}
											/>
										</div>
									</div>

									{/* map */}

									<div
										className="flex rounded-xl h-96 w-full -z-50 sm:h-80 sm:w-full md:h-96 md:w-full lg:h-[30rem] lg:w-full xl:h-[24rem] xl:w-[34rem] 2xl:h-[30rem] 2xl:w-[41rem] mx-auto mt-2"
										style={{ zIndex: -2 }}>
										<Map2 mapRef={mapContainer2} />
									</div>

									<div className="w-full mt-3 mb-4 ">
										<RoadCondition
											summary={secondSummary}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Comparison;
