import { useState } from 'react';

const ReportComponent = () => {
	const [showDialog, setShowDialog] = useState(false);


	const handleSubmit = () => {
		setShowDialog(true);
	};

	const handleCloseDialog = () => {
		setShowDialog(false);
	};
	return (
		<div className="flex justify-center ml-[2%]">
			<div className="w-1/3 p-6">
				<h1 className="font-poppins text-[30px] font-bold leading-9 text-center">
					Generate Report
				</h1>
				<img
					src="icons/BarIcon.png"
					alt="Report Image"
					className="w-[338px] h-[271px] mt-6 mx-auto"
				/>

				<div className="w-[235px] h-[60px] mx-auto mt-2 bg-gray-300 rounded-tl-[19px] rounded-tr-[19px] flex items-center text-center">
					<span
						className="flex-1"
						style={{
							fontFamily: 'Poppins',
							fontSize: '15px',
							fontWeight: 600,
							lineHeight: '23px',
							letterSpacing: '0em',
						}}>
						Total Kms
					</span>
					<span
						className="flex-1"
						style={{
							fontFamily: 'Poppins',
							fontSize: '15px',
							fontWeight: 600,
							lineHeight: '23px',
							letterSpacing: '0em',
						}}>
						:
					</span>
					<span
						className="flex-1"
						style={{
							fontFamily: 'Poppins',
							fontSize: '15px',
							fontWeight: 600,
							lineHeight: '23px',
							letterSpacing: '0em',
						}}>
						5000
					</span>
				</div>

				<div className="w-[235px] h-[60px] mx-auto mt-2 bg-gray-300 rounded-bl-[19px] rounded-br-[19px] flex items-center text-center">
					<span
						className="flex-1"
						style={{
							fontFamily: 'Poppins',
							fontSize: '15px',
							fontWeight: 600,
							lineHeight: '23px',
							letterSpacing: '0em',
						}}>
						Total Kms
					</span>
					<span
						className="flex-1"
						style={{
							fontFamily: 'Poppins',
							fontSize: '15px',
							fontWeight: 600,
							lineHeight: '23px',
							letterSpacing: '0em',
						}}>
						:
					</span>
					<span
						className="flex-1"
						style={{
							fontFamily: 'Poppins',
							fontSize: '15px',
							fontWeight: 600,
							lineHeight: '23px',
							letterSpacing: '0em',
						}}>
						5000
					</span>
				</div>

				<h1 className="font-poppins text-4xl mt-4 font-bold leading-9 text-center mt-6">
					Network Summary
				</h1>

				<div
					className="mt-8 text-white mx-auto"
					style={{
						width: '186px',
						height: '55px',
						borderRadius: '10px',
						backgroundColor: '#72CB70',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						fontFamily: 'Poppins',
						fontSize: '24px',
						fontWeight: 700,
						fontStyle: 'bold',
						lineHeight: '36px',
						textAlign: 'center',
						color: '#FFFFFF',
					}}>
					Good
				</div>

				<h1
					className="text-primary font-Poppins text-[23px] mt-[20px] font-bold leading-35 tracking-0 text-center underline"
					style={{ fontStyle: 'bold' }} onClick={()=>{navigate("/detailed-report")}}>
					View Detailed Summary
				</h1>
			</div>

			<div className="w-2/3 p-6 relative">
				{/* Content for the second column goes here */}
				<h1 className="font-poppins text-[30px] font-bold leading-9 text-left">
					Fill Missing Details
				</h1>
				<div className="w-[766px] h-[459px] mt-12 flex flex-col justify-evenly left-585 rounded-lg bg-gray-200 p-4 font-poppins text-white">
					<div className="flex justify-between items-center">
						{/* First Row */}
						<button className="w-[194px] h-[43px] rounded-md bg-gray-400 focus:outline-none focus:bg-primary">
							State Wise
						</button>
						<button className="w-[194px] h-[43px] rounded-md bg-gray-400 focus:outline-none focus:bg-primary">
							Region Wise
						</button>
						<button className="w-[194px] h-[43px] rounded-md bg-gray-400 focus:outline-none focus:bg-primary">
							Circle Wise
						</button>
					</div>
					<div className="flex justify-between items-center">
						{/* Second Row */}
						<button className="w-[194px] h-[43px] rounded-md bg-gray-400 focus:outline-none focus:bg-primary">
							Division Wise
						</button>
						<button className="w-[194px] h-[43px] rounded-md bg-gray-400 focus:outline-none focus:bg-primary">
							Sub-Division Wise
						</button>
						<button className="w-[194px] h-[43px] rounded-md bg-gray-400 focus:outline-none focus:bg-primary">
							Road Wise
						</button>
					</div>

					<div className="flex justify-center items-center align-middle">
						<button
							className="w-[310px] h-[43px] rounded-md bg-primary focus:outline-none "
							onClick={handleSubmit}>
							Submit
						</button>
					</div>

					{/* New content below */}
				</div>

				<h1 className="mt-6 font-poppins text-2xl font-semibold leading-6 tracking-tight text-left">
					Road Network Health Indicator
				</h1>
				<img className="w-[766px] mt-12" src="icons/proressBar.png" />
			</div>

			{/* New content below */}
			{showDialog && (
				<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
					<div className="bg-white rounded-lg p-8 relative">
						{/* Close button inside the dialog */}
						<button
							className="absolute top-4 right-4 text-gray-600 bg-red-600"
							onClick={handleCloseDialog}>
							<img
								src="icons/close.png"
								alt="Close Icon"
								className="w-4 h-4"
							/>
						</button>

						{/* Dialog content */}
						<h1 className="text-red-500 text-2xl font-semibold mb-4">
							Select The Report{' '}
						</h1>
						{/* Add more content or icons as needed */}
						<div className="grid grid-cols-2 grid-rows-3 gap-4">
							<button className="h-[43px] rounded-md bg-primary focus:outline-none focus:bg-primary">
								Button 2
							</button>
							<button className="h-[43px] rounded-md bg-primary focus:outline-none focus:bg-primary">
								Button 3
							</button>
							<button className="h-[43px] rounded-md bg-primary focus:outline-none focus:bg-primary">
								Button 4
							</button>
							<button className="h-[43px] rounded-md bg-primary focus:outline-none focus:bg-primary">
								Button 5
							</button>
							<button className="h-[43px] rounded-md bg-primary focus:outline-none focus:bg-primary">
								Button 6
							</button>
							<button className="h-[43px] rounded-md bg-primary focus:outline-none focus:bg-primary">
								Button 6
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ReportComponent;
