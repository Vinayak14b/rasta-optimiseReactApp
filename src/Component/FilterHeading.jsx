const FilterHeading = ({ heading, paragraph }) => {
	return (
		<>
			<h3 className="text-white text-xl font-bold mb-2 font-inter leading-24 tracking-normal text-left mx-5 my-2">
				{heading}{' '}
			</h3>
			<p className="text-white text-xs font-inter  font-normal leading-15 tracking-normal text-left mx-5 my-2 mb-12 ">
				{paragraph}{' '}
			</p>
		</>
	);
};

export default FilterHeading;
