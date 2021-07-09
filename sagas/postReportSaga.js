import axios from "axios";
import { offlineActionCreators } from "react-native-offline";
import { call, put, select } from "redux-saga/effects";
import { addReportOffline, postReportFailure, postReportStart, postReportSuccess, watchPostReport } from "../actionCreators/sagaReport";
import { createReport } from "../constants/api";

export function* postReportSaga(action) {
    yield put(postReportStart());

    try {
        // const isConnected = yield select(state => state.network.isConnected)

        // if (
        //     isConnected === true
        // ) {
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
        // } else {
        // yield put(addReportOffline(
        //     {
        //         ...action.payload.report,
        //         areas: action.payload.areas,
        //         notes: action.payload.notes.map(note => note.isSavedToReport === true && note),
        //         pending: true
        //     }
        // ))

        // yield put(offlineActionCreators.fetchOfflineMode(watchPostReport(
        //     action.payload.token,
        //     action.payload.report,
        //     action.payload.areas,
        //     action.payload.notes,
        //     action.payload.isConnected = true
        // )))
        // }

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

        // yield put(offlineActionCreators.changeQueueSemaphore('GREEN'))

    }

    // yield put(offlineActionCreators.connectionChange(true))
    // yield put(offlineActionCreators.changeQueueSemaphore('GREEN'))
}

        // console.log(
        //     "--- * postReportSaga/JSON.stringify(report):",
        //     data.data
        //         .map(({ created_at, updated_at, id, ...report }) => report)
        //         .map(report => JSON.stringify(report) === JSON.stringify({
        //             ...action.report,
        //             areas: JSON.stringify(action.areas),
        //             notes: JSON.stringify(action.notes.map(note => note.isSavedToReport === true && note))
        //         })
        //             ?
        //             {
        //                 ...report,
        //                 active: true,
        //                 id: report.id
        //             }
        //             :
        //             report
        //         )
        // )

             // .map(({ created_at, updated_at, ...report }) => report)
            // .map(report => {
            //     // console.log(
            //     //     "--- * postReportSaga/JSON.stringify/report:",
            //     //     JSON.stringify(report),
            //     //     "--- * postReportSaga/JSON.stringify/activereport:",
            //     //     JSON.stringify({
            //     //         ...action.report,
            //     //         id: report.id,
            //     //         areas: JSON.stringify(action.areas),
            //     //         notes: JSON.stringify(action.notes.map(note => note.isSavedToReport === true && note))
            //     //     }),
            //     //     JSON.stringify(report) === JSON.stringify({
            //     //         ...action.report,
            //     //         id: report.id,
            //     //         areas: JSON.stringify(action.areas),
            //     //         notes: JSON.stringify(action.notes.map(note => note.isSavedToReport === true && note))
            //     //     }),
            //     //     JSON.stringify(report).length,
            //     //     JSON.stringify({
            //     //         ...action.report,
            //     //         id: report.id,
            //     //         areas: JSON.stringify(action.areas),
            //     //         notes: JSON.stringify(action.notes.map(note => note.isSavedToReport === true && note))
            //     //     }).length,
            //     // )
            //     return JSON.stringify(report) === JSON.stringify({
            //         ...action.report,
            //         id: report.id,
            //         areas: JSON.stringify(action.areas),
            //         notes: JSON.stringify(action.notes.map(note => note.isSavedToReport === true && note))
            //     })
            //         ?
            //         {
            //             ...report,
            //             active: true,
            //             id: report.id
            //         }
            //         :
            //         report
            // })
            // .map((report, i) => i === data.data.length - 1 ? {
            //     ...report,
            //     active: true
            // }
            // )
