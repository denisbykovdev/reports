import { takeEvery, takeLatest } from "redux-saga/effects";
import { getReportsSaga } from "./getReportsSaga";

export function* watchGetReportsSaga(action) {
    yield takeLatest('WATCH_GET_REPORTS', getReportsSaga)
}