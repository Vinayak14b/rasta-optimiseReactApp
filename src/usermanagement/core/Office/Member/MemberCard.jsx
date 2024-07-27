import { useSelector } from 'react-redux';
import { ShowForPermission } from '../../../accesscontrol/ShowPermissionComponent';
import { useModal } from '../../../hooks/useModal';
import { selectAuth } from '../../../slices/authSlice';
import { ConfirmModal } from '../../../utilsUser/ConfirmModal';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { modalText } from '../../../data/ModalArray';
import {useDispatch} from 'react-redux'
import { deleteMemberReq } from '../../../services/Operations/memberAPI';
import { formatDate } from '../../../utilsUser/formDate';

export const MemberCard = ({ members ,office}) => {
	const dispatch = useDispatch();
	const { username, isAuthenticated, userType } = useSelector(selectAuth);
	const { isOpen, openModal, closeModal, modalConfig } = useModal();

	const handleOpen = (action) => {
		let text = '';
		let onConfirm = null;

		const scenario = modalText.find((item) => item[action]);
		if (scenario) {
			text = scenario[action][userType];
			const onConfirmFunctionName = scenario[action].onConfirm;
			const functionLookup = {
				handleDelMemberReq,
			};
			const selectedFunction = functionLookup[onConfirmFunctionName];
			if (typeof selectedFunction === 'function') {
				onConfirm = selectedFunction;
			} else {
				console.error(`Function "${onConfirmFunctionName}" not found.`);
			}
		}

		openModal({
			text,
			onConfirm,
		});
	};

	const handleDelMemberReq = () => {
		if (isAuthenticated && userType === 'Admin') {
		} else if (isAuthenticated && userType === 'Member') {
			//yaha function aayega   api wala 
			 dispatch(deleteMemberReq(office.office_id));

		}
		closeModal();
	};

	return (
		<>
			<div className="h-screen flex justify-center mt-10">
				<ConfirmModal
					isOpen={isOpen}
					closeModal={closeModal}
					modalConfig={modalConfig}
				/>
				<div>
					<div className="grid grid-cols-3 gap-x-10 gap-y-5 justify-center items-center">
						{members?.map((member, index) => (
							<div
								key={index}
								className="border-[1px] border-[#FE6100] h-fit w-15vm rounded-md p-3 font-poppins flex-col gap-y-5"
								style={{ margin: '15px', width: '27vw' }}>
								<h2 className="font-bold text-2xl mt-2">
									Member {index + 1}
								</h2>
								<div className="flex flex-col">
									<div className="flex items-center mt-2 gap-x-3">
										<div className="flex w-1/2 gap-3  justify-between">
											<p className="font-semibold">
												Name
											</p>
											<p>:</p>
										</div>
										<p className="font-normal text-sm flex-1 justify-start">
											{member?.name}
										</p>
									</div>

									<ShowForPermission permission="VIEW_USERNAME">
										<div className="flex items-center mt-2 gap-x-3">
											<div className="flex w-1/2 gap-3  justify-between">
												<p className="font-semibold">
													Username
												</p>
												<p>:</p>
											</div>
											<p className="font-normal text-sm flex-1 justify-start">
												{member?.username}
											</p>
										</div>
									</ShowForPermission>

									{/* <div className="flex items-center mt-2 gap-x-3">
										<div className="flex w-1/2 gap-3  justify-between">
											<p className="font-semibold">
												Role
											</p>
											<p>:</p>
										</div>
										<p className="font-normal text-sm flex-1 justify-start">
											{member?.role}
										</p>
									</div> */}

									<div className="flex items-center mt-2 gap-x-3">
										<div className="flex w-1/2 gap-3  justify-between">
											<p className="font-semibold">
												Email
											</p>
											<p>:</p>
										</div>
										<p className="font-normal text-sm flex-1 justify-start">
											{member?.email}
										</p>
									</div>
									<div className="flex items-center mt-2 gap-x-3">
										<div className="flex w-1/2 gap-3  justify-between">
											<p className="font-semibold">
												DOB
											</p>
											<p>:</p>
										</div>
										<p className="font-normal text-sm flex-1 justify-start">
										{formatDate(member?.dob)}
										</p>
									</div>
									<div className="flex items-center mt-2 gap-x-3">
										<div className="flex w-1/2 gap-3  justify-between">
											<p className="font-semibold">
												Phone No
											</p>
											<p>:</p>
										</div>
										<p className="font-normal text-sm flex-1 justify-start">
											{member?.phone}
										</p>

										{/* member */}

										{userType === 'Member' &&
										member?.username === username ? (
											<ShowForPermission permission="DELETE_MEMBER">
												<div
													className="cursor-pointer"
													onClick={() =>
														handleOpen(
															'deleteMemberReq'
														)
													}>
													<RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in mr-2" />
												</div>
											</ShowForPermission>
										) : null}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
