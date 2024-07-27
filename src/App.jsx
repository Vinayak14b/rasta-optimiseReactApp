import { createContext, useEffect, useReducer, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// redux
import { reducer, initialState } from './Component/reducer';
import { useSelector } from 'react-redux';

// contexts
import { SelectedDataProvider } from './Component/SelectedDataContext';
import { CheckboxProvider } from './Component/CheckboxContext';
import { ButtonProvider } from './Component/Context/ButtonValContext';

// import Header from './components/Header';
import Sidebar from './Component/Sidebar';

// map component
import { MapProvider } from './Component/Context/SearchContext';

// dashboards
import UtilitiesDashboardMain from './Component/Requests/UtilitiesDashboardMain';
import UserVerificationReq from './Component/Requests/UserVerificationReq';
import TripApproval from './Component/Requests/TripApproval';

// Child Components
import RoadClassification from './Component/RoadClassification';
import PricingPlan from './Component/PricingPlan';
import PaymentSuccess from './Component/PaymentSucces';

import BudgetPage from './Component/BudgetPage';

// Budget

// trip comparision
import SelectChoice from './Component/CompareTrips/Core/SelectChoice.jsx';
import SelectArea from './Component/CompareTrips/Core/SelectArea.jsx';
import ListView from './Component/List_View';
import Comparison from './Component/CompareTrips/Core/Comparison.jsx';
import DisplayMap from './Component/SearchandSurvery/DisplayMap';

// report
import Report from './Component/Report';
import DetailedReport from './Component/DetailedReport';
import ViewDetails from './Component/ViewDetails';
import BuyReport from './Component/BuyReport';
import Downloadpdf from './Component/downloadreport';
import Credit from './Component/Payment';
import DownloadExcel from './Component/DownloadExcel';

// user
import ManageUser from './Component/ManageUser';

// 5000 for mobile and 2700 for dashboard
import { DownloadReport } from './Component/Report/DownloadReport';
import { UserProfile } from './usermanagement/core/User/UserProfile.jsx';

// Utils
// Office Imports
import { ViewOffice } from './usermanagement/core/Office/MainOffice/ViewOffice.jsx';
import LoginPage from './usermanagement/core/Auth/LoginPage.jsx';
import { ViewMember } from './usermanagement/core/Office/Member/ViewMember.jsx';
import PrivateRoute from './usermanagement/core/Auth/PrivateRoute.jsx';
import PublicRoute from './usermanagement/core/Auth/PublicRoute.jsx';

// by  weitredge

import DetailedReports from './Component/DetailedReports';

// mapbox
import { MapHomeComp } from './mapbox/core/MapHomeComp.jsx';
import { StreetView } from './mapbox/360_View/StreetView.jsx';
import { SidebarProvider } from './Component/Context/SidebarContext.jsx';
import {
	ALL,
	OA,
	OHA,
	OHAM,
	Owner,
} from './usermanagement/accesscontrol/accesslist.js';

import { JEProfileData } from './usermanagement/core/User/JEProfileData.jsx';

// core
import NotFound from './Component/core/NotFound.jsx';
import Home from './Component/core/Home.jsx';
import MaximizeImage from './mapbox/points/FullScreen/MaximizeImage.jsx';
import Test from './Component/Test/Test.jsx';
import { selectProfile } from './usermanagement/slices/profileSlice.js';
import ViewDetail from './Component/Report/ViewDetailSummery.jsx';
import SelectAreaReport from './Component/Report/ReportGeneration/SelectAreaReport.jsx';
import DetailedRoadReport from './Component/Report/ReportGeneration/DetailedRoadReport/DetailedRoadReport.jsx';
import PCIRoadReport from './Component/Report/ReportGeneration/PCIRoadReport/PCIRoadReport.jsx';
import DetailedReport2 from './Component/DetailedSummary/DetailedReport2.jsx';

//back office
import EditImage from './backOffice/EditImage.jsx';
import EditRoadInfo from './backOffice/EditRoadInfo/EditRoadInfo.jsx';
import checkSessionExpiry from './auth/checkSessionExpiry.js';

export const UserContext = createContext();
export const isLoggedIn = localStorage.getItem('token') !== null;

const Routing = ({ profileUserData }) => {
	return (
		<>
			<Routes>
				<Route path="/test" element={<Test />} />
				<Route path="/" element={<Home />} />
				{/* all in one login */}
				<Route
					path="login"
					element={
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
				{/* home page */}
				<Route
					path="/home"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<MapProvider>
								<SidebarProvider>
									<MapHomeComp />
								</SidebarProvider>
							</MapProvider>
						</PrivateRoute>
					}
				/>
				{/* reoprt home page */}
				<Route
					path="/report"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<CheckboxProvider>
								<Report />
							</CheckboxProvider>
						</PrivateRoute>
					}
				/>
				{/* view deatailed summary */}
				<Route
					path="/detailsreports"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<DetailedReports />
						</PrivateRoute>
					}
				/>
				{/* download report page */}
				<Route
					path="/downloadreport"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<CheckboxProvider>
								<DownloadReport />
							</CheckboxProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/downloadreport/detailroadreport"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<CheckboxProvider>
								<DetailedRoadReport />
							</CheckboxProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/downloadreport/pciroadreport"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<CheckboxProvider>
								<PCIRoadReport />
							</CheckboxProvider>
						</PrivateRoute>
					}
				/>
				{/* pricing plan */}
				<Route
					path="/pricingplan"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<PricingPlan />
						</PrivateRoute>
					}
				/>
				{/* budget */}
				<Route
					path="/budget"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<CheckboxProvider>
								<Sidebar />
							</CheckboxProvider>

							<BudgetPage />
						</PrivateRoute>
					}
				/>
				{/* utilities */}
				<Route
					path="/utilitiesdashboard"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<UtilitiesDashboardMain />
						</PrivateRoute>
					}
				/>
				<Route
					path="/streetView/:latitude/:longitude"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<StreetView />
						</PrivateRoute>
					}
				/>
				{/* by weiteredge */}
				{/* Office Routes */}
				<Route
					path="/office"
					element={
						<PrivateRoute allowedUserTypes={['Owner']}>
							<CheckboxProvider>
								<ViewOffice />
							</CheckboxProvider>
						</PrivateRoute>
					}
				/>
				{/* Member Routes */}
				<Route
					path="/office/:office_name/member"
					element={
						<PrivateRoute allowedUserTypes={OHAM}>
							<CheckboxProvider>
								<ViewMember />
							</CheckboxProvider>
						</PrivateRoute>
					}
				/>
				{/* Open Routes */}
				<Route
					path="/detailedreport"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<DetailedReport />
						</PrivateRoute>
					}
				/>
				<Route
					path="/viewdetailsummary"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<ViewDetails />
						</PrivateRoute>
					}
				/>
				<Route
					path="/viewdetail"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<ViewDetail />
						</PrivateRoute>
					}
				/>
				<Route
					path="/downloadpdf"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<Downloadpdf />
						</PrivateRoute>
					}></Route>
				<Route
					path="/buyreport"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<BuyReport />
						</PrivateRoute>
					}
				/>
				<Route
					path="/credit"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<Credit />
						</PrivateRoute>
					}
				/>
				<Route
					path="/excel"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<DownloadExcel />
						</PrivateRoute>
					}
				/>
				<Route
					path="/userverification"
					element={
						<PrivateRoute
							allowedUserTypes={OHA}
							adminAtSubdivisionLevel>
							<UserVerificationReq />
						</PrivateRoute>
					}
				/>
				<Route
					path="/tripapproval"
					element={
						<PrivateRoute
							allowedUserTypes={OA}
							adminAtSubdivisionLevel>
							<TripApproval />
						</PrivateRoute>
					}
				/>
				{/* Settings Routes */}
				<Route
					path="/usermanagement"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<ManageUser />
						</PrivateRoute>
					}
				/>
				<Route
					path="/usermanagement/profile/:username"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<UserProfile />
						</PrivateRoute>
					}
				/>
				<Route
					path="/usermanagement/jeprofile/:userName"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<JEProfileData />
						</PrivateRoute>
					}
				/>
				<Route
					path="/maximize-image/:lat/:long/:flag"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<MaximizeImage />
						</PrivateRoute>
					}
				/>
				\{/* Road Classification */}
				{/* added their /Road */}
				<Route
					path="/roadclassification"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<RoadClassification />
						</PrivateRoute>
					}
				/>
				<Route
					path="/payment-success"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<SelectedDataProvider>
								<PaymentSuccess />
							</SelectedDataProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/comparison/:flag"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<ButtonProvider>
								<SelectedDataProvider>
									<Comparison />
								</SelectedDataProvider>
							</ButtonProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/listview"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<SidebarProvider>
								<ListView />
							</SidebarProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/displaymap/:flag/:id1/:id2"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<SidebarProvider>
								<DisplayMap />
							</SidebarProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/selectchoice"
					element={
						profileUserData?.officeLevel === 'Sub-division' ? (
							<ListView />
						) : (
							<PrivateRoute allowedUserTypes={ALL}>
								<ButtonProvider>
									<SelectChoice />
								</ButtonProvider>
							</PrivateRoute>
						)
					}
				/>
				<Route
					path="/selectarea"
					SelectArea
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<ButtonProvider>
								<SelectArea />
							</ButtonProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/selectareareport"
					SelectArea
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<ButtonProvider>
								<SelectAreaReport />
							</ButtonProvider>
						</PrivateRoute>
					}
				/>
				<Route
					path="/detailed-report"
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<DetailedReport2 />
						</PrivateRoute>
					}
				/>
				<Route
					path="/edit"
					element={
						<PrivateRoute allowedUserTypes={['Owner']}>
							<EditImage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/editRoadInfo/:roadId"
					element={
						<PrivateRoute allowedUserTypes={['Owner']}>
							<EditRoadInfo />
						</PrivateRoute>
					}
				/>
				{/* <Route
					path="/roadcomparison/:id1/:id2"
					SelectArea
					element={
						<PrivateRoute allowedUserTypes={ALL}>
							<RoadComparison />
						</PrivateRoute>
					}
				/> */}
				{/* Comment this in Production */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default function App() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { profileUserData } = useSelector(selectProfile);
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const interval = setInterval(checkSessionExpiry, 60000); 
		return () => clearInterval(interval);
	}, []);


	useEffect(() => {
		const handleKeyDown = (event) => {
		  if (event.ctrlKey && (event.key === 's' || event.key === 'S') ) {
			event.preventDefault();
			alert('Saving is disabled on this website.');
		  }
		};
	
		document.addEventListener('keydown', handleKeyDown);
	
		return () => {
		  document.removeEventListener('keydown', handleKeyDown);
		};
	  }, []);
	


	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<Routing profileUserData={profileUserData} />
		</UserContext.Provider>
	);
}
