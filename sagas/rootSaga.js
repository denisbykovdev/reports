import { all, fork } from 'redux-saga/effects';
import { watchGetReportsSaga } from './watchGetReportsSaga';
import { watchPostReportSaga } from './watchPostReportSaga';
import { watchUpdateReportSaga } from './watchUpdateReportSaga';
import { networkSaga } from 'react-native-offline';
import { watchDeleteReportSaga } from './watchDeleteReportSaga';

export default function* rootSaga() {
    yield all([
        fork(networkSaga),
        fork(watchPostReportSaga),
        fork(watchUpdateReportSaga),
        fork(watchGetReportsSaga),
        fork(watchDeleteReportSaga),
        // fork(networkSaga)
    ]);
};