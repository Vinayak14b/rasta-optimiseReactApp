import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDefect, removeDefect } from '../../slices/imageResponseSlice';

import { initialDefectsData } from './FilterData';

const FilterDefects = () => {
	const dispatch = useDispatch();

	const [defects, setDefects] = useState(initialDefectsData);

	const handleCheckboxChange = (index) => {
		const newDefects = [...defects];
		newDefects[index].isChecked = !newDefects[index].isChecked;
		setDefects(newDefects);

		if (newDefects[index].isChecked && newDefects[index].count > 0) {
			dispatch(
				setDefect({ [newDefects[index].id]: newDefects[index].count })
			);
		} else {
			dispatch(removeDefect(newDefects[index].id));
			newDefects[index].count = 0;
		}
	};

	const handleIncrement = (index) => {
		const newDefects = [...defects];
		newDefects[index].count += 1;
		setDefects(newDefects);

		if (newDefects[index].isChecked && newDefects[index].count > 0) {
			dispatch(
				setDefect({ [newDefects[index].id]: newDefects[index].count })
			);
		}
	};

	const handleDecrement = (index) => {
		const newDefects = [...defects];
		if (newDefects[index].count > 0) {
			newDefects[index].count -= 1;
			setDefects(newDefects);

			if (newDefects[index].isChecked && newDefects[index].count > 0) {
				dispatch(
					setDefect({
						[newDefects[index].id]: newDefects[index].count,
					})
				);
			} else {
				dispatch(setDefect({ [newDefects[index].id]: 0 }));
			}
		}
	};

	return (
		<div className="space-y-4 mb-4 mt-2 ">
			{defects.map((def, index) => (
				<div
					key={def.id}
					className="flex items-center ml-4 space-x-4 rounded">
					<div>
						<input
							type="checkbox"
							id={def.id}
							name={def.id}
							className="h-4 w-4"
							checked={def.isChecked}
							onChange={() => handleCheckboxChange(index)}
						/>
					</div>
					<div style={{ width: '160px' }}>
						<label htmlFor={def.id} className="text-md ">
							{def.name}
						</label>
					</div>
					<div className="flex items-center space-x-2">
						<button
							onClick={() => handleDecrement(index)}
							className="px-2  bg-gray-200 rounded">
							-
						</button>
						<span>{def.count}</span>
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

export default FilterDefects;
