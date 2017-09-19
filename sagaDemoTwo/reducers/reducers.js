import { combineReducers } from 'redux';

export const types = {
    START: 'START',
    STOP: 'STOP',
    RESET: 'RESET',
    RUN_TIMER: 'RUN_TIMER'
}

export const actions = {
    start: () => {
        console.log('actionsfsdfsdf-actionsrrrrrr')
        return { type: types.START, name: 'nihao' }
    },
    stop: () => ({ type: types.STOP }),
    reset: () => ({ type: types.RESET }),
    runTime: () => ({ type: types.RUN_TIMER }),
}

// 原始默认state
const defaultState = {
    seconds: 0,
    runStatus: false
}

function timer(state = defaultState, action) {
    // console.log('actionsfsdfsdf-actionsfs', action)
    switch (action.type) {
        case types.START:
            return { ...state, runStatus: true };
        case types.STOP:
            return { ...state, runStatus: false };
        case types.RESET:
            return { ...state, seconds: 0 };
        case types.RUN_TIMER:
            return { ...state, seconds: state.seconds + 1 };
        default:
            return state;
    }
}

export default combineReducers({
    timer
});