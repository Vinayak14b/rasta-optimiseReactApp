import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdEditOff } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { saveRechainage } from '../../mapbox/services/Operations/BackOfficeAPI';

const ReChainageComponent = ({ roadData, roadId }) => {
	let Dist = parseFloat(roadData?.distance);
	Dist = Math.floor(Dist) + parseInt((Dist - Math.floor(Dist)) * 10) / 10;

	const [editFlag, setEditFlag] = useState(false);
	const [ascending, setAscending] = useState(null); // Initially null (unchecked)
	const [chainageInput, setChainageInput] = useState({ start: '', end: '' });
	const [isStartChecked, setIsStartChecked] = useState(null); // Default start checked
	const [isEndChecked, setIsEndChecked] = useState(null);
	const dispatch = useDispatch();

	const handleEditClick = () => {
		setEditFlag(!editFlag);
		setAscending(null);
		setIsStartChecked(null);
		setIsEndChecked(null);
		setChainageInput({ start: '', end: '' });
	};

	const handleAscendingChange = () => {
		setAscending(true); // Set ascending to true
		setChainageInput({ start: '', end: '' });
	};

	const handleDescendingChange = () => {
		setAscending(false); // Set ascending to false
		setChainageInput({ start: '', end: '' });
	};

	const handleStartChecked = () => {
		setChainageInput({ start: '', end: '' }); // Reset inputs when switching
		setIsStartChecked(true);
		setIsEndChecked(false);
	};

	const handleEndChecked = () => {
		setChainageInput({ start: '', end: '' }); // Reset inputs when switching
		setIsStartChecked(false);
		setIsEndChecked(true);
	};

	const handleChainageInputChange = (event) => {
		const { name, value } = event.target;
		setChainageInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (chainageInput.start || chainageInput.end) {
			handleCalculate();
		}
	}, [chainageInput.start, chainageInput.end]);

	const handleCalculate = () => {
		let updatedValue;
		if (ascending) {
			if (isStartChecked && chainageInput.start) {
				updatedValue = parseChainage(chainageInput.start, true); // Add Dist
				setChainageInput((prevInput) => ({
					...prevInput,
					end: updatedValue,
				}));
			} else if (isEndChecked && chainageInput.end) {
				updatedValue = parseChainage(chainageInput.end, false); // Subtract Dist
				setChainageInput((prevInput) => ({
					...prevInput,
					start: updatedValue,
				}));
			}
		} else {
			if (isStartChecked && chainageInput.start) {
				updatedValue = parseChainage(chainageInput.start, false); // Subtract Dist
				setChainageInput((prevInput) => ({
					...prevInput,
					end: updatedValue,
				}));
			} else if (isEndChecked && chainageInput.end) {
				updatedValue = parseChainage(chainageInput.end, true); // Add Dist
				setChainageInput((prevInput) => ({
					...prevInput,
					start: updatedValue,
				}));
			}
		}
	};

	const parseChainage = (chainage, addFlag) => {
		const parts = chainage.split('/');

		if (parts.length === 2) {
			const baseValue = parseFloat(parts[0]);

			let fractionPart = '';
			if (parts[1].length === 0) {
				fractionPart = '000';
			} else if (parts[1].length === 1) {
				fractionPart = parts[1] + '00';
			} else if (parts[1].length === 2) {
				fractionPart = parts[1] + '0';
			} else if (parts[1].length === 3) {
				fractionPart = parts[1];
			}

			const parsedValue = baseValue + parseFloat('0.' + fractionPart);
			const r = addFlag ? parsedValue + Dist : parsedValue - Dist;

			return r.toFixed(3).replace('.', '/'); // Convert to 3 decimal places as string
		}
	};

	const handleSaveButton = async () => {
		if (chainageInput.start && chainageInput.end) {
			const startChainage = chainageInput?.start;
			const endChainage = chainageInput?.end;
			const isAscending = ascending ? '1' : '0';

			try {
				await dispatch(
					saveRechainage({
						roadId,
						startChainage,
						endChainage,
						isAscending,
					})
				);
			} catch (error) {}
		}
	};

	return (
		<div className="w-full h-full">
			<div className="border-2 border-red-500 " style={{ height: '60%' }}>
				<div className="flex flex-col justify-start px-16 items-start mt-8 gap-y-6 pr-32 ">
					<div>
						Asce / Desc :{' '}
						{roadData?.isAscending == '1'
							? 'Ascending '
							: 'Descending'}{' '}
					</div>
					<div className="flex items-center">
						<div className="flex items-center gap-x-2">
							<div>Chainage :</div>
							<div className="border-2 border-gray-600 rounded px-2 py-1 ">
								{roadData?.startChainage}
							</div>
							<p>:</p>
							<div className="border-2 border-gray-600 rounded px-2 py-1 ">
								{roadData?.endChainage}
							</div>
						</div>
						<div className=" ml-6 cursor-pointer flex justify-start items-center">
							<button onClick={handleEditClick}>
								{editFlag ? (
									<MdEditOff className="text-green-500 w-6 h-6" />
								) : (
									<CiEdit className="text-primary w-6 h-6" />
								)}
							</button>
						</div>
					</div>
					{editFlag && (
						<div className="flex flex-col gap-y-3">
							<div className="font-semibold ml-6 text-xl">
								Re-Chainage{' '}
								<span className="text-sm font-normal ">
									(e.g.{' '}
									<span className="font-semibold">
										10/100
									</span>{' '}
									){' '}
								</span>{' '}
							</div>
							<div className="flex gap-x-1">
								<input
									type="radio"
									id="ascending"
									name="ascDesc"
									value="ascending"
									checked={ascending === true}
									onChange={handleAscendingChange}
								/>
								<label htmlFor="ascending">Ascending</label>

								<input
									type="radio"
									id="descending"
									name="ascDesc"
									value="descending"
									checked={ascending === false}
									onChange={handleDescendingChange}
									className="ml-5"
								/>
								<label htmlFor="descending">Descending</label>
							</div>
							{/* Conditional rendering based on ascending value */}
							{ascending !== null && (
								<>
									<div>
										<div className="flex gap-x-3 items-center">
											<label htmlFor="chainageInput">
												New Chainage :
											</label>
											<div>
												<input
													type="radio"
													id="startRadio"
													name="chainageType"
													value="start"
													checked={
														isStartChecked === true
													}
													onChange={
														handleStartChecked
													}
												/>
												<label htmlFor="startRadio">
													Start
												</label>
											</div>
											<div>
												<input
													type="radio"
													id="endRadio"
													name="chainageType"
													value="end"
													checked={
														isEndChecked === true
													}
													onChange={handleEndChecked}
												/>
												<label htmlFor="endRadio">
													End
												</label>
											</div>
											<input
												type="text"
												id="startChainage"
												name="start"
												value={chainageInput.start}
												onChange={
													handleChainageInputChange
												}
												placeholder="start "
												className="border-2 border-gray-300 rounded w-20 px-2 py-1"
												disabled={!isStartChecked}
											/>
											<p>:</p>
											<input
												type="text"
												id="endChainage"
												name="end"
												value={chainageInput.end}
												onChange={
													handleChainageInputChange
												}
												placeholder="end  "
												className="border-2 border-gray-300 rounded w-20 px-2 py-1"
												disabled={!isEndChecked}
											/>
										</div>
									</div>
								</>
							)}
						</div>
					)}
					{ascending !== null && (
						<div className="mt-4 mx-auto">
							<button
								onClick={handleSaveButton}
								className="px-4 py-2 border-2 border-black text-black font-bold rounded shadow-lg transition duration-200 ease-in-out transform hover:scale-105 "
								style={{
									backgroundColor: '#66DB97',
									color: '#000000',
									fontWeight: 'bold',
									boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
									transition: 'transform 0.2s ease-in-out',
								}}>
								SAVE
							</button>
						</div>
					)}
				</div>
			</div>
			<div
				className="flex w-full flex-col gap-y-3 "
				style={{ height: '40%' }}>
				<div className="flex font-semibold justify-between mt-10 px-8">
					<div>User Email : {roadData?.userEmail}</div>
					<div>Total Distance : {roadData?.distance}Km</div>
				</div>
				<div className="text-center font-poppins font-bold mt-3">
					Jurisdiction
				</div>
				<div className="font-semibold border-2 border-purple-400 flex justify-between items-center px-8">
					<div className="flex flex-col gap-y-4">
						<div>Region: {roadData?.region}</div>
						<div>Division: {roadData?.division}</div>
					</div>
					<div className="flex flex-col gap-y-4">
						<div>Circle: {roadData?.circle}</div>
						<div>Sub-Division: {roadData?.subDivision}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReChainageComponent;
