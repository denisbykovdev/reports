import axios from "axios";
import { offlineActionCreators } from "react-native-offline";
import { call, put } from "redux-saga/effects";
import { updateReportFailure, updateReportOffline, updateReportStart, updateReportSuccess } from "../actionCreators/sagaReport";
import { updateReport } from "../constants/api";

export function* updateReportSaga(action) {
    // console.log(
    //     `--- updateReportSaga/action:`, action
    // )
    yield put(updateReportStart());

    try {
        const { data } = yield call(() => axios.post(
            `${updateReport(action.payload.reportId)}`,
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

        // yield put(offlineActionCreators.connectionChange(false))

        // yield put(updateReportOffline(
        //     {
        //         ...action.payload.report,
        //         areas: action.payload.areas,
        //         notes: action.payload.notes.map(note => note.isSavedToReport === true && note),
        //         pending: true,
        //     },
        //     action.payload.reportId
        // ))

        // yield put(offlineActionCreators.fetchOfflineMode(action));

    } catch (error) {
        yield put(updateReportFailure(error))

        if (error.message == 'Network Error') {
            yield put(updateReportOffline(
                {
                    ...action.payload.report,
                    areas: action.payload.areas,
                    notes: action.payload.notes.map(note => note.isSavedToReport === true && note),
                    pending: true,
                },
                action.payload.reportId
            ))

            yield put(offlineActionCreators.fetchOfflineMode(action));
        }
    }
}
