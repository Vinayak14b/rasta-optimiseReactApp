
export default function DataTwo({ listOfRoad }) {
  
	const tableStyle = {
		border: '1px solid black',
		borderCollapse: 'collapse',
		width: '100%',
	};

	const thTdStyle = {
		textAlign: 'center',
		border: '1px solid black',
		padding: '8px',
		// textAlign: "left",
	};

	return (
		<>
			<div>
				<h2 className="mb-5 text-2xl font-bold">List of Roads</h2>
				<table style={tableStyle}>
					<thead>
						<tr>
							<th style={thTdStyle}>Sr. No.</th>
							<th style={thTdStyle}>Jurisdiction</th>
							<th style={thTdStyle}>Road Number</th>
							<th style={thTdStyle}>Road Name</th>
							<th style={thTdStyle}>Start Chainage</th>
							<th style={thTdStyle}>End Chainage</th>
							<th style={thTdStyle}>Distance</th>
							<th style={thTdStyle}>Survey Type</th>
							<th style={thTdStyle}>Date of Survey</th>
							<th style={thTdStyle}>Road Type</th>
						</tr>
					</thead>
					<tbody>
						{listOfRoad && listOfRoad.map((road, index) => (
							<tr key={index}>
								<td style={thTdStyle}>{index + 1}</td>
								<td style={thTdStyle}>{road.Jurisdiction}</td>
								<td style={thTdStyle}>{road.roadNo}</td>
								<td style={thTdStyle}>{road.roadName}</td>
								<td style={thTdStyle}>{road.startChainage}</td>
								<td style={thTdStyle}>{road.endChainage}</td>
								<td style={thTdStyle}>{road.distance}</td>
								<td style={thTdStyle}>
									{road.isAscending === "0"
										? 'Descending'
										: 'Ascending'}
								</td>
								<td style={thTdStyle}>{road.Date}</td>
								<td style={thTdStyle}>{road.roadType}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
