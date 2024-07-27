import '../../../CSS/Utils.css';
import React from "react";
import { RiArrowDropDownLine } from 'react-icons/ri';

export const CompareDropdown = ({
	label,
	dismissOnClick,
	dateAvailable,
	onDateSelect,
}) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleItemClick = (date) => {
		onDateSelect(date);
		if (dismissOnClick) {
			setIsOpen(false);
		}
	};

	return (
		<div className="relative  text-left w-auto    ">
			<button
				type="button"
				style={{
					width: '12.5rem',
				}}
				onClick={toggleDropdown}
				className="font-poppins min-w-[18rem] bg-white h-8 text-base flex justify-center font-semibold items-center  text-black border border-[#FE6100] px-4 py-2 rounded shrink-0    ">
				{label}
				<RiArrowDropDownLine className="w-8 h-8" />
			</button>

			{isOpen && (
				<div
					className="absolute mt-1   w-[18rem]   bg-white border border-[#FE6100] rounded shadow-lg py-1 hide-dropdown-scroll hide-dropdown-scroll-bar parent-dropdown  "
					style={{
						overflow: 'scroll',
						maxHeight: '8rem',
						// width: '840rem',
						overflowX: 'hidden',
						overflowY: 'auto',
						width: '100%',
					}}>
					{dateAvailable?.map((date, index) => (
						<div
							key={index}
							style={{}}
							className="text-black  hover:text-black hover:bg-slate-500 font-normal font-poppins cursor-pointer px-4 py-2 w-full   "
							onClick={() => handleItemClick(date)}>
							{date}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
