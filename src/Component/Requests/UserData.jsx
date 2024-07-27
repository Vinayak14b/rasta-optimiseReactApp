import { useState } from 'react';
import InnerSideBar from '../InnerSideBar';
import { UserProfileIcons } from '../../assets/IconArray';
import { LoginStatus } from '../Utils/LoginStatus';

export const UserData = ({ profileData, isVerifiedUser }) => {
	const [activePage, setActivePage] = useState('settings');
	const AdminDetails = profileData.AdminData;

	const handlePageChange = (page) => {
		setActivePage(page);
	};

	return (
		<div className="flex">
			<div className="w-20">
				<InnerSideBar
					setActivePage={handlePageChange}
					activePage={activePage}
				/>
			</div>
			<div className="flex-1  h-screen ">
				<div className="bg-white mediumShadow mx-auto my-12 h-[35rem] w-[72rem] p-6 gap-y-5">
					<section className=" flex  h-56 justify-between mx-10">
						<div className="flex-col  p-2 justify-center items-center gap-x-4">
							<div className="border-2 border-[#FE6100] rounded-lg h-40 w-44  justify-center items-center  mx-auto gap-y-4 p-3 ">
								<img
									src={UserProfileIcons.profilephoto}
									alt="User Photo"
									className="h-[80px] w-[80px] mx-auto"
								/>
								<p className="font-bold font-poppins mx-auto text-xl text-center mt-4">
									Profile Photo
								</p>
								{/* <img
									src={UserProfileIcons.editProfile}
									alt="Edit"
									className="relative bottom-[128px] left-[117px] h-[24px] w-[47px]"
								/> */}
							</div>
							<div className="flex flex-1   items-center gap-x-4 justify-center mt-2">
								{isVerifiedUser ? (
									<p className="font-poppins text-2xl font-bold text-[#6DDE81]">
										Verified
									</p>
								) : (
									<p className="font-poppins text-2xl font-bold text-[#FF4343]">
										Unverified
									</p>
								)}
								{isVerifiedUser ? (
									<img
										src={UserProfileIcons.verifyMark}
										alt="VerifyMark"
										className="h-8 w-8"
									/>
								) : (
									<img
										src={UserProfileIcons.notverify}
										alt="UnVerifyMark"
										className="h-8 w-8"
									/>
								)}
							</div>
						</div>
						<div className="flex-col h-full gap-y-6 w-72 justify-start items-center ">
							<div
								className=" w-full p-3 mt-4 relative bottom-[26px] left-[75px]"
								style={{ pointerEvents: 'none' }}>
								<LoginStatus />
							</div>
							<div className=" flex border-[1px] border-[#FE6100] box-content rounded-md w-44  gap-x-4 mx-auto p-4 mt-5">
								<p className="font-poppins font-bold ">
									Current Plan :{' '}
								</p>
								<p className="font-poppins font-semibold ">
									{AdminDetails?.Subscription}
								</p>
							</div>
						</div>
					</section>
					<section className="flex flex-1 border-[1px] border-orange-400 rounded-lg justify-between p-4 font-poppins ">
						<div className="flex-col">
							<div className="col-span-1">
								<div className="grid grid-rows-2 gap-2">
									<div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[35%]">
											<p className="text-name font-semibold ">
												Office Name
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{AdminDetails?.officeName
												? AdminDetails?.officeName
												: 'Office_Name_of_User'}
										</p>
									</div>
									<div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[35%]">
											<p className="text-name font-semibold ">
												Name
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{AdminDetails?.Name
												? AdminDetails.Name
												: `N/A}`}
										</p>
									</div>
									<div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[35%]">
											<p className="text-name font-semibold ">
												Mobile No
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{AdminDetails?.phone
												? AdminDetails.phone
												: 'N/A'}
										</p>
									</div>
									<div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[35%]">
											<p className="text-name font-semibold ">
												Email ID
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{AdminDetails?.Email
												? AdminDetails.Email
												: 'N/A'}
										</p>
									</div>

									{AdminDetails === null && (
										<div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto">
											<div className="flex w-[35%]">
												<p className="text-name font-semibold">
													Designation:
												</p>
												<p className="colon-class">:</p>
											</div>
											<p className="colon-class flex-1">
												{profileData?.Designation}
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
						{
							<div className="col-span-1">
								<div className="grid grid-rows-3 gap-2">
									<div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[42%]">
											<p className="text-name font-semibold ">
												Office Level
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{AdminDetails?.officeLevel
												? AdminDetails?.officeLevel
												: 'N/A'}
										</p>
									</div>
									{/* <div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[42%]">
											<p className="text-name font-semibold ">
												User Type
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{profileData?.TypeOfUser}
										</p>
									</div> */}
									{/* <div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[42%]">
											<p className="text-name font-semibold ">
												Authority
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{profileData?.Authority}
										</p>
									</div> */}
									<div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[42%]">
											<p className="text-name font-semibold ">
												State
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{AdminDetails?.State
												? AdminDetails?.State
												: 'N/A'}
										</p>
									</div>
									{/* <div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[42%]">
											<p className="text-name font-semibold ">
												Current Level
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											{profileData?.Jurisdiction}
										</p>
									</div> */}
									{/* <div className="row-span-1 bg-[#FFF1E7] p-2 flex items-center rounded w-auto ">
										<div className="flex w-[42%]">
											<p className="text-name font-semibold ">
												Sub-Division
											</p>
											<p className="colon-class">:</p>
										</div>
										<p className="colon-class flex-1">
											Pune North
										</p>
									</div> */}
								</div>
							</div>
						}
					</section>
				</div>
			</div>
		</div>
	);
};
