import reducer from '../reducer';

function createStore(reducer) {
    let state;
    let listeners = [];

    function subscribe(listener) {
        // listener is a function
        listeners.push(listener);
    }

    function dispatch(action) {
        // call the reducer to get the new state
        state = reducer(state, action);
        // notify the subscribers
        for (let listener of listeners) {
            listener();
        }
    }

    function getState() {
        return state;
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}

export default createStore(reducer);