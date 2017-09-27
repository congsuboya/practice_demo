

import { fork } from 'redux-saga/effects';
import { watchStartEle, watchResetEle } from './saga';

const root = function* rootSaga() {
    yield fork(watchStartEle);
    yield fork(watchResetEle);
}


export default root;