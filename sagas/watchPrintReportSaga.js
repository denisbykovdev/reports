import { takeEvery, takeLatest } from "redux-saga/effects";
import { printReportSaga } from "./printReportSaga";

export function* watchPrintReportSaga() {
    yield takeEvery('WATCH_PRINT_REPORT', printReportSaga)
}