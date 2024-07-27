import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	editLatLng,
	saveAnnotation,
} from '../mapbox/services/Operations/BackOfficeAPI';
import { setLoading, selectPoint } from '../mapbox/slices/pointSlice';
import { Spinner } from '../utils/Spinner';
import Controls from './components/LeftComponent/Controls';
import EditCoordinates from './components/EditCoordinates';
import RightComponent from './components/RightComponent/RightComponent';
import ImageAnnotation from './components/LeftComponent/ImageAnnotation';
import SingleMap from '../mapbox/mapcomponents/SingleMap';
import FloatingMap from './FloatingMap';
import { selectProfile } from '../usermanagement/slices/profileSlice';
import { selectImageResponse2 } from './slices/imageResponseSlice';
import { RiCloseCircleFill } from 'react-icons/ri';
import { getSinglePointData } from '../mapbox/services/Operations/PointsAPI';

const EditImage = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { pointsData } = useSelector(selectPoint);
	const queryParams = new URLSearchParams(location.search);
	const lat = parseFloat(queryParams.get('lat'));
	const long = parseFloat(queryParams.get('long'));
	const predImage = queryParams.get('predImage');
	const { profileUserData } = useSelector(selectProfile);
	const userName = profileUserData?.username;
	const { asset, defect } = useSelector(selectImageResponse2);
	const loading = useSelector((state) => state.point.loading);
	const canvasRef = useRef(null);
	const [annotations, setAnnotations] = useState([]);
	const [saveFlag, setSaveFlag] = useState(null);
	const [saveFlag1, setSaveFlag1] = useState(null);
	const containerRef = useRef(null);
	const customDivRef = useRef(null);
	const [coordinates, setCoordinates] = useState(null);
	const [editCoordinates, setEditCoordinates] = useState(null);
	const [imgSrc, setImgsrc] = useState(null);
	const [imageId, setImageId] = useState(null);
	const [imageResponse1, setImageResponse1] = useState({});
	const dragRef = useRef(null);
	const [imageResponse, setImageResponse] = useState({});
	const [roadName, setRoadName] = useState(null);
	const [roadNo, setRoadNo] = useState(null);
	const [mapHide, setMapHide] = useState(true);
	const [colors, setColors] = useState({
		border: '#E53C3C',
		text: '#FDFCFF',
		textBg: '#FA0310',
	});

	const downloadImage = () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		// console.log('cannva , context', canvas, context);
		const img = new Image();
		// img.src = `data:image/jpeg;base64,${data.imgSrc}`;
		img.src = `data:image/jpeg;base64,${imgSrc}`;

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;

			context.drawImage(img, 0, 0);
			// console.log('annotations', annotations);
			annotations.forEach((annotation) => {
				context.beginPath();
				context.moveTo(annotation.mark.x, annotation.mark.y);
				context.lineTo(
					annotation.mark.x + annotation.mark.width,
					annotation.mark.y
				);
				context.lineTo(
					annotation.mark.x + annotation.mark.width,
					annotation.mark.y + annotation.mark.height
				);
				context.lineTo(
					annotation.mark.x,
					annotation.mark.y + annotation.mark.height
				);
				context.closePath();
				// Set the stroke color to red
				// context.strokeStyle = 'orange';
				context.strokeStyle = colors.border;

				// Increase the line width (stroke thickness)
				context.lineWidth = 4; // Adjust the value as needed

				context.stroke();

				// Custom font styling
				context.font = 'bold 16px Arial';

				// Set the fill color to orange
				context.fillStyle = colors.textBg; // You can use any valid CSS color value here

				// Draw a filled rectangle behind the text
				context.fillRect(
					annotation.mark.x,
					annotation.mark.y - 20, // Adjust the vertical position as needed
					context.measureText(annotation.comment).width + 11, // Add some padding
					21 // Height of the background rectangle
				);

				// Draw the text in red on top of the orange background
				context.fillStyle = colors.text;
				context.fillText(
					annotation.comment,
					annotation.mark.x + 6, // Add some padding
					annotation.mark.y - 5
				);
			});

			// Example usage:
			const now = new Date();
			const timestamp = formatDate(now);

			const fileName = `${timestamp}_Lat${lat}_Lon${long}#${userName}.png`;

			const link = document.createElement('a');
			link.download = fileName;
			link.href = canvas.toDataURL('image/png');
			link.click();
		};
	};

	const imageFileBuffer = async () => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');

		const img = new Image();
		img.src = `data:image/jpeg;base64,${imgSrc}`; // Replace with your image source

		await new Promise((resolve, reject) => {
			img.onload = () => {
				canvas.width = img.width;
				canvas.height = img.height;

				context.drawImage(img, 0, 0);

				annotations.forEach((annotation) => {
					context.beginPath();
					context.moveTo(annotation.mark.x, annotation.mark.y);
					context.lineTo(
						annotation.mark.x + annotation.mark.width,
						annotation.mark.y
					);
					context.lineTo(
						annotation.mark.x + annotation.mark.width,
						annotation.mark.y + annotation.mark.height
					);
					context.lineTo(
						annotation.mark.x,
						annotation.mark.y + annotation.mark.height
					);
					context.closePath();

					// context.strokeStyle = 'red';
					context.strokeStyle = colors.border;
					context.lineWidth = 4;
					context.stroke();

					context.font = 'bold 16px Arial';
					// context.fillStyle = 'red';
					context.fillStyle = colors.textBg;
					context.fillRect(
						annotation.mark.x,
						annotation.mark.y - 20,
						context.measureText(annotation.comment).width + 11,
						21
					);

					// context.fillStyle = 'white';
					context.fillStyle = colors.text;
					context.fillText(
						annotation.comment,
						annotation.mark.x + 6,
						annotation.mark.y - 5
					);
				});

				resolve();
			};

			img.onerror = (error) => {
				reject(error);
			};
		});

		// Convert canvas to image data URL
		const imageDataURL = canvas.toDataURL('image/png');

		// Convert data URL to blob (file buffer)
		const byteString = atob(imageDataURL.split(',')[1]);
		const mimeString = imageDataURL
			.split(',')[0]
			.split(':')[1]
			.split(';')[0];
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		const blob = new Blob([ab], { type: mimeString });

		return blob;
	};

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setLoading(true));
			try {
				const result = await dispatch(editLatLng(lat, long, predImage));

				setImgsrc(result?.image);

				setCoordinates(result?.coordinate);
				setImageId(result?.imageId);
				if (result?.imageResponse) {
					setImageResponse1(result?.imageResponse);
				}

				const points_lat_long = {
					lat: lat,
					long: long,
				};
				const data = await dispatch(
					getSinglePointData(points_lat_long)
				);
				setRoadName(data?.roadName);
				setRoadNo(data?.roadNo);
			} catch (error) {}
			dispatch(setLoading(false));
		};

		fetchData();
	}, [lat, long]);

	useEffect(() => {
		const fetchData = async () => {
			setSaveFlag1(true);
			if (saveFlag) {
				try {
					const finalImageResponse = await mergeImageResponses(
						imageResponse1,
						asset,
						defect
					);
					setImageResponse(finalImageResponse);
				} catch (error) {
					console.error(
						'Error while merging image responses:',
						error
					);
					// Handle error state or logging
				}
			}
			setSaveFlag1(false);
		};

		fetchData();
	}, [saveFlag]);

	function mergeImageResponses(imageResponse1, asset, defect) {
		let finalImageResponse = {
			asset: { ...imageResponse1?.asset },
			defect: { ...imageResponse1?.defect },
		};

		// Merge assets

		for (let assetType in asset) {
			if (finalImageResponse.asset.hasOwnProperty(assetType)) {
				finalImageResponse.asset[assetType] += asset[assetType];
			} else {
				finalImageResponse.asset[assetType] = asset[assetType];
			}
		}

		// Merge defects

		for (let defectType in defect) {
			if (finalImageResponse.defect.hasOwnProperty(defectType)) {
				finalImageResponse.defect[defectType] += defect[defectType];
			} else {
				finalImageResponse.defect[defectType] = defect[defectType];
			}
		}
		return finalImageResponse;
	}

	const handleSave = () => {
		saveAnnotated();
	};

	const saveAnnotated = async () => {
		try {
			const now = new Date();
			const timestamp = formatDate(now);
			const fileName = await `${timestamp.replace(
				/[:#]/g,
				'-'
			)}_Lat${lat}_Lon${long}_${userName.replace(/#/g, '-')}`;
			const canvas = canvasRef.current;
			const blob = await imageFileBuffer(canvas);
			const formData = new FormData();
			formData.append('anotation', blob, fileName);
			formData.append('roadName', roadName);
			formData.append('roadNo', roadNo);
			formData.append('imageId', imageId);
			formData.append('imageResponse', JSON.stringify(imageResponse));
			const result = await dispatch(saveAnnotation(formData));
			if (result?.status == 200) {
				setTimeout(() => {
					window.location.reload();
				}, 500);
			}
		} catch (error) {
			console.error('Error in  saveAnnotation:', error);
		}
	};

	useEffect(() => {
		let offsetX,
			offsetY,
			isDragging = false;

		const handleMouseDown = (e) => {
			if (e.target === dragRef.current) {
				isDragging = true;
				offsetX =
					e.clientX - dragRef.current.getBoundingClientRect().left;
				offsetY =
					e.clientY - dragRef.current.getBoundingClientRect().top;
			}
		};

		const handleMouseMove = (e) => {
			if (!isDragging) return;
			const newX = e.clientX - offsetX;
			const newY = e.clientY - offsetY;
			dragRef.current.style.left = `${newX}px`;
			dragRef.current.style.top = `${newY}px`;
		};

		const handleMouseUp = () => {
			isDragging = false;
		};

		if (!dragRef.current) return; // Ensure dragRef.current is defined

		dragRef.current.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			if (dragRef.current) {
				dragRef.current.removeEventListener(
					'mousedown',
					handleMouseDown
				);
			}
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [mapHide]);

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		let hours = date.getHours();
		const minutes = ('0' + date.getMinutes()).slice(-2);
		const seconds = ('0' + date.getSeconds()).slice(-2);
		const ampm = hours >= 12 ? 'pm' : 'am';

		hours = hours % 12;
		hours = hours ? hours : 12; // Handle midnight

		const formattedDate = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}${ampm}`;
		return formattedDate;
	};

	return (
		<div className="h-screen w-screen relative overflow-hidden ">
			{/* {loading ? (
				<Spinner />
			) : ( */}
			<>
				<div
					className="h-screen w-screen flex bg-slate-300 "
					style={{
						filter:
							// saveFlag || editCoordinates
							editCoordinates ? 'blur(5px' : 'none',
					}}>
					<div
						style={{
							width: '70%',
							//  border: '2px solid red'
						}}
						className="flex flex-col gap-y-2 ">
						<div
							style={{
								height: '85%',
								// border: '2px solid purple',
								borderBottom: '2px solid black',
								zIndex: 60,
							}}
							className="flex justify-center items-center p-4">
							{/* {loading ? (
								<Spinner />
							) : ( */}
							<ImageAnnotation
								imgSrc={imgSrc}
								canvasRef={canvasRef}
								annotations={annotations}
								setAnnotations={setAnnotations}
								containerRef={containerRef}
								customDivRef={customDivRef}
								loading={loading}
							/>
							{/* )} */}
						</div>
						<div
							style={{
								height: '15%',
								// border: '2px solid blue',
							}}
							className="flex justify-center items-center">
							<Controls
								downloadImage={downloadImage}
								setEditCoordinates={setEditCoordinates}
								coordinates={coordinates}
								setCoordinates={setCoordinates}
								setSaveFlag={setSaveFlag}
								setMapHide={setMapHide}
								mapHide={mapHide}
								setColors={setColors}
								colors={colors}
							/>
						</div>
					</div>
					<div
						style={{
							width: '30%',
							//  border: '2px solid green',
							borderLeft: '2px solid black',
						}}>
						<div
							className=""
							style={{
								height: '100%',
								// border: '2px solid blue',
							}}>
							<RightComponent imageResponse1={imageResponse1} />
						</div>
					</div>
				</div>
				{editCoordinates && (
					<div className="absolute top-0 left-0 w-[100%] h-[100%] flex justify-center  items-center">
						<div
							className="border-2 bg-white relative rounded-lg flex items-center"
							style={{ width: '40%', height: '80%' }}>
							<EditCoordinates
								setEditCoordinates={setEditCoordinates}
								coordinates={coordinates}
								imageId={imageId}
							/>
						</div>
					</div>
				)}
				{saveFlag && (
					<div
						className="absolute top-0 left-0 w-[100%] h-[100%] flex justify-center items-end overflow-hidden pb-5"
						style={{ zIndex: 62 }}>
						{!saveFlag1 ? (
							<div
								className="border-2 bg-white  relative rounded-lg flex flex-col mb-4 mr-8"
								style={{ width: '40%', height: '40%' }}>
								<div className="flex justify-end cursor-pointer text-primary">
									<RiCloseCircleFill
										className="w-7 h-7"
										onClick={() => setSaveFlag(false)}
									/>
								</div>
								<div className="border-2 border-green-400 mx-8 p-1 mb-2  rounded-lg  h-full">
									<div
										className="flex gap-x-2 "
										style={{ height: '80%' }}>
										<div
											className="border-2 border-red-500 flex flex-col rounded-lg flex-grow overflow-auto"
											style={{
												height: 'full',
												width: '50%',
												flexGrow: 1,
											}}>
											<p className="font-serif font-semibold text-center">
												Total Assests : &nbsp;{' '}
											</p>
											{imageResponse &&
											imageResponse.asset &&
											Object.keys(imageResponse.asset)
												.length > 0 ? (
												<div className="ml-4 text-sm">
													<ul>
														{Object.entries(
															imageResponse.asset
														).map(
															([key, value]) => (
																<li key={key}>
																	{key} :
																	&nbsp;
																	{value}
																</li>
															)
														)}
													</ul>
												</div>
											) : (
												<div className="ml-4 text-sm">
													No assets
												</div>
											)}
										</div>
										<div
											className="border-2 border-red-500 flex flex-col rounded-lg flex-grow overflow-auto "
											style={{
												height: 'full',
												width: '50%',
												flexGrow: 1,
											}}>
											<p className="font-serif font-semibold text-center">
												Total Defects : &nbsp;
											</p>
											{imageResponse &&
											imageResponse.defect &&
											Object.keys(imageResponse.defect)
												.length > 0 ? (
												<div className="ml-4 text-sm">
													<ul>
														{Object.entries(
															imageResponse.defect
														).map(
															([key, value]) => (
																<li key={key}>
																	{key}:
																	&nbsp;
																	{value}
																</li>
															)
														)}
													</ul>
												</div>
											) : (
												<div className="ml-4 text-xs">
													No defects
												</div>
											)}
										</div>
									</div>
									<div className="flex justify-evenly items-center mt-2">
										<button
											className="bg-orange-500 text-white font-bold py-1 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
											onClick={() => setSaveFlag(false)}>
											Cancel
										</button>
										<button
											className="bg-orange-500 text-white font-bold py-1 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
											onClick={handleSave}>
											CONFIRM
										</button>
									</div>
								</div>
							</div>
						) : (
							<Spinner />
						)}
					</div>
				)}
			</>
			{/* )} */}
			{!mapHide && (
				<div
					ref={dragRef}
					className="absolute flex justify-center select-none"
					style={{
						width: '22rem',
						height: '20rem',
						right: '5%',
						bottom: '5%',
						borderRadius: '5px',
						background: '#feebb7',
						zIndex: 900,
						cursor: 'move',
						padding: '2px  ',
						position: 'absolute',
					}}>
					<div
						style={{
							width: '22rem',
							height: '18rem',
							borderRadius: '5px',
							zIndex: 999,
							overflow: 'hidden',
							position: 'relative',
						}}>
						<FloatingMap
							lat={lat}
							long={long}
							points={pointsData}
						/>
					</div>
					<div className="absolute bottom-0 mb-1"> Drag Here</div>
				</div>
			)}
		</div>
	);
};

export default EditImage;
