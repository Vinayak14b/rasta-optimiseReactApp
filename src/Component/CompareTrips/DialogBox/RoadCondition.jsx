import { FaCircle } from 'react-icons/fa';
const RoadCondition = ({ summary }) => {
	return (
		<div className="flex flex-1 select-none font-poppins ">
			<div className="flex flex-1 items-center justify-center gap-x-4">
				<div className="flex items-center flex-col gap-y-1 ">
					<div className="flex justify-center items-center gap-x-1 ">
						<FaCircle className="text-mapgreen" />
						<p className="text-sm font-bold">
							{summary?.Good ? summary?.Good : '0'}%
						</p>
					</div>
					<div className="font-bold text-mapgreen">Good</div>
				</div>
				<div className="flex items-center flex-col gap-y-1 ">
					<div className="flex justify-center items-center gap-x-1 ">
						<FaCircle className="text-maporange" />
						<p className="text-sm font-bold">
							{summary?.Average ? summary?.Average : '0'}%
						</p>
					</div>
					<div className="font-bold text-maporange">Average</div>
				</div>
				<div className="flex items-center flex-col gap-y-1 ">
					<div className="flex justify-center items-center gap-x-1 ">
						<FaCircle className="text-mapred" />
						<p className="text-sm font-bold">
							{summary?.Poor ? summary?.Poor : '0'}%
						</p>
					</div>
					<div className="font-bold text-mapred">Bad</div>
				</div>
			</div>
		</div>
	);
};

export default RoadCondition;
