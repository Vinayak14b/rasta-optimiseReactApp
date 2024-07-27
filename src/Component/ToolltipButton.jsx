// TooltipButton.js
const TooltipButton = ({
	defaultIconPath,
	hoverIconPath,
	label,
	isSelected,
	onButtonClick,
}) => {
	let iconSizeClass = 'w-7 h-7';
	if (defaultIconPath === 'icons/nav_logo.png') {
		iconSizeClass = 'w-12 h-12';
	}

	const handleClick = () => {
		onButtonClick(label);
	};

	const buttonClass = `tooltip-button-${label.toLowerCase()}`; // Unique class based on label
	const hoverClass = `hover:bg-orange-${label.toLowerCase()}`; // Define hover background class
	const selectedClass = isSelected ? 'selected' : ''; // Conditional class for selected state

	return (
		<div className="hs-tooltip inline-block [--placement:right]">
			<div className={isSelected ? `bg-primary p-2 ${hoverClass}` : ''}>
				<button
					type="button"
					className={`m-0 hs-tooltip-toggle ${buttonClass} ${selectedClass} w-[3.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold border border-transparent disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
					onClick={handleClick}>
					<img
						src={`${process.env.PUBLIC_URL}/${
							isSelected ? hoverIconPath : defaultIconPath
						}`}
						alt={label}
						className={`flex-shrink-0 ${iconSizeClass}`}
					/>
				</button>
			</div>
		</div>
	);
};

export default TooltipButton;
