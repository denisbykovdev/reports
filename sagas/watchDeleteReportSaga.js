import { takeEvery, takeLatest } from "redux-saga/effects";
import { deleteReportSaga } from './deleteReportSaga'

export function* watchDeleteReportSaga() {
    yield takeEvery('WATCH_DELETE_REPORT', deleteReportSaga)
}