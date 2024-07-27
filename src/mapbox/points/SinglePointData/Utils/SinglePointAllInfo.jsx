import { pointDetailIcons } from '../../../../assets/IconArray';
const SinglePointAllInfo = () => {
  return (
		<div className="flex flex-col gap-y-6 mt-4 pb-10 text-sm">
			{/* Location */}
			<div className="flex flex-col px-3">
				<div className="flex gap-x-2">
					<div className="w-[12%] ">
						<img
							src={pointDetailIcons.pointlocation}
							alt=""
							className="w-5  "
						/>
					</div>
					<div className="w-[45%] ml-4">Location </div>
					<div className="w-[45%] text-orange-500 ">
						: MH-13t68712
					</div>
				</div>
				<div className="bg-black mt-1" style={{ height: '1px' }}></div>
			</div>
			{/* Current Chainage  */}
			<div className="flex flex-col px-3">
				<div className="flex gap-x-2">
					<div className="w-[10%] ">
						<img
							src={pointDetailIcons.pointchainage}
							alt=""
							className="w-5  "
						/>
					</div>
					<div className="w-[45%] ml-4">Current Chainage </div>
					<div className="w-[45%] ">
						{' '}
						<span>:</span>{' '}
						<span className="bg-orange-500 px-2 py-1 rounded-md">
							00
						</span>{' '}
						/{' '}
						<span className="bg-orange-500 px-2 py-1 rounded-md">
							100
						</span>{' '}
					</div>
				</div>
				<div className="bg-black mt-1" style={{ height: '1px' }}></div>
			</div>
			{/* Road Name */}
			<div className="flex flex-col px-3">
				<div className="flex gap-x-2">
					<div className="w-[10%] ">
						<img
							src={pointDetailIcons.pointroadname}
							alt=""
							className="w-5  "
						/>
					</div>
					<div className="w-[45%] ml-4">Road Name </div>
					<div className="w-[45%] text-orange-500">
						: Vashi To Panvel{' '}
					</div>
				</div>
				<div className="bg-black mt-1" style={{ height: '1px' }}></div>
			</div>
			{/* Lat */}
			<div className="flex flex-col px-3">
				<div className="flex gap-x-2">
					<div className="w-[10%] ">
						<img
							src={pointDetailIcons.pointlatlong}
							alt=""
							className="w-5 "
						/>
					</div>
					<div className="w-[45%] ml-4">Latitude </div>
					<div className="w-[45%] text-orange-500 ">: 19.1668712</div>
				</div>
				<div className="bg-black mt-1" style={{ height: '1px' }}></div>
			</div>
			{/* Longitude */}
			<div className="flex flex-col px-3">
				<div className="flex gap-x-2">
					<div className="w-[10%] ">
						<img
							src={pointDetailIcons.pointlatlong}
							alt=""
							className="w-5 "
						/>
					</div>
					<div className="w-[45%] ml-4">Longitude </div>
					<div className="w-[45%] text-orange-500 ">
						: 73.15145468712
					</div>
				</div>
				<div className="bg-black mt-1" style={{ height: '1px' }}></div>
			</div>
			{/* Video Link */}
			<div className="flex flex-col px-3">
				<div className="flex gap-x-2">
					<div className="w-[10%] ">
						<img
							src={pointDetailIcons.pointplay}
							alt=""
							className="w-5  "
						/>
					</div>
					<div className="w-[45%] ml-4">Video Link </div>
					<div className="w-[45%] text-orange-500 ">: Video Link</div>
				</div>
				<div className="bg-black mt-1" style={{ height: '1px' }}></div>
			</div>
			{/* Timestamp */}
			<div className="flex flex-col px-3">
				<div className="flex gap-x-2">
					<div className="w-[10%] ">
						<img
							src={pointDetailIcons.pointdatetime}
							alt=""
							className="w-5  "
						/>
					</div>
					<div className="w-[45%] ml-4">TimeStamp </div>
					<div className="w-[45%] text-orange-500 ">
						: 22-01-2024 / 12:12:12
					</div>
				</div>
				<div className="bg-black mt-1" style={{ height: '1px' }}></div>
			</div>
			<div className="flex flex-col px-3">
				<div className="flex gap-x-2">
					<div className="w-[10%] ">
						<img
							src={pointDetailIcons.pointdefect}
							alt=""
							className="w-5 "
						/>
					</div>
					<div className="w-[45%] ml-4">Defect </div>
					<div className="w-[45%] text-orange-500">: Pothole</div>
				</div>
				<div className="bg-black h-1 mt-1"></div>
			</div>
		</div>
  );
}

export default SinglePointAllInfo
