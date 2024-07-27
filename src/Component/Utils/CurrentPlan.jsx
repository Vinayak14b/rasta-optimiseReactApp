import {useSelector} from 'react-redux'
import { selectProfile } from '../../usermanagement/slices/profileSlice';

export const CurrentPlan = () => {
	const { profileUserData } = useSelector(selectProfile);
	return (
		<div className=" flex border-[1px] border-[#FE6100] box-content rounded-md w-44  gap-x-4 mx-auto p-4 ">
		{/* // <ShowForPermission permission="VIEW_PLAN"> */}
				<p className="font-poppins font-bold ">Current Plan : </p>
				<p className="font-poppins font-semibold ">
					{profileUserData?.Subscription
						? profileUserData?.Subscription
						: 'N/A'}
				</p>
		{/* </ShowForPermission> */}
			</div>
	);
}
