import { combineReducers } from "redux";
import { sagaReportReducer } from "./sagaReportReducer";
import { reducer as network } from 'react-native-offline';

import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: ['bookmarks']
};

export default combineReducers({
    sagaReport: persistReducer(persistConfig, sagaReportReducer),
    network,
})