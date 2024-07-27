
export default function Pagination() {
	//   const { page, handlePageChange, totalPages } = useContext(AppContext);
	const page = 2;
	const totalPages = 10;
	// if (!totalPages) return null;

	return (
		<div className="fixed bottom-0 w-[100%]   bg-[#6d44fc] text-white  border-t-2 border-t-gray-600">
			<div className="flex items-center gap-x-3 w-full  mx-auto bg-slate-100 py-1 justify-evenly">
				{/* {page > 1 && ( */}
				<div className="flex-1">
					<button
						// onClick={() => handlePageChange(page - 1)}
						className=" h-[2.2rem] w-[6rem] border-2 font-poppins bg-[#FE6100] text-sm border-gray-300 py-1 px-4 rounded-md ml-[10px]">
						Previous
					</button>
				</div>
				{/* )} */}
				<p className="flex-1 text-black text-center font-poppins text-sm font-semibold ml-auto">
					Page {page} of {totalPages}
				</p>
				{/* {page < totalPages && ( */}
				<div className="flex-1 text-right ">
					<button
						// onClick={() => handlePageChange(page + 1)}
						className=" h-[2.2rem] w-[96px] border-2  font-poppins bg-[#FE6100] text-sm border-gray-300 py-1 px-4 rounded-md mr-[95px]">
						Next
					</button>
				</div>
				{/* )} */}
			</div>
		</div>
	);
}
