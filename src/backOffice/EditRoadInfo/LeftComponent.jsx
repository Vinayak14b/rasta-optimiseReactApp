import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdEditOff } from 'react-icons/md';
import { saveRoadInfo } from '../../mapbox/services/Operations/BackOfficeAPI';
import { useDispatch } from 'react-redux';

const LeftComponent = ({ roadData, roadId }) => {
	// console.log('roadData ', roadData);
	const dispatch = useDispatch();
	const [editModes, setEditModes] = useState({
		roadNo: false,
		roadName: false,
		roadType: false,
		roadCategory: false,
		Date: false,
		JEName: false,
	});

	const [newRoadData, setNewRoadData] = useState({
		roadNo: roadData?.roadNo,
		roadName: roadData?.roadName,
		roadType: roadData?.roadType,
		roadCategory: roadData?.roadCategory,
		Date: roadData?.Date,
		JEName: roadData?.JEName,
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setNewRoadData((prev) => ({
			// ...prev,
			[name]: value,
		}));
	};

	const toggleEditMode = (field) => {
		setEditModes((prev) => {
			const newState = { ...prev, [field]: !prev[field] };

			if (!newState[field]) {
				setNewRoadData((prev) => ({
					// ...prev,
					[field]: undefined,
				}));
			}

			return newState;
		});
	};

	const handleSave = async () => {
		try {
			const result = await dispatch(
				saveRoadInfo({ newRoadData, roadId })
			);
		} catch (error) {}
	};
	const roadCategories = [
		'NH',
		'MSH',
		'SH',
		'MDR',
		'VR',
		'Rural Road',
		'Package',
		'Wards',
		'Major/Minor Roads CR',
		'Lane no.',
		'Expressway',
		'AH',
		'ORR',
		'CR',
		'IR',
	];

	return (
		<div className="border-2 border-red w-full h-full ">
			<div
				className="flex flex-col gap-y-6 pt-6 pl-8 "
				style={{ border: '2px solid orange', height: '100%' }}>
				{/* Road No */}
				<div className="flex flex-col gap-y-3 pl-8">
					<div className="flex gap-x-4 justify-start items-center">
						<div>Survey Road No</div>
						<div> : </div>
						<div>{roadData?.roadNo}</div>
						<div
							onClick={() => toggleEditMode('roadNo')}
							className="cursor-pointer">
							{editModes.roadNo ? (
								<MdEditOff className="text-green-500" />
							) : (
								<CiEdit className="text-primary" />
							)}
						</div>
					</div>
					{editModes.roadNo && (
						<div className="flex gap-x-4 justify-start items-center ">
							<div style={{ color: 'orange' }}>
								{' '}
								Update New Road No{' '}
							</div>
							<div> : </div>
							<div className="">
								<input
									type="text"
									name="roadNo"
									value={newRoadData?.roadNo ?? ''}
									onChange={handleInputChange}
									className="border-2 border-gray-300 rounded"
								/>
							</div>
						</div>
					)}
				</div>

				{/* Road Name */}
				<div className="flex flex-col gap-y-3 pl-8">
					<div className="flex gap-x-4 justify-start items-center ">
						<div>Survey Road Name</div>
						<div> : </div>
						<div>{roadData?.roadName}</div>
						<div
							onClick={() => toggleEditMode('roadName')}
							className="cursor-pointer flex justify-start items-center w-4 h-4">
							{editModes.roadName ? (
								<MdEditOff className="text-green-500" />
							) : (
								<CiEdit className="text-primary" />
							)}
						</div>
					</div>
					{editModes.roadName && (
						<div className="flex gap-x-4 justify-start items-center">
							<div style={{ color: 'orange' }}>
								{' '}
								Update New Road Name{' '}
							</div>
							<div> : </div>
							<div className="">
								<input
									type="text"
									name="roadName"
									value={newRoadData.roadName ?? ''}
									onChange={handleInputChange}
									className="border-2 border-gray-300 rounded"
								/>
							</div>
						</div>
					)}
				</div>

				{/* Road Type */}
				<div className="flex flex-col gap-y-3 pl-8">
					<div className="flex gap-x-4 justify-start items-center">
						<div>Survey Road Type</div>
						<div> : </div>
						<div>{roadData?.roadType}</div>
						<div
							onClick={() => toggleEditMode('roadType')}
							className="cursor-pointer">
							{editModes.roadType ? (
								<MdEditOff className="text-green-500" />
							) : (
								<CiEdit className="text-primary" />
							)}
						</div>
					</div>
					{editModes.roadType && (
						<div className="flex gap-x-4 justify-start items-center">
							<div style={{ color: 'orange' }}>
								{' '}
								Update New Road Type{' '}
							</div>
							<div> : </div>
							<div className="">
								<select
									name="roadType"
									value={newRoadData.roadType ?? ''}
									onChange={handleInputChange}
									className="border-2 border-gray-300 rounded">
									<option
										value=""
										disabled
										className="text-gray-400">
										{' '}
										Select Road Type
									</option>
									<option value="Cement Concrete(CC)">
										Cement Concrete(CC)
									</option>
									<option value="Bituminous Concrete(BT)">
										Bituminous Concrete(BT)
									</option>
									<option value="Mix Seal Carpet">
										Mix Seal Carpet
									</option>
									<option value="BBM Carpet">
										BBM Carpet
									</option>
									<option value="Surface Dressing">
										Surface Dressing
									</option>
								</select>
							</div>
						</div>
					)}
				</div>

				{/* Road Category */}
				<div className="flex flex-col gap-y-3 pl-8">
					<div className="flex gap-x-4 justify-start items-center">
						<div>Survey Road Category</div>
						<div> : </div>
						<div>{roadData?.roadCategory}</div>
						<div
							onClick={() => toggleEditMode('roadCategory')}
							className="cursor-pointer">
							{editModes.roadCategory ? (
								<MdEditOff className="text-green-500" />
							) : (
								<CiEdit className="text-primary" />
							)}
						</div>
					</div>
					{editModes.roadCategory && (
						<div className="flex gap-x-4 justify-start items-center">
							<div style={{ color: 'orange' }}>
								{' '}
								Update New Road Category{' '}
							</div>
							<div> : </div>
							<div className="">
								<select
									name="roadCategory"
									value="" // This ensures no option is selected by default
									onChange={handleInputChange}
									className="border-2 border-gray-300 rounded">
									<option
										value=""
										disabled
										className="text-gray-400">
										Select Road Category
									</option>
									{roadCategories.map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
							</div>
						</div>
					)}
				</div>

				{/* Date */}
				<div className="flex flex-col gap-y-3 pl-8">
					<div className="flex gap-x-4 justify-start items-center">
						<div>Survey Date</div>
						<div> : </div>
						<div>{roadData?.Date}</div>
						<div
							onClick={() => toggleEditMode('Date')}
							className="cursor-pointer">
							{editModes.Date ? (
								<MdEditOff className="text-green-500" />
							) : (
								<CiEdit className="text-primary" />
							)}
						</div>
					</div>
					{editModes.Date && (
						<div className="flex gap-x-4 justify-start items-center">
							<div style={{ color: 'orange' }}>
								{' '}
								Update New Date{' '}
							</div>
							<div> : </div>
							<div className="">
								<input
									type="date"
									name="Date"
									// value={newRoadData.Date ?? ''}
									onChange={handleInputChange}
									className="border-2 border-gray-300 rounded"
								/>
							</div>
						</div>
					)}
				</div>

				{/* JE Name */}
				<div className="flex flex-col gap-y-3 pl-8">
					<div className="flex gap-x-4 justify-start items-center">
						<div>Junior Engineer Name</div>
						<div> : </div>
						<div>{roadData?.JEName}</div>
						<div
							onClick={() => toggleEditMode('JEName')}
							className="cursor-pointer">
							{editModes.JEName ? (
								<MdEditOff className="text-green-500" />
							) : (
								<CiEdit className="text-primary" />
							)}
						</div>
					</div>
					{editModes.JEName && (
						<div className="flex gap-x-4 justify-start items-center">
							<div style={{ color: 'orange' }}>
								{' '}
								Update New JE Name{' '}
							</div>
							<div> : </div>
							<div className="">
								<input
									type="text"
									name="JEName"
									value={newRoadData.JEName ?? ''}
									onChange={handleInputChange}
									className="border-2 border-gray-300 rounded"
								/>
							</div>
						</div>
					)}
				</div>

				{/* Save Button */}
				{Object.values(editModes).some((mode) => mode) && (
					<div className="flex  justify-center items-center ">
						<button
							onClick={handleSave}
							className="bg-green-400 border-2 border-black text-black py-2 px-4 rounded   font-bold   shadow-lg transition duration-200 ease-in-out transform hover:scale-105 "
							style={{
								backgroundColor: '#66DB97',
								color: '#000000',
								fontWeight: 'bold',
								borderRadius: '0.25rem',
								boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
								transition: 'transform 0.2s ease-in-out',
							}}>
							SAVE
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default LeftComponent;
