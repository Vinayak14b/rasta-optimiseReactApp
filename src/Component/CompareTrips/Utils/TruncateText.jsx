import { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';

const TruncatedDropdown = ({
	regionData,
	defaultRegionValue,
	dropdownType,
}) => {
	const [showFullText, setShowFullText] = useState(false);

	const toggleFullText = () => {
		setShowFullText(!showFullText);
	};

	const truncatedText = regionData?.[dropdownType]
		? `${regionData[dropdownType].slice(0, 35)}${
				regionData[dropdownType].length > 35 ? '...' : ''
		  }`
		: `Select Your ${dropdownType}`;

	return (
		<div
			className={`flex justify-around items-center px-4 relative cursor-pointer`}
			onClick={toggleFullText}>
			<span className="flex justify-center flex-1 py-2">
				{showFullText
					? regionData?.[dropdownType] ||
					  `Select Your ${dropdownType}`
					: truncatedText}
			</span>
			{!defaultRegionValue?.[dropdownType] && (
				<span>
					<RiArrowDropDownLine className="w-8 h-8" />
				</span>
			)}
		</div>
	);
};

export default TruncatedDropdown;
