// ShowForPermission.js
import PropTypes from 'prop-types';
// import { useMemo } from 'react';
import { connect } from 'react-redux';

const ShowForPermissionComponent = (props) => {

	const hasPermissions = ( props) => {

		const userPermissionsArray = props.userPermissions;
		
		return (
			userPermissionsArray && userPermissionsArray.includes(props.permission)
		);
	};

	const couldShow = hasPermissions(props)  ;
	
	return couldShow ? props.children : null;
};

ShowForPermissionComponent.propTypes = {
	userType: PropTypes.string.isRequired,
	userPermissions: PropTypes.object.isRequired,
	permission: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => {
	
	return {
		userPermissions: state.user.permissions,
	};
};

export const ShowForPermission = connect(mapStateToProps)(
	ShowForPermissionComponent
);

