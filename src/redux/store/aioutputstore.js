import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import storage from 'redux-persist/lib/storage';
import CryptoJS from 'crypto-js';
// usermanagement
import authReducer from '../../usermanagement/slices/authSlice';
import headReducer from '../../usermanagement/slices/headSlice';
import adminReducer from '../../usermanagement/slices/adminSlice';
import officeReducer from '../../usermanagement/slices/officeSlice';
import memberReducer from '../../usermanagement/slices/profileSlice';
import userReducer from '../../usermanagement/slices/userSlice';
import ownerReducer from '../../usermanagement/slices/ownerSlice';
import profileReducer from '../../usermanagement/slices/profileSlice';
import utilityReducer from '../../usermanagement/slices/utilitySlice';

// map box reducers
import pointReducer from '../../mapbox/slices/pointSlice';
import segmentsPlotReducer from '../../mapbox/slices/segmentSlice';
import mapReducer from '../../mapbox/slices/mapSlice';


//Filter
import filterReducer from '../../mapbox/slices/filterSlice'

// trip comparision reducers
import tripReducer from '../../mapbox/slices/tripSlice';

//backoffice
import imageEditedReducer from '../../backOffice/slices/imageResponseSlice'



const fixedPassphrase = 'b46d8e9603bcd6f74972b2535433cdd4';

const generateFixedKey = () => {
	const key = CryptoJS.PBKDF2(fixedPassphrase, 'salt', {
		keySize: 256 / 32,
		iterations: 1000,
	});
	return key.toString(CryptoJS.enc.Hex);
};

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	// transforms: [
	// 	encryptTransform({
	// 		secretKey: generateFixedKey(),
	// 		onError: (err) => {
	// 		},
	// 	}),
	// ],

	whitelist: ['auth', 'user', 'point', 'segment', 'profile','trip'],
};

const rootReducer = (state, action) => {
	if (action.type === 'RESET') {
	  state = undefined;
	}
  
	return combineReducers({
		// usermanagment
		auth: authReducer,
		head: headReducer,
		admin: adminReducer,
		office: officeReducer,
		member: memberReducer,
		user: userReducer,
		owner: ownerReducer,
		profile: profileReducer,

		// mapbox
		point: pointReducer,
		segment: segmentsPlotReducer,
		map: mapReducer,
		trip: tripReducer,

		//Filter
		filter: filterReducer,
		utility: utilityReducer,
		//backoffice
		imageResponse2:imageEditedReducer,
	})(state, action);
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
	getDefaultMiddleware({
	  serializableCheck: false,
	}),
});


const persistor = persistStore(store);
export { store, persistor };