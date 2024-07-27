import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoRequestFoundPage from './NoRequestFoundPage';
import InnerSideBar from './InnerSideBar';

const AdminUtilitiesDashboard = () => {
  const navigate = useNavigate();
  const [data,setData]=[null];
  const [activePage, setActivePage] = useState('road');
  const handlePageChange = (page) => {
    setActivePage(page);
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
}

export default AdminUtilitiesDashboard