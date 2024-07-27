// UtilitiesDashboard.jsx
import { useState, useEffect } from 'react';
import InnerSideBar from '../InnerSideBar';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import ApproveUsers from './ApproveUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getUnverifiedDataList } from '../../usermanagement/services/Operations/requestAPI';
import { selectProfile } from '../../usermanagement/slices/profileSlice';
import { Spinner } from '../../utils/Spinner';
import NoRequestFoundPage from '../NoRequestFoundPage';

const UserVerificationReq = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector(selectProfile);
	const [activePage, setActivePage] = useState('user');
	const [userData, setUserData] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [refreshPage, setRefreshPage] = useState(false);
	const [showUserVerification, setShowUserVerification] = useState(false);

	useEffect(() => {
		const fetchData = async () => {

			try {
				const userUnverifiedData = await dispatch(
					getUnverifiedDataList()
				);
				setUserData(userUnverifiedData);
				// setrefreshPage(false);
			} catch (error) {
				console.error('Error in Getting User Data', error);
			}
		};

		fetchData();
	}, [refreshPage]);

	const handleViewClick = (username) => {
		
		setSelectedUser(username);
		setShowUserVerification(true);
	};

	
	const customFontStyle = {
		fontFamily: 'Poppins',
	};
	const handlePageChange = (page) => {
		setActivePage(page);
	};

	// handle return to page
	const returnPage = () => {
		setShowUserVerification(!showUserVerification);
		setRefreshPage((prevRefreshPage) => !prevRefreshPage); 
	};

	return (
		<>
			<div className="flex ">
				<InnerSideBar
					setActivePage={handlePageChange}
					activePage={activePage}
				/>

				<div className=" ml-20 text-center flex-1">
					{!showUserVerification && (
						<div>
							<h1
								className="text-4xl font-bold  mt-10 mb-4 inline-block"
								style={customFontStyle}>
								List of Unverified Users
							</h1>
						</div>
					)}
					{showUserVerification ? (
						<ApproveUsers
							username={selectedUser}
							onClose={returnPage}
						/>
					) : (
						<table className="h-fit bg-white shadow-md rounded my-6 w-[97%] mx-auto ">
							<thead className="text-center">
								<tr>
									<th
										className="bg-primary text-white p-4 border "
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

							<tbody className="bg-D9D9D9 text-center justify-center">
								{loading ? (
									<tr>
										<td colSpan="4">
											<Spinner />
										</td>
									</tr>
								) : userData.length === 0 ? (
									<tr>
										<td
											colSpan="4"
											className="font-poppins h-14 font-bold text-xl">
											<NoRequestFoundPage />
										</td>
									</tr>
								) : (
									userData.map((user) => (
										<tr key={user.id} className=" h-12">
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
											<td className="text-center border">
												<button
													className="bg-primfary text-white font-bold py-2 px-4 rounded mr-2"
													onClick={() =>
														handleViewClick(
															user.Username
														)
													}
													style={customFontStyle}>
													<FaArrowUpRightFromSquare className="text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in" />
												</button>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</>
	);
};

export default UserVerificationReq;
