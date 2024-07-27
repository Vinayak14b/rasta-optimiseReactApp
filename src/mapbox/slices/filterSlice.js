import { createSlice } from '@reduxjs/toolkit';
import { otherConditionsData, pointCheckboxesData,segmentCheckboxesData,roadAssetsData } from '../../constants/FilterData';

// initial state

const initialState = {
	loading: null,
	pointCollection: pointCheckboxesData,
	segmentCollection: segmentCheckboxesData,
	assetCollection: roadAssetsData,
	otherCondtionCollection: otherConditionsData,
	modalData: null,
	segmentModalData:null,
};

const filterSlice = createSlice({
	name: 'filter',
	initialState: initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
		},
		setPointCollection(state, action) {
			state.pointCollection = action.payload;
			state.segmentCollection = state.segmentCollection.map(
				(checkbox) => ({
					...checkbox,
					checked: false,
				})
			);
		},
		setSegmentCollection(state, action) {
			state.segmentCollection = action.payload;
			state.pointCollection = state.pointCollection.map((checkbox) => ({
				...checkbox,
				checked: false,
			}));
		},
		setAssetCollection(state, action) {
			state.assetCollection = action.payload;
		},

		setModalData(state, action) {
			state.modalData = action.payload;
		},
		setSegmentModalData(state, action) {
			state.segmentModalData = action.payload;
		},
		setOtherCondtionCollection(state, action) {
			state.segmentCollection = action.payload;
			state.pointCollection = state.pointCollection.map((checkbox) => ({
				...checkbox,
				checked: false,
			}));
		},
		commentoff(state) {
			
			state.assetCollection = state.assetCollection.map((checkbox) => ({
				...checkbox,
				checked: false,
			}));
			
		},
		commenton(state) {
			
			state.assetCollection = state.assetCollection.map((checkbox) => ({
				...checkbox,
				checked: true,
			}));
			
		},
	},
});
export const {
	setLoading,
	setPointCollection,
	setSegmentCollection,
	setAssetCollection,
	setModalData,
	setSegmentModalData,
	setOtherCondtionCollection,
	commentoff,
	commenton
} = filterSlice.actions;
export const selectFilter = (state) => state.filter;
export const selectModalData = (state) => state.filter.modalData;
export const selectSegmentModalData = (state) => state.filter.segmentModalData;
export default filterSlice.reducer;