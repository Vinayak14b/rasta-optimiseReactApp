import React, { useState } from 'react';
import ShowPrevAssetsDefects from './ShowPrevAssetsDefects';
import FilterAssets from './FilterAssets';
import FilterDefects from './FilterDefects';
import { selectImageResponse2 } from '../../slices/imageResponseSlice';
import { useSelector } from 'react-redux';

const RightComponent = ({ imageResponse1 }) => {
	const [selectedTab, setSelectedTab] = useState('Assets');
	const { asset, defect } = useSelector(selectImageResponse2);

	const handleTabClick = (tab) => {
		setSelectedTab(tab);
	};

	const getTotalDefectCount = () => {
		return Object.values(defect).reduce((total, count) => total + count, 0);
	};

	const getTotalAssetCount = () => {
		return Object.values(asset).reduce((total, count) => total + count, 0);
	};

	const totalDefectCount = getTotalDefectCount();
	const totalAssetsCount = getTotalAssetCount();

	return (
		<div className="  w-full h-full overflow-hidden">
			<div
				className=" flex flex-col relative mt-2  gap-y-2"
				style={{
					width: 'full',
					height: '80%',
					// border: '2px solid yellow',
				}}>
				<div className="flex">
					<div
						className=" mx-auto flex 
					 bg-orange-400 rounded-xl px-2 py-2 gap-x-8">
						<div
							className={`  rounded-xl px-4 font-poppins font-semibold cursor-pointer ${
								selectedTab === 'Assets'
									? 'text-white transition-all 200 ease-linear bg-red-600'
									: 'text-black'
							} `}
							onClick={() => handleTabClick('Assets')}>
							Assets ( {totalAssetsCount})
						</div>
						<div
							className={`  rounded-xl px-4 font-poppins font-semibold cursor-pointer ${
								selectedTab === 'Defects'
									? 'text-white transition-all 200 ease-linear bg-red-600'
									: 'text-black'
							} `}
							onClick={() => handleTabClick('Defects')}>
							Defects ( {totalDefectCount} )
						</div>
					</div>
				</div>
				<div
					className="w-full px-4 flex-grow overflow-auto"
					style={{
						borderTop: '2px solid black',
						borderBottom: '2px solid black',
						flexGrow: 1,
					}}>
					{selectedTab == 'Assets' && (
						<>
							<FilterAssets />
						</>
					)}
					{selectedTab == 'Defects' && (
						<>
							<FilterDefects />
						</>
					)}
				</div>
			</div>
			<div
				className="z-10 px-5"
				style={{
					width: 'full',
					height: '20%',
					// border: '2px solid green',
				}}>
				<p className="text-sm text-center">Previously Detected</p>
				<div className="border-[1px] mx-auto border-black w-[95%]"></div>
				<ShowPrevAssetsDefects imageResponse1={imageResponse1} />
			</div>
		</div>
	);
};

export default RightComponent;
