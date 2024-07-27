import { useEffect, useState } from 'react';
import Sidebar from '../../Component/Sidebar';
import { RenderMap } from './RenderMap';
import { useDispatch, useSelector } from 'react-redux';
import { selectPoint } from '../slices/pointSlice';
import { Spinner } from '../../utils/Spinner';
import { getPoints } from '../services/Operations/PointsAPI';
import { getSegments } from '../services/Operations/SegmentAPI';
import { selectAuth } from '../../usermanagement/slices/authSlice';
import { selectSegment } from '../slices/segmentSlice';
import { selectLatLng } from '../../usermanagement/slices/userSlice';
import {
	selectUser,
	setIsLocation,
	setLatLng,
} from '../../usermanagement/slices/userSlice';
import { setModalData } from '../slices/filterSlice';
import Preloader from '../../Component/preloader/Preloader';

import StatisticBar from '../../Component/Statistics/StatisticBar';


export const MapHomeComp = () => {
	const dispatch = useDispatch();
	const { loading: pointsLoading } = useSelector(selectPoint);
	const { loading: segmentLoading, segmentsLoaded } =
		useSelector(selectSegment);
	const { isAuthenticated } = useSelector(selectAuth);

	const [showStaticBar, setShowStaticBar] = useState(true);

	useEffect(() => {
		const fetchData = () => {
			requestGeolocation();
			if (isAuthenticated && pointsLoading === null) {
				// points api getting called
				dispatch(getPoints());
			}
			if (isAuthenticated && segmentsLoaded === null) {
				// segments api getting called
				dispatch(getSegments());
			}
		};
		fetchData();
		dispatch(setModalData(null));
	}, [dispatch, isAuthenticated]);

	const requestGeolocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					dispatch(setIsLocation(true));
					dispatch(
						setLatLng([
							position.coords.longitude,
							position.coords.latitude,
						])
					);
				},
				(error) => {
					// Handle geolocation error
					console.error('Error getting geolocation:', error.message);
				}
			);
		} else {
			console.error('Geolocation is not supported by this browser.');
		}
	};

	return (
		<>
			<div>
				<Sidebar className="w-[20%]" />
			</div>

			<div className="max-h-screen w-screen">
				{/* {pointsLoading ? ( */}
				{pointsLoading && segmentLoading ? (
					// <Spinner />
					<Preloader />
				) : (
					<div
						className="ml-20 mr-40"
						// style={{
						//   marginRight: "10%",
						// }}
					>
						<RenderMap />
					</div>
				)}

				{/* <div className="flex flex-1 flex-col-reverse ">
							<Mapcomponent
								isFullscreenEnabled={isFullscreenEnabled}
								setIsFullscreenEnabled={setIsFullscreenEnabled}
								onClickMapHideStaticBar={
									onClickMapHideStaticBar
								}
								showStaticBar={showStaticBar}
							/>
						</div> */}
				{/* statitics bar */}
				{/* <div>
          {showStaticBar ? (
            <RightSideBars
              selectedButtonRight={selectedButtonRight}
              setSelectedButtonRight={setSelectedButtonRight}
              className="w-[20%]"
            />
          ) : (
            ""
          )}
        </div> */}

				{/* {segmentModalData && (
          <SegmentDetails
            segmentData={segmentModalData}
            onClose={() => dispatch(setSegmentModalData(null))}
          />
        )} */}
		<StatisticBar />
			</div>
		</>
	);
};
