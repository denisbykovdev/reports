import { combineReducers } from "redux";
import { sagaReportReducer } from "./sagaReportReducer";
import { reducer as network } from 'react-native-offline';

export default combineReducers({
    sagaReport: sagaReportReducer,
    network,
})