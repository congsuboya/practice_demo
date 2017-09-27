//actionTypes定义区域-stat

export const types = {
    START: 'XSY_DEMO_START',
    STOP: 'XSY_DEMO_STOP',
    RUN: 'XSY_DEMO_RUN',
    RESET: 'XSY_DEMO_RESET',
    INIT_STATE: 'XSY_INIT_STATE'
}

//actionTypes定义区域-end



//action定义区域-stat

export const Actions = {
    start: (Id) => ({ type: types.START, Id }),
    stop: (Id) => ({ type: types.STOP, Id }),
    run: (Id) => ({ type: types.RUN, Id }),
    reset: (Id) => ({ type: types.RESET, Id }),
    initState: (Id) => ({ type: types.INIT_STATE, Id })
}

//action定义区域-end



//reducer定义区域-stat


import { fromJS } from 'immutable';

const initState = {
    instances: {
        'default': {
            seconds: 0,
            runStatus: false
        }
    }
}


function DemoReducer(state = fromJS(initState), action) {
    switch (action.type) {
        case types.INIT_STATE:
            return state.update('instances', v => v.set(action.Id, v.get('default')));
        case types.START:
            return state.setIn(['instances', action.Id, 'runStatus'], true);
        case types.STOP:
            return state.setIn(['instances', action.Id, 'runStatus'], false);
        case types.RESET:
            return state.setIn(['instances', action.Id, 'seconds'], 0);
        case types.RUN:
            return state.updateIn(['instances', action.Id, 'seconds'], v => v + 1);
        default:
            return state;
    }
}

export default DemoReducer;

//reducer定义区域-end

