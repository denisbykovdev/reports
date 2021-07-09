import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import combainReducers from './reducers/combainReducers'
import rootSaga from "./sagas/rootSaga"
import {
    createNetworkMiddleware
} from 'react-native-offline';

const sagaMiddleware = createSagaMiddleware();

const networkMiddleware = createNetworkMiddleware({
    // regexActionType: /.*REPORT/,
    actionTypes: [
        'WATCH_POST_REPORT',
        'WATCH_UPDATE_REPORT',
        'WATCH_DELETE_REPORT'
    ],
    queueReleaseThrottle: 20,
});

const middlewares = [
    sagaMiddleware,
    networkMiddleware
];

const store = createStore(
    combainReducers,
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;

