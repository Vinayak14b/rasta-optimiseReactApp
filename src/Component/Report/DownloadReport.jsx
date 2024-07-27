import { useState } from 'react';
import Sidebar from '../Sidebar';
import TempHeader from '../TempHeader';
import { BackButton } from '../Utils/BackButton';
import './ReportGeneration/DetailedRoadReport/DetailedRoadReport.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const DownloadReport = () => {
	const location = useLocation();
	const { officeLevel, officeName, roadNumber } = location.state || {};
	const [activePage, setActivePage] = useState('report');
	const navigate = useNavigate();


	const handlePageChange = (page) => {
		setActivePage(page);
	};
	return (
		<div className="flex">
			<div className="not_display_in_print">
				<Sidebar
					setActivePage={handlePageChange}
					activePage={activePage}
				/>
			</div>
			<div className="flex-1 flex-col">
				<div className="flex flex-col ml-20">
					<div className="not_display_in_print">
						<TempHeader />
					</div>
					<div className="flex justify-start items-center h-14 ">
						<div className="w-5 ml-8 mb-[4px] not_display_in_print">
							<BackButton direct={'/report'} />
						</div>
					</div>

					<div className=" flex-2 shadow-xl border-2  w-fit  justify-center items-center h-full my-auto  text-center  mx-12 box-content p-8 relative left-[169px] ">
						<div className="text-center not_display_in_print">
							<h1 className="text-black text-3xl text-center h-10 font-poppins font-semibold  underline">
								Select The Report
							</h1>
						</div>
						<div className="grid grid-cols-2 gap-y-1 w-[800px] h-[214px] justify-center items-center   relative mt-11  left-[131px] mb-[60px]">
							{/* <button
								onClick={() =>
									handleButtonClick('Budget Report')
								}
								className="w-28 h-10 p-1 px-2 box-content rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary hover:bg-primary text-white shadow-md">
								<p className="font-poppins text-sm">
									Budget Report
								</p>
							</button> */}

							{/* <button
								onClick={() =>
									handleButtonClick('Estimate Report')
								}
								className="w-28 h-10 p-1 px-2 box-content rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary hover:bg-primary text-white shadow-md">
								<p className="font-poppins text-sm">
									Estimate Report
								</p>
							</button> */}

							<button
								onClick={() =>
									navigate(
										'/downloadreport/pciroadreport',
										{
											state: {
												officeLevel: officeLevel,
												officeName: officeName,
												roadName: officeName,
												roadNo: roadNumber,
											},
										}
									)
								}
								className="not_display_in_print w-28 h-10 p-1 px-2 box-content rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary hover:bg-primary text-white shadow-md">
								<p className="font-poppins text-sm">
									PCI Report
								</p>
							</button>

							{/* <button
								onClick={() =>
									handleButtonClick('Comparison Report')
								}
								className="w-28 h-10 p-1 px-2 box-content rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary hover:bg-primary text-white shadow-md">
								<p className="font-poppins text-sm">
									Comparison Report
								</p>
							</button> */}

							<button
								onClick={() =>
									// handleButtonClick('Detailed Road Report')
									// setFlag(true)
									navigate(
										'/downloadreport/detailroadreport',
										{
											state: {
												officeLevel: officeLevel,
												officeName: officeName,
												roadName: officeName,
												roadNo: roadNumber,
											},
										}
									)
								}
								className="w-28 h-10 p-1 px-2 box-content rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary hover:bg-primary text-white shadow-md">
								<p className="font-poppins text-sm">
									Detailed Road Report
								</p>
							</button>

							{/* <div>
								<DetailedRoadReport/>
							</div> */}

							{/* <button
								onClick={() =>
									handleButtonClick('Arboriculture Report')
								}
								className="w-28 h-10 p-1 px-2 box-content rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary hover:bg-primary text-white shadow-md">
								<p className="font-poppins text-sm">
									Arboriculture Report
								</p>
							</button> */}
							{/* Repeat similar structure for other buttons */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
