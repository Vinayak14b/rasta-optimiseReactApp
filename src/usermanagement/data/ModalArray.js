// modalText.js

export const modalText = [
	{
		deleteadminreq: {
			Owner: 'Are you Sure to Delete Admin Profile ?',
			Admin: 'Do you want to Send Delete Admin Profile Request to Owner ?',
			onConfirm: 'handleDelAdminReq',
		},
	},
	{
		deleteOfficeReq: {
			Owner: 'Are you sure to delete office ?',
			Admin: 'Do you want to Send Delete Office Request to Owner ?',
			onConfirm: 'handleDelOfficeReq', //call function here adminAPI.js wala
		},
	},
	{
		deleteMemberReq: {
			// no owner no admin
			Admin: 'Are you sure to Delete this Member ?',
			Member: 'Send Delete Profile Request to Admin ?',
			onConfirm: 'handleDelMemberReq',
		},
	},
	{
		deleteVerifedUser: {
			// delete verified profile
			Admin: 'Are you sure to Delete this User ?',
			Member: 'Are you sure to Delete this User ?',
			onConfirm:'handleDeleteVerifiedUser'
		},
	},
];
  