import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../../CSS/Utils.css';
import {
	setPointCollection,
	selectFilter,
} from '../../../../mapbox/slices/filterSlice';
import {marker} from '../../../../mapbox/points/Core/plotPoints'
import { RemoveMarker } from '../../../../mapbox/points/Core/plotPoints';

export default function Points() {
	const [pointCheckboxes, setPointCheckboxes] = useState([]);
	const dispatch = useDispatch();
	const { pointCollection } = useSelector(selectFilter);

	useEffect(() => {
		setPointCheckboxes(pointCollection);
	}, [pointCollection]);

	const handlePointsFilter = (id, checkedValue) => {
		let updatedCheckboxes;

		if (id === 1) {
			// If checkbox with ID 1 is clicked, check all other checkboxes
			updatedCheckboxes = pointCheckboxes.map((checkbox) =>
				checkbox.id === 1
					? { ...checkbox, checked: !checkedValue }
					: { ...checkbox, checked: !checkedValue }
			);
		} else {
			// If checkbox other than ID 1 is clicked, uncheck checkbox with ID 1
			updatedCheckboxes = pointCheckboxes.map((checkbox) =>
				checkbox.id === id
					? { ...checkbox, checked: !checkedValue }
					: checkbox.id === 1
						? { ...checkbox, checked: false }
						: checkbox
			);
			const allOtherCheckboxesChecked = updatedCheckboxes.slice(1).every(checkbox => checkbox.checked);

			// If all other checkboxes except ID 1 are checked, check checkbox with ID 1 as well
			if (allOtherCheckboxesChecked) {
				updatedCheckboxes = updatedCheckboxes.map(checkbox =>
					checkbox.id === 1 ? { ...checkbox, checked: true } : checkbox
				);
			}
		}

		setPointCheckboxes(updatedCheckboxes);
		dispatch(setPointCollection(updatedCheckboxes));
		if (marker){
			RemoveMarker()
		}
	};

	return (
		<>
			<div className="bg-white font-poppins">
				<h3 className="ml-4 pt-2 font-semibold">Points</h3>

				{Array.isArray(pointCheckboxes) &&
					pointCheckboxes.map((checkbox) => (
						<div
							key={checkbox.id}
							className="flex items-center mt-4">
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center">
									<img
										className="w-5 ml-4"
										src={checkbox.imagePath}
										alt={`Option ${checkbox.id} Icon`}
									/>
									<h4 className="ml-4">{checkbox.label}</h4>
								</div>
								<div className="checkbox-wrapper-4">
									<input
										checked={checkbox.checked}
										onChange={() =>
											handlePointsFilter(
												checkbox.id,
												checkbox.checked
											)
										}
										id={`checkbox-${checkbox.id}`}
										type="checkbox"
										value=""
										className={`w-4 h-4 text-white bg-${checkbox.checked
												? 'orange'
												: 'primary-600'
											} border-gray-300 rounded focus:ring-${checkbox.checked
												? 'orange'
												: 'primary'
											} dark:focus:ring-${checkbox.checked
												? 'orange'
												: 'primary'
											} dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4`}
									/>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
}