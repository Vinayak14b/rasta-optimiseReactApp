import { useState } from 'react';
import InnerSideBar from './InnerSideBar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const RoadClassification = () => {
	const { userType } = useSelector((state) => state.auth);

	const images = [
		'icons/alligator.png',
		'icons/lonitudinal.png',
		'icons/transverse.png',
		'icons/speedbreaker.png',
		'icons/ravelling.png',
		'icons/lane.png',
		'icons/pothole.png',
		'icons/manhole.png',
	];

	const markersData = [
		{ color: '#63AD43', barcolor: '#a2e685', title: 'Good', range: 'No Defects detected' },
		{ color: '#FFD100', barcolor: '#f0db7d', title: 'Average', range: '20% - 50%' },
		{ color: '#FF0000', barcolor: '#db7979', title: 'Bad', range: '50% - Extreme Level' },
		{ color: '#868686', barcolor: '#B1B1B1', title: 'Speed Breakers', range: 'All Speed Breakers' },
		{ color: '#000000', barcolor: '#8b8b8b', title: 'Manholes', range: 'All Manholes' },
	];

	const statusData = [
		{ color: '#029146', title: 'Good', range: '8.5-10.0' },
		{ color: '#3AB54A', title: 'Satisfactory', range: '7.0-8.5' },
		{ color: '#FAD200', title: 'Fair', range: '5.5-7.0' },
		{ color: '#F05A27', title: 'Poor', range: '4.0-5.5' },
		{ color: '#EE1C25', title: 'Very Poor', range: '2.5-4.0' },
		{ color: '#BE292F', title: 'Serious', range: '1.0-2.5' },
		{ color: '#3B3B3B', title: 'Failed', range: '0-1.0' },
		{ color: '#868686', title: 'Speed Breakers', range: '' },
		{ color: '#E4E4E4', title: 'Manholes', range: '' },
	];

	const [activePage, setActivePage] = useState('road');

	const handlePageChange = (page) => {
		setActivePage(page);
	};

	const customFontStyle = {
		fontFamily: 'Poppins',
	};
	return (
		<>
			{/* <InnerSideBar/> */}
			{userType === 'JE' ? (
				<Sidebar activePage="RoadClassification" />
			) : (
				<InnerSideBar
					setActivePage={handlePageChange}
					activePage={activePage}
				/>
			)}

			<div className="m-12 ml-[140px]">
				<h1
					className="text-4xl font-bold leading-60 tracking-normal text-center mb-3"
					style={customFontStyle}>
					Road Classifications
				</h1>
				<div className="shadow-2xl rounded-lg p-6">
					<div className="grid grid-rows-2 grid-cols-4">
						{images.map((image, index) => (
							<div
								key={image}
								className={`border border-orange-500 p-4 flex items-center justify-center ${
									index < 4
										? `border-t-0 ${
												index === 0 ? 'border-l-0' : ''
										  }`
										: `border-b-0 ${
												index === 3 ? 'border-r-0' : ''
										  } ${
												index === 4 ? 'border-l-0' : '' // Remove left border for the first column in the second row
										  }`
								}`}>
								<img
									src={image}
									alt={``}
									className="w-[151px] h-[173px]" // Set the width and height of each image
								/>
							</div>
						))}
					</div>
				</div>

				<h1
					className="font-Poppins mt-6 text-4xl font-bold leading-60 tracking-normal text-center"
					style={customFontStyle}>
					Markers
				</h1>

				{markersData.map((status, index) => (
					<div
						key={index}
						className={`flex justify-center items-center mt-8`}>
						<div
							style={{ backgroundColor: status.color }}
							className={`w-10 h-10 bg-[${status.color}] rounded-full`}></div>
						<div className="ml-4 w-20">{status.title}</div>
						<div
							style={{ backgroundColor: status.barcolor }}
							className={`ml-12 w-[60%] h-10 bg-[${status.barcolor}] flex items-center justify-center rounded`}>
							<h3 className="font-poppins text-base font-medium leading-6 tracking-normal text-center">
								{status.range}
							</h3>
						</div>
					</div>
				))}

				<h1
					className="font-Poppins mt-[15vh] text-4xl font-bold leading-60 tracking-normal text-center"
					style={customFontStyle}>
					Pavement Condition Index
				</h1>
				<h1 className="font-inter mt-0 text-sm font-normal leading-60 tracking-normal text-center">
					Recommended PCI values based on ASTM d6433-20;standard
					practice for road PCI
				</h1>

				{statusData.map((status, index) => (
					<div
						key={index}
						className={`flex justify-center items-center mt-8`}>
						<div
							style={{ backgroundColor: status.color }}
							className={`w-10 h-10 bg-[${status.color}] rounded-full`}></div>
						<div className="ml-4 w-20">{status.title}</div>
						<div
							style={{ backgroundColor: status.color }}
							className={`ml-12 w-[60%] h-10 bg-[${status.color}] flex items-center justify-center rounded`}>
							<h3 className="text-white font-poppins text-xl font-bold leading-6 tracking-normal text-center">
								{status.range}
							</h3>
						</div>
					</div>
				))}

				<h1
					className="font-Poppins mt-20  font-bold leading-60 tracking-normal text-center"
					style={{ fontSize: '40px', fontFamily: 'Poppins' }}>
					International Roughness Index/Roughness Index
				</h1>
				<h1
					className="font-Poppins mt-0 text-1xl font-normal leading-60 tracking-normal text-center"
					style={{ fontSize: '16px', fontFamily: 'Inter' }}>
					Recommended Road Roughness (IRI/RI) values based on IRC
					SP16-2004/2019: standard practice for road roughness{' '}
				</h1>
				<div className="flex justify-center mt-6">
					<div className="w-8 h-8 bg-[#029146] rounded-full"></div>
					<div
						className="ml-4 w-20 mt-1"
						style={{ fontFamily: 'inter' }}>
						Good
					</div>

					<div className="w-8 h-8 bg-[#F05A27] rounded-full ml-8"></div>
					<div
						className="ml-4 w-20 mt-1"
						style={{ fontFamily: 'inter' }}>
						Average
					</div>

					<div className="w-8 h-8 bg-[#EE1C25] rounded-full ml-8"></div>
					<div
						className="ml-4 w-20 mt-1"
						style={{ fontFamily: 'inter' }}>
						Bad
					</div>
				</div>
				<h1
					className="font-Poppins mt-12 text-2xl font-bold leading-60 tracking-normal text-center w-[650px] ml-[25%]"
					style={customFontStyle}>
					1. Maximum Permissible Values of Roughness for Expressway,
					National Highways and State Highways
				</h1>

				<table className="w-full mt-6">
					<thead>
						<tr>
							<th
								className="font-semibold font-poppins border border-gray-500"
								rowSpan="2">
								Sr.No.
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								rowSpan="2">
								Type of Surface
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="6">
								Condition of Road Surface
							</th>
						</tr>
						<tr>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#029146' }}>
								Good
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#F05A27' }}>
								Fair
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#EE1C25' }}>
								Poor
							</th>
						</tr>
						<tr>
							<th className="border border-gray-500"></th>
							<th className="border border-gray-500"></th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#029146' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#029146' }}>
								IRI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#F05A27' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#F05A27' }}>
								IRI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#EE1C25' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#EE1C25' }}>
								IRI
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								1
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Bituminous(BC,SMA,SDBC)
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 1800{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2.55
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								1800-2400
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2.55-3.30
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 2400
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3.30
							</td>
						</tr>
						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Cemented
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2000{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2.81
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2000-2400
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2.81-3.30
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 2400
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3.30
							</td>
						</tr>
						{/* Add more rows as needed */}
					</tbody>
				</table>

				<div
					className="font-Poppins mt-6 text-1xl font-normal leading-60 tracking-normal text-center w-[825px] ml-[18%]"
					style={customFontStyle}>
					<div style={{ display: 'flex', alignItems: 'flex-start' }}>
						<b style={{ color: '#000' }}>Note: </b>
						<div
							style={{
								display: 'inline',
								fontWeight: '600',
								color: '#000',
							}}>
							In case of four-lane divided and above corridors,
							roughness measurement shall be carried out using
							Class 1 equipment. For other corridors, the
							roughness measurement shall be carried out using
							Class 1/Class 2 or Class 3 equipment depending upon
							survey speed/geometric suitability.
						</div>
					</div>
				</div>

				<h1
					className="font-Poppins mt-8 text-2xl font-bold leading-60 tracking-normal text-center w-[650px] ml-[25%]"
					style={customFontStyle}>
					2. Maximum Permissible Values of Roughness for Major
					District Roads and Other District Roads
				</h1>

				<table className="w-full mt-6">
					<thead>
						<tr>
							<th
								className="font-semibold font-poppins border border-gray-500"
								rowSpan="2">
								Sr.No.
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								rowSpan="2">
								Type of Surface
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="6">
								Condition of Road Surface
							</th>
						</tr>
						<tr>
							{/* <th className="border border-gray-500"></th>
							<th className="border border-gray-500"></th> */}
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#029146' }}>
								Good
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#F05A27' }}>
								Fair
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#EE1C25' }}>
								Poor
							</th>
						</tr>
						<tr>
							<th className="border border-gray-500"></th>
							<th className="border border-gray-500"></th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#029146' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#029146' }}>
								IRI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#F05A27' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#F05A27' }}>
								IRI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#EE1C25' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#EE1C25' }}>
								IRI
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								1
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Surface Dressing
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3000{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 4.03
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3000-3800
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								4.03-4.98
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3800
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 4.98
							</td>
						</tr>
						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Cemented
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2800{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3.79
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2800-3500
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3.79-4.62
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3500
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 4.62
							</td>
						</tr>

						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Mix Seal Surfacing
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2600{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3.55
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2600-3200
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3.55-4.27
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3200
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 4.27
							</td>
						</tr>

						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								4
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Semi Dense Bituminous Concrete
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2200{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3.05
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2200-3000
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3.05-4.03
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3000
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 4.03
							</td>
						</tr>

						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								5
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Bituminous Concrete
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2000{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2.81
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2000-2600
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2.81-3.55
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 2600
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3.55
							</td>
						</tr>

						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								6
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Cement Concrete
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2200{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3.05
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2200-2600
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3.05-3.55
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 2600
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3.55
							</td>
						</tr>
						{/* Add more rows as needed */}
					</tbody>
				</table>

				<div
					className="font-Poppins mt-6 text-1xl font-normal leading-60 tracking-normal text-center w-[800px] ml-[18%]"
					style={customFontStyle}>
					<div style={{ display: 'flex', alignItems: 'flex-start' }}>
						<b style={{ color: '#000' }}>Note: </b>
						<div
							style={{
								display: 'inline',
								fontWeight: '600',
								color: '#000',
							}}>
							Roughness measurements shall be carried out using
							Class 1/Class 2 or Class 3 equipment on these
							categories of roads depending upon survey
							speed/geometric suitability.{' '}
						</div>
					</div>
				</div>

				<h1
					className="font-Poppins mt-8 text-2xl font-bold leading-60 tracking-normal text-center "
					style={customFontStyle}>
					3. Maximum Permissible Values of Roughness for Village Roads
				</h1>

				<table className="w-full mt-6 font-semibold font-poppins">
					<thead className="font-semibold font-poppins ">
						<tr className="font-semibold font-poppins ">
							<th
								className="font-semibold font-poppins border border-gray-500"
								rowSpan="2">
								Sr.No.
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								rowSpan="2">
								Type of Surface
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="6">
								Condition of Road Surface
							</th>
						</tr>
						<tr>
							{/* <th className="border border-gray-500" ></th>
							<th className="border border-gray-500"></th> */}
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#029146' }}>
								Good
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#F05A27' }}>
								Fair
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								colSpan="2"
								style={{ color: '#EE1C25' }}>
								Poor
							</th>
						</tr>
						<tr>
							<th className="border border-gray-500"></th>
							<th className="border border-gray-500"></th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#029146' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#029146' }}>
								IRI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#F05A27' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#F05A27' }}>
								IRI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#EE1C25' }}>
								RI
							</th>
							<th
								className="font-semibold font-poppins border border-gray-500"
								style={{ color: '#EE1C25' }}>
								IRI
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								1
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Surface Dressing
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3200{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 4.27
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3200-3800
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								4.27-4.98
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3800
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 4.98
							</td>
						</tr>
						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Cemented
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3000{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 4.03
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3000-3500
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								4.03-4.62
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3500
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 4.62
							</td>
						</tr>

						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Mix Seal Surfacing
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2800{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3.79
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2800-3200
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3.79-4.27
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3200
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 4.27
							</td>
						</tr>

						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								4
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Semi Dense Bituminous Concrete
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2400{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3.30
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2400-3000
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3.30-4.03
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3000
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 4.03
							</td>
						</tr>

						<tr>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								5
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#000',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								Cement Concrete
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 2200{' '}
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#029146',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								{' '}
								&lt; 3.05
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								2200-2600
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#F05A27',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								3.05-3.55
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 2600
							</td>
							<td
								className="border border-gray-500"
								style={{
									color: '#EE1C25',
									textAlign: 'center',
									fontFamily: 'Poppins',
									// fontSize: "27px",
									fontStyle: 'normal',
									fontWeight: '600',
									lineHeight: 'normal',
								}}>
								&gt; 3.55
							</td>
						</tr>
						{/* Add more rows as needed */}
					</tbody>
				</table>

				<div
					className="font-Poppins mt-6 text-1xl font-normal leading-60 tracking-normal text-center w-[800px] ml-[18%]"
					style={customFontStyle}>
					<div style={{ display: 'flex', alignItems: 'flex-start' }}>
						<b style={{ color: '#000' }}>Note: </b>
						<div
							style={{
								display: 'inline',
								fontWeight: '600',
								color: '#000',
							}}>
							Roughness measurements shall be carried out using
							Class 1/Class 2 or Class 3 equipment on these
							categories of roads depending upon survey
							speed/geometric suitability.{' '}
						</div>
					</div>
				</div>

				<h1
					className="font-Poppins mt-[15vh] text-4xl font-bold leading-60 tracking-normal text-center"
					style={customFontStyle}>
					Road Signs
				</h1>
				<h1
					className="font-Poppins mt-0 text-1xl font-normal leading-60 tracking-normal text-center"
					style={{ fontSize: '16px', fontFamily: 'Inter' }}>
					Recommended Signage Boards Evaluation based on IRC 067-2012
					And book on road safety signage and signs by MORTH
				</h1>

				<div style={{ textAlign: 'center' }}>
					<img
						src="icons/roadsigns.png" // replace with the actual path to your image
						alt=" "
						className="w-[80%] h-auto"
						style={{ margin: '0 auto' }}
					/>
				</div>
			</div>
		</>
	);
};

export default RoadClassification;