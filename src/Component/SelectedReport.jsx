import { useState } from 'react';

const SelectedReport = () => {
	const [selectedItems, setSelectedItems] = useState([]);
	const tableData = [
		{ id: 1, name: 'Report 1', Last: '21.07.23' },
		{ id: 2, name: 'Report 2', Last: '06.06.23' },
		// Add more data as needed
	];
	const handleCheckboxChange = (itemId) => {
		const updatedSelectedItems = [...selectedItems];
		const index = updatedSelectedItems.indexOf(itemId);

		if (index === -1) {
			updatedSelectedItems.push(itemId);
		} else {
			updatedSelectedItems.splice(index, 1);
		}

		setSelectedItems(updatedSelectedItems);
	};

	return (
		<div className="flex mt-[5%]  m-6  ml-[120px]">
			<div className="w-[50%]">
				<h1 className="font-Poppins text-[26px] font-bold leading-39 mb-4 tracking-0 text-left">
					Selected Report
				</h1>

				<table className="w-full  text-center rounded-xl  shadow-lg">
					<thead>
						<tr className="bg-ffddc7 text-center justify-center items-center">
							<th className="px-4 py-2 font-poppins text-base font-bold leading-6 text-center tracking-tight ">
								Report Name
							</th>
							<th className="px-4 py-2 font-poppins text-center text-base font-bold leading-6 tracking-tight ">
								Prics(Rs/$)
							</th>
							<th className="px-4 py-2 font-poppins text-base font-bold leading-6 tracking-tight text-center">
								Select Options{' '}
							</th>
						</tr>
					</thead>
					<tbody>
						{tableData.map((item, index) => (
							<tr
								key={item.id}
								className={index !== 0 ? 'mt-4' : ''}>
								<td className="px-4 py-2  font-poppins  rounded text-base font-medium leading-6 tracking-tight text-center border-b">
									{item.name}
								</td>
								<td className="px-4 py-3 font-poppins text-base font-medium leading-6 tracking-tight text-center border-b">
									{item.Last}
								</td>

								<td className="px-4 py-3 font-poppins text-base font-medium leading-6 tracking-tight text-center border-b">
									<input
										type="checkbox"
										className="mx-2"
										onChange={() =>
											handleCheckboxChange(item.id)
										}
										checked={selectedItems.includes(
											item.id
										)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="flex justify-center mt-[5%] ml-[30%]">
					<button className="bg-gray-400 text-white py-2 px-4 rounded">
						Pay now to get Report
					</button>
				</div>
			</div>

			<div className="w-[50%] ml-[10%]">
				<div className="mb-8">
					<h1 className="font-Poppins text-[16px] font-bold leading-39 tracking-0 text-left">
						Fill Missing Details Details
					</h1>
					<p className="font-Poppins text-[10px]  leading-39 tracking-0 text-left">
						Fields that you leave Unchecked will be empty in the
						downloaded report
					</p>
				</div>
				<div className="w-full  text-center rounded-xl  shadow-lg"></div>

				<div className="flex flex-col mb-8 shadow-md bg-gray-200 p-4 rounded-md">
					<h3 className="placeholder-text font-Poppins text-[12px]  font-bold leading-5 tracking-normal text-left mb-2">
						Placeholder Field
					</h3>
					<input
						type="text"
						className="w-[204px] h-10 bg-white border border-gray-300 shadow-md p-2 rounded-md"
					/>

					<h3 className=" mt-7 placeholder-text font-Poppins text-[12px]  font-bold leading-5 tracking-normal text-left mb-2">
						Placeholder Field
					</h3>
					<input
						type="text"
						className="w-[204px] h-10 bg-white border border-gray-300 shadow-md p-2 rounded-md"
					/>

					<div className="flex items-center mt-7 space-x-4">
						<div>
							<h3 className="placeholder-text font-Poppins text-[12px] font-bold leading-5 tracking-normal text-left mb-2">
								Region
							</h3>
							<input
								type="text"
								className="w-[120px] h-10 bg-white border border-gray-300 shadow-md p-2 rounded-md"
							/>
						</div>

						<div>
							<h3 className="placeholder-text font-Poppins text-[12px] font-bold leading-5 tracking-normal text-left mb-2">
								Field
							</h3>
							<input
								type="text"
								className="w-[120px] h-10 bg-white border border-gray-300 shadow-md p-2 rounded-md"
							/>
						</div>
					</div>
					<div className="flex justify-end items-end mt-[100px] space-x-4">
						<div>
							<button className="bg-primary text-white text-center py-2 px-4 rounded-lg">
								Click me
							</button>
						</div>

						<div>
							<button className="bg-primary text-white text-center py-2 px-4 rounded-lg">
								Click me
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SelectedReport;
