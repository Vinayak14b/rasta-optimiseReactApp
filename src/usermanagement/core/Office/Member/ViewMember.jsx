import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getOfficeDetails,
	requestForDeletingOffice,
} from '../../../services/Operations/officeAPI';
import InnerSideBar from '../../../../Component/InnerSideBar';
import TempHeader from '../../../../Component/TempHeader';
import { AuthorityCard } from './AuthorityCard';
import { MemberCard } from './MemberCard';
import AddMember from './AddMember';
import { Spinner } from '../../../../utils/Spinner';
import { FaPlus } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ShowForPermission } from '../../../accesscontrol/ShowPermissionComponent';
import { useLocation } from 'react-router-dom';
import { Box, Modal, Typography } from '@mui/material';

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

export const ViewMember = () => {
	// States
	const dispatch = useDispatch();
	const location = useLocation();
	const [activePage, setActivePage] = useState('office');
	const [officeData, setOfficeData] = useState(null);
	const { loading } = useSelector((state) => state.office);
	const { office, head, admin, members } = officeData || {};
	const [addMemberDialog, setAddMemberDialogOpen] = useState(false);
	const [modelOpen, setModelOpen] = useState(false);

	const handleClose = () => setModelOpen(false);
	const handleOpen = () => setModelOpen(true);

	var officeId = null;
	if (location.state) {
		officeId = location.state.office_id || {};
	}

	// functions
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (officeId) {
					const data = await dispatch(getOfficeDetails(officeId));
					setOfficeData(data.userOfficeDetail);
				} else {
					const data = await dispatch(getOfficeDetails());
					setOfficeData(data.userOfficeDetail);
				}
			} catch (error) {
				console.error('Error fetching office details:', error);
			}
		};

		fetchData();
	}, []);


	const closeAddMemberDialog = () => {
		setAddMemberDialogOpen(false);
	};
	const handlePageChange = (page) => {
		setActivePage(page);
	};
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					{addMemberDialog && (
						<div className="AddMember-dialog-container">
							<div className="AddMember-dialog-overlay">
								<div className="AddMember-dialog-box">
									<AddMember
										closeAddMemberDialog={
											closeAddMemberDialog
										}
										officeId={officeData.office.office_id}
									/>
								</div>
							</div>
						</div>
					)}

					<div className="flex">
						<section className="w-20">
							<InnerSideBar
								setActivePage={handlePageChange}
								activePage={activePage}
							/>
						</section>
						<section className=" flex-1 flex-col h-screen  ">
							<div>
								<TempHeader />
							</div>
							<div className="flex flex-col  h-fit mt-5">
								<div className="mt-[2rem] h-fit flex items-center justify-between">
									<span className="  w-[30%] font-poppins font-bold  text-2xl ml-8 flex-col">
										<p>View Office </p>
										<div className="border-[0.5px] border-black w-[350px] "></div>
									</span>
									<div className="p-4">
										<ShowForPermission permission="DELETE_OFFICE_REQ">
											<div
												className="cursor-pointer"
												onClick={() => {
													handleOpen();
												}}>
												<RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in mr-2" />
											</div>
										</ShowForPermission>
									</div>
								</div>

								{/* code of view office Members */}

								{officeData && (
									<>
										<div>
											<AuthorityCard
												admin={admin}
												office={office}
												head={head}
											/>
										</div>
									</>
								)}

								<div className="h-fit mt-[3rem] flex items-center justify-between pr-20">
									<span className="  w-[30%] font-poppins font-bold  text-2xl ml-8 mb-[2rem] flex-col">
										<p>Office Members</p>
										<div className="border-[0.5px] border-black w-[195px] "></div>
									</span>

									{/* restrict it */}
									<ShowForPermission permission="ADD_MEMBER">
										<div className="flex items-center mx-[4rem] box gap-x-1 mr-50">
											<button
												className="flex-1 bg-[#FE6100] text-md font-poppins border-[1px] border-[#FE6100] font-semibold p-2 rounded-md text-white hover:bg-white hover:border-[1px] w-fit hover:border-[#FE6100] hover:text-black transition-all 200ms ease-in flex items-center"
												onClick={() =>
													setAddMemberDialogOpen(true)
												}>
												<span>Add New Member</span>
												<span className="ml-2">
													<FaPlus />
												</span>
											</button>
										</div>
									</ShowForPermission>
								</div>

								{/* Office Members */}
								{officeData && (
									<>
										<div>
											<MemberCard
												members={members}
												office={office}
											/>
										</div>
									</>
								)}
							</div>
						</section>
					</div>

					<Modal
						open={modelOpen}
						onClose={handleClose}
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description">
						<Box sx={style}>
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2">
								Are you sure you want to delete this office?
							</Typography>
							<Typography
								id="modal-modal-description"
								sx={{ mt: 2 }}>
								<div className="flex justify-between gap-x-2">
									<button
										className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
										onClick={handleClose}>
										No
									</button>
									<button
										className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
										onClick={() => {
											dispatch(
												requestForDeletingOffice(
													officeData.office.office_id
												)
											);
											handleClose();
										}}>
										Yes
									</button>
								</div>
							</Typography>
						</Box>
					</Modal>
				</>
			)}
			;
		</>
	);
};
