import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { RxExternalLink } from 'react-icons/rx';
import { Box, Modal, Typography } from '@mui/material';
import {
	deleteOffice,
	getRegisteredOffices,
} from '../../../services/Operations/officeAPI';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	// border: "2px solid #000",
	boxShadow: 2,
	p: 4,
	fontWeight: 'bold',
};

const OfficeList = ({
	officesData,
	loading,
	openAssignHeadDialog,
	openAssignAdminDialog,
	formatDate,
}) => {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(false);

	const navigate = useNavigate();
	const [indexCounter, setIndexCounter] = useState(null);
	const handleOpen = (idx) => {
		setOpen(true);
		setIndexCounter(idx);
	};

	const handleClose = () => {
		setOpen(false);
		setIndexCounter(null);
	};

	const deleteOfficeCall = (office_id) => {
		dispatch(deleteOffice(office_id));
		dispatch(getRegisteredOffices('All', 'false'));
		setIndexCounter(null);
	};

	return (
		<div className="h-screen flex pb-4 justify-center mt-6">
			<div className="">
				<div className="grid grid-cols-3 gap-x-20 gap-y-5 justify-center items-center">
					{!loading &&
						officesData?.map((office, index) => (
							<div
								key={index}
								className="border-[1px] border-[#FE6100] h-68 w-68 rounded-md p-3 font-poppins flex-col gap-y-5">
								<div className="flex justify-between items-center">
									<h2 className="font-bold text-2xl mt-2">
										{office.office_name}
									</h2>
									<p
										className="cursor-pointer font-bold text-xl"
										onClick={() =>
											navigate(
												`/office/officename/member`,
												{
													state: {
														office_id:
															office.office_id,
													},
												}
											)
										}>
										<RxExternalLink className="text-primary mr-3  hover:shadow-sm hover:scale-125 transition-all 200ms ease-in" />
									</p>
								</div>

								<div className="flex items-center mt-2 gap-x-3">
									<div className="flex w-1/2 gap-3  justify-between">
										<p className="font-semibold">
											Office Level
										</p>
										<p>:</p>
									</div>
									<p className="font-normal text-sm flex-1 justify-start">
										{office.office_level}
									</p>
								</div>
								<div className="flex items-center mt-2 gap-x-3 ">
									<div className="flex w-1/2 gap-3 justify-between">
										<p className="font-semibold">
											Registered
										</p>
										<p>:</p>
									</div>
									<p className="font-normal text-sm flex-1 justify-start">
										{office.is_registered ? 'Yes' : 'No'}
									</p>
								</div>
								<div className="flex items-center mt-2 gap-x-3 ">
									<div className="flex w-1/2 gap-3  justify-between">
										<p className="font-semibold">
											Subscription
										</p>
										<p>:</p>
									</div>
									<p className="font-normal text-sm flex-1 justify-start">
										{office?.subscription}
									</p>
								</div>
								<div className="flex items-center mt-2 gap-x-3 ">
									<div className="flex w-1/2 gap-3  justify-between">
										<p className="font-semibold">
											Reporting Office
										</p>
										<p>:</p>
									</div>
									<p className="font-normal text-sm flex-1 justify-start">
										{office?.reporting_office_name}
									</p>
								</div>
								<div className="flex items-center mt-2 gap-x-3 ">
									<div className="flex w-1/2 gap-3  justify-between">
										<p className="font-semibold">
											Admin Name
										</p>
										<p>:</p>
									</div>
									<p className="font-normal text-sm flex-1 justify-start">
										{office?.admin_name ===
										'Not assigned' ? (
											<button
												className="border-[1px] border-[#FE6100] bg-white shadow-md rounded-full"
												onClick={() => {
													office?.admin_name ===
														'Not assigned' &&
														openAssignAdminDialog(
															office?.office_id,
															office?.admin_id
														);
												}}>
												<p className="font-semibold text-[#FE6100] text-sm px-2 py-1 hover:bg-[#FE6100] hover:text-white hover:rounded-full transition-all 200ms ease-in">
													Assign Admin
												</p>
											</button>
										) : (
											office?.admin_name
										)}
									</p>
								</div>
								<div className="flex items-center mt-2 gap-x-3 ">
									<div className="flex w-1/2 gap-3  justify-between">
										<p className="font-semibold">
											Head Name
										</p>
										<p>:</p>
									</div>
									<p className="font-normal text-sm flex-1 justify-start">
										{office?.head_name ===
										'Not assigned' ? (
											<button
												className="border-[1px] border-[#FE6100] bg-white shadow-md rounded-full"
												onClick={() => {
													office?.head_name ===
														'Not assigned' &&
														openAssignHeadDialog(
															office?.office_id,
															office?.head_id
														);
												}}>
												<p className="font-semibold text-[#FE6100] text-sm px-2 py-1 hover:bg-[#FE6100] hover:text-white hover:rounded-full transition-all 200ms ease-in">
													Assign Head
												</p>
											</button>
										) : (
											office?.head_name
										)}
									</p>
								</div>

								<div className="flex justify-between items-center mt-5">
									<p className="text-sm font-semibold ">
										{formatDate(office?.created_at)}
									</p>
									<div className="flex items-center gap-x-4">
										<p
											className="cursor-pointer"
											// onClick={() => deleteOffice(office.office_id)}
											onClick={() => handleOpen(index)}>
											<RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in" />
										</p>
										<Modal
											open={open}
											onClose={handleClose}
											aria-labelledby="modal-modal-title"
											aria-describedby="modal-modal-description">
											<Box sx={style}>
												<Typography
													id="modal-modal-title"
													variant="h6"
													component="h2">
													Are you sure you want to
													delete this office?
												</Typography>
												<Typography
													id="modal-modal-description"
													sx={{ mt: 2 }}>
													<div className="flex justify-between gap-x-2">
														<button
															className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
															onClick={
																handleClose
															}>
															No
														</button>
														<button
															className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
															onClick={() => {
																deleteOfficeCall(
																	officesData[
																		indexCounter
																	].office_id
																);
																handleClose();
															}}>
															Yes
														</button>
													</div>
												</Typography>
											</Box>
										</Modal>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default OfficeList;
