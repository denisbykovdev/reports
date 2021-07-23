import axios from "axios";
// import * as SecureStore from 'expo-secure-store';
import { call, put, select } from "redux-saga/effects";
import { addReportsOffline, getReportsFailure, getReportsStart, getReportsSuccess } from "../actionCreators/sagaReport";
import { reportsAll } from "../constants/api";
// import AsyncStorage from '@react-native-async-storage/async-storage';

export function* getReportsSaga(action) {
    try {
        yield put(getReportsStart());

        // const isConnected = yield select(state => state.network.isConnected)

        // if (isConnected !== true) {
        //     // try {
        //     const reports = yield call(() => SecureStore.getItemAsync(
        //         'userReports'
        //     ))

        //     yield put(addReportsOffline(JSON.parse(reports)))
        // }
        // else {

        const { data } = yield call(() => axios.get(
            `${reportsAll}`,
            {
                headers: {
                    'Authorization': `Bearer ${action.payload.token}`
                }
            }));

        yield put(getReportsSuccess(
            data.data
        ))

        // yield call(() => {
        //     SecureStore.setItemAsync(
        //         'userReports',
        //         JSON.stringify(
        //             data.data
        //         )
        //     )
        // })

        // }
    } catch (error) {
        yield put(getReportsFailure(error))
    }
}
