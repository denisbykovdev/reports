import { takeEvery } from "redux-saga/effects";
import { editPhotoSaga } from "./editPhotoSaga";

export function* watchGetReportsSaga() {
    yield takeEvery('WATCH_EDIT_PHOTO', editPhotoSaga)
}
