import { combineReducers } from "redux";
import { sagaReportReducer } from "./sagaReportReducer";
import { reducer as network } from 'react-native-offline';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sagaEditPhotoReducer } from "./sagaEditPhotoReducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['bookmarks']
};

export default combineReducers({
    sagaReport: persistReducer(persistConfig, sagaReportReducer),
    sagaEditPhoto: sagaEditPhotoReducer,
    network
});