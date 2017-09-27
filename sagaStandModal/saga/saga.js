import { takeEvery, delay, END } from 'redux-saga';
import { put, call, take, fork, cancel, cancelled, select } from 'redux-saga/effects';
import { types, Actions } from '../reducers/reducer';

export const watchStartEle = function* watchStart(getState) {
    // 一般用while循环替代 takeEvery
    // let runTimeTask = yield fork(timerEle, action.Id);
    yield* takeEvery(types.START, timerEle)

    yield take('NET');
   let result =  yield call(app.net,url)
   yield put(Actions.switchState());
    // yield* takeEvery(types.STOP, timerEle)

    // while (true) {
    //     // take: 等待 dispatch 匹配某个 action
    //     // console.log('actionsfsdfsdf-1111');
        // const action = yield take(types.START);
    //     // console.log('actionsfsdfsdf-2222', action);
    //     // // 通常fork 和 cancel配合使用，实现非阻塞任务，take是阻塞状态，也就是实现执行take时候，无法向下继续执行，fork是非阻塞的，同样可以使用cancel取消一个fork 任务
    //     // let runTimeTask = yield fork(timerEle, action.Id);
    //     // console.log('actionsfsdfsdf-3333');
    //     yield take(types.STOP);
    //     console.log('actionsfsdfsdf-4444');
    //     // cancel: 取消一个fork任务
    //     yield cancel(runTimeTask);
    //     console.log('actionsfsdfsdf-5555');
    // }
}

export const watchResetEle = function* watchReset() {
    while (true) {
        const action = yield take(types.RESET)
        yield put(Actions.stop(action.Id));
    }
}

const timerEle = function* timer(action) {
    try {
        while (true) {
            // call: 有阻塞地调用 saga 或者返回 promise 的函数，只在触发某个动作
            yield call(delay, 1000);
            // put: 触发某个action， 作用和dispatch相同
            yield put(Actions.run(action.Id));
        }
    } finally {
        if (yield cancelled()) {
            console.log('取消了runTimeTask任务');
        }
    }
}

