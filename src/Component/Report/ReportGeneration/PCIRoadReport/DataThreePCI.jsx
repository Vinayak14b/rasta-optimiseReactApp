import './PCIRoadReport.css'; // Ensure your CSS file is correctly imported
import {
	roadQuality
} from '../Details/RoadDetails';
import RoadRoughnessIndex from '../Details/RoadRoughnessIndex';

export default function DataThreePCI({ detailOfRoad, detailChainage }) {
	const tableStyle = {
		border: '1px solid black',
		borderCollapse: 'collapse',
		width: '100%',
	};

	const thTdStyle = {
		textAlign: 'center',
		border: '1px solid black',
		padding: '3px',
	};

	const getCategoryColor = (category) => {
		switch (category) {
			case 'good':
				return '#029146';
			case 'satisfactory':
				return '#3ab54a';
			case 'fair':
				return '#fad200';
			case 'poor':
				return '#f05a27';
			case 'very poor':
				return '#ee1c25';
			case 'serious':
				return '#be292f';
			default:
				return '#3b3b3b';
		}
	};

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<div>
			<h1 className="w-full flex justify-center items-center font-bold color-blue text-2xl">
				PCI Road Report of Each Road
			</h1>
			<div>
				{detailOfRoad &&
					detailOfRoad.map((road, index) => (
						<div
							key={index}
							className={index !== 0 ? 'page-break' : ''}>
							<br />
							<h2 className="w-full text-xl font-semibold text-center">
								{index + 1}. Road Condition Data For -{' '}
								{road?.roadName}
							</h2>
							<br />

							<h2 className="w-full flex justify-center items-center font-semibold">
								Road Chainage -{' '}
								{`${road?.startChainage}-${road?.endChainage}`}
							</h2>
							<br />
							<div>
								<table style={tableStyle}>
									<thead>
										<tr>
											<th style={thTdStyle}>
												Contractor
											</th>
											<th style={thTdStyle}>Road Name</th>
											<th style={thTdStyle}>
												Road Number
											</th>
											<th style={thTdStyle}>Road Type</th>
											<th style={thTdStyle}>
												Survey Date
											</th>
											<th style={thTdStyle}>
												Survey Done by
											</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style={thTdStyle}>
												{road?.contractorName}
											</td>
											<td style={thTdStyle}>
												{road?.roadName}
											</td>
											<td style={thTdStyle}>
												{road?.roadNo}
											</td>
											<td style={thTdStyle}>
												{road?.roadType}
											</td>
											<td style={thTdStyle}>
												{road?.Date}
											</td>
											<td style={thTdStyle}>
												{road?.satisfiesurveyDoneBy}
											</td>
										</tr>
									</tbody>
								</table>
							</div>

							<br />

							<div>
								<RoadRoughnessIndex />
							</div>

							<br />

							<div>
								<h1 className="font-semibold">ROAD QUALITY</h1>
								<br />

								<table style={tableStyle}>
									<thead>
										<tr>
											<th style={thTdStyle}>Quality</th>
											<th style={thTdStyle}>
												Percent(%)
											</th>
											<th style={thTdStyle}>
												Kilometer(Km)
											</th>
										</tr>
									</thead>
									<tbody>
										{road?.roadQuality.map((row, index) => (
											<tr key={index}>
												<td style={thTdStyle}>
													{row?.quality}
												</td>
												<td style={thTdStyle}>
													{row?.percentage}
												</td>
												<td style={thTdStyle}>
													{row?.km}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<br />

							{/* <div>
								<h1 className="font-semibold">
									DEFECT STATISTICS
								</h1>
								<br />

								<table style={tableStyle}>
									<thead>
										<tr>
											<th style={thTdStyle}>Defect</th>
											<th style={thTdStyle}>
												Count of Defect
											</th>
										</tr>
									</thead>
									<tbody>
										{Object.entries(road?.defects).map(
											([key, value], index) => (
												<tr key={index}>
													<td style={thTdStyle}>
														{key}
													</td>
													<td style={thTdStyle}>
														{value}
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div> */}

							
							{/* 
							<br />
							<div>
								<h1 className="font-semibold">
									ASSET STATISTICS
								</h1>
								<br />

								<table style={tableStyle}>
									<thead>
										<tr>
											<th style={thTdStyle}>Asset</th>
											<th style={thTdStyle}>
												Count of Asset
											</th>
										</tr>
									</thead>
									<tbody>
										{Object.entries(road?.assests).map(
											([key, value], index) => (
												<tr key={index}>
													<td style={thTdStyle}>
														{key}
													</td>
													<td style={thTdStyle}>
														{value}
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div> */}

							{/*
							<br /> 
							<div className="mt-20">
								<PieChart
									series={[
										{
											data: road.roadQuality.map(
												(item) => ({
													id: item.quality,
													value: `${item.percentage}`,
													label: `${item.quality} Condition Road(%) - ${item?.percentage}`,
													color:
														item?.quality === 'Good'
															? '#63AD43'
															: item?.quality ===
															  'Average'
															? '#ff8437'
															: '#FF0000',
												})
											),
											arcLabel: (item) =>
												`${item?.value}%`,
											arcLabelMinAngle: 45,
										},
									]}
									sx={{
										[`& .${pieArcLabelClasses.root}`]: {
											fill: 'white',
											fontWeight: 'bold',
										},
									}}
									{...size}
								/>
							</div> */}

							<br />
							<h2 className="w-full text-xl font-semibold text-center">
								Road Condition Data For -{' '}
								{road?.roadName}
							</h2>
							<br />

							<h2 className="w-full flex justify-center items-center font-semibold">
								Road Chainage -{' '}
								{`${road?.startChainage}-${road?.endChainage}`}
							</h2>
							<br />

							<div>
								<table style={tableStyle}>
									<thead>
										<tr>
											<th style={thTdStyle}>
												Start Chainage
											</th>
											<th style={thTdStyle}>
												End Chainage
											</th>
											<th style={thTdStyle}>PCI Index</th>
											<th style={thTdStyle}>Distance</th>
											<th style={thTdStyle}>
												Start Latitude, Longitude
											</th>
											<th style={thTdStyle}>
												End Latitude, Longitude
											</th>
											<th style={thTdStyle}>Road Type</th>
											<th style={thTdStyle}>Category</th>
											<th style={thTdStyle}>Remark</th>
										</tr>
									</thead>
									<tbody>
										{detailChainage[index]?.data.map(
											(road, index) => (
												<tr key={index}>
													<td style={thTdStyle}>
														{road?.from}
													</td>
													<td style={thTdStyle}>
														{road?.to}
													</td>
													<td style={thTdStyle}>
														{road?.PCI}
													</td>
													<td style={thTdStyle}>
														{road?.Distance} km
													</td>
													<td style={thTdStyle}>
														{
															road[
																'Start Latitude, Longitude'
															]
														}
													</td>
													<td td style={thTdStyle}>
														{
															road[
																'End Latitude, Longitude'
															]
														}
													</td>
													<td style={thTdStyle}>
														{road['Road Type']}
													</td>
													<td
														style={{
															...thTdStyle,
															color: getCategoryColor(
																road?.Category
															),
														}}>
														{capitalizeFirstLetter(
															road?.Category
														)}
													</td>
													<td style={thTdStyle}>
														{road?.Remarks}
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
