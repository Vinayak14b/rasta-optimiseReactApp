import React, { useEffect } from 'react';
import SearchComponent from './SearchComponent';
// import { useDispatch, useSelector } from 'react-redux';
import { listmode } from '../assets/IconArray';
import { useSidebar } from './Context/SidebarContext';
import '../CSS/Sidebar/SecondSidebars.css';

const SecondSidebar = ({
	setSecondSidebarOpen,
	isOpen,
	firstSidebarWidth,
	// searchIconClicked,
	// handleClose,
}) => {
	const secondSidebarWidth = 80; // Set the width of the second sidebar here
	// const toggleSearchAndSurveyView = () => {
	// 	handleClose();
	// };

	const { listViewOpen, setListViewOpen } = useSidebar();

	return (
		<div
			id="second-sidebar"
			className={`z-50 hs-overlay transition-all duration-300 fixed top-0 start-0 bottom-0 ] w-80 right-${secondSidebarWidth} bg-orange-500 border-e border-gray-200 lg:block lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
				isOpen ? 'open' : 'closed'
			}`}
			style={{
				left: isOpen
					? `${firstSidebarWidth}rem`
					: `-${secondSidebarWidth}rem`,
				// overflowY: 'scroll',
				maxHeight: '100vh',
				backgroundColor: '#FE6100',
			}}>
			<div className="bg-white">
				<img
					className="px-16 py-4 aspect-auto"
					src={listmode.rasta}
					alt="Search Icon"
				/>
			</div>
			<div className="z-[20] bg-white">
				{listViewOpen && (
					<>
						<div
							className="z-1"
							style={{
								zIndex: 20,
							}}>
							<SearchComponent
								setSecondSidebarOpen={setSecondSidebarOpen}
								// handleClose={toggleSearchAndSurveyView}
								// searchIconClicked={searchIconClicked}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SecondSidebar;
