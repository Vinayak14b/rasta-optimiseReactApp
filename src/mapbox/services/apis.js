// const BASE_URL = process.env.REACT_APP_BASE_LINK;
// const BASE_URL = 'http://localhost:2700/';''[';']

import { BASE_URL } from '../../apiConnection';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const pointendpoints = {
// 	GET_POINTS_BY_USER: `${BASE_URL}/point/point-by-access`,
// 	GET_SINGLE_POINT_DATA: `${BASE_URL}/AI/getimagesByS3/`,
// 	// GET_SINGLE_POINT_DATA_OPTIMIZE: `${BASE_URL}/point/get-one-point-data`,
// };

export const pointendpoints = {
    // GET_POINTS_BY_USER: `${BASE_URL}point/point-by-access`,
    // GET_SINGLE_POINT_DATA: `${BASE_URL}/AI/getimagesByS3/`,

	// new version apis
	
    GET_POINTS_BY_USER: `${BASE_URL}point/get-points-by-access-test`,
    // GET_SINGLE_POINT_DATA_OPTIMIZE: `${BASE_URL}point/get-one-point-data`,
    // GET_SINGLE_POINT_DATA_OPTIMIZE: `${BASE_URL}point/get-one-point-data-test`,
	GET_IMAGE_BY_LAT_LONG: `${BASE_URL}point/get-image-by-lat-long`,
};
export const segmentendpoints = {
	// GET_SEGMENTS_BY_USER: `${BASE_URL}segment/segment-by-access-test2`,
	GET_SEGMENTS_BY_USER: `${BASE_URL}segment/segment-by-access-test2`,
	GET_SINGLE_SEGMENT_DATA: `${BASE_URL}segment/rci-after-segment`,
};

export const roadendpoints = {
	GET_ALL_SURVEYED_ROAD: `${BASE_URL}AI/getRoadList-by-Access`,
	GET_SINGLE_ROAD_COORDINATES: `${BASE_URL}point/get-one-road-points-by-access-test`,
	GET_BUDGET_ROAD_LIST_DROPDOWN: `${BASE_URL}AI/getRoadList`,
	GET_SINGLE_ROAD_BUDGET_DATA : `${BASE_URL}AI/getdataOfRoadNameRoadNo`,
	GET_ALL_CHAINAGE_LIST:`${BASE_URL}api/distinct-chainnages`,
	GET_ASSETS_DEFECTS_OF_ROAD: `${BASE_URL}AI/getAssetsDefectsofRoad`,
};


export const jurisdictionendpoints = {
	GET_ALL_ACCESIBLE_DROPDOWN: `${BASE_URL}csv/get-region-circle-data`,
	GET_ALL_ACCESIBLE_REPORT_DROPDOWN: `${BASE_URL}csv/get-region-circle-report-data`,
	GET_DEFAULT_REGION_VALUES: `${BASE_URL}csv/get-office-names-under-juris`,
};

export const pointDetailComments={
	SEND_COMMENT_TO_DATABASE: `${BASE_URL}comment/add-comment`,
	GET_COMMENTS_FROM_DATABASE: `${BASE_URL}comment/get-comments-on-point`,
}

export const comparetripendpoints = {
	GET_SINGLE_TRIP_HISTORY: `${BASE_URL}compareTrip/get-survey-list-road-by-roadName-roadNo`,
	GET_SUREY_DATES_FOR_OFFICE: `${BASE_URL}compareTrip/get-month-year-office-wise`,
	GET_OFFICE_DATE_MONTH_WISE: `${BASE_URL}compareTrip/get-points-data-month-year-wise`,
	GET_ROAD_DATA_DATE_WISE: `${BASE_URL}compareTrip/get-points-data-date-roadName-roadNo-wise`,
};

export const backOfficeendPoints={
	//edit tool 
	EDIT_LAT_LNG_IMAGE:`${BASE_URL}backoffice/get-image-lat-long`,
	UPDATE_LAT_LNG:`${BASE_URL}backoffice/update-lat-long`,
	SAVE_ANNOTATION:`${BASE_URL}backoffice/save-anotation`,

	//edit road Info 
	EDIT_ROAD_INFO:`${BASE_URL}backoffice/single-road-data`,
	SAVE_ROAD_INFO:`${BASE_URL}backoffice/edit-road-info-by-id`,
	SAVE_RECHAINAGE:`${BASE_URL}backoffice/rechainage-by-id`
}

export const statisticsendpoints={
	GET_STATISTICS_DATA:`${BASE_URL}statistics/get-detected-count-on-map`,
	GET_STATISTICS_DATA_SINGLE_ROAD:`${BASE_URL}statistics/get-detected-count-on-single-road`
}