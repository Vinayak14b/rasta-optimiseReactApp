const RoadConditionIndex = () => {
	return (
		<div className="bg-white w-[302px] h-screen fixed right-0 flex flex-col">
			<div className="bg-primary h-[100px] flex items-center justify-center">
				<p
					className="font-inter text-white
   text-16 font-bold leading-19 tracking-0 text-left">
					Road Condition Index (RCI)
				</p>
			</div>
			<div className="flex flex-col items-center justify-center">
				<img
					className="mt-12"
					src="icons/chart.png"
					alt="Chart Icon"
					style={{
						width: '245px',
						height: '137px',
						marginTop: '170px',
						position: 'absolute',
					}}
				/>
				<img
					className="mt-6"
					src="icons/staticsbar.png"
					alt="Statistics Bar Icon"
					style={{
						width: '55.5px',
						height: '12px',
						marginTop: '390px',
						marginLeft: '-190px', // Add left margin to position it to the left

						position: 'absolute',
					}}
				/>
			</div>
			<div className="flex flex-row mt-[220px]">
				{/* First column */}
				<div className="w-[152px] h-[53px] flex justify-center items-center bg-primary text-white rounded-md m-2">
					Fair Class
				</div>
				{/* Second column */}
				<div className="w-[152px] h-[53px] flex justify-center items-center bg-gray-300 text-black rounded-md m-2">
					861M Length
				</div>
			</div>

			<div className="flex flex-row mt-4 justify-center items-center">
				{/* First column with image */}
				<div className="ml-2">
					{/* Your image goes here */}
					<img src="locations.png" className="w-10 " />
				</div>

				{/* Second column with two rows */}
				<div className="flex flex-col justify-center ">
					{/* First row with h3 text */}
					<h3 className="text-xs font-bold ml-4 font-inter text-left ">
						Location
					</h3>{' '}
					{/* Second row with p text */}
					<p className="text-xs font-bold font-inter text-center ">
						Purva Summit, Whitefields, HITEC City, Hyderabad
					</p>
				</div>
			</div>
			<div className=" w-full mt-2 h-0.5 bg-black"></div>

			<div className="flex flex-row mt-4 justify-center items-center">
				{/* First column with image */}
				<div className="ml-2">
					{/* Your image goes here */}
					<img src="calenders.png" className="w-10 " />
				</div>

				{/* Second column with two rows */}
				<div className="flex flex-col justify-center ">
					{/* First row with h3 text */}
					<h3 className="text-xs font-bold ml-4 font-inter text-left ">
						Date & Time
					</h3>{' '}
					{/* Second row with p text */}
				</div>
			</div>
			<div className=" w-full mt-2 h-0.5 bg-black"></div>

			<div className="flex flex-row mt-4 justify-center items-center">
				{/* First column with image */}
				<div className="ml-2">
					{/* Your image goes here */}
					<img src="rightd.png" className="w-10 " />
				</div>

				{/* Second column with two rows */}
				<div className="flex flex-col justify-center ">
					{/* First row with h3 text */}
					<h3 className="text-xs font-bold ml-4 font-inter text-left ">
						Direction
					</h3>{' '}
					{/* Second row with p text */}
				</div>
			</div>
			<div className=" w-full mt-2 h-0.5 bg-black"></div>

			<div className="flex flex-row mt-4 justify-center items-center">
				{/* First column with image */}
				<div className="ml-2">
					{/* Your image goes here */}
					<img src="locations.png" className="w-10 " />
				</div>

				{/* Second column with two rows */}
				<div className="flex flex-col justify-center ">
					{/* First row with h3 text */}
					<h3 className="text-xs font-bold ml-4 font-inter text-left ">
						Latitude & Longitude
					</h3>{' '}
					{/* Second row with p text */}
				</div>
			</div>
			<div className=" w-full mt-2 h-0.5 bg-black"></div>
		</div>
	);
};

export default RoadConditionIndex;
