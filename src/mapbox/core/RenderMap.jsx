import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RiCloseCircleFill } from 'react-icons/ri';

// utils
import * as turf from '@turf/turf';

// mapbox
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import '@watergis/mapbox-gl-export/css/styles.css';
import '../../../src/CSS/mapexport.css';

// slices
import { selectPoint } from '../slices/pointSlice';
import { selectSegment } from '../slices/segmentSlice';
import { selectLatLng } from '../../usermanagement/slices/userSlice';
import { selectMap } from '../slices/mapSlice';
import { commentoff} from '../slices/filterSlice';
import { commenton} from '../slices/filterSlice';

// function files
import {
	plotPoints,
	RemoveMarker,
	getCurrentLayerIdsOfPoints,
} from '../points/Core/plotPoints';
import { removeHighlightedSegment } from '../segments/PlotSegments';
import { plotSegments } from '../segments/PlotSegments';
import MapLayers from '../actions/MapStyle/MapLayers';

// components
import { PointsDetails } from '../points/Core/PointDetails';
import SegmentDetails from '../segments/SegmentDetails';
import { constant } from '../utils/constant';
import ScreenComponent from '../../Component/ScreenComponent';
import { area } from '@turf/turf';
import {
	selectFilter,
	setModalData,
	selectModalData,
	setSegmentModalData,
	selectSegmentModalData,
} from '../slices/filterSlice';
import {
	getCurrentLayerIdsOfSegments,
	getDataOfTheClickedPoint,
} from '../segments/PlotSegments';
import { getCurrentLayerIdsOfAsset } from '../assets/plotMultipleAssets';
import { plotMultipleAssets } from '../assets/plotMultipleAssets';
import PointCard from '../points/SinglePointData/PointCard';
import { AddMarker } from '../points/Core/plotPoints';
import {marker} from '../points/Core/plotPoints'
import { FaExternalLinkAlt } from "react-icons/fa";
import { selectAuth } from '../../usermanagement/slices/authSlice';
import { FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { BiSolidCommentDetail } from "react-icons/bi";

// mapboxgl.accessToken = process.env.MAPBOX_TOKEN
mapboxgl.accessToken =
	'pk.eyJ1IjoicmFzdGEtYWkiLCJhIjoiY2xwNnc4NzhvMGR3NDJrb2lmeG9jcjE2ZyJ9.KeN3jW2_wBNQaSPvJwmYxQ';

let EditMarker = null;

export const RenderMap = () => {

	const [isCommentOff, setIsCommentOff] = useState(true);

    const handleCommentClick = () => {
        if (isCommentOff) {
            dispatch(commentoff());
        } else {
            dispatch(commenton());
        }
        setIsCommentOff(!isCommentOff);
    };
	
	const [mumbaiPointData, setMumbaiPointData] = useState(false);
	const [onClickLayerId, setOnClickLayerId] = useState(null);
	const dispatch = useDispatch();
	const { pointCollection, segmentCollection, assetCollection } =
		useSelector(selectFilter);
	const modalData = useSelector(selectModalData);
	const segmentModalData = useSelector(selectSegmentModalData);
	// //console.log("pointCollection :::: ",pointCollection)
	// //console.log("segmentCollection :::: ",segmentCollection)
	const { latlng } = useSelector(selectLatLng);
	const { pointsLoaded, pointsData, pointStatus } = useSelector(selectPoint);
	const { segmentsLoaded, segmentData, segmentStatus } =
		useSelector(selectSegment);
	const { searchQuery } = useSelector(selectMap);
	const mapContainerRef = useRef(null);
	const map = useRef(null);
	const draw = useRef(null);

	const [getLatLng, setGetLatLng] = useState(null);
	// const [lng, setLng] = useState(73.71291);
	// const [lat, setLat] = useState(18.59589);
	const [lng, setLng] = useState(73.01870457478353);
	const [lat, setLat] = useState(19.06825322785244); //sion -pnvl
	// const [lng, setLng] = useState(78.413318);
	// const [lat, setLat] = useState(17.400648); //HYD
	const [zoom, setZoom] = useState(12.5);
	const [editLatLng, setEditLatLng] = useState(null); // store true or false
	const [editCoordinates, setEditCoordinates] = useState([]); //store the new lat and long by the owner

	const [drawMode, setDrawMode] = useState('simple_select');
	const [geotype, setGeotype] = useState(null);
	const [roundedArea, setRoundedArea] = useState(0);
	const [roundedDistance, setRoundedDistance] = useState(0);

	const [showpoints, setShowpoints] = useState(true);
	const [showsegments, setShowSegments] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [showScreenshot, setShowScreenshot] = useState(false);
	const [screenshotURL, setScreenshotURL] = useState('');
	const [showDialog, setShowDialog] = useState(false);
	const typesOfSegmentData = getDataOfTheClickedPoint();

	const openModal = (coordinates) => {
		dispatch(setSegmentModalData(null));

		dispatch(setModalData(coordinates));
	};

	const openSegmentModal = (coordinates) => {
		dispatch(setModalData(null));
		// console.log('inside the opensegmentmodal->',coordinates)
		dispatch(setSegmentModalData(coordinates));
	};

	const [mapView, setMapView] = useState('Default');
	const { userType } = useSelector(selectAuth);

	useEffect(() => {
		if (checkArrayAndSetVariable(pointCollection)) {
			setShowpoints(true);
			setShowSegments(false);
		}
		if (checkArrayAndSetVariable(segmentCollection)) {
			setShowSegments(true);
			setShowpoints(false);
		}
	}, [pointCollection, segmentCollection]);

	function checkArrayAndSetVariable(arr) {
		if (arr && arr.length > 0) {
			// 	const anyChecked = arr.every((item) => item.checked);
			// 	const allFalse = arr.every((item) => !item.checked);
			// 	variable = allFalse ? false : anyChecked;
			// } else {
			// 	variable = false; // If array is null or empty, set the variable to false
			// return variable;

			return arr.some((item) => item.checked);
		}
	}

	const createMap = useCallback(() => {
		if (!mapContainerRef.current) return;
		let selectedStyle;
		// //console.log("mapView ",mapView)
		switch (mapView) {
			case 'Default':
				selectedStyle = constant[0].style;
				break;
			case 'Light':
				selectedStyle = constant[1].style;
				break;
			case 'Dark':
				selectedStyle = constant[2].style;
				break;
			case 'Satellite':
				selectedStyle = constant[3].style;
				break;
			default:
				selectedStyle = constant[0].style;
		}

		// create map
		map.current = new mapboxgl.Map({
			// container: mapContainerRef.current,
			container: mapContainerRef.current,
			// style: constant[0].style,
			style: selectedStyle,
			// style: constant[1].style,
			center: [lng, lat],
			attributionControl: false,
			// dragRotate: dragRotateEnabled,
			zoom: zoom,
		});

		{
			userType == 'Owner' &&
				// false &&
				map.current.on('dblclick', (event) => {
					setEditLatLng(true);

					const { lng, lat } = event.lngLat;

					setEditCoordinates([lat, lng]);
					// Remove previous marker if exists
					if (EditMarker !== null) {
						EditMarker.remove();
					}

					EditMarker = new mapboxgl.Marker({
						draggable: true,
						color: 'red',
					})
						.setLngLat([lng, lat])
						.addTo(map.current);

					EditMarker.on('dragend', () => {
						const lngLat = EditMarker.getLngLat();

						setEditCoordinates([lngLat.lat, lngLat.lng]);
					});
				});
		}

		const fullscreen = new mapboxgl.FullscreenControl();
		map.current.addControl(fullscreen, 'bottom-right');

		const nav = new mapboxgl.NavigationControl();
		map.current.addControl(nav, 'bottom-right');

		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
			},
			trackUserLocation: true,
			showUserLocation: true,
			fitBoundsOptions: {
				maxZoom: 14,
			},
		});
		map.current.addControl(geolocate, 'bottom-right');

		const handleLoad = () => {
			if (pointsLoaded) {
				if (
					pointsData &&
					pointsData.length !== 0 &&
					Object.keys(pointsData).length !== 0
				) {
					plotPoints(
						map.current,
						// DummyPoints,
						pointsData,
						openModal,
						setOnClickLayerId,
						onClickLayerId
					);

					plotMultipleAssets(
						map.current,
						pointsData,
						openModal,
						setOnClickLayerId,
						onClickLayerId
					);
				}

				if (
					segmentData &&
					segmentData.length !== 0 &&
					Object.keys(segmentData).length !== 0
				)
					plotSegments(map.current, segmentData, openSegmentModal);
				// console.log("segment Data->", segmentData);
			}
		};

		map.current.on('load', handleLoad);

		map.current.on('click', (e) => {
			const features = map.current.queryRenderedFeatures(e.point);
			// console.log(features)

			if (
				features.length > 0 &&
				features[0]?.properties?.mapType === 'Point'
			) {
				const clickedFeature = features[0];
				const coordinates = clickedFeature?.properties?.coordinates;
				const [lng, lat] = JSON.parse(coordinates);
				const clickedPoint = [lng, lat];

				openModal(clickedPoint);

				if (clickedPoint) {
					// Remove previous marker if available
					if (marker) {
						RemoveMarker();
					}
					AddMarker(clickedPoint);

					// map.current.flyTo({
        			// 	center: clickedPoint,
        			// 	essential: true 
    				// });
				}
			}
		});

		onDrawClick();
	}, [
		lng,
		lat,
		zoom,
		pointsLoaded,
		pointsData,
		segmentsLoaded,
		map,
		mapView,
	]);
	const removeEditMarker = () => {
		setEditLatLng(false);

		if (EditMarker !== null) {
			EditMarker.remove();
			EditMarker = null;
		}
	};

	const showLayer = (map, layerId) => {
		map.setLayoutProperty(layerId, 'visibility', 'visible');
	};

	const hideLayer = (map, layerId) => {
		map.setLayoutProperty(layerId, 'visibility', 'none');
	};

	const mapLayersForAssets = getCurrentLayerIdsOfAsset();
	useEffect(() => {
		if (assetCollection && map.current) {
			assetCollection.forEach((asset) => {
				const id = `${asset.layer}-point-layer`;
				if (id !== 'all-point-layer') {
					if (mapLayersForAssets.includes(id)) {
						if (asset.checked === true) {
							showLayer(map.current, id);
						} else {
							hideLayer(map.current, id);
						}
					}
				}
			});
		}
	}, [assetCollection]);

	const mapLayersForPoints = getCurrentLayerIdsOfPoints();
	useEffect(() => {
		if (pointCollection && map.current && pointsData) {
			RemoveMarker();
			removeHighlightedSegment();
			pointCollection.forEach((points) => {
				const id = `${points.color}-point-layer`;
				if (id !== 'all-point-layer') {
					if (mapLayersForPoints.includes(id)) {
						if (points.checked === true) {
							showLayer(map.current, id);
						} else {
							hideLayer(map.current, id);
						}
					}
				}
			});
		}
		dispatch(setSegmentModalData(null));
	}, [pointCollection]);

	// //console.log('maplayers added are->', mapLayers)

	const mapLayersForSegments = getCurrentLayerIdsOfSegments();
	useEffect(() => {
		if (segmentCollection && map.current && segmentData) {
			RemoveMarker();
			removeHighlightedSegment();
			segmentCollection.forEach((segments) => {
				const id = `${segments.layer}-segment-layer`;
				if (id !== 'all-segment-layer') {
					if (mapLayersForSegments.includes(id)) {
						if (segments.checked === true) {
							showLayer(map.current, id);
						} else {
							hideLayer(map.current, id);
						}
					}
				}
			});
		}
		dispatch(setModalData(null));
	}, [segmentCollection]);

	useEffect(() => {
		createMap();

		return () => {
			if (map.current) {
				map.current.remove();
			}
		};
	}, [createMap]);

	// geo coding

	// //console.log('search query', searchQuery);

	// map controls

	// //console.log('search query', searchQuery);
	useEffect(() => {
		// //console.log('search query', searchQuery);
		// setSearchQueryMap(null);
		if (searchQuery !== null) handleSearchClick();
	}, [searchQuery]);

	const handleSearchClick = () => {
		// //console.log('funcion called ', searchQuery);
		fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxgl.accessToken}`
		)
			.then((response) => response.json())
			.then((data) => {
				const coordinates = data.features[0].geometry.coordinates;
				const geocodeResult = coordinates;

				if (geocodeResult) {
					map.current.flyTo({
						center: geocodeResult,
						zoom: 14,
					});

					const marker = new mapboxgl.Marker()
						.setLngLat(geocodeResult)
						.addTo(map.current);
				}
			})
			.catch((error) => console.error('Error during geocoding:', error));
	};

	// map controls
	// 360 degree tool  start
	const rotationIcons = document.getElementById('rotationIcon');

	const onRotationClick = () => {
		try {
			// //console.log("Rotation icon clicked!");
			if (!rotateActive) {
				startRotation();
			} else {
				stopRotation();
			}
		} catch (error) {
			console.error('Error in handleRotationClick:', error);
		}
	};

	let rotateActive = false;
	let initialPitch;
	let initialBearing;
	let animationFrameId;
	let roateActiveRef = useRef(rotateActive);
	const startRotation = () => {
		rotateActive = true;
		initialPitch = map.current.getPitch();
		initialBearing = map.current.getBearing();
		rotateCamera(0);
		map.current.on('click', stopRotation);
	};

	const stopRotation = () => {
		rotateActive = false;
		map.current.off('click', stopRotation);
		map.current.setPitch(initialPitch);
		map.current.setBearing(initialBearing);
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
	};

	const rotateCamera = (timestamp) => {
		if (rotateActive) {
			// //console.log("Rotation Camera");
			const pitch = 60; // pitch in degrees
			const bearing = -60; // bearing in degrees
			map.current.setPitch(pitch);
			map.current.setBearing(bearing);
			map.current.rotateTo((timestamp / 100) % 360, { duration: 0 });

			if (rotateActive) {
				animationFrameId = requestAnimationFrame(rotateCamera);
			}
		}
	};

	// 360 degree tool  end

	// line string tool polygon delete start

	const onDrawClick = () => {
		// let drawMode = 'simple_select'; // Default mode is an empty string
		const draw = new MapboxDraw({
			modes: MapboxDraw.modes,
			displayControlsDefault: false,
			controls: {
				line_string: true,
				polygon: true,
				trash: true,
			},
			defaultMode: drawMode, // Set default mode to null
		});

		map.current.addControl(draw);

		map.current.on('draw.modechange', (e) => {
			// drawMode = e.mode;
			setDrawMode(e.mode);
			//   //console.log("Current draw mode:", drawMode);
		});
		map.current.on('draw.selectionchange', updateFeature);
		map.current.on('draw.create', updateFeature);
		map.current.on('draw.delete', updateFeature);
		map.current.on('draw.update', updateFeature);

		function updateFeature(e) {
			const data = draw.getAll();
			//   //console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data, drawMode);

			let roundedDistance = null;
			let roundedArea = null;
			const answer = document.getElementById(
				drawMode === 'draw_line_string'
					? 'calculated-distance'
					: 'calculated-area'
			);
			if (drawMode === 'simple_select') {
				const selectedFeatures = draw.getSelected();
				// //console.log("Selected features:", selectedFeatures);
				// setRoundedArea(null);
				// setRoundedDistance(null);

				// Calculate area or distance based on the type of selected features
				if (selectedFeatures.features.length > 0) {
					const feature = selectedFeatures.features[0];
					const geometryType =
						selectedFeatures.features[0].geometry.type;
					setGeotype(geometryType);
					if (geometryType === 'LineString') {
						// Calculate and display distance
						let totalDistance = 0;
						const lineStringCoordinates =
							selectedFeatures.features[0].geometry.coordinates;
						// //console.log("LineStringCoordinates", lineStringCoordinates);
						for (
							let i = 0;
							i < lineStringCoordinates.length - 1;
							i++
						) {
							const distanceValue = turf.distance(
								turf.point(lineStringCoordinates[i]),
								turf.point(lineStringCoordinates[i + 1]),
								{ units: 'meters' }
							);
							totalDistance += distanceValue;
						}

						// Round and set the total distance
						roundedDistance = Math.round(totalDistance * 100) / 100;
						// //console.log("geometryD", roundedDistance);
						setRoundedDistance(roundedDistance);
					} else if (geometryType === 'Polygon') {
						// Calculate and display area
						const areaValue = turf.area(feature);
						roundedArea = Math.round(areaValue * 100) / 100;
						// //console.log("geometryA", roundedArea);
						setRoundedArea(roundedArea);
					}
				}
				if (e.type === 'draw.delete') {
					// Reset rounded area and distance to null
					setRoundedArea(null);
					setRoundedDistance(null);
				}
			} else {
				// Clear answer if not in "simple_select" mode
				// setRoundedArea(null);
				// setRoundedDistance(null);
				if (data.features.length > 0) {
					// //console.log("data.features[0]", data.features);
					const index = data.features.length - 1;
					const selectedFeature = data.features[index];
					const geometryType = selectedFeature.geometry.type;

					if (geometryType === 'LineString') {
						// Calculate and display distance
						const distanceValue = turf.distance(
							turf.point(selectedFeature.geometry.coordinates[0]),
							turf.point(selectedFeature.geometry.coordinates[1]),
							{ units: 'meters' }
						);
						roundedDistance = Math.round(distanceValue * 100) / 100;
						setRoundedDistance(roundedDistance);
						// //console.log("rounded distance", roundedDistance);

						//  answer.innerHTML = `<div style=""><p><strong>${roundedDistance}</strong></p><p>meters</p></div>`;
						// ... display distance in answer ...
					} else if (geometryType === 'Polygon') {
						// Calculate and display area
						// //console.log("polygon data", data);
						const areaValue = area(selectedFeature);
						roundedArea = Math.round(areaValue * 100) / 100;

						// //console.log("rounded area", roundedArea);
						setRoundedArea(roundedArea);
						//  answer.innerHTML = `<p><strong>${roundedArea}</strong></p><p>square meters</p>`;
					} else {
						// Clear answer if it's not a line string or polygon
						// setRoundedArea(null);
						// setRoundedDistance(null)
						// answer.innerHTML = "";
						if (e.type !== 'draw.delete') {
							alert('Click the map to draw a line.');
							draw.deleteAll();
						}
					}
				} else {
					// Clear answer if no feature is selected
					answer.innerHTML = '';
				}
			}
		}
	};

	//  4 layers of map
    const handleLayer1 = () => {
        if(rotateActive){
            stopRotation();
        }
        setMapView('Default');
    };
    const handleLayer2 = () => {
        setMapView('Light');
        if(rotateActive){
            stopRotation();
        }
    };
    const handleLayer3 = () => {
        setMapView('Dark');
        if(rotateActive){
            stopRotation();
        }
    };
    const handleLayer4 = () => {
        setMapView('Satellite');
        if(rotateActive){
            stopRotation();
        }
    };

	useEffect(() => {
		// Display the answer based on the draw mode
		setRoundedDistance((prevDistance) => {
			// Update UI or perform additional actions based on prevDistance
			return roundedDistance;
		});

		setRoundedArea((prevArea) => {
			// Update UI or perform additional actions based on prevArea
			return roundedArea;
		});

		// //console.log("useeffectA", roundedArea);

		if (drawMode === 'draw_line_string') {
			const answer = document.getElementById('calculated-distance');

			if (answer && roundedDistance !== null && roundedDistance !== 0) {
				answer.innerHTML = `<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
			<div style={{ flex: '0 0 auto', marginRight: '8px' }}>
			  <p><strong>Road Width:</strong></p>
			</div>
			<div style={{ flex: '1 1 auto' }}>
			  <p>${roundedDistance}meters</p>
			</div>
		  </div>`;
			} else if (answer) {
				answer.innerHTML = ''; // No HTML if roundedDistance is 0 or null
			}
		} else if (drawMode === 'draw_polygon') {
			const answer = document.getElementById('calculated-area');

			if (answer && roundedArea !== null && roundedArea !== 0) {
				answer.innerHTML = `<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
			<div style={{ flex: '0 0 auto', marginRight: '8px' }}>
			  <p><strong>Area:</strong></p>
			</div>
			<div style={{ flex: '1 1 auto' }}>
			  <p>${roundedArea} meters</p>
			</div>
		  </div>
		  `;
			} else if (answer) {
				answer.innerHTML = ''; // No HTML if roundedArea is 0 or null
			}
		} else if (drawMode === 'simple_select') {
			if (geotype !== null) {
				const answer = document.getElementById(
					geotype === 'LineString'
						? 'calculated-distance'
						: 'calculated-area'
				);

				if (answer) {
					if (
						geotype === 'LineString' &&
						roundedDistance !== null &&
						roundedDistance !== 0
					) {
						answer.innerHTML = `<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<div style={{ flex: '0 0 auto', marginRight: '8px' }}>
				  <p><strong>Road Width:</strong></p>
				</div>
				<div style={{ flex: '1 1 auto' }}>
				  <p>${roundedDistance}meters</p>
				</div>
			  </div>`;
					} else if (
						geotype === 'Polygon' &&
						roundedArea !== null &&
						roundedArea !== 0
					) {
						answer.innerHTML = `<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
				<div style={{ flex: '0 0 auto', marginRight: '8px' }}>
				  <p><strong>Area:</strong></p>
				</div>
				<div style={{ flex: '1 1 auto' }}>
				  <p>${roundedArea} sq meters</p>
				</div>
			  </div>`;
					} else {
						answer.innerHTML = ''; // No HTML if roundedDistance or roundedArea is 0 or null
					}
				}
			}
		}
	}, [roundedDistance, roundedArea, drawMode, geotype]);

	const copyToClipboard = (text) => {
		navigator.clipboard.writeText(text).then(
		  () => {
			
		toast.success("Coordinate Copied")
		  },
		  (err) => {
			toast.error("Failed to Copy")
			console.error('Failed to copy: ', err);
		  }
		);
	  };

	return (
		<div className="relative">
			<div ref={mapContainerRef} className="h-screen w-full z-0">
				<div
					style={{
						position: 'absolute',
						// top: '15.3%',
						// left: '4.05%',
						bottom: '29%',
						right: '0.5%',
						transform: 'translateX(-20%)',
						zIndex: 40,
					}}
					className="screen-component-container rounded-full">
					<ScreenComponent
						// onDownload={captureScreenshot}
						//  onCameraIconClick={onCameraIconClick}
						onRotationClick={onRotationClick}
						// onPolygonClick={onPolygonClick}
						// onRoadwidthClick={onRoadwidthClick}
						rotationIcon={rotationIcons}
					/>
				</div>
			</div>

			{modalData && (
				<PointsDetails
					coordinates={modalData}
					onClose={() => dispatch(setModalData(null))}
					pointsData={pointsData}
				/>
			)}

			{/* new point details */}
			{/* {true && <PointCard />} */}

			{segmentModalData && (
				<SegmentDetails
					segmentData={segmentModalData}
					onClose={() => dispatch(setSegmentModalData(null))}
				/>
			)}

			{/* map action controls */}
			{roundedArea !== null && roundedArea !== 0 && (
				<div
					id="calculated-area"
					style={{
						height: '50px',
						width: '150px',
						position: 'absolute',
						bottom: '13%',
						left: '2%',
						color: 'white',
						borderRadius: '5px',
						backgroundColor: 'grey',
						// textAlign: "center",
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}></div>
			)}
			{roundedDistance !== null && roundedDistance !== 0 && (
				<div
					id="calculated-distance"
					style={{
						height: '50px',
						width: '150px',
						position: 'absolute',
						bottom: '23%',
						left: '2%',
						color: 'white',
						borderRadius: '5px',
						backgroundColor: 'grey',
						//  textAlign: "center",
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}></div>
			)}

			<div
				className="absolute"
				style={{
					transform: 'translate(-50%, -50%)',
					// bottom: '0.1%',
					left: '18%',
					top: '96%',
				}}>
				<MapLayers
					onLayer1={handleLayer1}
					onLayer2={handleLayer2}
					onLayer3={handleLayer3}
					onLayer4={handleLayer4}
				/>
			</div>

			<div className="absolute text-red-400 top-4 right-5 flex flex-col gap-2">
    <button
        className="bg-primary text-white rounded hover:scale-105 transition-transform duration-300 ease-in-out px-2 py-1"
        onClick={() =>
            window.open('https://rasta360-frontend.vercel.app/home', '_blank')
        }>
        <div className="flex gap-x-2 justify-center items-center">
            Rasta.AI 360
            <FaExternalLinkAlt className="mr-2" style={{ width: '0.8rem', height: '0.8rem' }} />
        </div>
    </button>
	{/* <div className='justify-center items-center'>
	<button
            className="bg-white text-black rounded  ease-in-out w-6 py-1 hover:bg-orange-500"
            onClick={handleCommentClick}
        >
            <div className="flex gap-x-0 justify-center items-center ">
               
                <BiSolidCommentDetail className="hover:white" style={{ width: '1rem', height: '1rem' }} />
            </div>
        </button>
		</div> */}
</div>



			{EditMarker && (
				<div
					className="absolute z-20 text-black rounded-lg  bg-white flex flex-col px-2  py-2 gap-y-2 "
					style={{
						bottom: '2%',
						left: '42%',
						width: '220px',
					}}>
					<div className="flex justify-evenly">
						<p>Lat</p>
						<p>:</p>
						<p>{editCoordinates[0]}</p>
						<p className="cursor-pointer hover:scale-105  items-center justify-center">
							<FaCopy
								className="cursor-pointer   w-4 mt-1"
								style={{ color: 'orange' }}
								onClick={() =>
									copyToClipboard(editCoordinates[0])
								}
								title="Copy Latitude"
							/>
						</p>
					</div>
					<div className='flex justify-evenly'>
						<p>Lng</p>
						<p>:</p>
						<p>{editCoordinates[1]}</p>
						<p className="cursor-pointer hover:scale-105  items-center justify-center">
							<FaCopy
								className="cursor-pointer w-4 mt-1 hover:scale-110"
								style={{ color: 'orange' }}
								onClick={() =>
									copyToClipboard(editCoordinates[1])
								}
								title="Copy Latitude"
							/>
						</p>
						 
					</div>
					<div className="text-center">
						<button
							className="px-3 py-1 bg-orange-500 rounded-lg hover:bg-orange-600 transform transition-all duration-300 scale-95 hover:scale-110"
							onClick={() => removeEditMarker()}>
							Remove
						</button>
					</div>
				</div>
			)}
			<div
				className="absolute z-10 bg-red-500"
				style={{
					transform: 'translate(-50%, -50%)',
					left: '10%',
					top: '5%',
				}}></div>
		</div>
	);
};
