import { setLoading } from '../../slices/profileSlice';
import { apiConnector } from '../apiConnector';
import { memberendpoints } from '../apis';
import { toast } from 'react-hot-toast';
import { REQUEST_TYPE , STATUS} from '../../data/constantdata';


export function assignMember(office_id, name, username, role, email, phone, dob, password, navigate) {
    return async (dispatch, getState) => {
        // const toastId = toast.loading('Loading..');
        const { token } = getState().auth;
        dispatch(setLoading(true));

        try {
            const response = await apiConnector(
				'POST',
				memberendpoints.ASSIGN_MEMBER,
				{
					office_id,
					name,
					username,
					role,
					email,
					phone,
					dob,
					password,
				},
				{ authorization: token }
			);

            // Handle success response
            // dispatch(setToken(response.data.token));
            toast.success('Member Added Successfully');
            // navigate('/member');
        } catch (error) {
            // Handle error
            toast.error('Failed to add Member');
        }
        // Cleanup actions
        dispatch(setLoading(false));
        // toast.dismiss(toastId);

    };
}



// write the business logic here delete member req to admin 
export function deleteMemberReq(office_id){
    return async(dispatch, getState)=>{
        const { token } = getState().auth;

        dispatch(setLoading(true));
        try{
            const response=await apiConnector(
            'POST',
            memberendpoints.DEL_MEMBER,
            {
             request_type:REQUEST_TYPE.DELETE_PROFILE, 
             office_id, 
             status:STATUS.STATUS_TYPE
            },
            { authorization: token }
             );
            toast.success("Delete Request sent to Admin Successfully ");

        }catch(error){
            console.error("Error Message : ",error.message);
            toast.error("Failed to send Delete Request to Admin");
        }
        dispatch(setLoading(false));
    }
}
