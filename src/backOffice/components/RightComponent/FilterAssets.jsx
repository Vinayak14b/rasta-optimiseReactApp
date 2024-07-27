import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectImageResponse2,
	setAsset,
	setDefect,
	removeAsset,
} from '../../slices/imageResponseSlice';
import { initialAssetsData } from './FilterData';

const FilterAssets = () => {
	const dispatch = useDispatch();
	const [assets, setAssets] = useState(initialAssetsData);

	const handleCheckboxChange = (index) => {
		const newAssets = [...assets];
		newAssets[index].isChecked = !newAssets[index].isChecked;
		setAssets(newAssets);

		if (newAssets[index].isChecked && newAssets[index].count > 0) {
			dispatch(
				setAsset({ [newAssets[index].id]: newAssets[index].count })
			);
		} else {
			dispatch(removeAsset(newAssets[index].id));
			newAssets[index].count = 0;
		}
	};

	const handleIncrement = (index) => {
		const newAssets = [...assets];
		newAssets[index].count += 1;
		setAssets(newAssets);

		if (newAssets[index].isChecked && newAssets[index].count > 0) {
			dispatch(
				setAsset({ [newAssets[index].id]: newAssets[index].count })
			);
		}
	};

	const handleDecrement = (index) => {
		const newAssets = [...assets];
		if (newAssets[index].count > 0) {
			newAssets[index].count -= 1;
			setAssets(newAssets);

			if (newAssets[index].isChecked && newAssets[index].count > 0) {
				dispatch(
					setAsset({ [newAssets[index].id]: newAssets[index].count })
				);
			} else {
				dispatch(setAsset({ [newAssets[index].id]: 0 }));
			}
		}
	};

	return (
		<div className="space-y-4 mb-4 mt-2">
			{assets.map((asset, index) => (
				<div
					key={asset.id}
					className="flex items-center ml-4 space-x-4    rounded">
					<div>
						<input
							type="checkbox"
							id={asset.id}
							name={asset.id}
							className="h-4 w-4"
							checked={asset.isChecked}
							onChange={() => handleCheckboxChange(index)}
						/>
					</div>
					<div style={{ width: '160px' }}>
						<label htmlFor={asset.id} className="text-md">
							{asset.name}
						</label>
					</div>
					<div className="flex items-center space-x-2">
						<button
							onClick={() => handleDecrement(index)}
							className="px-2  bg-gray-200 rounded">
							-
						</button>
						<span>{asset.count}</span>
						<button
							onClick={() => handleIncrement(index)}
							className="px-2 bg-gray-200 rounded">
							+
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default FilterAssets;
