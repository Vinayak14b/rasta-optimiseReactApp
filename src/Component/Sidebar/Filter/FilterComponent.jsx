import { useState } from 'react';
import Points from './Condition/Points';
import Segments from './Condition/Segments';
import RoadFeatures from './Feature/RoadFeatures';
import RoadAssets from './Feature/RoadAssets';

export const FilterComponent = (isOpen) => {
	const [isHovered, setIsHovered] = useState(false);
	const [selectedTab, setSelectedTab] = useState('conditions');
	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	return (
		<div
			id="second-sidebar-mini"
			className={`z-2 hs-overlay transition-all duration-300 fixed top-0 start-0 bottom-0 z-[1] w-80 right-${80} bg-orange-500 border-e border-gray-200 lg:block lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700  ${
				isOpen ? 'open' : 'closed'
			}`}
			style={{
				left: isOpen ? `${5}rem` : `-${80}rem`,
				overflowY: 'scroll',
				maxHeight: '100vh',
				backgroundColor: '#ffffff',
			}}>
			<style>
				{`
        /* Hide the scrollbar */
        #second-sidebar-mini::-webkit-scrollbar {
          width: 0rem; /* Set the width of the scrollbar */
          height:0rem;
        }

        /* Handle */
        #second-sidebar-mini::-webkit-scrollbar-thumb {
          background: transparent; /* Set the color of the scrollbar handle */
        }

        /* Handle on hover */
        #second-sidebar-mini::-webkit-scrollbar-thumb:hover {
          background: #555; /* Set the color of the scrollbar handle on hover */
        }
      `}
			</style>
			<div className="bg-white">
				<img
					className="px-16 py-4 aspect-auto"
					src="rasta-ai.png"
					alt="Search Icon"
				/>
			</div>
			<div className="z-[20] bg-white">
				<div
					className="p-5 mx-2 rounded-lg border bg-orange z-10 bg-[#fe6100] "
					style={{
						backgroundColor: '#fe6100',
						borderRadius: '20px',
					}}>
					<p className="font-bold text-white pb-3 font-inter">
						Filters
					</p>

					<p
						className="text-sm text-white font-inter"
						style={{ fontSize: '12px' }}>
						Filters through segments and points and only view the
						conditions you are interested in.
					</p>
				</div>
			</div>

			<div className="flex bg-white text-center mt-3">
				<div
					onClick={() => handleTabClick('conditions')}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					className={`cursor-pointer text-[#C7C7C7] font-poppins flex-1 p-2 text-center font-semibold ${
						selectedTab === 'conditions'
							? 'text-orange-500  transition-all 200 ease-linear'
							: 'text-[#C7C7C7]'
					}`}>
					<p className="hover:underline hover:underline-offset-8">
						Conditions
					</p>

					{/* <div
						class={` h-0 mb-3 gap-0 mx-auto hover:w-full border-solid border-t-2 border-orange-500 border-opacity-0 ${
							selectedTab === 'conditions' ? 'w-full' : 'w-0'
						}`}></div> */}
				</div>
				<div className="mx-2"></div>
				<div
					onClick={() => handleTabClick('features')}
					className={`cursor-pointer  font-poppins font-semibold flex-1 p-2 text-center ${
						selectedTab === 'features'
							? 'text-orange-500 '
							: 'text-[#C7C7C7]'
					} transition-all 200 ease-in-out`}>
					<div className="flex flex-col">
						<p className="hover:underline hover:underline-offset-8">
							Features
						</p>
						{/* <div
							class={` h-0 mb-3 gap-0 mx-auto hover:w-full border-solid border-t-2 border-orange-500 border-opacity-0 ${
								selectedTab === 'features' ? 'w-full' : 'w-0'
							}`}></div> */}
					</div>
				</div>
			</div>
			{selectedTab === 'conditions' && (
				<div className="flex justify-center items-center flex-col transition-all 200 ease-in-out">
					<div className="w-full h-1 pb-10  mb-5 transition-all 200 ease-in-out">
						<Points />
						<div className="h-0 my-6 gap-0 mx-auto w-[91%] border-solid border-t-2 border-orange-500 border-opacity-0"></div>

						<Segments />
						{/* <div className="h-0 my-6 gap-0 mx-auto w-[91%] border-solid border-t-2 border-white border-opacity-0"></div> */}

						{/* <OtherConditions /> */}
					</div>
				</div>
			)}
			{selectedTab === 'features' && (
				<div className="w-full h-1 pb-10  mb-5 transition-all 200 ease-in-out">
					<RoadFeatures />
					{/* <div class="h-0 my-6 gap-0 mx-auto w-[91%] border-solid border-t-2 border-orange-500 border-opacity-0"></div> */}

					<RoadAssets />
				</div>
			)}
		</div>
	);
};
