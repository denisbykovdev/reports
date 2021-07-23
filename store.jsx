import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import combainReducers from './reducers/combainReducers'
import rootSaga from "./sagas/rootSaga"
import {
    createNetworkMiddleware
} from 'react-native-offline';

import { persistStore } from 'redux-persist';

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

export const store = createStore(
    combainReducers,
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);