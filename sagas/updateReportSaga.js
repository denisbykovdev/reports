import axios from "axios";
import { call, put } from "redux-saga/effects";
import { updateReportFailure, updateReportOffline, updateReportStart, updateReportSuccess } from "../actionCreators/sagaReport";
import { updateReport } from "../constants/api";

export function* updateReportSaga(action) {
    try {
        yield put(updateReportStart());

        const { data } = yield call(() => axios.post(
            `${updateReport(action.payload.report.id)}`,
            {
                ...action.payload.report,
                areas: action.payload.areas,
                notes: action.payload.notes.map(note => note.isSavedToReport === true && note)
            },
            {
                headers: {
                    'Authorization': `Bearer ${action.payload.token}`
                }
            })
        );

        yield put(updateReportSuccess(
            data.data
        ))

    } catch (error) {
        yield put(updateReportFailure(error))

        if (error.message == 'Network Error') {
            yield put(updateReportOffline(
                {
                    ...action.payload.report,
                    areas: action.payload.areas,
                    notes: action.payload.notes.map(note => note.isSavedToReport === true && note),
                    pending: true
                }
            ))

            yield put(offlineActionCreators.fetchOfflineMode(action));
        }
    }
}
