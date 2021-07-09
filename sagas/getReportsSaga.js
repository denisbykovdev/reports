import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { call, put, select } from "redux-saga/effects";
import { addReportsOffline, getReportsFailure, getReportsStart, getReportsSuccess } from "../actionCreators/sagaReport";
import { reportsAll } from "../constants/api";

export function* getReportsSaga(action) {
    try {
        yield put(getReportsStart());

        const isConnected = yield select(state => state.network.isConnected)

        yield call(() => console.log(`--- * ggetReportsSaga/action.payload.isConnected:`, isConnected))

        if (isConnected !== true) {
            // try {
            const reports = yield call(() => SecureStore.getItemAsync(
                'userReports'
            ))

            // yield call(() => console.log(`--- * ggetReportsSaga/ss/JSON.parse(reports):`, JSON.parse(reports)))

            // yield put(getReportsSuccess(
            //     JSON.parse(reports)
            // ))
            yield put(addReportsOffline(JSON.parse(reports)))
            // } catch (error) {
            //     yield put(getReportsFailure(error))
            // }
        }
        else {
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
            //     return SecureStore.deleteItemAsync('userReports')
            // })

            yield call(() => {
                SecureStore.setItemAsync(
                    'userReports',
                    JSON.stringify(
                        data.data
                    )
                )
            })

            // const reports = yield call(() => SecureStore.getItemAsync(
            //     "userReports"
            // ))

            // yield call(() => console.log(`--- * getR:`, reports))

        }

    } catch (error) {
        yield put(getReportsFailure(error))

        // const reports = yield call(() => SecureStore.getItemAsync(
        //     "userReports"
        // ))

        // yield put(getReportsSuccess(
        //     JSON.parse(reports)
        // ))
    }
}
