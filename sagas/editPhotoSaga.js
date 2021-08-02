import axios from "axios";
import { call, put } from "redux-saga/effects";
import { editPhotoFailure, editPhotoStart, editPhotoSuccess } from "../actionCreators/sagaEditPhoto";
import { editPhoto } from "../constants/api";

export function* editPhotoSaga(action) {
    try {
        yield put(editPhotoStart());

        const { data } = yield call(() => axios.get(
            `${editPhoto}`,
            {
                photo: action.payload.photo,
                layer: action.payload.layer
            },
            {
                headers: {
                    'Authorization': `Bearer ${action.payload.token}`
                }
            }
        ));

        yield put(editPhotoSuccess(
            data.photo
        ))
    } catch (error) {
        yield put(editPhotoFailure(error))
    }
}
