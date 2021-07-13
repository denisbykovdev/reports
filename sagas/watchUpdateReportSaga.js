import { takeEvery, takeLatest } from "redux-saga/effects";
import { updateReportSaga } from "./updateReportSaga";

export function* watchUpdateReportSaga() {
    yield takeLatest('WATCH_UPDATE_REPORT', updateReportSaga)
}