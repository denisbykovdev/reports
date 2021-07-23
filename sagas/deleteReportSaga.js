import axios from "axios";
import { offlineActionCreators } from "react-native-offline";
import { call, put } from "redux-saga/effects";
import { deleteReportFailure, deleteReportStart, deleteReportSuccess, deleteReportOffline } from "../actionCreators/sagaReport";
import { deleteReport } from "../constants/api";

export function* deleteReportSaga(action) {
    yield put(deleteReportStart());

    try {
        const { data } = yield call(() => axios.post(
            `${deleteReport(action.payload.reportId)}`,
            {
                headers: {
                    'Authorization': `Bearer ${action.payload.token}`
                }
            })
        );

        yield put(deleteReportSuccess(
            data.data
        ))

        // yield put(offlineActionCreators.connectionChange(false));

        // yield put(deleteReportOffline(
        //     action.payload.reportId
        // ));

        // yield put(offlineActionCreators.fetchOfflineMode(action));

    } catch (error) {
        yield put(deleteReportFailure(error));

        if (error.message == 'Network Error') {
            yield put(deleteReportOffline(
                action.payload.reportId
            ));

            yield put(offlineActionCreators.fetchOfflineMode(action));
        }
    };
};