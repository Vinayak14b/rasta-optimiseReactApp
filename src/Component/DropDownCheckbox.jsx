import { useState, useEffect } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

const CheckboxDropdown = ({ options, handleCheckboxChange, category }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [label, setLabel] = useState('None Selected');

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const updateStatus = () => {
		// Check if options is defined before filtering
		if (options && options.length > 0) {
			const checkedOptions = options.filter((option) => option.checked);
			if (checkedOptions.length === 0) {
				setLabel('None Selected');
			} else if (checkedOptions.length === 1) {
				setLabel(checkedOptions[0].name);
			} else if (checkedOptions.length === options.length) {
				setLabel('All');
			} else {
				setLabel(`${checkedOptions.length} Selected`);
			}
		} else {
			setLabel('None Selected'); // Or set a default label if options is undefined or empty
		}
	};
	
	useEffect(() => {
		updateStatus();
	}, [options]);

	return (
		<div className={`dropdown ${isOpen ? 'on' : ''}`}>
			<label
				className="dropdown-label flex-col justify-start items-center p-2 "
				onClick={toggleOpen}>
				<div className="flex  gap-x-7 items-center w-full">
					<p className="uppercase font-poppins">{`Select ${category}`}</p>
					<AiFillCaretDown className="h-4 w-4" />
				</div>
				<p className="label-main font-poppins text-sm font-semibold text-left w-full">
					{label}
				</p>
			</label>
			{isOpen && (
				<div className="dropdown-list z-50  dropdown-container">
					{/* <a className="dropdown-option">Check All</a> */}
					{options.map((option, index) => (
						<label key={index} className="dropdown-option ">
							<div className='flex gap-x-2'>
								<input
									type="checkbox"
									checked={option.checked}
									onChange={() =>
										handleCheckboxChange(option, index)
									}
								/>
								<p className="font-semibold font-poppins">
									{option.name}
								</p>
							</div>
						</label>
					))}
				</div>
			)}
		</div>
	);
};

export default CheckboxDropdown;
