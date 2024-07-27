import { FormControlLabel, IconButton } from '@mui/material';
import { Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { useDispatch } from 'react-redux';
import increaseIcon from '../../../assets/markers/increaseIcon.png';
import decreaseIcon from '../../../assets/markers/decreaseIcon.png';
import { toast } from 'react-hot-toast';
import { setSelectedTripSlice } from '../../../mapbox/slices/tripSlice';
const TypeCol = ({ params }) => {
	let direction =
		params?.row?.isAscending === '1'
			? 'Ascending'
			: params?.row?.isAscending === '0'
			? 'Descending'
			: 'N/A';

	return (
		<div
			className="flex justify-between items-center w-full"
			style={{ cursor: 'pointer' }}>
			<div>{direction}</div>
			<FormControlLabel
				control={
					<IconButton
						color="secondary"
						aria-label="add an alarm"
						// onClick={handleEditClick}
					>
						{params?.row?.isAscending === '0' && (
							<img src={decreaseIcon} alt="decreaseIcon" />
						)}
						{params?.row?.isAscending === '1' && (
							<img src={increaseIcon} alt="decreaseIcon" />
						)}
					</IconButton>
				}
			/>
		</div>
	);
};

const TripHistory = ({ open, setOpen, tripHistory }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [selectedtrip, setSelectedTrip] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);
	const [searchText, setSearchText] = useState('');

	const columns = [
		{
			field: 'Date',
			headerName: 'Date',
			width: 150,
		},
		{
			field: 'startChainage',
			headerName: 'Start Chainage',
			width: 150,
			sortable: false,
		},
		{
			field: 'endChainage',
			headerName: 'End Chainage',
			width: 150,
			sortable: false,
		},
		{
			field: 'roadName',
			headerName: 'Road Name',
			width: 200,
			sortable: false,
		},
		{
			field: 'roadNo',
			headerName: 'Road Number',
			width: 150,
			sortable: false,
		},
		{
			field: 'roadCategory',
			headerName: 'Road Category',
			width: 150,
			sortable: false,
		},
		{
			field: 'roadType',
			headerName: 'Road Type',
			width: 200,
			sortable: false,
		},
		{
			field: 'distance',
			headerName: 'Distance',
			width: 120,
			sortable: false,
		},
		{
			field: 'juniorExecutiveName',
			headerName: 'JE Name',
			width: 150,
			sortable: false,
		},

		{
			field: 'isAscending',
			headerName: 'Type',
			width: 150,
			sortable: false,
			disableClickEventBubbling: true,
			renderCell: (params) => <TypeCol params={params} />,
		},
	];

	const handleSearchChange = (event) => {
		setSearchText(event.target.value);
	};

	const handleCompareButtonClick = () => {

		if (selectedtrip.length > 1) {
			navigate('/comparison/road');
		} else {
			toast.error('Please select atleast 2 trips');
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	function getRowId(row) {
		return row._id;
	}

	const handleSelectionChange = (newSelection) => {
		if (newSelection.length <= 2) {
			setSelectedRows(newSelection);
			setSelectedTrip(
				newSelection.map((id) =>
					tripHistory.find((trip) => trip._id === id)
				)
			);

			const selectedTrips = newSelection.map((id) => {
				const { roadNo, roadName, Date } = tripHistory.find(
					(trip) => trip._id === id
				);
				return { roadNo, roadName, Date };
			});

			dispatch(setSelectedTripSlice(selectedTrips));
			
		}
	};


	return (
		<>
			<Dialog open={open}>
				<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center  backdrop-filter backdrop-blur-[4px]">
					<div className="bg-white rounded-md p-8 relative flex flex-col gap-y-2">
						<div className="flex justify-between items-center">
							<h1 className="font-bold text-xl font-poppins ">
								Comparison{' '}
							</h1>
							<div
								className="text-md font-bold hover:text-white hover:bg-orange-600 absolute top-4 right-4 rounded-full close h-8 w-8 flex justify-center items-center cursor-pointer text-red-500"
								onClick={handleClose}>
								&times;
							</div>
						</div>
						<div
							style={{
								overflowX: 'auto',
								height: '60vh',
								width: '80vw',
							}}>
							<DataGrid
								rows={tripHistory}
								columns={columns.map((column) => ({
									...column,
									headerStyle: {
										fontFamily: 'poppins, sans-serif',
										fontWeight: 'bold',
									},
									cellStyle: {
										fontFamily: 'poppins, sans-serif',
										fontWeight: 'bold',
									},
								}))}
								pageSize={5}
								onRowSelectionModelChange={
									handleSelectionChange
								}
								getRowId={getRowId}
								rowSelectionModel={selectedRows}
								checkboxSelection
								disableColumnMenu
								disableColumnSelector
								disableColumnReorder
							/>
						</div>

						<button
							className="px-5 py-2 rounded-md font-poppins text-md mt-1 bg-orange-500 text-white font-semibold gap-y-5 w-32 mx-auto hover:scale-100 transition-all duration-200 ease-in-out hover:bg-white hover:border-[1px] hover:border-black hover:text-black"
							onClick={handleCompareButtonClick}>
							Compare
						</button>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default TripHistory;
