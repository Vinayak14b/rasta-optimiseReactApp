import { GrPrevious } from 'react-icons/gr';
import { GrNext } from 'react-icons/gr';
import { AiOutlineUndo } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { selectPoint } from '../../../mapbox/slices/pointSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgColorPicker } from 'react-icons/cg';
import React, { useState } from 'react';
import ChooseColor from './ChooseColor';
import {
	initialAssetsData,
	initialDefectsData,
} from '../RightComponent/FilterData';
import {
	emptyAsset,
	emptyDefect,
	selectImageResponse2,
} from '../../slices/imageResponseSlice';

const Controls = ({
	downloadImage,
	setEditCoordinates,
	coordinates,
	setCoordinates,
	setSaveFlag,
	setMapHide,
	mapHide,
	setColors,
	colors,
}) => {
	const location = useLocation();
	const navigate = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const lat = queryParams.get('lat');
	const long = queryParams.get('long');
	const { pointsData } = useSelector(selectPoint);
	const [showColorPicker, setShowColorPicker] = useState(false);
	const dispatch = useDispatch();

	function searchIndex() {
		let foundIndex = -1;
		for (let i = 0; i < pointsData.length; i++) {
			const point = pointsData[i];

			if (point.lat == coordinates[0] && point.long == coordinates[1]) {
				foundIndex = i;
				break;
			}
		}
		return foundIndex;
	}

	const handleAdjacent = (label) => {
		const foundIndex = searchIndex();
		let newIndex = label === 'Next' ? foundIndex + 1 : foundIndex - 1;

		if (
			foundIndex !== -1 &&
			newIndex >= 0 &&
			newIndex < pointsData.length
		) {
			const nextPoint = pointsData[newIndex];
			if (
				nextPoint &&
				nextPoint.long !== undefined &&
				nextPoint.lat !== undefined
			) {
				const searchParams = new URLSearchParams(location.search);
				searchParams.set('lat', nextPoint.lat);
				searchParams.set('long', nextPoint.long);
				searchParams.set('predImage', nextPoint?.pred_image);
				initialAssetsData.forEach((asset) => {
					asset.isChecked = false;
					asset.count = 0;
				});
				dispatch(emptyAsset());
				initialDefectsData.forEach((def) => {
					def.isChecked = false;
					def.count = 0;
				});
				dispatch(emptyDefect());
				navigate(`${location.pathname}?${searchParams.toString()}`);
			}
		}
	};
	return (
		<div className="w-[90%] h-[80%] flex justify-around  items-center ">
			<div>
				<button
					className="relative bg-orange-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
					onClick={() => setShowColorPicker((prev) => !prev)}>
					<CgColorPicker
						className={showColorPicker ? 'text-black' : null}
					/>
				</button>
			</div>
			<div>
				<button
					className="bg-orange-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
					onClick={() => handleAdjacent('Prev')}>
					<GrPrevious />
				</button>
			</div>
			<div>
				<button
					className="bg-orange-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
					onClick={() => handleAdjacent('Next')}>
					<GrNext />
				</button>
			</div>
			<div>
				<button
					className="bg-orange-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
					onClick={() => coordinates && setEditCoordinates(true)}>
					EditLatLng
				</button>
			</div>
			<div>
				<button
					className="bg-orange-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
					onClick={downloadImage}>
					Download
				</button>
			</div>
			<div>
				<button
					className="bg-orange-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
					onClick={() => setSaveFlag(true)}>
					SAVE
				</button>
			</div>
			<div>
				<button
					className="bg-orange-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
					onClick={() => setMapHide((prev) => !prev)}>
					{mapHide ? 'Map' : 'Hide'}
				</button>
			</div>

			{showColorPicker && (
				<div
					className="absolute rounded-lg bg-orange-200"
					style={{
						left: '2%',
						bottom: '11%',
						width: '32%',
						height: '45%',
						border: '2px solid red',
						zIndex: 62,
					}}>
					<ChooseColor colors={colors} setColors={setColors} />
				</div>
			)}
		</div>
	);
};

export default Controls;
