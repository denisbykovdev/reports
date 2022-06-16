import axios from "axios";
import { offlineActionCreators } from "react-native-offline";
import { call, put } from "redux-saga/effects";
import { printReportFailure, printReportStart, printReportSuccess } from "../actionCreators/sagaReport";
import { printEndpoint } from "../constants/api";

export function* printReportSaga(action) {
    yield put(printReportStart());

    try {
        const { data } = yield call(() => axios.get(
            `${printEndpoint(
                action.payload.reportId,
                action.payload.endpoint
            )}`,
            {
                headers: {
                    'Authorization': `Bearer ${action.payload.token}`
                }
            })
        );

        yield put(printReportSuccess(
            data.data.url
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
        yield put(printReportFailure(error))

        // if (error.message == 'Network Error') {
        //     yield put(printReportOffline(
        //         {
        //             ...action.payload.report,
        //             areas: action.payload.areas,
        //             notes: action.payload.notes.map(note => note.isSavedToReport === true && note),
        //             pending: true,
        //         },
        //         action.payload.reportId
        //     ))

        //     yield put(offlineActionCreators.fetchOfflineMode(action));
        // }
    }
}
