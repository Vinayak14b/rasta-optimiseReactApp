import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SmallSidebar = ({ isOpen, clickedButton, chartData }) => {
	const secondSidebarWidth = 25;
	const firstSidebarWidth = 10;
	let road_name;
	const routeData = useSelector((state) => state.getaidata.getaidata);
	if (routeData) {
		if (routeData.aiOutput && routeData.aiOutput.length > 0) {
			road_name = routeData.aiOutput[0].roadName;
		} else {
			road_name = 'No Road Selected';
		}
	} else {
		road_name = 'No Road Selected';
	}
	const data = [
		{ value: 10, label: 'B' },
		{ value: 15, label: 'C' },
		{ value: 20, label: 'D' },
		{ value: 30, label: 'A' },
	];

	const size = {
		width: 300,
		height: 300,
	};

	const forPieChart = ['Inventory Condition', 'Road Condition'];
	const forTable = [
		'Major Bridges',
		'Minor Bridges',
		'Culverts',
		'Count of Potholes on Road',
	];
	const notIncluded = ['Counter Roads to Repair'];

	if (notIncluded.includes(clickedButton)) {
		return null;
	}

	return (
		<div
			id="second-sidebar-mini"
			className={` transition-all duration-300 fixed top-40 end-0 bottom-0 w-[350px] right-${secondSidebarWidth} lg:block lg:translate-x-0 bg-white ${
				isOpen ? 'open' : 'closed'
			}`}
			style={{
				right: isOpen
					? `${firstSidebarWidth}rem`
					: `-${secondSidebarWidth}rem`,
				overflowY: 'scroll',
				maxHeight: '60vh',
				borderRadius: '20px',
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
          background: #000; /* Set the color of the scrollbar handle on hover */
        }
      `}
			</style>
			<div className="z-[1]">
				<>
					{forPieChart.includes(clickedButton) ? (
						<div className="flex items-center px-2 py-2 justify-center flex-col">
							<div className="text-lg mt-5 font-bold">
								{clickedButton}
							</div>
							<div
								style={{
									width: '300px',
									height: '300px',
								}}>
								<PieChart
									series={[
										{
											arcLabel: (item) => `${item.value}`,
											arcLabelMinAngle: 45,
											data,
										},
									]}
									sx={{
										[`& .${pieArcLabelClasses.root}`]: {
											fill: 'white',
											fontWeight: 'bold',
										},
									}}
									{...size}
									// slotProps={{ legend: { hidden: true } }}
								/>
							</div>

							<div className="mt-5 font-bold underline">
								<Link to="/rasta/inventory">view details</Link>
							</div>
						</div>
					) : forTable.includes(clickedButton) ? (
						<div className="flex items-center px-2 py-2 justify-center flex-col">
							<div
								className="text-red-600 font-bold"
								style={{ fontSize: '50px' }}>
								{clickedButton ===
									'Count of Potholes on Road' &&
								routeData.aiOutput &&
								routeData.aiOutput.length > 0
									? routeData.aiOutput[0].total_detected
											.pothole || '0'
									: '0'}{' '}
							</div>
							<div className="text-lg font-bold">
								{clickedButton}
							</div>
							<div
								style={{
									height: '230px',
									width: '90%',
								}}
								className="flex justify-between mt-16">
								<div className="">
									<div className="underline">S no.</div>
									<table>
										<tr>
											<td>1</td>
										</tr>
									</table>
								</div>
								<div className="">
									<div className="underline">
										Name of Road.
									</div>
									<table>
										<tr>
											<td>{road_name}</td>
										</tr>
									</table>
								</div>
								<div className="">
									<div className="underline">Chainage</div>
									<table>
										<tr>
											<td>
												{clickedButton ===
													'Count of Potholes on Road' &&
												routeData.aiOutput &&
												routeData.aiOutput.length > 0
													? routeData.aiOutput[0]
															.startChainage !==
													  undefined
														? routeData.aiOutput[0]
																.startChainage
														: '0'
													: '0'}
											</td>
										</tr>
									</table>
								</div>
							</div>
						</div>
					) : (
						<div>nothing</div>
					)}
				</>
			</div>
		</div>
	);
};

export default SmallSidebar;
