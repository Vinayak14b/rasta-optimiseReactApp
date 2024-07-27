import { useState } from 'react';
import '../../CSS/Utils.css';
import Button from '@mui/material/Button';
import { iconMap } from '../../assets/IconArray';
import { BsThreeDots } from 'react-icons/bs';
import InnerSideBar from '../InnerSideBar';
import Stepper from '../Utils/StepperComp';

export const ApproveRequest = () => {

	const [activePage, setActivePage] = useState('dashboard');
	const handlePageChange = (page) => {
		setActivePage(page);
	};

	return (
		<div className="flex max-h-screen">
			<section className="">
				<InnerSideBar
					setActivePage={handlePageChange}
					activePage={activePage}
				/>
			</section>
			<section className="flex flex-col flex-1 items-center ml-20">
				<div className="font-bold text-[30px] font-poppins mt-1 mb-1">
					<h1 className="border-b-2 border-black mt-3">
						View Request
					</h1>
				</div>
				<div className="border-[0.5px] top-3 border-[#FF6923] w-full mt-3"></div>
				{/* main div */}

				<div className="w-11/12 h-[500px]  mediumShadow rounded-md mt-4 flex-col">
					{/* first line */}
					<div className="border-[0.3px]  border-[#FF6923] w-full mt-12"></div>
					{/* 4 divs */}
					<div className="flex gap-x-4 justify-evenly my-4 py-3 min-h-64">
						<div className="flex-1  p-5">
							<Stepper />
						</div>
						<div className="border-[0.5px] border-[#9F9F9F] h-42 "></div>

						<div className="flex-col flex-1  mx-auto p-3 justify-center items-center   font-poppins  w-full">
							<p className="font-semibold text-base mb-2">
								Current Details{' '}
							</p>
							<div className="text-[#474747] text-sm  flex-col gap-y-4">
								<p> Name: Rahul</p>
								<p> Type Of User: Govt. </p>
								<p> Designation:Junior Engineer</p>
								<p> Current Location: Kolhapur</p>
								<p> Authority: PWD </p>
								<p> Jurisdiction: Sub-Division</p>
							</div>
						</div>
						<div className="border-[2px] border-[#9F9F9F] h-28 my-auto rounded-lg"></div>

						<div className="flex-col flex-1  mx-auto p-3 justify-center items-center  font-poppins leading-4 w-full">
							<p className="font-semibold text-base mb-2">
								Request Details
							</p>
							<article className="text-[#474747] text-sm leading-5 h-full">
								<p>Request ID: 26378387646 </p>
								<p>Name: Rahul </p>
								<p>Type Of User: Govt. </p>
								<p>Designation: Junior Engineer </p>
								<p>Current Location: Kolhapur </p>
								<p>Authority: PWD </p>
								<p>Jurisdiction: Sub-Division </p>
							</article>
						</div>

						<div className="border-[0.5px] border-[#9F9F9F] h-42"></div>

						<div className="flex-1 w-full my-auto mx-auto">
							<div className="border-[1px]  border-[#FE6100] max-w-40 min-h-40 rounded-lg p-4 font-inter gap-x-3   ">
								<div className="">
									<div className="flex justify-between mb-1">
										<div>
											<img
												src={iconMap.folder}
												alt="Folder "
												className="h-6 w-6"
											/>
										</div>
										<div className="mouse-pointer">
											<BsThreeDots />
										</div>
									</div>
									<div>
										<p className="font-semibold">
											Transfer Letter
										</p>
										<div className="font-semibold flex text-xs gap-x-4 font-inter">
											<p>17 Mar 2024</p>
											<p>13 MB</p>
										</div>
									</div>

									<div className=" right-0">
										<button className="w-16 h-6 mt-7 bg-[#FF6100] rounded-xl text-white relative">
											<p className="font-inter text-sm ">
												View
											</p>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* third line */}
					<div className="border-[0.3px] top-3 border-[#FF6923] w-full mt-3"></div>

					{/* buttons */}
					<div className="flex justify-center items-center gap-x-6 mt-4">
						<Button
							variant="contained"
							style={{
								backgroundColor: '#FE6100',
								fontFamily: 'Poppins',
								fontWeight: 500,
								textTransform: 'none',
								width: '13px',
								padding: '5px',
							}}>
							Accept
						</Button>
						<Button
							variant="contained"
							style={{
								backgroundColor: '#FE6100',
								fontFamily: 'Poppins',
								fontWeight: 500,
								textTransform: 'none',
								width: '13px',
								padding: '5px',
							}}>
							Reject
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
};
