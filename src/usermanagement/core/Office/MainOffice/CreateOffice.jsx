import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import CloseButton from '../../../../Component/Utils/CloseButton';
import {
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
} from '@mui/material';

import {
	createOffices,
	getOfficeNamesByRegex,
} from '../../../services/Operations/officeAPI';

export const CreateOffice = ({ onClose, stateList }) => {
	const dispatch = useDispatch();
	const [showMessage, setShowMessage] = useState(false);
	const [officeNames, setOfficeNames] = useState([]);
	const [regexData, setRegexData] = useState({
		reportingStatus: '',
		officeLevel: '',
		reportingOfficeName: '',
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		setValue,
		watch,
	} = useForm();

	// body
	const reportingStatus = watch('isReportingExists');
	const officeLevel = watch('office_level');

	// params
	const reportingOfficeName = watch('reporting_office_name');

	const onSubmit = (data) => {
		dispatch(createOffices(data));
	};

	const handleFocus = () => {
		if (!officeLevel || !reportingStatus) {
			setShowMessage(true);
		}
	};

	const fetchOfficeNames = async (input) => {
		try {
			const response = await dispatch(getOfficeNamesByRegex(input));
			setOfficeNames(response.reporting_office_name);
		} catch (error) {
			console.error('Error Fetching Office names', error);
		}
	};

	useEffect(() => {
		setRegexData({
			reportingStatus: reportingStatus,
			officeLevel: officeLevel,
			reportingOfficeName: reportingOfficeName,
		});
	}, [reportingStatus, officeLevel, reportingOfficeName]);

	useEffect(() => {
		if (
			regexData.reportingStatus &&
			regexData.officeLevel &&
			regexData.reportingOfficeName
		) {
			// api function called
			fetchOfficeNames(regexData);
		}
	}, [regexData]);

	const handleInputChange = (e, value, reason) => {
		if (value.length >= 1 && reason === 'input') {
			setRegexData({
				...regexData,
				reportingOfficeName: value,
			});
		} else if (reason === 'clear') {
			setRegexData({
				...regexData,
				reportingOfficeName: '',
			});

			setOfficeNames([]);
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-filter backdrop-blur-[5px] z-50 bg-[#00000052]">
			<div className="bg-white p-4 rounded-lg shadow-lg w-[70%] h-[600px] flex-col gap-y-5">
				<div onClick={onClose} className="absolute top-30 right-25">
					<CloseButton />
				</div>
				<div className="flex flex-col justify-between text-center items-center font-poppins h-16 gap-y-4">
					<p className="font-bold text-2xl">Create Office</p>
					<p className="text-[#86878B] font-normal text-sm">
						Create office details here
					</p>
				</div>
				<div className="border flex-1 border-[#FE6100] min-h-[480px] rounded-lg mt-5 p-4">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<h2 className="font-bold text-xl font-poppins mb-6">
								Enter Your Details
							</h2>
							<div className="flex h-full w-full">
								<div className="flex flex-col w-1/2 h-full gap-y-8">
									<div>
										<TextField
											label="Office Name"
											variant="outlined"
											{...register('office_name', {
												required: true,
											})}
											error={!!errors.office_name}
											helperText={
												errors.office_name &&
												'Office Name is required'
											}
											style={{
												width: '343px',
											}}
										/>
									</div>
									<div>
										<FormControl
											variant="outlined"
											style={{
												width: '343px',
											}}>
											<InputLabel>
												Subscription
											</InputLabel>
											<Select
												label="Subscription"
												defaultValue=""
												{...register('subscription', {
													required: true,
												})}
												error={!!errors.subscription}>
												<MenuItem value="Free">
													Free
												</MenuItem>
												<MenuItem value="Gold">
													Gold
												</MenuItem>
												<MenuItem value="Enterprise">
													Enterprise
												</MenuItem>
											</Select>
										</FormControl>
									</div>
									<div>
										<FormControl
											variant="outlined"
											style={{
												width: '343px',
											}}>
											<InputLabel>State</InputLabel>
											<Select
												label="State"
												defaultValue=""
												{...register('state', {
													required: true,
												})}
												error={!!errors.state}>
												{stateList ? (
													stateList.map(
														(state, idx) => (
															<MenuItem
																value={state}
																key={idx}>
																{state}
															</MenuItem>
														)
													)
												) : (
													<MenuItem value="no Data found">
														Loading
													</MenuItem>
												)}
											</Select>
										</FormControl>
									</div>

									{reportingStatus === 'yes' && (
										<div>
											<Autocomplete
												options={officeNames}
												getOptionLabel={(option) =>
													option
												}
												loading={
													officeNames.length === 0
												}
												onInputChange={
													handleInputChange
												}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Reporting Office Name"
														variant="outlined"
														InputProps={{
															...params.InputProps,
															endAdornment: (
																<>
																	{
																		params
																			.InputProps
																			.endAdornment
																	}
																</>
															),
														}}
														onFocus={handleFocus}
														disabled={
															!officeLevel ||
															!reportingStatus
														}
														{...register(
															'reporting_office_name'
														)}
														helperText={
															showMessage &&
															'Please fill Office Level and Reporting Status first'
														}
														error={
															showMessage &&
															(!!errors.reporting_office_name ||
																!officeLevel ||
																!reportingStatus)
														}
													/>
												)}
											/>
										</div>
									)}
								</div>
								<div className="flex flex-col w-1/2 h-full gap-y-8">
									<div>
										<FormControl
											variant="outlined"
											style={{
												width: '343px',
											}}>
											<InputLabel>
												Office Level
											</InputLabel>
											<Select
												label="Office Level"
												defaultValue=""
												{...register('office_level')}>
												<MenuItem value="Region">
													Region
												</MenuItem>
												<MenuItem value="Circle">
													Circle
												</MenuItem>
												<MenuItem value="Division">
													Division
												</MenuItem>
												<MenuItem value="Sub-division">
													Sub-Division
												</MenuItem>
											</Select>
										</FormControl>
									</div>

									{/* //is reporting radio Button */}

									<div>
										<FormControl component="fieldset">
											<FormLabel component="legend">
												Is Reporting Office Available?
											</FormLabel>
											<Controller
												name="isReportingExists"
												control={control}
												defaultValue=""
												render={({ field }) => (
													<RadioGroup
														{...field}
														aria-label="isReportingExists"
														className="flex"
														style={{
															flexDirection:
																'row',
														}}>
														<FormControlLabel
															value="yes"
															control={<Radio />}
															label="Yes"
															onClick={() =>
																setValue(
																	'isReportingExists',
																	'yes'
																)
															}
														/>
														<FormControlLabel
															value="no"
															control={<Radio />}
															label="No"
															onClick={() =>
																setValue(
																	'isReportingExists',
																	'no'
																)
															}
														/>
													</RadioGroup>
												)}
											/>
										</FormControl>
									</div>

									{/* is office registed radio */}
									<div>
										<FormControl component="fieldset">
											<FormLabel component="legend">
												Is Office Registered?
											</FormLabel>
											<Controller
												name=" is_registered"
												control={control}
												defaultValue=""
												render={({ field }) => (
													<RadioGroup
														{...field}
														aria-label=" is_registered"
														className="flex"
														style={{
															flexDirection:
																'row',
														}}>
														<FormControlLabel
															value="yes"
															control={<Radio />}
															label="Yes"
															onClick={() =>
																setValue(
																	'is_registered',
																	'yes'
																)
															}
														/>
														<FormControlLabel
															value="no"
															control={<Radio />}
															label="No"
															onClick={() =>
																setValue(
																	'is_registered',
																	'no'
																)
															}
														/>
													</RadioGroup>
												)}
											/>
										</FormControl>
									</div>
								</div>
							</div>
							<div className="mt-5 text-center">
								<Button
									variant="contained"
									type="submit"
									onClick={handleSubmit}
									style={{
										backgroundColor: '#FE6100',
										fontFamily: 'Poppins',
										fontWeight: 500,
										textTransform: 'none',
										width: '13px',
										padding: '5px',
									}}>
									Create
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
