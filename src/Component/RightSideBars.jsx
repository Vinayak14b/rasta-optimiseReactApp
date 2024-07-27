// RightSideBars.js

import { useState } from 'react';
import { useSelector } from 'react-redux';
import SmallSidebar from './SmallSidebar';
import '../CSS/rightsidebar.css';
import { titles } from '../assets/IconArray';

const RightSideBars = ({
	showSidebar,
	selectedButtonRight,
	setSelectedButtonRight,
	isHeatMapChecked,
	onHeatMapChange,
}) => {
	const [showDialog, setShowDialog] = useState(false);
	const [checked, setChecked] = useState(false);

	const [hoveredButton, setHoveredButton] = useState(null);
	const [clickedButton, setClickedButton] = useState(null);
	const routeData = useSelector((state) => state.getaidata.getaidata);

	const sidebarStyles = {
		position: 'fixed',
		top: '0',
		right: '0',
		height: '100%',
		width: '10%',
		backgroundColor: '#fff',
		display: showSidebar ? 'none' : 'flex', // Show only when showSidebar is false
		flexDirection: 'column',
		alignItems: 'center',
	};

	const handleChange = () => {
		setChecked(!checked);
	};

	const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

	const handleButtonClick = (label) => {
		setIsRightSidebarOpen((prevOpen) => {
			if (prevOpen && selectedButtonRight === label) {
				// Reset hoveredButton when unclicking
				setHoveredButton(null);
				return false;
			}
			return true;
		});
		setSelectedButtonRight((prevLabel) =>
			prevLabel === label ? null : label
		);
		if (label === clickedButton) {
			setClickedButton(null);
			return;
		}
		setClickedButton(label);
	};

	const [isOn, setIsOn] = useState(false);

	const handleToggle = () => {
		setIsOn((prevIsOn) => !prevIsOn);
	};

	return (
		<>
			<div
				style={sidebarStyles}
				className="fixed top-0 right-0 h-full w-[150px] bg-white flex flex-col items-center right-side-container">
				{/* Dialog Box */}
				<div className="right-sidebar">
					{/* Dialog Box */}
					{showDialog && (
						<div
							className={`relative w-16 h-12 bg-gray-300 rounded-full ${
								checked ? 'bg-orange-500' : 'bg-gray-500'
							} cursor-pointer`}
							onClick={handleChange}>
							{/* Your actual dialog content goes here */}
							<p>This is your inventory dialog box.</p>
							<button onClick={() => setShowDialog(false)}>
								Close
							</button>
						</div>
					)}

					<div
						className="w-full h-[60px] bg-primary flex flex-col items-center justify-center"
						// onClick={handleInventoryClick}
					>
						<p className="text-white text-center  font-Inter text-xl font-bold">
							Statistics
						</p>
					</div>
					{/* mapping all the buttons of the statistics sidebar */}
					<div>
						{titles.map((title, index) => (
							//add the map on the statistic buttons
							// changed the width from 100% to 90%
							<div
								key={index}
								className={`w-90% h-[85px] m-2 flex flex-col cursor-pointer items-center justify-center ${
									selectedButtonRight === title.name &&
									isRightSidebarOpen
										? 'bg-orange-300 border-rounded'
										: ''
								}`}
								onClick={() => {
									handleButtonClick(title.name);
								}}
								onMouseEnter={() =>
									setHoveredButton(title.name)
								}
								onMouseLeave={() => setHoveredButton(null)}
								style={{
									borderRadius:
										clickedButton === title.name
											? '20px'
											: '0px',
									backgroundColor:
										hoveredButton === title.name ||
										clickedButton === title.name
											? '#fea572'
											: 'transparent',
									transition:
										'background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out',
								}}>
								<img
									src={title.icon}
									alt={title.alt}
									className="h-10 mr-2 mb-2 relative"
								/>
								<div className=" w-[30px] h-[30px] rounded-full flex justify-center items-center absolute bg-white opacity-80 ml-14 border border-solid border-red-500">
									<div className="text-xs">
										{title.name ===
											'Count of Potholes on Road' &&
										routeData &&
										routeData.aiOutput &&
										routeData.aiOutput.length > 0
											? (routeData.aiOutput[0]
													.total_detected &&
													routeData.aiOutput[0]
														.total_detected
														.pothole) ||
											  '0'
											: '0'}
									</div>
								</div>
								<p className="text-black text-center font-montserrat text-xs font-semibold">
									{title.name}
								</p>
							</div>
						))}
					</div>

					<div className="w-[150px] h-[65px] rounded-full flex flex-col justify-center items-center absolute mr-10">
						<div className="flex items-center">
							<button
								className={`rounded-full w-[77px] h-10 relative transition-all duration-500 ease-in-out ${
									isOn ? 'bg-orange-500' : 'bg-black'
								}`}
								onClick={handleToggle}>
								<div
									className={`bg-white rounded-full h-7 w-7 absolute top-2/4 transition-transform ease-in-out transform -translate-y-2/4 ${
										isOn ? 'on' : 'off'
									} ${isOn ? '' : 'ml-1'}`}
									style={{
										left: isOn ? 'calc(100% - 2rem)' : '0',
									}}>
									<span
										className={`absolute top-2/4 transform -translate-y-2/4 text-white ${
											isOn
												? 'right-full mr-2'
												: 'left-full ml-2'
										}`}>
										{isOn ? 'ON' : 'OFF'}
									</span>
								</div>
							</button>
						</div>
					</div>
				</div>{' '}
			</div>

			{/* toggle switch */}

			{/* Dialog Box */}
			<SmallSidebar
				isOpen={isRightSidebarOpen}
				clickedButton={selectedButtonRight}
				chartData={null}
			/>

			{/* <Mapcomponent isHeatMapChecked={isHeatMapChecked}/> */}
		</>
	);
};

export default RightSideBars;
