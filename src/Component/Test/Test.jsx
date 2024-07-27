import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import CloseButton from '../Utils/CloseButton';

const Test = () => {
  const navigate = useNavigate();
	const [show, setShow] = useState('open');

	const direction = (url, val) => {
	};
	const handleClose = () => {
		setShow(!show);
		navigate('/home');
	};
	return (
		<div className="flex h-screen  backdrop-filter backdrop-blur-[4px] ">
			<div className="w-20 ">
				<Sidebar />
			</div>
			<div className=" flex  justify-center items-center flex-1   ">
				{/* most outer container */}
				<div className="flex flex-col h-[40rem] w-[60rem]lg:h-[30rem] lg:w-[50rem]  xl:h-[30rem] xl:w-[55rem] 2xl:h-[32rem] 2xl:w-[70rem] bg-white  p-6 rounded-2xl shadow-2xl  gap-y-8 xl:gap-y-3 2xl:p-7 box-content ">
					{/* top container */}
					<div className="flex  justify-between items-center">
						<div className="flex flex-col">
							<h2 className="mb-1 font-poppins text-left text-2xl font-bold">
								Comparison Analysis
							</h2>
							<div className="font-semibold text-[#86878B] text-base font-poppins">
								Get a Comparison of your Trips
							</div>
						</div>
						<div onClick={handleClose} className=" top-2 right-3">
							<CloseButton />
						</div>
					</div>

					{/* dropdown box */}
					<div
						className=" border-2 rounded-xl p-8  h-96   border-orange-300  font-poppins  flex flex-col justify-evenly    items-center 
          lg:h-80 lg:p-3 xl:px-3 xl:h-[23rem] 2xl:h-[30rem]   ">
						<h1 className="text-2xl font-semibold   xl:mt-5  2xl:text-3xl ">
							Compare Trips
						</h1>
						<div className=" grid grid-cols-2 gap-x-10 gap-y-10  p-12 w-full  lg:p-6 lg:gap-y-12 2xl:mb-12 ">
							<div className="mx-auto">
              <button
									className="  w-44 h-10 flex justify-center items-center  p-3 my-auto text-center rounded-md bg-primary focus:outline-none focus:bg-primary hover:bg-white hover:border-[1px] hover:border-black text-white hover:text-black transition-all 400 ease-in"
									onClick={() => {
										direction('/comparison', 'region');
									}}>
									<p>Region Wise</p>
								</button>
							</div>

							<div className="mx-auto">
								<button
									className="  w-44 h-10 flex justify-center items-center  p-3 my-auto text-center rounded-md bg-primary focus:outline-none focus:bg-primary hover:bg-white hover:border-[1px] hover:border-black text-white hover:text-black transition-all 400 ease-in"
									onClick={() => {
										direction('/comparison', 'circle');
									}}>
									<p>Circle Wise</p>
								</button>
							</div>

							<div className="mx-auto">
								<button
									className="  w-44 h-10 flex justify-center items-center  p-3 my-auto text-center rounded-md bg-primary focus:outline-none focus:bg-primary hover:bg-white hover:border-[1px] hover:border-black text-white hover:text-black transition-all 400 ease-in"
									onClick={() => {
										direction('/comparison', 'division');
									}}>
									<p>Division Wise</p>
								</button>
							</div>

							<div className="mx-auto">
								<button
									className="  w-44 h-10 flex justify-center items-center  p-3 my-auto text-center rounded-md bg-primary focus:outline-none focus:bg-primary hover:bg-white hover:border-[1px] hover:border-black text-white hover:text-black transition-all 400 ease-in"
									onClick={() => {
										direction('/comparison', 'subdivision');
									}}>
									<p>Sub-Division Wise</p>
								</button>
							</div>

							<div className="mx-auto  col-span-2">
								<button
									className="  w-44 h-10 flex justify-center items-center  p-3 my-auto text-center rounded-md bg-primary focus:outline-none focus:bg-primary hover:bg-white hover:border-[1px] hover:border-black text-white hover:text-black transition-all 400 ease-in"
									onClick={() => {
										direction('/listview', 'road');
									}}>
									<p>Road Wise</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Test;
