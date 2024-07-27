import React from 'react';

const ShowPrevAssetsDefects = ({ imageResponse1 }) => {
	return (
		<div className="flex  overflow-hidden px-2" style={{ width: 'full' }}>
			<div
				style={{
					width: '50%',
					height: 'full',
					// border: '2px solid purple',
				}}>
				<p>Assets :-</p>
				{imageResponse1?.asset &&
				Object.keys(imageResponse1.asset).length > 0 ? (
					Object.entries(imageResponse1.asset).map(
						([key, value], index) => (
							<p key={index} className="text-xs">
								{key} : {value}
							</p>
						)
					)
				) : (
					<p className="ml-3 text-sm">No assets</p>
				)}
			</div>
			<div className="w-[2px] h[80px] border-[1px] mt-1 mr-4 border-black"></div>
			<div
				style={{
					width: '50%',
					height: 'full',
					// border: '2px solid pink',
				}}>
				<p>Defects :-</p>
				{imageResponse1?.defect &&
				Object.keys(imageResponse1.defect).length > 0 ? (
					Object.entries(imageResponse1.defect).map(
						([key, value], index) => (
							<p key={index} className="text-xs">
								{key} : {value}
							</p>
						)
					)
				) : (
					<p className="ml-3 text-sm">No Defects</p>
				)}
			</div>
		</div>
	);
};

export default ShowPrevAssetsDefects;
