import NavigationHeader from './Utils/NavigationHeader';
import SinglePointAllInfo from './Utils/SinglePointAllInfo';

const PointCard = () => {

	return (
		<div
			className="bg-white flex flex-col fixed top-0 right-0 h-full rounded-md border-2 border-red-500 hide-scrollbar font-semibold text-sm"
			style={{ width: '28%' }}>
			<div className="  bg-green-500 rounded-md h-10 min-w-20 w-auto  mx-auto text-center mt-2">
				<p className="text-md text-white font-poppins py-2 px-4 ">
					Good
				</p>
			</div>

			<div className="border-2 border-yellow-500 w-full p-2 mt-3">
				<div className="border-2 border-purple-500 h-[200px] w-full ">
					{' '}
				</div>
			</div>

			<div>
				{' '}
				<NavigationHeader />{' '}
			</div>
			<div>
				{' '}
				<SinglePointAllInfo />
			</div>
		</div>
	);
};

export default PointCard;
