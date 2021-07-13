import axios from "axios";
import { offlineActionCreators } from "react-native-offline";
import { call, put, select } from "redux-saga/effects";
import { addReportOffline, postReportFailure, postReportStart, postReportSuccess, watchPostReport } from "../actionCreators/sagaReport";
import { createReport } from "../constants/api";

export function* postReportSaga(action) {
    yield put(postReportStart());

    try {
        const { data } = yield call(() => axios.post(
            `${createReport}`,
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

        yield put(postReportSuccess(
            data.data
        ))

        // yield put(offlineActionCreators.connectionChange(false))

        // yield put(addReportOffline(
        //     {
        //         ...action.payload.report,
        //         areas: action.payload.areas,
        //         notes: action.payload.notes.map(note => note.isSavedToReport === true && note),
        //         pending: true
        //     }
        // ))

        // yield put(offlineActionCreators.fetchOfflineMode(action));

    } catch (error) {
        yield put(postReportFailure(error))

        if (error.message == 'Network Error') {
            yield put(addReportOffline(
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
