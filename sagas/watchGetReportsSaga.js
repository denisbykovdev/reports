import { takeEvery } from "redux-saga/effects";
import { getReportsSaga } from "./getReportsSaga";

export function* watchGetReportsSaga(action) {
    yield takeEvery('WATCH_GET_REPORTS', getReportsSaga)
    // try {
    //     yield put(getReportsStart());

    //     const { data } = yield call(() => axios.get(
    //         `${reportsAll}`,
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${action.payload.token}`
    //             }
    //         }));

    //     yield put(getReportsSuccess(
    //         data.data
    //     ))
    // } catch (error) {
    //     yield put(getReportsFailure(error))
    // }
}