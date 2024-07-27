// UtilitiesDashboard.jsx
import { useState, useEffect } from 'react';
import UserVerification from './UserVerifications';
import InnerSideBar from './InnerSideBar';

const UtilitiesDashboard = () => {
	const [activePage, setActivePage] = useState('user');
	const [userData, setUserData] = useState([]);
	const [verifiedUsers, setVerifiedUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [showUserVerification, setShowUserVerification] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const userUnverifiedData = await getUnverifiedData();

		if (userUnverifiedData === '404') {
			setUserData([]);
		} else {
			setUserData(userUnverifiedData);
		}
	};

	const handleViewClick = (user) => {
		setSelectedUser(user);
		setShowUserVerification(true);
	};

	const handleVerification = (verifiedUser) => {
		setVerifiedUsers((prevVerifiedUsers) => [
			...prevVerifiedUsers,
			verifiedUser,
		]);
		setShowUserVerification(false);
	};

	const customFontStyle = {
		fontFamily: 'Poppins',
	};
	const handlePageChange = (page) => {
		setActivePage(page);
	};

	return (
		<>
			<InnerSideBar
				setActivePage={handlePageChange}
				activePage={activePage}
			/>
			<div className="text-center">
				{!showUserVerification && (
					<div>
						<h1
							className="text-4xl font-bold  mt-12 mb-4 inline-block"
							style={customFontStyle}>
							User Verifications
						</h1>
					</div>
				)}
				{showUserVerification ? (
					<>
						<h1 className="text-4xl font-bold mb-4 py-2 px-4 rounded mt-4">
							User Verifications
						</h1>
						<UserVerification
							userData={selectedUser}
							onVerification={handleVerification}
						/>
					</>
				) : (
					<table className="min-w-full bg-white shadow-md rounded my-6">
						<thead className="text-center">
							<tr>
								<th
									className="bg-primary text-white p-4 border"
									style={customFontStyle}>
									First Name
								</th>
								<th
									className="bg-primary text-white p-4 border"
									style={customFontStyle}>
									Last Name
								</th>
								<th
									className="bg-primary text-white p-4 border"
									style={customFontStyle}>
									Type of User
								</th>
								<th
									className="bg-primary text-white p-4 border"
									style={customFontStyle}>
									Request
								</th>
							</tr>
						</thead>
						<tbody>
							{userData &&
								userData.map((user) => (
									<tr key={user.id}>
										<td
											className="border"
											style={customFontStyle}>
											{user.FirstName}
										</td>
										<td
											className="border"
											style={customFontStyle}>
											{user.LastName}
										</td>
										<td
											className="border"
											style={customFontStyle}>
											{user.TypeOfUser}
										</td>
										<td className="text-center">
											<button
												className="bg-primary text-white font-bold py-2 px-4 rounded mr-2"
												onClick={() =>
													handleViewClick(user)
												}
												style={customFontStyle}>
												View
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};

export default UtilitiesDashboard;
