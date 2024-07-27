import { useState } from 'react';
import { RoadFeaturesData } from '../../../../constants/FilterData';


const RoadFeatures = () => {
	let isAllChecked = false;

	const [checkboxes, setCheckboxes] = useState(RoadFeaturesData);
	const handleCheckboxChange = (id, checkedValue) => {
		if (
			(id === 1 && checkedValue === false) ||
			(id === 1 && checkedValue === true)
		) {
			// If "All" checkbox is selected, update all other checkboxes to checked
			setCheckboxes((prevCheckboxes) =>
				prevCheckboxes.map((checkbox) => ({
					...checkbox,
					checked: !checkedValue,
				}))
			);
		} else {
			// If any other checkbox is selected, unselect "All"
			setCheckboxes((prevCheckboxes) =>
				prevCheckboxes.map((checkbox) =>
					checkbox.id === 1
						? { ...checkbox, checked: false }
						: checkbox.id === id && checkbox.id != 1
						? { ...checkbox, checked: !checkbox.checked }
						: checkbox
				)
			);
		}
	};

	isAllChecked =
		checkboxes.find((checkbox) => checkbox.id === 1)?.checked || false;

	return (
		<div className="font-poppins">
			<h3 className="ml-4 mt-3 font-semibold font-poppins">
				Road Features
			</h3>

			{checkboxes.map((checkbox) => (
				<div key={checkbox.id} className="flex items-center mt-4">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center">
							<img
								className="w-5 ml-4"
								src={checkbox.imagePath}
								alt={`Option ${checkbox.id} Icon`}
							/>
							<h4 className="ml-4">{checkbox.label}</h4>
						</div>
						<div>
							<input
								checked={checkbox.checked}
								onChange={() =>
									handleCheckboxChange(
										checkbox.id,
										checkbox.checked
									)
								}
								id={`checkbox-${checkbox.id}`}
								type="checkbox"
								value=""
								className={`w-4 h-4 text-white bg-${
									checkbox.checked ? 'orange' : 'primary-600'
								} border-gray-300 rounded focus:ring-${
									checkbox.checked ? 'orange' : 'primary'
								} dark:focus:ring-${
									checkbox.checked ? 'orange' : 'primary'
								} dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4`}
							/>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default RoadFeatures;
