import { all, fork } from 'redux-saga/effects';
import { watchGetReportsSaga } from './watchGetReportsSaga';
import { watchPostReportSaga } from './watchPostReportSaga';
import { watchUpdateReportSaga } from './watchUpdateReportSaga';
import { networkSaga } from 'react-native-offline';
import { watchDeleteReportSaga } from './watchDeleteReportSaga';
import { watchPrintReportSaga } from './watchPrintReportSaga';

export default function* rootSaga() {
    yield all([
        fork(networkSaga),
        fork(watchPostReportSaga),
        fork(watchUpdateReportSaga),
        fork(watchDeleteReportSaga),
        fork(watchGetReportsSaga),
        fork(watchPrintReportSaga)
    ]);
};