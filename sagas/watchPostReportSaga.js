import { takeEvery, takeLatest } from "redux-saga/effects";
import { postReportSaga } from "./postReportSaga";

export function* watchPostReportSaga() {
    yield takeLatest('WATCH_POST_REPORT', postReportSaga)
}