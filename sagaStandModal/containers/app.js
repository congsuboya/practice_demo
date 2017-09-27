import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './container';

//store 的声明 -start

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../saga';
const configureStore = preloadedState => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(sagaMiddleware)
        )
    )
    sagaMiddleware.run(sagas);
    store.close = () => store.dispatch(END);
    return store;
}
const store = configureStore();

//store 的声明 -end

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Home componentID={this.props.componentID} />
            </Provider>
        );
    }
}

App.defaultProps = {
    componentID: 11
}