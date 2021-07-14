import { takeEvery, takeLatest } from "redux-saga/effects";
import { postReportSaga } from "./postReportSaga";

export function* watchPostReportSaga() {
    yield takeEvery('WATCH_POST_REPORT', postReportSaga)
}