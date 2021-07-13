import axios from "axios";
import { call, put } from "redux-saga/effects";
import { deleteReportFailure, deleteReportOffline, deleteReportStart, deleteReportSuccess } from "../actionCreators/sagaReport";
import { deleteReport } from "../constants/api";

export function* deleteReportSaga(action) {
    try {
        yield put(deleteReportStart());

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
    } catch (error) {
        yield put(deleteReportFailure(error))

        if (error.message == 'Network Error') {
            yield put(deleteReportOffline(
                action.payload.reportId
            ))

            yield put(offlineActionCreators.fetchOfflineMode(action))
        }
    }
}