import { useState } from 'react';
import DropDownComponent from './DropDownComponet';

const GenerateReport = () => {
	const [selectedItems, setSelectedItems] = useState([]);
	const itemsForSecondaryDropDown = ['Item 1', 'Item 2', 'Item 3'];
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
			<div className="w-[20%]">
				<div className="mb-8">
					<h1 className="font-Poppins text-[26px] font-semibold leading-39 tracking-0 text-center">
						Generate Report
					</h1>
				</div>

				<div className="bg-primary rounded text-center p-4">
					<p className="font-Poppins font-semibold text-white">
						Bumbaiy to delhi
					</p>
					<p className="font-Poppins font-semibold text-white">
						Marine Drive Road
					</p>
					<p className="font-Poppins font-semibold text-white">
						2/03/2
					</p>
					<p className="font-Poppins font-semibold text-white">
						Distance 14.8km
					</p>
				</div>
			</div>

			<div className="w-[70%] ml-[10%]">
				<div className="mb-8">
					<h1 className="font-Poppins text-[26px] font-bold leading-39 tracking-0 text-center">
						Fill Necessary Details
					</h1>
				</div>

				<div className="flex mb-8">
					<div className="w-1/3">
						<h4 className="text-xs font-semibold mb-3">Region</h4>
						<DropDownComponent
							bgColor="bg-gray-300"
							items={itemsForSecondaryDropDown}
						/>
					</div>
					<div className="w-1/3">
						<h4 className="text-xs font-semibold mb-3">Circle</h4>
						<DropDownComponent
							bgColor="bg-gray-300"
							items={itemsForSecondaryDropDown}
						/>
					</div>
					<div className="w-1/3">
						<h4 className="text-xs font-semibold mb-3">Division</h4>
						<DropDownComponent
							bgColor="bg-gray-300"
							items={itemsForSecondaryDropDown}
						/>
					</div>
				</div>

				<div className="flex mb-8">
					<div className="w-1/3">
						<h4 className="text-xs font-semibold mb-3">
							Sub Division
						</h4>
						<DropDownComponent
							bgColor="bg-gray-300"
							items={itemsForSecondaryDropDown}
						/>
					</div>
					<div className="w-1/3">
						<h4 className="text-xs font-semibold mb-3">
							Road Name
						</h4>
						<DropDownComponent
							bgColor="bg-gray-300"
							items={itemsForSecondaryDropDown}
						/>
					</div>
				</div>

				<div className="p-6 mb-8">
					<table className="w-full  text-center rounded-xl  shadow-lg">
						<thead>
							<tr className="bg-ffddc7 text-center justify-center items-center">
								<th className="px-4 py-2 font-poppins text-base font-bold leading-6 text-center tracking-tight ">
									Report Name
								</th>
								<th className="px-4 py-2 font-poppins text-center text-base font-bold leading-6 tracking-tight ">
									Last Surveyed
								</th>
								<th className="px-4 py-2 font-poppins text-base font-bold leading-6 tracking-tight text-center">
									Include{' '}
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
				</div>

				<div className="flex justify-end ml-[30%]">
					<button className="bg-primary text-white py-2 px-4 rounded">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default GenerateReport;
