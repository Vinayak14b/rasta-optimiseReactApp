import React, { useState } from 'react';
import { AiTwotoneCloseCircle } from 'react-icons/ai';
import { RiCloseCircleFill } from 'react-icons/ri';
import { toast } from 'react-hot-toast';
import { saveLatLng } from '../../mapbox/services/Operations/BackOfficeAPI';
import { useDispatch } from 'react-redux';

const EditCoordinates = ({ setEditCoordinates, coordinates, imageId }) => {
	const [newLatitude, setNewLatitude] = useState('');
	const [newLongitude, setNewLongitude] = useState('');
	const dispatch = useDispatch();

	const handleLatitudeChange = (e) => {
		const value = e.target.value;
		// Check if the value is a number or empty
		if (!isNaN(value) || value === '') {
			setNewLatitude(value);
		}
	};

	const handleLongitudeChange = (e) => {
		const value = e.target.value;
		// Check if the value is a number or empty
		if (!isNaN(value) || value === '') {
			setNewLongitude(value);
		}
	};

	const updateLatLngApi = async () => {
		try {
			const result = await dispatch(
				saveLatLng(newLatitude, newLongitude, imageId)
			);

			if (result?.status == 200) {
				toast.success('New Coordinated Updated Successfully');

				const currentURL = window.location.href;
				const url = new URL(currentURL);
				const baseURL = url.origin + url.pathname;

				const params = new URLSearchParams(url.search);
				const predImageValue = params.get('predImage');
				const roadName = params.get('roadName');
				const roadNo = params.get('roadNo');

				const newURL = `${baseURL}?lat=${newLatitude}&long=${newLongitude}&predImage=${predImageValue}&roadName=${roadName}&roadNo=${roadNo}`;

				window.location.href = newURL;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleSaveClick = () => {
		if (newLatitude && newLongitude) {
			updateLatLngApi();
		} else if (!newLatitude && newLongitude) {
			toast.error('Please fill Latitude');
		} else if (!newLongitude && newLatitude) {
			toast.error('Please fill Longitude');
		} else {
			toast.error('Please fill Latitude and Longitude both');
		}
	};

	return (
		<div
			className="border-2 rounded-lg border-red-500 flex flex-col mx-auto gap-y-10 "
			style={{
				width: '80%',
				height: '95%',
				padding: '20px',
				boxSizing: 'border-box',
			}}>
			<div>
				<div>
					<p className="font-bold text-lg mb-4 ml-6">
						Current Coordinates
					</p>
				</div>
				<div className="flex flex-col items-start mb-4">
					<div className="flex items-center w-full">
						<label className="mr-2 font-medium w-32 text-left">
							Latitude
						</label>
						:
						<input
							type="text"
							// value="19.123456789123456"
							value={coordinates[0]}
							readOnly
							className="border-2 border-gray-300 p-2 rounded w-[75%] ml-1"
						/>
					</div>
				</div>
				<div className="flex flex-col items-start">
					<div className="flex items-center w-full">
						<label className="mr-2 font-medium w-32 text-left">
							Longitude
						</label>
						:
						<input
							type="text"
							// value="73.123456789123456"
							value={coordinates[1]}
							readOnly
							className="border-2 border-gray-300 p-2 rounded w-[75%] ml-1"
						/>
					</div>
				</div>
			</div>

			<div>
				<div>
					<p className="font-bold text-lg mb-4 ml-6">
						Add New Coordinates
					</p>
				</div>
				<div className="flex flex-col items-start mb-4">
					<div className="flex items-center w-full">
						<label className="mr-2 font-medium w-32 text-left">
							New Latitude
						</label>
						:
						<input
							type="text"
							value={newLatitude}
							onChange={handleLatitudeChange}
							className="border-2 border-gray-300 p-2 rounded w-[75%] ml-1"
						/>
					</div>
				</div>
				<div className="flex flex-col items-start">
					<div className="flex items-center w-full">
						<label className="mr-2 font-medium w-32 text-left">
							New Longitude
						</label>
						:
						<input
							type="text"
							value={newLongitude}
							onChange={handleLongitudeChange}
							className="border-2 border-gray-300 p-2 rounded w-[75%] ml-1"
						/>
					</div>
				</div>
			</div>

			<div className="items-center text-center">
				<button
					className="bg-orange-500 text-white font-bold py-2 px-6 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
					onClick={() => handleSaveClick()}>
					Save
				</button>
			</div>

			<div
				className="absolute top-0 right-0 cursor-pointer text-primary"
				onClick={() => setEditCoordinates(false)}>
				<RiCloseCircleFill className="w-7 h-7" />
			</div>
		</div>
	);
};

export default EditCoordinates;
