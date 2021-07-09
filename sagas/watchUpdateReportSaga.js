import { takeEvery } from "redux-saga/effects";
import { updateReportSaga } from "./updateReportSaga";

export function* watchUpdateReportSaga() {
    yield takeEvery('WATCH_UPDATE_REPORT', updateReportSaga)
}