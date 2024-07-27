import { useState, useEffect } from 'react';
import './DetailedRoadReport.css';
import HeaderAndFooter from './HeaderAndFooter';
import DataOne from '../Details/DataOne';
import DataTwo from './DataTwo';
import DataThree from './DataThree';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	getListOfAllRoad,
	getDetailOfAllRoad,
	getDetailOfAllChainageForRoad,
	getHigherAuthority,
} from '../../../../usermanagement/services/Operations/CoreAPIs/reportAPI';
import FirstPage from '../Details/FirstPage';
import { Spinner } from '../../../../utils/Spinner';
import Abbreviation from '../Details/Abbreviation.jsx';

function DetailedRoadReport() {
	const location = useLocation();
	const dispatch = useDispatch();
	const { officeLevel, officeName, roadName, roadNo } = location.state || {};
	const [listOfRoad, setListOfRoad] = useState([]);
	const [detailOfRoad, setDetailOfRoad] = useState([]);
	const [detailChainage, setDetailChainage] = useState([]);
	const [higherAuthority, setHigherAuthority] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchListOfRoad() {
			try {
				const data = await dispatch(
					getListOfAllRoad(officeLevel, officeName, roadName, roadNo)
				);
				setListOfRoad(data.roadList);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		async function fetchDetailOfRoad() {
			try {
				const data = await dispatch(
					getDetailOfAllRoad(
						officeLevel,
						officeName,
						roadName,
						roadNo
					)
				);
				setDetailOfRoad(data.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		async function fetchListofChainage() {
			setLoading(true);
			try {
				const data = await dispatch(
					getDetailOfAllChainageForRoad(
						officeLevel,
						officeName,
						roadName,
						roadNo
					)
				);
				setDetailChainage(data?.data);
			} catch (error) {
				console.error('Error fetching Data:', error);
			}
			setLoading(false);
		}

		async function fetchDataOfJurisdiction() {
			try {
				const result = await dispatch(
					getHigherAuthority(
						officeLevel,
						officeName,
						roadName,
						roadNo
					)
				);
				setHigherAuthority(result);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		fetchListOfRoad();
		fetchDetailOfRoad();
		fetchListofChainage();
		fetchDataOfJurisdiction();
	}, [officeLevel, officeName, roadName, roadNo]);

	return (
		<>
			{loading ? (
				<div className="w-[100vw] h-[100vh] flex justify-center items-center">
					<Spinner />
				</div>
			) : (
				// <div className="w-[100vw] h-[100vh] flex justify-center items-center">
				<div className=".display_in_print">
					<HeaderAndFooter loading={loading}>
						<div className="w-full text-justify">
							<FirstPage
								clientName={
									higherAuthority ? higherAuthority : roadName
								}
							/>
						</div>
						<div className="w-full text-justify page-break">
							<Abbreviation/>
						</div>
						<div className="w-full text-justify page-break">
							<DataOne />
						</div>
						<div className="page-break">
							<DataTwo listOfRoad={listOfRoad} />
						</div>
						<div className="page-break">
							<DataThree
								detailOfRoad={detailOfRoad}
								detailChainage={detailChainage}
							/>
						</div>
					</HeaderAndFooter>
				</div>
				// </div>
			)}
		</>
	);
}

export default DetailedRoadReport;
