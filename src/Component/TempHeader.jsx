import React from 'react';
// import dropdown from '../assets/markers/dropdown.png';
// import { useSelector } from 'react-redux';
import { LoginStatus } from './Utils/LoginStatus';

const TempHeader = () => {
	// const { userType, tokenData } = useSelector((state) => state.auth);

	return (
		<div className='w-full border-b-2 border-[#a7a7a7]'>
			<div className=" w-full h-[100px] flex justify-between items-center ">
				<div className="text-5xl ml-4 font-poppins">
					<b>
						Rasta<span className="text-orange-500">.Ai</span>
					</b>
				</div>
				<div className="flex items-center mr-8 gap-x-3">
					<LoginStatus />
				</div>
			</div>
		</div>
	);
};

export default TempHeader;