// export default UtilitiesDashboard

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoRequestFoundPage from './NoRequestFoundPage';
import InnerSideBar from './InnerSideBar';

const UtilitiesDashboard = () => {
	const [filterStatus, setFilterStatus] = useState('');
	const navigate = useNavigate();
	const [data, setData] = [null];
	const [activePage, setActivePage] = useState('road');
	const handlePageChange = (page) => {
		setActivePage(page);
	};
	const handleFilterChange = (event) => {
		setFilterStatus(event.target.value);
	};
	return (
		<>
			<InnerSideBar
				setActivePage={handlePageChange}
				activePage={activePage}
			/>
			{data ? (
				<NoRequestFoundPage />
			) : (
				<div>
					<h1 className="font-poppins text-4xl font-bold mt-12 text-center">
						Utilities Dashboard
					</h1>
					<div className="absolute inline-block space-x-0 mt-[-3%] mr-0 ml-[80%]">
						<select
							className="appearance-none bg-primary text-white px-4 py-2 rounded font-poppins text-base font-bold leading-6"
							onChange={handleFilterChange}
							value={filterStatus}>
							<button className="ml-4 bg-primary px-4 py-3 text-white rounded-lg flex items-center">
								<img
									src="icons/adduser.png"
									alt="Icon"
									className="mr-2 h-5 w-5"
								/>
								Filter Requests
							</button>

							<option value="Super-Admin">Super-Admin</option>
							<option value="Admin">Admin</option>
							<option value="Member">Member</option>
						</select>
					</div>
					<table className="min-w-full bg-white shadow-md rounded my-6">
						<thead className="text-center">
							<tr>
								<th className="bg-primary text-white p-4">
									Name
								</th>
								<th className="bg-primary text-white p-4">
									Type of User
								</th>
								<th className="bg-primary text-white p-4">
									Authority
								</th>
								<th className="bg-primary text-white p-4">
									State
								</th>
								<th className="bg-primary text-white p-4">
									Judiction
								</th>
								<th className="bg-primary text-white p-4">
									Posting
								</th>
								<th className="bg-primary text-white p-4">
									Designation
								</th>
								<th className="bg-primary text-white p-4">
									Request
								</th>
							</tr>
						</thead>
						<tbody className="bg-D9D9D9 text-center">
							{/* Add your table body here */}
							<tr>
								<td className="bg-D9D9D9 text-black p-10 shadow-md">
									JohnDoe
								</td>
								<td className="bg-D9D9D9 text-black p-4 shadow-md">
									12345
								</td>
								<td className="bg-D9D9D9 text-black p-4 shadow-md">
									BrandName
								</td>
								<td className="bg-D9D9D9 text-black p-4 shadow-md">
									DefectType
								</td>
								<td className="bg-D9D9D9 text-black p-4 shadow-md">
									2023-11-30
								</td>
								<td className="bg-D9D9D9 text-black p-4 shadow-md">
									Approved
								</td>
								<td className="bg-D9D9D9 text-black p-4 shadow-md">
									AdminUser
								</td>
								<td
									className="bg-D9D9D9 text-blue p-4 shadow-md"
									onClick={() => {
										navigate('/authority');
									}}>
									View
								</td>
							</tr>
							{/* Add more rows as needed */}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};

export default UtilitiesDashboard;
